import React, { useState } from 'react';
import { UserProfile } from '../types';
import { PARENT_EMERGENCY_CONTACTS } from '../mockData';
import { 
  ShieldCheck, 
  ShieldAlert, 
  PhoneCall, 
  FileText, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  AlertCircle, 
  UserCheck, 
  Building2, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Shield
} from 'lucide-react';

interface ParentDashboardProps {
  user: UserProfile;
  onToggleConsent: (granted: boolean) => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  user,
  onToggleConsent
}) => {
  const isConsentGranted = user.parentConsentGranted ?? true;
  const [agreementModalOpen, setAgreementModalOpen] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);

  const handleSimulateEmergencyCall = (contactName: string, number: string) => {
    setAlertSuccess(`Emergency Hotline Connected: Dialing ${contactName} at ${number}...`);
    setTimeout(() => setAlertSuccess(null), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-emerald-950 to-stone-900 text-white rounded-3xl p-6 sm:p-10 border border-emerald-900/60 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-400/30">
              <Shield className="w-3.5 h-3.5" />
              <span>Module 4: Parent Trust Layer</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Guardian Portal & Verified Campus Safety
            </h1>
            <p className="text-xs sm:text-sm text-stone-300">
              Designed for families sending students away to university. Verify the landlord's police clearance, access 24/7 warden contacts, and review fair rental terms.
            </p>
          </div>

          {/* Student Consent Toggle Switch */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shrink-0 self-start md:self-auto text-xs space-y-2">
            <div className="flex items-center justify-between gap-4">
              <span className="font-bold text-stone-200">Student Consent Protocol:</span>
              <button
                onClick={() => onToggleConsent(!isConsentGranted)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isConsentGranted ? 'bg-emerald-500' : 'bg-stone-600'
                }`}
                title="Toggle student consent for parent visibility"
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isConsentGranted ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-300">
              {isConsentGranted ? (
                <>
                  <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Access: Active (Granted by Student)</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-300">Access: Privacy Restricted</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {alertSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl p-4 flex items-center justify-between text-sm shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{alertSuccess}</span>
          </div>
          <button onClick={() => setAlertSuccess(null)} className="text-stone-400 hover:text-stone-600">×</button>
        </div>
      )}

      {/* Main content or Restricted View */}
      {!isConsentGranted ? (
        <div className="bg-white rounded-3xl p-10 border border-stone-200 text-center max-w-2xl mx-auto shadow-xs space-y-4">
          <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-stone-900">Student Privacy Shield Active</h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            Your student (<strong>Arjun Sharma</strong>) has toggled the detailed hostel check-in and agreement telemetry to "Restricted" to maintain university independence.
          </p>
          <div className="p-4 bg-stone-50 rounded-2xl text-xs text-stone-700 text-left border border-stone-200 space-y-2">
            <span className="font-bold text-stone-900 block">🛡️ Emergency Safety Hotlines Always Remain Active:</span>
            <p className="text-stone-600">
              Even in restricted mode, parents can instantly reach the 24/7 PG Warden, the nearest police post, and the campus ambulance service shown below.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={() => onToggleConsent(true)}
              className="text-xs text-emerald-700 underline font-semibold"
            >
              Simulate Student Granting Consent
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Student & Accommodation Dossier (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Student & Stay Overview */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-emerald-700" />
                  <h3 className="font-bold text-stone-900 text-base">Registered Student & Housing Profile</h3>
                </div>
                <span className="text-xs bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-1 rounded-lg border border-emerald-200">
                  Verified Resident
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-150 space-y-1">
                  <span className="text-stone-500 block">Student Name & College:</span>
                  <strong className="text-sm font-bold text-stone-900 block">Arjun Sharma (1st Year)</strong>
                  <span className="text-stone-600">Faculty of Technology, Delhi University</span>
                </div>

                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-150 space-y-1">
                  <span className="text-stone-500 block">Current Accommodation:</span>
                  <strong className="text-sm font-bold text-stone-900 block">GreenNest Student PG (Room 204)</strong>
                  <span className="text-stone-600">Chhatra Marg, North Campus (0.6 km to Faculty)</span>
                </div>
              </div>

              {/* Safety & Legal Verification Seals */}
              <div className="border border-emerald-200 bg-emerald-50/50 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  <span>Verified Legal, Safety & Municipal Clearances</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-emerald-100 space-y-1">
                    <span className="text-stone-500 block text-[11px]">Police Verification:</span>
                    <strong className="text-emerald-800 font-bold block">Maurice Nagar Station</strong>
                    <span className="text-[10px] text-stone-500">Record #MNP-2026/89 Clear</span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-emerald-100 space-y-1">
                    <span className="text-stone-500 block text-[11px]">Fire Safety NOC:</span>
                    <strong className="text-emerald-800 font-bold block">Certified & Inspected</strong>
                    <span className="text-[10px] text-stone-500">Extinguishers & Fire Exit OK</span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-emerald-100 space-y-1">
                    <span className="text-stone-500 block text-[11px]">Security Infrastructure:</span>
                    <strong className="text-emerald-800 font-bold block">24/7 Biometric Entry</strong>
                    <span className="text-[10px] text-stone-500">HD CCTV in Common Areas</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Tenancy Agreement Plain English Summary */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-700" />
                  <h3 className="font-bold text-stone-900 text-base">Standardized Tenancy Agreement</h3>
                </div>
                <button
                  onClick={() => setAgreementModalOpen(true)}
                  className="text-xs text-emerald-700 hover:underline font-semibold flex items-center gap-1"
                >
                  <span>View Full Agreement</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                Root Force replaces 15-page predatory landlord contracts with an equitable, standard academic agreement approved by student legal aid councils.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
                  <span className="text-stone-500 block text-[11px]">Lock-In Commitment:</span>
                  <strong className="text-stone-900 font-bold block text-sm">6 Months</strong>
                  <span className="text-[10px] text-stone-500">Standard semester duration</span>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
                  <span className="text-stone-500 block text-[11px]">Departure Notice:</span>
                  <strong className="text-stone-900 font-bold block text-sm">30 Days</strong>
                  <span className="text-[10px] text-stone-500">Written notice via app</span>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
                  <span className="text-stone-500 block text-[11px]">Deposit Refund Guarantee:</span>
                  <strong className="text-emerald-800 font-bold block text-sm">7 Working Days</strong>
                  <span className="text-[10px] text-stone-500">Post DepositGuard checkout</span>
                </div>
              </div>
            </div>

            {/* Recent Safe Check-In Log */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-3">
              <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-700" />
                <span>Hostel Night Check-In Log (Simulated)</span>
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="font-semibold text-stone-800">Biometric Gate Check-In</span>
                  </div>
                  <span className="text-stone-500">Yesterday at 9:45 PM (Safe)</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="font-semibold text-stone-800">Biometric Gate Check-In</span>
                  </div>
                  <span className="text-stone-500">2 Days Ago at 8:30 PM (Safe)</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 24/7 Emergency Speed-Dial Contacts (1 col) */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                <PhoneCall className="w-5 h-5 text-emerald-700" />
                <div>
                  <h3 className="font-bold text-stone-900 text-sm">Verified Emergency Contacts</h3>
                  <p className="text-[11px] text-stone-500">One-tap direct dial for parents</p>
                </div>
              </div>

              <div className="space-y-3">
                {PARENT_EMERGENCY_CONTACTS.map((contact, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-stone-50 hover:bg-stone-100/80 rounded-2xl border border-stone-200 transition-colors space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-emerald-800 block">
                          {contact.role}
                        </span>
                        <strong className="text-sm text-stone-900 block font-semibold">{contact.name}</strong>
                      </div>
                      <span className="text-[10px] bg-stone-200/70 text-stone-700 px-2 py-0.5 rounded-md font-mono">
                        {contact.availableHours}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-mono text-stone-600">{contact.phone}</span>
                      <button
                        onClick={() => handleSimulateEmergencyCall(contact.name, contact.phone)}
                        className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>Call</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Parent Safety Assurance */}
            <div className="bg-emerald-900 text-white rounded-3xl p-6 shadow-md space-y-3 text-xs">
              <h4 className="font-bold text-sm text-emerald-200">The Root Force Parent Promise</h4>
              <p className="text-emerald-100/90 leading-relaxed text-[11px]">
                No student should ever be isolated in a distant city. Our network gives parents a direct legal line of contact to wardens and university liaisons without violating student dignity.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Tenancy Agreement Modal */}
      {agreementModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-stone-200 overflow-hidden">
            <div className="bg-emerald-950 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base">Standard Academic Rental Agreement (Model Form)</h3>
              </div>
              <button onClick={() => setAgreementModalOpen(false)} className="text-white/70 hover:text-white">
                ×
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-stone-700 max-h-[60vh] overflow-y-auto">
              <div className="p-3 bg-stone-50 rounded-xl space-y-1 font-mono text-[11px]">
                <div>Landlord: Rajesh Sharma (Verified Owner #DL-2024-912)</div>
                <div>Tenant: Arjun Sharma (Enrolment #2024-DU-CS-0849)</div>
                <div>Premises: Room 204, GreenNest PG, Chhatra Marg, North Campus</div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-stone-900 text-sm">Key Transparent Clauses:</h4>
                <ol className="list-decimal pl-4 space-y-2">
                  <li><strong>Security Deposit Protection:</strong> Landlord agrees that security deposit deductions are strictly prohibited unless matched with verified move-in condition records in Root Force DepositGuard.</li>
                  <li><strong>Electricity Transparency:</strong> Landlord agrees to bill electricity at the agreed slab rate of ₹9.5/unit based strictly on sub-meter opening and closing logs.</li>
                  <li><strong>Notice & Vacating:</strong> Either party may terminate with 30 calendar days notice after completion of the 6-month semester lock-in. Full deposit refund shall be credited within 7 business days.</li>
                </ol>
              </div>

              <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 text-[11px]">
                ✓ Cryptographically Sealed & Validated under Information Technology Act, 2000.
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setAgreementModalOpen(false)}
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold"
              >
                Close Agreement
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
