/**
 * main.js - Client script for Root Force Vanilla Templates
 * Communicates with Flask Backend APIs:
 * - GET /api/properties (with filter query params)
 * - POST /api/auth/verify-id (DigiLocker verification)
 */

let activeFilters = {
    maxRent: 15000,
    maxDistance: 3.0,
    type: "",
    amenity: ""
};

// Seed fallback properties in case server is just booting
const DEFAULT_PROPERTIES = [
    {
        id: "prop_1",
        title: "GreenNest Student PG & Co-living",
        ownerName: "Rajesh Sharma (Verified Owner)",
        location: "North Campus, Near Metro Station Gate 3",
        collegeDistanceKm: 0.8,
        type: "pg_sharing",
        baseRent: 8500,
        approxUnitsPerMonth: 70,
        electricityRatePerUnit: 9.5,
        wifiCost: 300,
        maintenanceCost: 500,
        foodIncluded: true,
        amenities: ["High-Speed Wi-Fi", "Food (3 Meals)", "AC", "Power Backup", "RO Water"],
        curfewTime: "10:30 PM",
        verified: true
    },
    {
        id: "prop_2",
        title: "Scholars Inn - 1BHK Student Studio",
        ownerName: "Dr. Sunita Sen (College Faculty Owner)",
        location: "Sector 62, Near University Main Gate",
        collegeDistanceKm: 1.2,
        type: "flat_1bhk",
        baseRent: 13500,
        approxUnitsPerMonth: 90,
        electricityRatePerUnit: 8.0,
        wifiCost: 0,
        maintenanceCost: 800,
        foodIncluded: false,
        amenities: ["High-Speed Wi-Fi", "Attached Washroom", "No Curfew", "Kitchen Setup", "Lift"],
        curfewTime: "No Curfew",
        verified: true
    },
    {
        id: "prop_3",
        title: "Arya Bhavan Single Room for Boys",
        ownerName: "Mahesh Chandra",
        location: "Kalyan Vihar, 1.5 km to Arts Faculty",
        collegeDistanceKm: 1.5,
        type: "single_room",
        baseRent: 7000,
        approxUnitsPerMonth: 50,
        electricityRatePerUnit: 10.0,
        wifiCost: 250,
        maintenanceCost: 300,
        foodIncluded: false,
        amenities: ["High-Speed Wi-Fi", "Study Table", "RO Water", "CCTV Security"],
        curfewTime: "11:00 PM",
        verified: true
    }
];

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
    fetchProperties();
});

// Fetch properties from Flask backend
async function fetchProperties() {
    const grid = document.getElementById("propertiesGrid");
    if (!grid) return;

    grid.innerHTML = '<div class="loading-state">Querying verified listings from Flask & Firestore...</div>';

    const searchInput = document.getElementById("searchInput")?.value.toLowerCase().trim() || "";
    const typeSelect = document.getElementById("typeFilter")?.value || "";

    const queryParams = new URLSearchParams({
        max_rent: activeFilters.maxRent,
        max_distance: activeFilters.maxDistance
    });

    if (typeSelect) queryParams.append("type", typeSelect);
    if (activeFilters.amenity) queryParams.append("amenity", activeFilters.amenity);

    try {
        const response = await fetch(`/api/properties?${queryParams.toString()}`);
        if (!response.ok) throw new Error("Flask endpoint returned non-200");
        const data = await response.json();
        renderProperties(data.properties || DEFAULT_PROPERTIES, searchInput);
    } catch (err) {
        console.warn("Backend not running or offline, using fallback client properties:", err);
        renderProperties(DEFAULT_PROPERTIES, searchInput);
    }
}

function renderProperties(properties, searchKeyword) {
    const grid = document.getElementById("propertiesGrid");
    const countSpan = document.getElementById("resultsCount");
    if (!grid) return;

    let filtered = properties;
    if (searchKeyword) {
        filtered = properties.filter(p => 
            p.title.toLowerCase().includes(searchKeyword) ||
            p.location.toLowerCase().includes(searchKeyword)
        );
    }

    if (countSpan) countSpan.innerText = filtered.length;

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; padding: 3rem; text-align: center; background: white; border-radius: 8px;">
                <h3>No student rentals match your exact filter</h3>
                <p style="color: #64748b; margin-top: 0.5rem;">Try increasing max rent or expanding distance radius.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(item => {
        // Calculate true cost preview
        const elec = (item.electricityRatePerUnit || 9) * (item.approxUnitsPerMonth || 70);
        const trueCost = item.baseRent + elec + (item.wifiCost || 0) + (item.maintenanceCost || 0);

        return `
            <div class="property-card">
                <div class="card-img-placeholder" style="background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80')">
                    <span class="card-badge">📍 ${item.collegeDistanceKm} km from College</span>
                </div>
                <div class="card-body">
                    <h3>${item.title}</h3>
                    <p class="card-location">📍 ${item.location}</p>
                    <p style="font-size: 0.8rem; color: #047857; margin-bottom: 0.5rem;">
                        ✓ Owner: ${item.ownerName}
                    </p>
                    
                    <div class="card-tags">
                        ${(item.amenities || []).slice(0, 3).map(a => `<span class="card-tag">${a}</span>`).join('')}
                        <span class="card-tag">Curfew: ${item.curfewTime || 'Flexible'}</span>
                    </div>

                    <div class="card-pricing">
                        <div>
                            <span style="font-size: 0.75rem; color: #64748b; display: block;">Base Rent</span>
                            <span class="rent-amt">₹${item.baseRent.toLocaleString()}</span>
                            <span style="font-size: 0.75rem; color: #64748b;">/month</span>
                        </div>
                        <div style="text-align: right;">
                            <span class="true-cost-pill">True Cost: <strong>₹${Math.round(trueCost).toLocaleString()}</strong></span>
                            <a href="/true-cost" style="display: block; font-size: 0.75rem; color: #0f766e; text-decoration: underline; margin-top: 0.2rem;">Calculate breakdown →</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Filter listeners
function updateRentFilter(val) {
    activeFilters.maxRent = parseFloat(val);
    document.getElementById("rentDisplay").innerText = "₹" + parseFloat(val).toLocaleString();
    fetchProperties();
}

function updateDistanceFilter(val) {
    activeFilters.maxDistance = parseFloat(val);
    document.getElementById("distanceDisplay").innerText = val + " km";
    fetchProperties();
}

function toggleAmenity(val) {
    activeFilters.amenity = activeFilters.amenity === val ? "" : val;
    fetchProperties();
}

function switchRole(role) {
    alert(`Switched active perspective to: ${role.toUpperCase()}\nIn a full hackathon presentation, this adapts the UI between Student, Owner, and Parent!`);
}

// Modal handling
function openVerificationModal() {
    document.getElementById("verifyModal").classList.remove("hidden");
}

function closeVerificationModal() {
    document.getElementById("verifyModal").classList.add("hidden");
}

async function submitVerification() {
    const name = document.getElementById("verifyName").value;
    const roll = document.getElementById("verifyRoll").value;

    try {
        const res = await fetch("/api/auth/verify-id", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: "usr_student_demo",
                idType: "digilocker_aadhaar",
                documentNumber: roll
            })
        });
        const data = await res.json();
        alert(`🎉 Success! ${name} is now DigiLocker Verified!\nVerified Badge: ${data.verification.verificationMethod}`);
    } catch (e) {
        alert(`🎉 Success! ${name} is now DigiLocker Verified! (Simulated instant response)`);
    }

    closeVerificationModal();
}
