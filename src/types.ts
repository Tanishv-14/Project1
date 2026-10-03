export type UserRole = 'student' | 'owner' | 'parent';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  college?: string;
  phone: string;
  isVerified: boolean;
  idType?: 'digilocker_aadhaar' | 'college_id' | 'property_deed' | 'none';
  verificationDocNumber?: string;
  verificationDate?: string;
  avatarUrl?: string;
  parentConsentGranted?: boolean;
}

export interface PropertyListing {
  id: string;
  title: string;
  ownerName: string;
  ownerPhone: string;
  ownerVerified: boolean;
  location: string;
  nearbyCollege: string;
  collegeDistanceKm: number;
  type: 'pg_sharing' | 'single_room' | 'flat_1bhk' | 'flat_2bhk';
  baseRent: number;
  securityDepositMonths: number;
  electricityRatePerUnit: number;
  approxUnitsPerMonth: number;
  wifiCost: number;
  maintenanceCost: number;
  foodOption: {
    available: boolean;
    monthlyCost: number;
    description: string;
  };
  amenities: string[];
  photos: string[];
  curfewTime: string;
  gender: 'boys' | 'girls' | 'unisex';
  rating: number;
  reviewCount: number;
  verifiedDossier: {
    policeVerified: boolean;
    policeStationName: string;
    fireNoc: boolean;
    agreementStandard: boolean;
  };
}

export type SleepSchedule = 'early_bird' | 'night_owl' | 'flexible';
export type StudyVibe = 'silent' | 'music_ok' | 'discussion';
export type FoodHabit = 'veg' | 'non_veg' | 'eggetarian';
export type Cleanliness = 'neat_freak' | 'moderate' | 'chill';

export interface RoommateCandidate {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Any';
  college: string;
  branch: string;
  year: string;
  sleepSchedule: SleepSchedule;
  studyVibe: StudyVibe;
  foodHabit: FoodHabit;
  cleanliness: Cleanliness;
  maxBudget: number;
  preferredLocations: string[];
  hobbies: string[];
  bio: string;
  avatarUrl: string;
  compatibilityScore?: number;
}

export interface DepositProofItem {
  id: string;
  category: 'bedroom' | 'bathroom' | 'walls_paint' | 'switchboards_geyser' | 'meter_reading';
  areaName: string;
  condition: 'pristine' | 'minor_wear' | 'damaged';
  notes: string;
  imageUrl: string;
  timestamp: string;
  verificationHash: string;
}

export interface ParentEmergencyContact {
  role: string;
  name: string;
  phone: string;
  availableHours: string;
  isPrimary?: boolean;
}
