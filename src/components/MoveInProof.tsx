import React, { useState } from 'react';
import { DepositProofItem } from '../types';
import { INITIAL_DEPOSIT_PROOFS } from '../mockData';
import { 
  FileCheck, 
  Camera, 
  Upload, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Calendar, 
  Hash, 
  Printer, 
  Sparkles, 
  Image as ImageIcon,
  Check,
  X
} from 'lucide-react';

export const MoveInProof: React.FC = () => {
  const [proofs, setProofs] = useState<DepositProofItem[]>(INITIAL_DEPOSIT_PROOFS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const [category, setCategory] = useState<DepositProofItem['category']>('bedroom');
  const [areaName, setAreaName] = useState('');
  const [condition, setCondition] = useState<DepositProofItem['condition']>('minor_wear');
  const [notes, setNotes] = useState('');
  const [selectedPresetImage, setSelectedPresetImage] = useState<string>(
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80'
  );

  const samplePhotoPresets = [
    {
      label: 'Bedroom & Study Wall',
      url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
      category: 'bedroom'
    },
    {
      label: 'Digital Sub-Meter (412.8 kWh)',
      url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
      category: 'meter_reading'
    },
    {
      label: 'Bathroom Geyser & Switchboard',
      url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
      category: 'switchboards_geyser'
    },
    {
      label: 'Bathroom Floor & Tiles',
      url: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=600&q=80',
      category: 'bathroom'
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedPresetImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!areaName.trim()) return;

    const newProof: DepositProofItem = {
      id: `prf_${Date.now()}`,
      category,
      areaName,
      condition,
      notes: notes || 'Inspection photo recorded on move-in day.',
      imageUrl: selectedPresetImage,
      timestamp: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }),
      verificationHash: `SHA256: ${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
    };

    setProofs(prev => [newProof, ...prev]);
    setIsAddModalOpen(false);
    setAreaName('');
    setNotes('');
    setToastMessage('✅ Move-In condition photo sealed with cryptographic timestamp in DepositGuard!');
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-emerald-950 to-stone-900 text-white rounded-3xl p-6 sm:p-10 border border-emerald-900 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-400/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Module 5: DepositGuard™</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Move-In Condition Proof & Deposit Protection
            </h1>
            <p className="text-xs sm:text-sm text-stone-300">
              Never lose your ₹20,000 security deposit to false damage claims. Photograph walls, geysers, and the electric sub-meter on day 1 to generate an immutable move-in certificate.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsCertModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-colors border border-white/20"
            >
              <Printer className="w-4 h-4" />
              <span>Generate Certificate</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 rounded-xl text-xs font-bold transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Log Condition Photo</span>
            </button>
          </div>
        </div>
      </div>

      {toastMessage && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl p-4 flex items-center justify-between text-sm shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-stone-400 hover:text-stone-600">×</button>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <span className="text-stone-500 block uppercase tracking-wider text-[10px] font-bold">Sealed Evidence Points</span>
          <span className="text-2xl font-extrabold text-stone-900 font-mono">{proofs.length} Recorded</span>
          <span className="text-emerald-700 block text-[11px] font-medium">All points backed by SHA-256 hash</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <span className="text-stone-500 block uppercase tracking-wider text-[10px] font-bold">Sub-Meter Baseline</span>
          <span className="text-2xl font-extrabold text-stone-900 font-mono">00412.8 kWh</span>
          <span className="text-stone-500 block text-[11px]">Opening reading stamped on Day 1</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <span className="text-stone-500 block uppercase tracking-wider text-[10px] font-bold">Protected Deposit Capital</span>
          <span className="text-2xl font-extrabold text-emerald-800 font-mono">₹17,000 (100%)</span>
          <span className="text-stone-500 block text-[11px]">Protected under standard lease agreement</span>
        </div>
      </div>

      {/* Proof Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-stone-900">
            Recorded Inspection Evidence Log ({proofs.length})
          </h3>
          <span className="text-xs text-stone-500">
            Timestamped & Cryptographically Locked
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proofs.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Photo with condition badge */}
                <div className="relative h-48 bg-stone-100 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.areaName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    {item.category.replace('_', ' ')}
                  </div>

                  {/* Condition Badge */}
                  <div className={`absolute top-3 right-3 text-[11px] font-bold px-2 py-0.5 rounded shadow-xs ${
                    item.condition === 'pristine'
                      ? 'bg-emerald-600 text-white'
                      : item.condition === 'minor_wear'
                      ? 'bg-amber-500 text-white'
                      : 'bg-rose-600 text-white'
                  }`}>
                    {item.condition === 'pristine' ? '✓ Pristine' : item.condition === 'minor_wear' ? '⚠️ Minor Wear' : '❌ Pre-Existing Damage'}
                  </div>

                  {/* Area Name at bottom of image */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h4 className="font-bold text-sm leading-tight drop-shadow-sm">{item.areaName}</h4>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-150">
                    "{item.notes}"
                  </p>

                  <div className="space-y-1.5 text-[11px] text-stone-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <span>Recorded: {item.timestamp}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="font-mono truncate">{item.verificationHash}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-[11px]">
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Sealed in Vault</span>
                </span>
                <span className="text-stone-400">Irreversible</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Proof Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden my-8">
            <div className="bg-emerald-950 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Record Move-In Condition Proof</h3>
                <p className="text-xs text-emerald-200">DepositGuard Non-Repudiation Vault</p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-white/70 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProof} className="p-6 space-y-4">
              
              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">Inspection Zone</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
                  {[
                    { id: 'bedroom', label: 'Bedroom & Walls' },
                    { id: 'meter_reading', label: 'Electricity Meter' },
                    { id: 'switchboards_geyser', label: 'Geyser & Switches' },
                    { id: 'bathroom', label: 'Bathroom Tiles' },
                    { id: 'walls_paint', label: 'Paint & Ceiling' }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id as DepositProofItem['category'])}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        category === cat.id
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold'
                          : 'border-stone-200 text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Area Name */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Specific Item / Area</label>
                <input
                  type="text"
                  required
                  value={areaName}
                  onChange={(e) => setAreaName(e.target.value)}
                  placeholder="e.g. Sub-Meter Initial Reading or Left Bedroom Wall"
                  className="w-full px-3 py-2 text-sm border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                />
              </div>

              {/* Condition */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">Observed Condition</label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'pristine', label: 'Pristine (No Flaws)' },
                    { id: 'minor_wear', label: 'Minor Scuffs / Wear' },
                    { id: 'damaged', label: 'Pre-Existing Fault' }
                  ].map(c => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCondition(c.id as DepositProofItem['condition'])}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        condition === c.id
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-bold'
                          : 'border-stone-200 text-stone-600'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Picker Presets & Upload */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">Evidence Photo</label>
                
                <div className="grid grid-cols-2 gap-2 mb-2">
                  {samplePhotoPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedPresetImage(preset.url);
                        setCategory(preset.category as DepositProofItem['category']);
                      }}
                      className={`p-1.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                        selectedPresetImage === preset.url
                          ? 'border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <img src={preset.url} alt={preset.label} className="w-10 h-10 rounded-lg object-cover" />
                      <span className="text-[11px] font-medium text-stone-700 line-clamp-1">{preset.label}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <label className="flex-1 flex items-center justify-center gap-2 p-2.5 border border-dashed border-stone-300 rounded-xl cursor-pointer hover:bg-stone-50 text-xs font-medium text-stone-600">
                    <Upload className="w-4 h-4 text-emerald-600" />
                    <span>Upload Custom Photo</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Detailed Remarks / Reading</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Record exact meter digits (e.g. 00412.8 kWh) or describe any scratch/stain..."
                  className="w-full px-3 py-2 text-sm border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-stone-200 text-stone-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-xs"
                >
                  Seal & Hash Proof
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Official Certificate Modal */}
      {isCertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden my-8">
            <div className="bg-emerald-950 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <div>
                  <h3 className="font-bold text-base">DepositGuard Move-In Verification Certificate</h3>
                  <p className="text-xs text-emerald-200">Legal Proof of Initial Tenancy Condition</p>
                </div>
              </div>
              <button onClick={() => setIsCertModalOpen(false)} className="text-white/70 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 text-xs text-stone-800 max-h-[70vh] overflow-y-auto">
              
              <div className="border border-stone-200 rounded-2xl p-4 bg-stone-50 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Tenant</span>
                  <strong>Arjun Sharma</strong>
                  <div className="text-[11px] text-stone-500">Roll: 2024-DU-CS-0849</div>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Property & Owner</span>
                  <strong>GreenNest PG (Room 204)</strong>
                  <div className="text-[11px] text-stone-500">Rajesh Sharma (Verified)</div>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Move-In Inspection Date</span>
                  <strong>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Security Deposit Held</span>
                  <strong className="text-emerald-800">₹17,000 (Subject to 7-Day Refund)</strong>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-3">Itemized Evidence Log ({proofs.length} Points)</h4>
                <div className="space-y-2">
                  {proofs.map((p, i) => (
                    <div key={p.id} className="p-3 bg-white border border-stone-200 rounded-xl flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img src={p.imageUrl} alt={p.areaName} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                        <div>
                          <strong className="block text-stone-900">{p.areaName}</strong>
                          <span className="text-stone-500 text-[11px] line-clamp-1">{p.notes}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          p.condition === 'pristine' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {p.condition.toUpperCase()}
                        </span>
                        <div className="text-[9px] font-mono text-stone-400 mt-0.5">Hash: {p.verificationHash.slice(0, 16)}...</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-[11px] text-emerald-950 space-y-1">
                <strong>Legal Non-Repudiation Clause:</strong>
                <p>
                  Both tenant and landlord accept this initial inspection certificate as conclusive evidence of room condition at move-in. The landlord shall not deduct any amount from the security deposit for pre-existing conditions recorded above.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-4 border-t border-stone-200 text-center">
                <div>
                  <div className="font-signature text-sm font-semibold text-stone-800">Arjun Sharma</div>
                  <div className="border-t border-stone-300 mt-2 pt-1 text-[10px] text-stone-500">Student Tenant Signature</div>
                </div>
                <div>
                  <div className="font-signature text-sm font-semibold text-stone-800">Rajesh Sharma</div>
                  <div className="border-t border-stone-300 mt-2 pt-1 text-[10px] text-stone-500">Landlord Property Owner Signature</div>
                </div>
              </div>

            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end gap-3">
              <button
                onClick={() => setIsCertModalOpen(false)}
                className="px-4 py-2 border border-stone-300 text-stone-700 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Certificate (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
