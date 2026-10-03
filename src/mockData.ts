import { PropertyListing, RoommateCandidate, DepositProofItem, ParentEmergencyContact } from './types';

export const INITIAL_PROPERTIES: PropertyListing[] = [
  {
    id: 'prop_1',
    title: 'GreenNest Student PG & Co-living',
    ownerName: 'Rajesh Sharma',
    ownerPhone: '+91 98765 43210',
    ownerVerified: true,
    location: 'Chhatra Marg, North Campus',
    nearbyCollege: 'Delhi University (North Campus)',
    collegeDistanceKm: 0.6,
    type: 'pg_sharing',
    baseRent: 8500,
    securityDepositMonths: 2,
    electricityRatePerUnit: 9.5,
    approxUnitsPerMonth: 70,
    wifiCost: 300,
    maintenanceCost: 500,
    foodOption: {
      available: true,
      monthlyCost: 3200,
      description: '3 Meals Daily (Breakfast, Lunch, Dinner) + Evening Chai'
    },
    amenities: ['High-Speed Wi-Fi', 'Food Included', 'AC & Geyser', 'Power Backup', 'RO Water Purifier', 'Biometric Entry', 'Daily Housekeeping'],
    photos: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'
    ],
    curfewTime: '10:30 PM',
    gender: 'unisex',
    rating: 4.8,
    reviewCount: 38,
    verifiedDossier: {
      policeVerified: true,
      policeStationName: 'Maurice Nagar Police Station (Clearance #MNP-2026/89)',
      fireNoc: true,
      agreementStandard: true
    }
  },
  {
    id: 'prop_2',
    title: 'Scholars Studio - Independent 1BHK Student Flat',
    ownerName: 'Dr. Sunita Sen (Faculty)',
    ownerPhone: '+91 98111 22334',
    ownerVerified: true,
    location: 'Sector 62, Near Metro Station',
    nearbyCollege: 'Tech Campus & Engineering College',
    collegeDistanceKm: 1.1,
    type: 'flat_1bhk',
    baseRent: 13500,
    securityDepositMonths: 1,
    electricityRatePerUnit: 8.0,
    approxUnitsPerMonth: 95,
    wifiCost: 0,
    maintenanceCost: 800,
    foodOption: {
      available: false,
      monthlyCost: 0,
      description: 'Private Modular Kitchen provided with piped gas'
    },
    amenities: ['High-Speed Wi-Fi', 'Private Balcony', 'Modular Kitchen', 'No Curfew', 'Lift Access', 'CCTV Security', 'Dedicated Study Desk'],
    photos: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
    ],
    curfewTime: 'No Curfew (24/7 Gate Access)',
    gender: 'unisex',
    rating: 4.9,
    reviewCount: 22,
    verifiedDossier: {
      policeVerified: true,
      policeStationName: 'Sector 62 Police Post (Clearance #SP-1102)',
      fireNoc: true,
      agreementStandard: true
    }
  },
  {
    id: 'prop_3',
    title: 'Arya Bhavan - Premium Single Student Room',
    ownerName: 'Mahesh Chandra Gupta',
    ownerPhone: '+91 94123 78901',
    ownerVerified: true,
    location: 'Kalyan Vihar, Near Arts Faculty',
    nearbyCollege: 'Delhi University / Law Faculty',
    collegeDistanceKm: 1.4,
    type: 'single_room',
    baseRent: 7200,
    securityDepositMonths: 1,
    electricityRatePerUnit: 9.0,
    approxUnitsPerMonth: 55,
    wifiCost: 250,
    maintenanceCost: 350,
    foodOption: {
      available: true,
      monthlyCost: 2800,
      description: 'Home-style Vegetarian North Indian Meals'
    },
    amenities: ['High-Speed Wi-Fi', 'Attached Washroom', 'Single Bed & Spring Mattress', 'Wardrobe & Bookshelf', 'Water Dispenser'],
    photos: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
    ],
    curfewTime: '11:00 PM',
    gender: 'boys',
    rating: 4.6,
    reviewCount: 19,
    verifiedDossier: {
      policeVerified: true,
      policeStationName: 'Roop Nagar Police Station',
      fireNoc: true,
      agreementStandard: true
    }
  },
  {
    id: 'prop_4',
    title: 'Koramangala 2BHK Shared Apartment for Coders',
    ownerName: 'Vikramaditya Rao',
    ownerPhone: '+91 97400 55667',
    ownerVerified: true,
    location: '5th Block, Koramangala',
    nearbyCollege: 'St. Josephs & Tech Hubs',
    collegeDistanceKm: 2.2,
    type: 'flat_2bhk',
    baseRent: 11000,
    securityDepositMonths: 2,
    electricityRatePerUnit: 7.5,
    approxUnitsPerMonth: 110,
    wifiCost: 400,
    maintenanceCost: 600,
    foodOption: {
      available: false,
      monthlyCost: 0,
      description: 'Self cooking kitchen or nearby cook service'
    },
    amenities: ['Gigabit 300 Mbps Wi-Fi', 'Washing Machine', 'Refrigerator', 'No Curfew', 'Gym Access', 'Covered Bike Parking'],
    photos: [
      'https://images.unsplash.com/photo-1502005229762-ee152da7c5d6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80'
    ],
    curfewTime: 'No Curfew',
    gender: 'unisex',
    rating: 4.7,
    reviewCount: 45,
    verifiedDossier: {
      policeVerified: true,
      policeStationName: 'Koramangala Police Station (#KM-2026/4)',
      fireNoc: true,
      agreementStandard: true
    }
  }
];

export const INITIAL_ROOMMATES: RoommateCandidate[] = [
  {
    id: 'rm_1',
    name: 'Rohan Verma',
    age: 19,
    gender: 'Male',
    college: 'Delhi Technological University (DTU)',
    branch: 'B.Tech Computer Engineering',
    year: '2nd Year',
    sleepSchedule: 'night_owl',
    studyVibe: 'music_ok',
    foodHabit: 'non_veg',
    cleanliness: 'moderate',
    maxBudget: 9500,
    preferredLocations: ['North Campus', 'Rohini Sector 16', 'Civil Lines'],
    hobbies: ['Web Development', 'Valorant', 'Guitar', 'Coffee Brewing'],
    bio: 'Coding late at night with lofi beats. Looking for a chilled flatmate to split rent and keep kitchen clean on weekends.',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'rm_2',
    name: 'Aarav Mehta',
    age: 18,
    gender: 'Male',
    college: 'SRCC, Delhi University',
    branch: 'B.Com (Honours)',
    year: '1st Year',
    sleepSchedule: 'early_bird',
    studyVibe: 'silent',
    foodHabit: 'veg',
    cleanliness: 'neat_freak',
    maxBudget: 8500,
    preferredLocations: ['Kamla Nagar', 'Roop Nagar', 'North Campus'],
    hobbies: ['Finance & Stocks', 'Badminton', 'Reading Non-Fiction'],
    bio: 'Strict early riser (up at 6:30 AM). Keep the room spotless and prefer pin-drop quiet environment during exam weeks.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'rm_3',
    name: 'Ananya Iyer',
    age: 20,
    gender: 'Female',
    college: 'Lady Shri Ram College / South Campus',
    branch: 'Economics & Statistics',
    year: '2nd Year',
    sleepSchedule: 'flexible',
    studyVibe: 'discussion',
    foodHabit: 'eggetarian',
    cleanliness: 'moderate',
    maxBudget: 11000,
    preferredLocations: ['Lajpat Nagar', 'Kailash Colony', 'Hauz Khas'],
    hobbies: ['Debating', 'Podcasts', 'Baking', 'Yoga'],
    bio: 'Loves discussing case studies and policy. Respectful of personal boundaries and looking for a friendly shared flatmate.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'rm_4',
    name: 'Kabir Dasgupta',
    age: 21,
    gender: 'Male',
    college: 'IIT Delhi',
    branch: 'Electrical Engineering',
    year: '3rd Year',
    sleepSchedule: 'night_owl',
    studyVibe: 'discussion',
    foodHabit: 'non_veg',
    cleanliness: 'chill',
    maxBudget: 12500,
    preferredLocations: ['Hauz Khas', 'Green Park', 'Safdarjung'],
    hobbies: ['Robotics', 'Indie Rock', 'Chess', 'Late night tea runs'],
    bio: 'Hardware nerd building drone prototypes. Down for sharing a 2BHK flat where we can set up collaborative study desks.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  }
];

export const INITIAL_DEPOSIT_PROOFS: DepositProofItem[] = [
  {
    id: 'prf_1',
    category: 'bedroom',
    areaName: 'Study Desk & Left Wall',
    condition: 'minor_wear',
    notes: '2 small nail holes and 5cm surface scuff mark behind study chair before move-in. Landlord informed.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    timestamp: '2026-10-01 11:34 AM',
    verificationHash: 'SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069'
  },
  {
    id: 'prf_2',
    category: 'meter_reading',
    areaName: 'Digital Sub-Meter Display',
    condition: 'pristine',
    notes: 'Move-in initial reading stamped at exactly 00412.8 kWh. Any electricity billing starts from this reading.',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    timestamp: '2026-10-01 11:42 AM',
    verificationHash: 'SHA256: 9b2d354a5c0b11e25e9e03f0b2f15e8b0a9f1c7d2e3f4a5b6c7d8e9f0a1b2c3d'
  },
  {
    id: 'prf_3',
    category: 'switchboards_geyser',
    areaName: 'Bathroom Geyser & MCB Switchboard',
    condition: 'minor_wear',
    notes: 'Geyser indicator light working properly; switchboard faceplate has slight paint discoloration from previous tenant.',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    timestamp: '2026-10-01 11:50 AM',
    verificationHash: 'SHA256: 3e8b1c4d7f2a0e5b9c1d6f8a3b5c7e9f2a4b6c8d0e1f3a5b7c9d1e3f5a7b9c1d'
  }
];

export const PARENT_EMERGENCY_CONTACTS: ParentEmergencyContact[] = [
  {
    role: 'PG Head Warden (24/7 Desk)',
    name: 'Mr. Deshmukh',
    phone: '+91 98234 56789',
    availableHours: '24 Hours / 7 Days',
    isPrimary: true
  },
  {
    role: 'Nearest Police Station',
    name: 'Maurice Nagar SHO Desk',
    phone: '011-27667100',
    availableHours: 'Emergency 24x7',
    isPrimary: true
  },
  {
    role: 'Campus Health Centre & Ambulance',
    name: 'University Health Clinic',
    phone: '011-27667905 / 102',
    availableHours: '24x7 Rapid Medical',
    isPrimary: false
  },
  {
    role: 'Registered Local Guardian',
    name: 'Sanjay Sharma (Uncle)',
    phone: '+91 98711 00223',
    availableHours: '8:00 AM - 10:00 PM',
    isPrimary: false
  }
];
