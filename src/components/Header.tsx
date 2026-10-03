import React from 'react';
import { UserProfile, UserRole } from '../types';
import { ShieldCheck, ShieldAlert, GraduationCap, Home, Users, Calculator, FileCheck, Code2, Sparkles, Building2 } from 'lucide-react';

interface HeaderProps {
  user: UserProfile;
  onUpdateRole: (role: UserRole) => void;
  onOpenVerification: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onUpdateRole,
  onOpenVerification,
  activeTab,
  setActiveTab
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top micro-banner for Hackathon judges & mentor status */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium">National Hackathon MVP Prototype</span>
            <span className="text-emerald-400 hidden sm:inline">·</span>
            <span className="text-emerald-300/80 hidden sm:inline">Stack: Python Flask + Firebase Firestore + Modern Responsive UI</span>
          </div>
          <button 
            onClick={() => setActiveTab('hackathon')}
            className="flex items-center gap-1.5 text-emerald-300 hover:text-white font-medium transition-colors"
          >
            <Code2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>View Flask Code & Judge Pitch Hub</span>
            <span className="text-xs bg-emerald-800/80 text-emerald-200 px-1.5 py-0.2 rounded">Instant</span>
          </button>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('search')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-sm shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <span className="text-xl">🌿</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-stone-900 font-sans">Root Force</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">
                  Student-First
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium -mt-0.5 hidden sm:block">
                Transparent Housing & Trust Protocol
              </p>
            </div>
          </div>

          {/* Central Nav Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'search' 
                  ? 'bg-stone-100 text-stone-900 font-semibold' 
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>Explore PGs & Rooms</span>
            </button>

            <button
              onClick={() => setActiveTab('true-cost')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'true-cost' 
                  ? 'bg-stone-100 text-stone-900 font-semibold' 
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>True Cost Calculator</span>
            </button>

            <button
              onClick={() => setActiveTab('roommates')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'roommates' 
                  ? 'bg-stone-100 text-stone-900 font-semibold' 
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Roommates</span>
            </button>

            <button
              onClick={() => setActiveTab('parent')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'parent' 
                  ? 'bg-stone-100 text-stone-900 font-semibold' 
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Parent Trust</span>
            </button>

            <button
              onClick={() => setActiveTab('deposit-guard')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'deposit-guard' 
                  ? 'bg-stone-100 text-stone-900 font-semibold' 
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>DepositGuard</span>
            </button>
          </nav>

          {/* Right Action Cluster: Role Switcher & DigiLocker Status */}
          <div className="flex items-center gap-2.5">
            {/* Role Switcher Pill */}
            <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl border border-stone-200">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider pl-1.5 hidden lg:inline">
                Role:
              </span>
              <div className="flex text-xs font-medium">
                <button
                  onClick={() => onUpdateRole('student')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    user.role === 'student'
                      ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title="Switch to Student view"
                >
                  🎓 Student
                </button>
                <button
                  onClick={() => onUpdateRole('owner')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    user.role === 'owner'
                      ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title="Switch to Property Owner view"
                >
                  🏠 Owner
                </button>
                <button
                  onClick={() => onUpdateRole('parent')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    user.role === 'parent'
                      ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title="Switch to Parent view"
                >
                  🛡️ Parent
                </button>
              </div>
            </div>

            {/* DigiLocker Verification Badge / Button */}
            {user.isVerified ? (
              <button
                onClick={onOpenVerification}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-semibold transition-colors"
                title="Verified via DigiLocker Government ID Sandbox"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline">DigiLocker Verified</span>
                <span className="sm:hidden">Verified</span>
              </button>
            ) : (
              <button
                onClick={onOpenVerification}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 rounded-xl text-xs font-semibold transition-colors animate-pulse"
                title="Click to simulate ID verification"
              >
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Verify ID</span>
              </button>
            )}

            {/* Mobile Tab menu quick button */}
            <button
              onClick={() => setActiveTab('hackathon')}
              className="md:hidden p-2 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200"
              title="Hackathon Code"
            >
              <Code2 className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Mobile Subnav */}
        <div className="md:hidden flex items-center justify-between border-t border-stone-200/80 py-2 overflow-x-auto gap-2 text-xs font-medium no-scrollbar">
          <button
            onClick={() => setActiveTab('search')}
            className={`px-2.5 py-1 rounded-md shrink-0 ${activeTab === 'search' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-stone-600'}`}
          >
            Rooms & PGs
          </button>
          <button
            onClick={() => setActiveTab('true-cost')}
            className={`px-2.5 py-1 rounded-md shrink-0 ${activeTab === 'true-cost' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-stone-600'}`}
          >
            True Cost
          </button>
          <button
            onClick={() => setActiveTab('roommates')}
            className={`px-2.5 py-1 rounded-md shrink-0 ${activeTab === 'roommates' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-stone-600'}`}
          >
            Roommates
          </button>
          <button
            onClick={() => setActiveTab('parent')}
            className={`px-2.5 py-1 rounded-md shrink-0 ${activeTab === 'parent' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-stone-600'}`}
          >
            Parent Trust
          </button>
          <button
            onClick={() => setActiveTab('deposit-guard')}
            className={`px-2.5 py-1 rounded-md shrink-0 ${activeTab === 'deposit-guard' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-stone-600'}`}
          >
            DepositGuard
          </button>
          <button
            onClick={() => setActiveTab('hackathon')}
            className={`px-2.5 py-1 rounded-md shrink-0 ${activeTab === 'hackathon' ? 'bg-emerald-900 text-emerald-200 font-semibold' : 'text-stone-600'}`}
          >
            Flask Code Hub
          </button>
        </div>

      </div>
    </header>
  );
};
