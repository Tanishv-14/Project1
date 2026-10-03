/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserProfile, UserRole, PropertyListing } from './types';
import { INITIAL_PROPERTIES } from './mockData';
import { Header } from './components/Header';
import { PropertySearch } from './components/PropertySearch';
import { TrueCostCalculator } from './components/TrueCostCalculator';
import { RoommateMatcher } from './components/RoommateMatcher';
import { ParentDashboard } from './components/ParentDashboard';
import { MoveInProof } from './components/MoveInProof';
import { HackathonHub } from './components/HackathonHub';
import { DigiLockerModal } from './components/DigiLockerModal';
import { 
  ShieldCheck, 
  Github, 
  Heart, 
  Code2, 
  Sparkles, 
  Calculator, 
  Users, 
  FileCheck, 
  Building2 
} from 'lucide-react';

export default function App() {
  // Current user state (defaults to an active student with DigiLocker verification demo)
  const [user, setUser] = useState<UserProfile>({
    id: 'usr_student_demo',
    name: 'Arjun Sharma',
    email: 'arjun.sharma@du.ac.in',
    role: 'student',
    college: 'Delhi University (North Campus)',
    phone: '+91 98765 00000',
    isVerified: true,
    idType: 'digilocker_aadhaar',
    verificationDocNumber: '5490-2819-8812',
    verificationDate: '01 Oct 2026',
    parentConsentGranted: true
  });

  const [properties] = useState<PropertyListing[]>(INITIAL_PROPERTIES);
  const [activeTab, setActiveTab] = useState<string>('search');
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState<boolean>(false);
  const [calculatorSelectedProperty, setCalculatorSelectedProperty] = useState<PropertyListing | null>(null);

  const handleUpdateRole = (role: UserRole) => {
    setUser(prev => ({
      ...prev,
      role
    }));

    // Contextual tab switch for natural UX
    if (role === 'parent' && activeTab !== 'parent') {
      setActiveTab('parent');
    }
  };

  const handleVerificationComplete = (updatedProfile: Partial<UserProfile>) => {
    setUser(prev => ({
      ...prev,
      ...updatedProfile
    }));
  };

  const handleToggleConsent = (granted: boolean) => {
    setUser(prev => ({
      ...prev,
      parentConsentGranted: granted
    }));
  };

  const handleOpenCalculatorForProperty = (property: PropertyListing) => {
    setCalculatorSelectedProperty(property);
    setActiveTab('true-cost');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyBudgetToSearch = (maxRent: number) => {
    setActiveTab('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans">
      
      {/* Universal Header with Role Switcher & DigiLocker Status */}
      <Header
        user={user}
        onUpdateRole={handleUpdateRole}
        onOpenVerification={() => setIsVerificationModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Dynamic View Area */}
      <main className="flex-1">
        {activeTab === 'search' && (
          <PropertySearch
            properties={properties}
            user={user}
            onOpenCalculatorForProperty={handleOpenCalculatorForProperty}
            onOpenVerification={() => setIsVerificationModalOpen(true)}
          />
        )}

        {activeTab === 'true-cost' && (
          <TrueCostCalculator
            initialProperty={calculatorSelectedProperty}
            onApplyBudgetToSearch={handleApplyBudgetToSearch}
          />
        )}

        {activeTab === 'roommates' && (
          <RoommateMatcher />
        )}

        {activeTab === 'parent' && (
          <ParentDashboard
            user={user}
            onToggleConsent={handleToggleConsent}
          />
        )}

        {activeTab === 'deposit-guard' && (
          <MoveInProof />
        )}

        {activeTab === 'hackathon' && (
          <HackathonHub />
        )}
      </main>

      {/* DigiLocker & Identity Verification Modal */}
      <DigiLockerModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        user={user}
        onVerificationComplete={handleVerificationComplete}
      />

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 py-10 mt-16 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌿</span>
                <span className="text-lg font-bold text-white tracking-tight">Root Force</span>
                <span className="text-[10px] bg-emerald-900 text-emerald-300 font-semibold px-2 py-0.5 rounded">
                  Hackathon Prototype
                </span>
              </div>
              <p className="text-stone-400 max-w-md leading-relaxed text-xs">
                A student-first rental ecosystem ending predatory security deposit deductions and surprise electricity markups with transparent True Cost formulas, parent trust layers, and roommate matching.
              </p>
              <div className="text-[11px] text-stone-500 font-mono">
                Tech Stack: Python Flask API · Google Firebase Firestore · Modern React & Semantic HTML
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Core Modules</h4>
              <ul className="space-y-1.5 text-stone-400">
                <li><button onClick={() => setActiveTab('search')} className="hover:text-emerald-400">PGs & Direct Search</button></li>
                <li><button onClick={() => setActiveTab('true-cost')} className="hover:text-emerald-400">True Cost Calculator</button></li>
                <li><button onClick={() => setActiveTab('roommates')} className="hover:text-emerald-400">RootMate Algorithm</button></li>
                <li><button onClick={() => setActiveTab('parent')} className="hover:text-emerald-400">Parent Trust & Consent</button></li>
                <li><button onClick={() => setActiveTab('deposit-guard')} className="hover:text-emerald-400">DepositGuard Move-In Proof</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Hackathon Tools</h4>
              <ul className="space-y-1.5 text-stone-400">
                <li><button onClick={() => setActiveTab('hackathon')} className="hover:text-emerald-400">Flask app.py Code</button></li>
                <li><button onClick={() => setActiveTab('hackathon')} className="hover:text-emerald-400">2-Min Judge Pitch Script</button></li>
                <li><button onClick={() => setActiveTab('hackathon')} className="hover:text-emerald-400">Top 5 Judge Q&A Answers</button></li>
                <li><button onClick={() => setIsVerificationModalOpen(true)} className="hover:text-emerald-400">DigiLocker Sandbox</button></li>
              </ul>
            </div>

          </div>

          <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-400">
            <p>Root Force © 2026. Built by First-Year College Hackers for National Hackathons.</p>
            <button
              onClick={() => setActiveTab('hackathon')}
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Inspect Python Flask Backend</span>
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
