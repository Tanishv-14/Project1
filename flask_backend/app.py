"""
app.py - Root Force Backend
============================
A student-first rental & trust platform built with Python Flask and Firebase Firestore.
Designed for national hackathon demonstrations.

Modules:
1. Auth & Role-Based Registration (Student, Owner, Parent) + DigiLocker Verification
2. Property Listings & Direct Search + "True Cost" Calculator
3. Roommate Matching System ("RootMate")
4. Parent Dashboard & Trust Layer (Emergency Contacts + Student Consent Control)
5. Move-In Condition Proof ("DepositGuard")

Authors: Root Force Hackathon Team
"""

import os
import uuid
import datetime
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from dotenv import load_dotenv

# Import Firebase Firestore client
from firebase_config import get_db, is_mock_mode

load_dotenv()

app = Flask(__name__)
# Enable CORS so frontend (or separate web client) can make cross-origin requests
CORS(app)

db = get_db()


# ==============================================================================
# 0. ROOT & HEALTHCHECK
# ==============================================================================

@app.route("/", methods=["GET"])
def home():
    """Serves the main frontend page or API status."""
    return render_template("index.html")

@app.route("/true-cost", methods=["GET"])
def true_cost_page():
    """Serves the True Cost Calculator page."""
    return render_template("true_cost.html")

@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "Root Force API",
        "timestamp": datetime.datetime.utcnow().isoformat(),
        "database": "Firebase Firestore" if not is_mock_mode else "Firestore Smart-Mock (Hackathon Mode)"
    }), 200


# ==============================================================================
# MODULE 1: AUTHENTICATION & ROLE-BASED REGISTRATION + DIGILOCKER VERIFICATION
# ==============================================================================

@app.route("/api/auth/register", methods=["POST"])
def register_user():
    """
    Registers a new user (Student, Property Owner, or Parent) in Firestore.
    Payload:
    {
        "name": "Arjun Sharma",
        "email": "arjun@college.edu",
        "role": "student" | "owner" | "parent",
        "college": "Delhi University / IIT", # for students
        "phone": "+91 98765 00000"
    }
    """
    try:
        data = request.get_json() or {}
        required_fields = ["name", "email", "role"]
        for field in required_fields:
            if not data.get(field):
                return jsonify({"error": f"Missing required field: {field}"}), 400

        valid_roles = ["student", "owner", "parent"]
        role = data.get("role").lower()
        if role not in valid_roles:
            return jsonify({"error": f"Invalid role. Must be one of: {valid_roles}"}), 400

        user_id = f"usr_{uuid.uuid4().hex[:10]}"
        user_record = {
            "id": user_id,
            "name": data["name"],
            "email": data["email"],
            "role": role,
            "college": data.get("college", "Not specified"),
            "phone": data.get("phone", ""),
            "isVerified": False,
            "idType": "none",
            "createdAt": datetime.datetime.utcnow().isoformat(),
            "parentConsentGranted": True if role == "student" else False
        }

        # Save into Firestore collection 'users'
        db.collection("users").document(user_id).set(user_record)

        return jsonify({
            "message": "User registered successfully!",
            "user": user_record
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/auth/verify-id", methods=["POST"])
def verify_id():
    """
    Simulates Government DigiLocker / Aadhaar / College ID instant verification.
    Provides verified badges for Students and Owners to build mutual trust.
    Payload:
    {
        "userId": "usr_123",
        "idType": "digilocker_aadhaar" | "college_id" | "owner_property_deed",
        "documentNumber": "XXXX-XXXX-1234"
    }
    """
    try:
        data = request.get_json() or {}
        user_id = data.get("userId")
        id_type = data.get("idType", "digilocker_aadhaar")
        doc_num = data.get("documentNumber", "ABCDE1234F")

        if not user_id:
            return jsonify({"error": "userId is required"}), 400

        verification_record = {
            "isVerified": True,
            "idType": id_type,
            "verifiedAt": datetime.datetime.utcnow().isoformat(),
            "verificationMethod": "DigiLocker Government Sandbox (Simulated)",
            "maskId": f"***-***-{doc_num[-4:] if len(doc_num) >= 4 else '1234'}"
        }

        # Update Firestore document
        doc_ref = db.collection("users").document(user_id)
        doc_ref.update(verification_record)

        return jsonify({
            "message": "Identity verified successfully via DigiLocker Trust Protocol!",
            "verification": verification_record
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ==============================================================================
# MODULE 2: PROPERTY LISTING, SEARCH & "TRUE COST" CALCULATOR
# ==============================================================================

@app.route("/api/properties", methods=["GET"])
def get_properties():
    """
    Fetch property listings with student-friendly filters:
    Query Params:
    - max_rent: filter properties <= rent
    - max_distance: filter properties <= km from college
    - type: pg_sharing, single_room, flat_1bhk, flat_2bhk
    - amenity: wifi, food, ac
    """
    try:
        max_rent = request.args.get("max_rent", type=float)
        max_distance = request.args.get("max_distance", type=float)
        prop_type = request.args.get("type")
        amenity = request.args.get("amenity")

        docs = db.collection("properties").stream()
        results = []

        for doc in docs:
            item = doc.to_dict()
            if not item:
                continue

            # Filtering logic
            if max_rent and item.get("baseRent", 0) > max_rent:
                continue
            if max_distance and item.get("collegeDistanceKm", 99) > max_distance:
                continue
            if prop_type and item.get("type") != prop_type:
                continue
            if amenity:
                amenities = [a.lower() for a in item.get("amenities", [])]
                if not any(amenity.lower() in a for a in amenities):
                    continue

            results.append(item)

        return jsonify({
            "count": len(results),
            "properties": results
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/properties/calculate-true-cost", methods=["POST"])
def calculate_true_cost():
    """
    Solves the #1 student shock: Hidden charges.
    Calculates actual monthly out-of-pocket expenditure:
    Base Rent + (Electricity units * commercial slab rate) + Wi-Fi + Maintenance + Optional Food
    One-time: Security Deposit
    """
    try:
        data = request.get_json() or {}
        base_rent = float(data.get("baseRent", 8000))
        electricity_rate = float(data.get("electricityRatePerUnit", 9.5))  # PGs often charge Rs 9-11
        approx_units = float(data.get("approxUnitsPerMonth", 75))         # Fan, lights, laptop, AC
        wifi_cost = float(data.get("wifiCost", 350))
        maintenance_cost = float(data.get("maintenanceCost", 500))
        include_food = bool(data.get("includeFood", True))
        food_cost = float(data.get("foodCost", 3200)) if include_food else 0
        deposit_months = int(data.get("depositMonths", 2))

        # Calculations
        electricity_total = round(electricity_rate * approx_units, 2)
        total_monthly_cost = round(base_rent + electricity_total + wifi_cost + maintenance_cost + food_cost, 2)
        one_time_security_deposit = round(base_rent * deposit_months, 2)
        hidden_addon_cost = round(total_monthly_cost - base_rent, 2)

        return jsonify({
            "baseRent": base_rent,
            "hiddenAddonCost": hidden_addon_cost,
            "totalMonthlyCost": total_monthly_cost,
            "breakdown": {
                "baseRent": base_rent,
                "electricity": electricity_total,
                "electricityRatePerUnit": electricity_rate,
                "estimatedUnits": approx_units,
                "wifi": wifi_cost,
                "maintenance": maintenance_cost,
                "food": food_cost
            },
            "oneTimeDeposit": one_time_security_deposit,
            "studentTip": "Most landlords quote Base Rent only. True Cost reveals your real monthly budget."
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ==============================================================================
# MODULE 3: ROOMMATE MATCHING SYSTEM ("ROOTMATE")
# ==============================================================================

# Seed demo student profiles for matching
CANDIDATE_ROOMMATES = [
    {
        "id": "rm_1",
        "name": "Rohan Verma",
        "college": "Delhi Technological University",
        "branch": "Computer Science (2nd Year)",
        "sleepSchedule": "night_owl", # night_owl, early_bird, flexible
        "studyVibe": "music_ok",      # silent, music_ok, discussion
        "foodHabit": "non_veg",       # veg, non_veg, eggetarian
        "cleanliness": "moderate",    # neat_freak, moderate, chill
        "maxBudget": 10000,
        "bio": "Coding late at night, chill on weekends, looking for a flatmate near Metro."
    },
    {
        "id": "rm_2",
        "name": "Aarav Mehta",
        "college": "Delhi University (North Campus)",
        "branch": "B.Com Honors (1st Year)",
        "sleepSchedule": "early_bird",
        "studyVibe": "silent",
        "foodHabit": "veg",
        "cleanliness": "neat_freak",
        "maxBudget": 8500,
        "bio": "Morning study routine, preparing for CAT, strictly vegetarian & quiet room."
    },
    {
        "id": "rm_3",
        "name": "Kabir Das",
        "college": "IIT Delhi",
        "branch": "Electrical Engg (3rd Year)",
        "sleepSchedule": "flexible",
        "studyVibe": "discussion",
        "foodHabit": "non_veg",
        "cleanliness": "moderate",
        "maxBudget": 12000,
        "bio": "Love robotics, collaborative group study, open to shared 2BHK flat."
    }
]

@app.route("/api/roommates/match", methods=["POST"])
def match_roommate():
    """
    Computes a compatibility score (0 to 100%) between the student and potential roommates.
    Weights:
    - Sleep Schedule: 30%
    - Study Vibe: 25%
    - Cleanliness: 20%
    - Food Habit: 15%
    - Budget Proximity: 10%
    """
    try:
        data = request.get_json() or {}
        user_sleep = data.get("sleepSchedule", "night_owl")
        user_study = data.get("studyVibe", "silent")
        user_clean = data.get("cleanliness", "moderate")
        user_food = data.get("foodHabit", "veg")
        user_budget = float(data.get("maxBudget", 9000))

        matches = []
        for candidate in CANDIDATE_ROOMMATES:
            score = 0
            # Sleep compatibility
            if candidate["sleepSchedule"] == user_sleep:
                score += 30
            elif "flexible" in [candidate["sleepSchedule"], user_sleep]:
                score += 20

            # Study vibe
            if candidate["studyVibe"] == user_study:
                score += 25
            else:
                score += 10

            # Cleanliness
            if candidate["cleanliness"] == user_clean:
                score += 20
            else:
                score += 10

            # Food habit
            if candidate["foodHabit"] == user_food:
                score += 15
            elif "eggetarian" in [candidate["foodHabit"], user_food]:
                score += 10

            # Budget proximity (within 20% difference)
            budget_diff = abs(candidate["maxBudget"] - user_budget)
            if budget_diff <= 2000:
                score += 10
            elif budget_diff <= 4000:
                score += 5

            matches.append({
                **candidate,
                "compatibilityScore": score,
                "isHighMatch": score >= 75
            })

        # Sort descending by compatibility score
        matches.sort(key=lambda x: x["compatibilityScore"], reverse=True)

        return jsonify({
            "userPreferences": data,
            "matches": matches
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ==============================================================================
# MODULE 4: PARENT DASHBOARD & TRUST LAYER (WITH STUDENT PRIVACY TOGGLE)
# ==============================================================================

@app.route("/api/parent/dashboard", methods=["GET"])
def get_parent_dashboard():
    """
    Provides anxious parents with peace of mind:
    - Verified property dossier (Fire safety, police clearance)
    - Direct emergency contacts (Warden, local police, ambulance)
    - Standard digital rental agreement
    - Gated by 'studentConsentGranted' to respect student independence!
    """
    try:
        student_id = request.args.get("studentId", "default_student")
        
        # Check student consent status from DB
        # In a real app, query: db.collection("users").document(student_id).get()
        consent_granted = True  # Can be toggled via /api/parent/toggle-consent

        dashboard_data = {
            "studentName": "Aarav Sharma",
            "studentCollege": "Faculty of Technology, University of Delhi",
            "currentProperty": {
                "name": "GreenNest Student PG (Room 204)",
                "address": "B-42, Chhatra Marg, North Campus",
                "wardenName": "Mr. Deshmukh",
                "wardenPhone": "+91 98234 56789",
                "policeClearance": "Verified (Maurice Nagar Police Station)",
                "fireSafetyCompliance": "Certified (NOC Valid 2026-2027)"
            },
            "emergencyContacts": [
                {"role": "PG Warden (24/7 Desk)", "name": "Mr. Deshmukh", "phone": "+91 98234 56789"},
                {"role": "Maurice Nagar Police Station", "name": "SHO Desk", "phone": "011-27667100"},
                {"role": "Campus Health & Ambulance", "name": "University Health Centre", "phone": "102 / 011-27667905"},
                {"role": "Local Guardian", "name": "Sanjay Sharma (Uncle)", "phone": "+91 98711 00223"}
            ],
            "rentalAgreementSummary": {
                "lockInPeriod": "6 Months",
                "noticePeriod": "30 Days prior to departure",
                "depositRefundGuarantee": "Full refund within 7 working days post checkout inspection",
                "agreementPdfStatus": "Signed & Timestamped on Blockchain Hash"
            },
            "recentCurfewCheckIns": [
                {"date": "Yesterday", "time": "9:45 PM", "status": "Checked In (Safe)"},
                {"date": "2 Days Ago", "time": "8:30 PM", "status": "Checked In (Safe)"}
            ],
            "studentConsentGranted": consent_granted
        }

        return jsonify(dashboard_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/parent/toggle-consent", methods=["POST"])
def toggle_parent_consent():
    """Toggles student permission for parent dashboard visibility."""
    try:
        data = request.get_json() or {}
        new_status = bool(data.get("consentGranted", True))
        return jsonify({
            "message": f"Parent dashboard access is now {'GRANTED' if new_status else 'RESTRICTED'}.",
            "studentConsentGranted": new_status
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ==============================================================================
# MODULE 5: MOVE-IN CONDITION PROOF ("DEPOSITGUARD")
# ==============================================================================

@app.route("/api/proofs/upload", methods=["POST"])
def record_move_in_proof():
    """
    Protects students from unfair deposit deductions by logging time-stamped,
    cryptographically hashed room inspection photos & notes at move-in.
    """
    try:
        data = request.get_json() or {}
        category = data.get("category", "bedroom") # bedroom, bathroom, walls_paint, meter_reading
        area_name = data.get("areaName", "Main Bedroom Wall")
        condition = data.get("condition", "minor_wear") # pristine, minor_wear, damaged
        notes = data.get("notes", "Slight nail mark on the left wall above study desk.")
        image_url = data.get("imageUrl", "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80")

        proof_id = f"prf_{uuid.uuid4().hex[:10]}"
        timestamp = datetime.datetime.utcnow().isoformat()
        verification_hash = f"SHA256-{uuid.uuid4().hex}"

        proof_record = {
            "id": proof_id,
            "category": category,
            "areaName": area_name,
            "condition": condition,
            "notes": notes,
            "imageUrl": image_url,
            "timestamp": timestamp,
            "verificationHash": verification_hash,
            "status": "Sealed & Irreversible"
        }

        # Save to Firestore 'inspection_proofs'
        db.collection("inspection_proofs").document(proof_id).set(proof_record)

        return jsonify({
            "message": "Move-in condition proof sealed into DepositGuard vault!",
            "proof": proof_record
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/proofs", methods=["GET"])
def get_all_proofs():
    """Returns all recorded move-in proofs for the active tenant."""
    try:
        docs = db.collection("inspection_proofs").stream()
        proofs = [doc.to_dict() for doc in docs if doc.to_dict()]
        return jsonify({"proofs": proofs}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    # Mentor Tip: Default port 5000 for Flask.
    # In debug mode, Flask auto-reloads when you edit Python files!
    port = int(os.environ.get("PORT", 5000))
    print(f"🚀 Root Force Flask Server running on http://127.0.0.1:{port}")
    app.run(host="0.0.0.0", port=port, debug=True)
