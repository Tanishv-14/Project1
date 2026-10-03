import React, { useState } from 'react';
import { UserProfile } from '../types';
import { ShieldCheck, CheckCircle2, AlertCircle, Lock, X, ArrowRight, Building, FileCheck2 } from 'lucide-react';

interface DigiLockerModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onVerificationComplete: (updatedProfile: Partial<UserProfile>) => void;
}

export const DigiLockerModal: React.FC<DigiLockerModalProps> = ({
  isOpen,
  onClose,
  user,
  onVerificationComplete
}) => {
  const [docType, setDocType] = useState<'digilocker_aadhaar' | 'college_id' | 'property_deed'>('digilocker_aadhaar');
  const [docNumber, setDocNumber] = useState('5490-2819-8812');
  const [fullName, setFullName] = useState(user.name || 'Arjun Sharma');
  const [collegeName, setCollegeName] = useState(user.college || 'Delhi University (North Campus)');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStep, setVerifyStep] = useState(0);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleStartVerification = () => {
    setIsVerifying(true);
    setVerifyStep(1);

    setTimeout(() => {
      setVerifyStep(2);
    }, 800);

    setTimeout(() => {
      setVerifyStep(3);
    }, 1600);

    setTimeout(() => {
      setIsVerifying(false);
      setIsDone(true);
      onVerificationComplete({
        name: fullName,
        college: collegeName,
        isVerified: true,
        idType: docType,
        verificationDocNumber: docNumber,
        verificationDate: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
      });
    }, 2400);
  };

  const handleResetVerification = () => {
    onVerificationComplete({
      isVerified: false,
      idType: 'none',
      verificationDocNumber: undefined,
      verificationDate: undefined
    });
    setIsDone(false);
    setVerifyStep(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 p-5 text-white flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">DigiLocker Trust Sandbox</h3>
              <p className="text-xs text-emerald-200/90 mt-0.5">
                Simulated Government & University Identity Verification
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {user.isVerified && !isVerifying ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 border-4 border-emerald-50">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-stone-900">Your Identity is Fully Verified</h4>
                <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                  Verified via DigiLocker Trust Protocol on {user.verificationDate || 'Today'}. You have zero-brokerage access to verified owners and roommate matching.
                </p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-stone-500">Holder Name:</span>
                  <span className="font-semibold text-stone-900">{user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Document Type:</span>
                  <span className="font-semibold text-stone-900">
                    {user.idType === 'digilocker_aadhaar' ? 'Aadhaar (DigiLocker XML)' : user.idType === 'college_id' ? 'University Enrolment ID' : 'Property Ownership Deed'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Document Mask:</span>
                  <span className="font-mono text-stone-700">XXXX-XXXX-{user.verificationDocNumber?.slice(-4) || '8812'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Status:</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Active & Immutable
                  </span>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={handleResetVerification}
                  className="px-4 py-2 border border-stone-300 text-stone-600 rounded-xl text-xs font-semibold hover:bg-stone-100 transition-colors"
                >
                  Reset Verification
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : isVerifying ? (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              
              <div className="space-y-2">
                <h4 className="text-base font-semibold text-stone-900">
                  {verifyStep === 1 && "Connecting to DigiLocker Sandbox API..."}
                  {verifyStep === 2 && "Matching Aadhaar with University Enrolment Database..."}
                  {verifyStep === 3 && "Issuing Verifiable Root Force Credential..."}
                </h4>
                <p className="text-xs text-stone-500">
                  Step {verifyStep} of 3 · Zero sensitive data stored in plaintext
                </p>
              </div>

              <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden max-w-xs mx-auto">
                <div 
                  className="bg-emerald-600 h-full transition-all duration-500 ease-out"
                  style={{ width: `${(verifyStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 flex items-start gap-2.5 text-xs text-emerald-900">
                <Lock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <p>
                  <strong>Why verify?</strong> Fake broker syndicates list ghost PGs and extort non-refundable visiting fees. Root Force requires dual verification: Students verify enrollment, and Owners verify electricity consumer IDs.
                </p>
              </div>

              {/* Document selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Select Verification Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setDocType('digilocker_aadhaar');
                      setDocNumber('5490-2819-8812');
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all text-xs ${
                      docType === 'digilocker_aadhaar'
                        ? 'border-emerald-600 bg-emerald-50/60 font-semibold text-emerald-950 ring-1 ring-emerald-600'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700'
                    }`}
                  >
                    <div className="font-semibold text-xs mb-0.5">🇮🇳 DigiLocker</div>
                    <div className="text-[10px] text-stone-500">Govt Aadhaar XML</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDocType('college_id');
                      setDocNumber('2024-DU-CS-0849');
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all text-xs ${
                      docType === 'college_id'
                        ? 'border-emerald-600 bg-emerald-50/60 font-semibold text-emerald-950 ring-1 ring-emerald-600'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700'
                    }`}
                  >
                    <div className="font-semibold text-xs mb-0.5">🎓 College Roll</div>
                    <div className="text-[10px] text-stone-500">Student ID / Enrolment</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDocType('property_deed');
                      setDocNumber('ELEC-DELHI-993812');
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all text-xs ${
                      docType === 'property_deed'
                        ? 'border-emerald-600 bg-emerald-50/60 font-semibold text-emerald-950 ring-1 ring-emerald-600'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700'
                    }`}
                  >
                    <div className="font-semibold text-xs mb-0.5">🏠 Owner Deed</div>
                    <div className="text-[10px] text-stone-500">Electricity / CA Number</div>
                  </button>
                </div>
              </div>

              {/* Form fields */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Full Legal Name (as on record)
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                    placeholder="e.g. Arjun Sharma"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {docType === 'property_deed' ? 'Property Address / CA Number' : 'College / University Affiliation'}
                  </label>
                  <input
                    type="text"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                    placeholder="e.g. Delhi University / IIT / DTU"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Document Number (Masked for privacy)
                  </label>
                  <input
                    type="text"
                    value={docNumber}
                    onChange={(e) => setDocNumber(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-mono border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                    placeholder="e.g. 5490-2819-8812"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setFullName("Arjun Sharma");
                    setCollegeName("Delhi University (North Campus)");
                    setDocNumber("5490-2819-8812");
                  }}
                  className="text-xs text-stone-500 hover:text-stone-800 underline underline-offset-2"
                >
                  Load Demo Data
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-stone-200 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleStartVerification}
                    className="flex items-center gap-1.5 px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
                  >
                    <span>Verify with DigiLocker</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
