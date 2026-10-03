"""
firebase_config.py
===================
Initializes Google Firebase Admin SDK and Firestore client for Root Force.

Mentor Note for First-Year Students:
1. In production or online mode, download your private key file from:
   Firebase Console -> Project Settings -> Service accounts -> Generate new private key.
2. Save it as 'serviceAccountKey.json' in this folder.
3. If no key is present (e.g. offline hackathon room without internet), this file
   smoothly falls back to an in-memory Firestore Mock so your demo never crashes!
"""

import os
import json
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("RootForce-Firebase")

db = None
is_mock_mode = False

# Path to Firebase Admin SDK Credentials JSON
KEY_PATH = os.path.join(os.path.dirname(__file__), "serviceAccountKey.json")

try:
    import firebase_admin
    from firebase_admin import credentials, firestore

    if os.path.exists(KEY_PATH):
        # 1. Real Firebase Connection
        cred = credentials.Certificate(KEY_PATH)
        if not firebase_admin._apps:
            firebase_admin.initialize_app(cred)
        db = firestore.client()
        logger.info(" Connected successfully to real Firebase Firestore!")
    else:
        # Check if environment variable has the JSON string
        firebase_env = os.environ.get("FIREBASE_CREDENTIALS_JSON")
        if firebase_env:
            cred_dict = json.loads(firebase_env)
            cred = credentials.Certificate(cred_dict)
            if not firebase_admin._apps:
                firebase_admin.initialize_app(cred)
            db = firestore.client()
            logger.info(" Connected to Firebase via FIREBASE_CREDENTIALS_JSON env!")
        else:
            raise FileNotFoundError("No serviceAccountKey.json found. Switching to Smart Mock mode for hackathon demo.")

except Exception as e:
    logger.warning(f"⚠️ {e}")
    logger.info(" Activating in-memory Firestore Mock mode. Perfect for offline hackathon presentations!")
    is_mock_mode = True

    # Lightweight in-memory Firestore simulator
    class MockFirestoreDocument:
        def __init__(self, doc_id, data):
            self.id = doc_id
            self._data = data

        def to_dict(self):
            return self._data

    class MockFirestoreCollection:
        def __init__(self, collection_name, storage):
            self.collection_name = collection_name
            self.storage = storage

        def document(self, doc_id=None):
            class DocRef:
                def __init__(self, c_name, d_id, stor):
                    self.c_name = c_name
                    self.d_id = d_id
                    self.stor = stor

                def set(self, data):
                    if self.c_name not in self.stor:
                        self.stor[self.c_name] = {}
                    self.stor[self.c_name][self.d_id] = data
                    return True

                def get(self):
                    data = self.stor.get(self.c_name, {}).get(self.d_id)
                    return MockFirestoreDocument(self.d_id, data) if data else None

                def update(self, updates):
                    if self.c_name in self.stor and self.d_id in self.stor[self.c_name]:
                        self.stor[self.c_name][self.d_id].update(updates)
                    return True

            return DocRef(self.collection_name, doc_id, self.storage)

        def add(self, data):
            import uuid
            doc_id = f"doc_{uuid.uuid4().hex[:8]}"
            if self.collection_name not in self.storage:
                self.storage[self.collection_name] = {}
            self.storage[self.collection_name][doc_id] = data
            return None, MockFirestoreDocument(doc_id, data)

        def stream(self):
            items = self.storage.get(self.collection_name, {})
            return [MockFirestoreDocument(k, v) for k, v in items.items()]

    class MockFirestoreClient:
        def __init__(self):
            self._storage = {}
            self._seed_initial_data()

        def collection(self, name):
            return MockFirestoreCollection(name, self._storage)

        def _seed_initial_data(self):
            # Seed properties for hackathon demo
            self._storage["properties"] = {
                "prop_1": {
                    "id": "prop_1",
                    "title": "GreenNest Student PG & Co-living",
                    "ownerName": "Rajesh Sharma (Verified Owner)",
                    "ownerPhone": "+91 98765 43210",
                    "location": "North Campus, Near Metro Station Gate 3",
                    "collegeDistanceKm": 0.8,
                    "type": "pg_sharing",
                    "baseRent": 8500,
                    "securityDepositMonths": 2,
                    "electricityRatePerUnit": 9.5,
                    "approxUnitsPerMonth": 70,
                    "wifiCost": 300,
                    "maintenanceCost": 500,
                    "foodIncluded": True,
                    "amenities": ["High-Speed Wi-Fi", "Food (3 Meals)", "AC", "Power Backup", "RO Water"],
                    "curfewTime": "10:30 PM",
                    "verified": True,
                    "verifiedDossier": {"policeVerified": True, "fireNoc": True, "agreementStandard": True}
                },
                "prop_2": {
                    "id": "prop_2",
                    "title": "Scholars Inn - 1BHK Student Studio",
                    "ownerName": "Dr. Sunita Sen (College Faculty Owner)",
                    "ownerPhone": "+91 98111 22334",
                    "location": "Sector 62, Near University Main Gate",
                    "collegeDistanceKm": 1.2,
                    "type": "flat_1bhk",
                    "baseRent": 13500,
                    "securityDepositMonths": 1,
                    "electricityRatePerUnit": 8.0,
                    "approxUnitsPerMonth": 90,
                    "wifiCost": 0,
                    "maintenanceCost": 800,
                    "foodIncluded": False,
                    "amenities": ["High-Speed Wi-Fi", "Attached Washroom", "No Curfew", "Kitchen Setup", "Lift"],
                    "curfewTime": "No Curfew",
                    "verified": True,
                    "verifiedDossier": {"policeVerified": True, "fireNoc": True, "agreementStandard": True}
                }
            }

    db = MockFirestoreClient()

def get_db():
    """Returns the active Firestore client (Real or Mock)"""
    return db
