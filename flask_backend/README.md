# Root Force 🌿 - Student-First Rental & Trust Platform
**National-Level Hackathon MVP Package**

Built with:
- **Backend:** Python 3.10+ with Flask
- **Database:** Google Cloud Firebase Firestore
- **Frontend:** Semantic HTML5, CSS3, JavaScript (Vanilla & Modern Web UI)

---

## 💡 The Problem Root Force Solves
Every year, over **12 Million Indian college students** leave their hometowns and face predatory rental practices:
1. **Hidden Costs Trap:** Landlords advertise "₹8,000/month", but charge commercial electricity rates (₹12/unit vs ₹5 domestic), arbitrary Wi-Fi fees, and maintenance, inflating costs by 45%.
2. **Security Deposit Theft:** Students lose up to ₹30,000–₹50,000 upon graduation because landlords fabricate fake damages (e.g. preexisting wall marks).
3. **Parental Anxiety:** Parents 1,000 km away have zero verification on landlord safety, fire compliance, or local emergency wardens.
4. **Roommate Friction:** Incompatible sleep schedules and study habits cause academic distress and mid-semester dropouts.

---

## 🚀 The 5 Core Modules

| Module | What It Does | Key API Endpoint |
|---|---|---|
| **1. Role Auth & DigiLocker Verification** | Student, Owner & Parent roles with simulated DigiLocker/Govt ID verification badges. | `POST /api/auth/register`, `POST /api/auth/verify-id` |
| **2. True Cost Calculator & Search** | Real out-of-pocket monthly breakdown (Base rent + electricity unit slabs + Wi-Fi + food). | `GET /api/properties`, `POST /api/properties/calculate-true-cost` |
| **3. Roommate Matcher ("RootMate")** | 5-parameter compatibility algorithm (Sleep, Study Vibe, Food, Cleanliness, Budget). | `POST /api/roommates/match` |
| **4. Parent Trust Layer** | Police clearance, fire safety verification, emergency contacts, guarded by Student Consent Toggle. | `GET /api/parent/dashboard`, `POST /api/parent/toggle-consent` |
| **5. DepositGuard Move-In Proof** | Time-stamped, SHA256-sealed inspection photos of room conditions to prevent deposit disputes. | `POST /api/proofs/upload`, `GET /api/proofs` |

---

## 🛠️ Step-by-Step Local Setup Guide for First-Year Students

### Step 1: Open Terminal / Command Prompt
Navigate to the `flask_backend` folder:
```bash
cd flask_backend
```

### Step 2: Create a Python Virtual Environment
Creating a virtual environment ensures dependencies don't conflict with your system Python:
```bash
# On macOS / Linux:
python3 -m venv venv
source venv/bin/activate

# On Windows (Command Prompt):
python -m venv venv
venv\Scripts\activate
```

### Step 3: Install Required Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Firebase Firestore Setup (Optional for Demo)
> **Note for Offline Hackathon Rounds:** Root Force includes an **automatic in-memory Firestore Mock**. If you do not have internet or a Google Cloud service key during the offline judging round, the app will run seamlessly without crashing!

To connect your real Firebase project:
1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a project.
2. Under **Project Settings > Service accounts**, click **Generate new private key**.
3. Download the JSON file, rename it to `serviceAccountKey.json`, and place it in the `flask_backend` folder.
4. Enable **Firestore Database** in test mode in your Firebase Console.

### Step 5: Start the Flask Development Server
```bash
python app.py
```
Open your browser and navigate to:
```
http://127.0.0.1:5000
```
Visit `/true-cost` for the interactive True Cost Calculator.

---

## 🎤 Hackathon 2-Minute Pitch Script for Judges

> **"Respected Judges,**  
> Moving to college should be about learning and ambition—not getting scammed by shady brokers and losing a 2-month security deposit.  
> We built **Root Force**, a student-first rental ecosystem with 3 breakthrough pillars:  
> 
> 1. **No More Hidden Charges:** Our **True Cost Engine** factors in commercial electricity slabs and hidden add-ons so students never get a financial shock at month-end.  
> 2. **DepositGuard Proof of Condition:** When moving in, the student logs timestamped, SHA-256 sealed photos of wall marks, switchboards, and the electric meter. At move-out, landlords cannot claim pre-existing damage.  
> 3. **The Parent Trust Layer:** Parents get verified police clearance, warden numbers, and rental agreement summaries—with an ethical **Student Consent Switch** so student autonomy is never compromised.  
>
> Root Force turns an unorganized, predatory ₹1.2 Lakh Crore student rental market into a transparent, verified, and peaceful student experience."

---

## 📁 Project File Structure
```
root-force-backend/
├── app.py                     # Main Flask application with API routes
├── firebase_config.py         # Firebase Admin SDK & Firestore client
├── requirements.txt           # Python dependencies
├── README.md                  # Setup & hackathon guide
├── static/
│   ├── css/
│   │   └── style.css          # Modern clean CSS
│   └── js/
│       └── main.js            # Client-side API queries & filters
└── templates/
    ├── index.html             # Property search & listing UI
    └── true_cost.html         # Interactive True Cost Calculator
```
