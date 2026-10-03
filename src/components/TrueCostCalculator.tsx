import React, { useState, useEffect } from 'react';
import { PropertyListing } from '../types';
import { 
  Calculator, 
  Zap, 
  Wifi, 
  Wrench, 
  Utensils, 
  ShieldAlert, 
  Download, 
  Copy, 
  Check, 
  Info,
  DollarSign,
  Flame,
  ArrowRight
} from 'lucide-react';

interface TrueCostCalculatorProps {
  initialProperty?: PropertyListing | null;
  onApplyBudgetToSearch: (maxRent: number) => void;
}

export const TrueCostCalculator: React.FC<TrueCostCalculatorProps> = ({
  initialProperty,
  onApplyBudgetToSearch
}) => {
  const [baseRent, setBaseRent] = useState<number>(initialProperty?.baseRent || 8500);
  const [elecRate, setElecRate] = useState<number>(initialProperty?.electricityRatePerUnit || 9.5);
  const [units, setUnits] = useState<number>(initialProperty?.approxUnitsPerMonth || 75);
  const [wifi, setWifi] = useState<number>(initialProperty?.wifiCost ?? 350);
  const [maintenance, setMaintenance] = useState<number>(initialProperty?.maintenanceCost ?? 500);
  const [includeFood, setIncludeFood] = useState<boolean>(initialProperty?.foodOption.available ?? true);
  const [foodCost, setFoodCost] = useState<number>(initialProperty?.foodOption.monthlyCost || 3200);
  const [depositMonths, setDepositMonths] = useState<number>(initialProperty?.securityDepositMonths || 2);
  const [copied, setCopied] = useState<boolean>(false);

  // Sync when initial property changes
  useEffect(() => {
    if (initialProperty) {
      setBaseRent(initialProperty.baseRent);
      setElecRate(initialProperty.electricityRatePerUnit);
      setUnits(initialProperty.approxUnitsPerMonth);
      setWifi(initialProperty.wifiCost);
      setMaintenance(initialProperty.maintenanceCost);
      setIncludeFood(initialProperty.foodOption.available);
      setFoodCost(initialProperty.foodOption.monthlyCost || 3200);
      setDepositMonths(initialProperty.securityDepositMonths);
    }
  }, [initialProperty]);

  // Calculations
  const elecTotal = Math.round(elecRate * units);
  const currentFood = includeFood ? foodCost : 0;
  const recurringMonthlyCost = baseRent + elecTotal + wifi + maintenance + currentFood;
  const hiddenCostAddon = recurringMonthlyCost - baseRent;
  const securityDepositAmount = baseRent * depositMonths;
  const moveInDayTotal = recurringMonthlyCost + securityDepositAmount;

  const handleCopySummary = () => {
    const text = `Root Force True Cost Report:
- Base Quoted Rent: ₹${baseRent.toLocaleString()}
- Electricity (${units} units @ ₹${elecRate}): ₹${elecTotal.toLocaleString()}
- High-Speed Wi-Fi: ₹${wifi}
- Maintenance & Water: ₹${maintenance}
- Meals / Mess: ${includeFood ? `₹${foodCost}` : 'Not included'}
-------------------------
REAL MONTHLY COST: ₹${recurringMonthlyCost.toLocaleString()} (+₹${hiddenCostAddon.toLocaleString()} in add-ons)
One-Time Security Deposit: ₹${securityDepositAmount.toLocaleString()} (${depositMonths} Months)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
          <Calculator className="w-3.5 h-3.5" />
          <span>Financial Transparency Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          The Student "True Cost" Calculator
        </h1>
        <p className="text-sm sm:text-base text-stone-600">
          Landlords advertise "₹8,000/month", but students get shocked when the invoice arrives at ₹13,500 due to commercial electricity markups, Wi-Fi fees, and maintenance. See the unvarnished reality before signing.
        </p>
      </div>

      {initialProperty && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 flex items-center justify-between text-xs text-emerald-900 max-w-4xl mx-auto">
          <div>
            <span>Loaded property parameters for: </span>
            <strong className="font-semibold text-emerald-950">{initialProperty.title}</strong>
          </div>
          <button
            onClick={() => {
              setBaseRent(8500);
              setElecRate(9.5);
              setUnits(75);
              setWifi(350);
              setMaintenance(500);
              setIncludeFood(true);
              setDepositMonths(2);
            }}
            className="text-emerald-700 underline font-semibold hover:text-emerald-800"
          >
            Reset to Standard Averages
          </button>
        </div>
      )}

      {/* Main Grid: Inputs vs Calculation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
        
        {/* Left: Input Controls (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <span>Rental Expense Parameters</span>
            </h3>
            <span className="text-xs text-stone-400">Live Adjustment</span>
          </div>

          {/* Base Rent */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-stone-700">Advertised Base Room Rent</label>
              <span className="font-extrabold text-base text-stone-900 font-mono">₹{baseRent.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={3000}
              max={30000}
              step={500}
              value={baseRent}
              onChange={(e) => setBaseRent(Number(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400">
              <span>₹3,000 (Sharing)</span>
              <span>₹15,000 (1BHK)</span>
              <span>₹30,000 (Luxury Studio)</span>
            </div>
          </div>

          {/* Electricity Slab & Usage */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Sub-Meter Electricity Slabs</span>
              </span>
              <span className="text-xs font-bold text-amber-800 font-mono">₹{elecTotal.toLocaleString()} / mo</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-600">Rate Charged per Unit:</span>
                <span className="font-bold text-stone-900 font-mono">₹{elecRate} / unit</span>
              </div>
              <input
                type="range"
                min={5.0}
                max={14.0}
                step={0.5}
                value={elecRate}
                onChange={(e) => setElecRate(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <p className="text-[10px] text-stone-500">
                ⚠️ Govt domestic rate is ₹4.5–₹6. Most private PGs mark this up to ₹9–₹12!
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-600">Estimated Monthly Units:</span>
                <span className="font-bold text-stone-900 font-mono">{units} units</span>
              </div>
              <input
                type="range"
                min={20}
                max={300}
                step={5}
                value={units}
                onChange={(e) => setUnits(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              
              {/* Presets */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setUnits(50)}
                  className={`text-[10px] px-2 py-0.5 rounded-md border ${units === 50 ? 'bg-amber-100 border-amber-300 font-bold' : 'bg-white border-stone-200 text-stone-600'}`}
                >
                  Winter (50u)
                </button>
                <button
                  type="button"
                  onClick={() => setUnits(85)}
                  className={`text-[10px] px-2 py-0.5 rounded-md border ${units === 85 ? 'bg-amber-100 border-amber-300 font-bold' : 'bg-white border-stone-200 text-stone-600'}`}
                >
                  Standard Laptop+Fan (85u)
                </button>
                <button
                  type="button"
                  onClick={() => setUnits(200)}
                  className={`text-[10px] px-2 py-0.5 rounded-md border ${units === 200 ? 'bg-amber-100 border-amber-300 font-bold' : 'bg-white border-stone-200 text-stone-600'}`}
                >
                  Summer with AC (200u)
                </button>
              </div>
            </div>
          </div>

          {/* Wi-Fi & Maintenance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <label className="font-semibold text-stone-700">Wi-Fi Share</label>
                <span className="font-bold text-stone-900 font-mono">₹{wifi}</span>
              </div>
              <input
                type="range"
                min={0}
                max={1000}
                step={50}
                value={wifi}
                onChange={(e) => setWifi(Number(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <label className="font-semibold text-stone-700">Maintenance & Water</label>
                <span className="font-bold text-stone-900 font-mono">₹{maintenance}</span>
              </div>
              <input
                type="range"
                min={0}
                max={2000}
                step={50}
                value={maintenance}
                onChange={(e) => setMaintenance(Number(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer"
              />
            </div>
          </div>

          {/* Food / Mess Plan */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-800">
                <input
                  type="checkbox"
                  checked={includeFood}
                  onChange={(e) => setIncludeFood(e.target.checked)}
                  className="w-4 h-4 accent-emerald-700 rounded cursor-pointer"
                />
                <span>Include Daily Mess / Tiffin Service</span>
              </label>
              {includeFood && (
                <span className="text-xs font-bold text-stone-900 font-mono">₹{foodCost.toLocaleString()} / mo</span>
              )}
            </div>

            {includeFood && (
              <div className="pt-2 border-t border-stone-200 space-y-1">
                <input
                  type="range"
                  min={2000}
                  max={6000}
                  step={100}
                  value={foodCost}
                  onChange={(e) => setFoodCost(Number(e.target.value))}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400">
                  <span>Basic 2-Meals (₹2,000)</span>
                  <span>Full 3-Meals + Tea (₹3,200)</span>
                  <span>Premium Mess (₹6,000)</span>
                </div>
              </div>
            )}
          </div>

          {/* Security Deposit Months */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-stone-700">Security Deposit Multiple</label>
              <span className="font-bold text-emerald-800 font-mono">
                {depositMonths} {depositMonths === 1 ? 'Month' : 'Months'} (₹{securityDepositAmount.toLocaleString()})
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setDepositMonths(m)}
                  className={`py-2 text-xs rounded-xl border font-semibold transition-all ${
                    depositMonths === m
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  {m} Month{m > 1 ? 's' : ''}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right: Summary Output & Analysis (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-stone-800 space-y-6">
            <div>
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                Real Out-of-Pocket Commitment
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
                  ₹{recurringMonthlyCost.toLocaleString()}
                </span>
                <span className="text-stone-400 text-xs font-medium">/ month</span>
              </div>
              <p className="text-xs text-amber-300 mt-1 font-medium">
                ⚠️ +₹{hiddenCostAddon.toLocaleString()} ({Math.round((hiddenCostAddon / baseRent) * 100)}% extra) over quoted rent
              </p>
            </div>

            {/* Comparison Pill Boxes */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                <span className="text-[10px] text-stone-400 block uppercase">Landlord Quoted</span>
                <span className="text-lg font-bold font-mono text-stone-200">₹{baseRent.toLocaleString()}</span>
                <span className="text-[10px] text-stone-400 block mt-0.5">Rent on poster</span>
              </div>
              <div className="bg-emerald-950/60 border border-emerald-500/30 rounded-2xl p-3">
                <span className="text-[10px] text-emerald-400 block uppercase">True Cost</span>
                <span className="text-lg font-bold font-mono text-emerald-300">₹{recurringMonthlyCost.toLocaleString()}</span>
                <span className="text-[10px] text-emerald-400/80 block mt-0.5">Real cash required</span>
              </div>
            </div>

            {/* Detailed itemized breakdown list */}
            <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs">
              <div className="flex justify-between text-stone-300">
                <span>Base Room Rent:</span>
                <span className="font-mono font-semibold text-white">₹{baseRent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Electricity ({units} units @ ₹{elecRate}):</span>
                <span className="font-mono font-semibold text-white">₹{elecTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>High-Speed Wi-Fi:</span>
                <span className="font-mono font-semibold text-white">₹{wifi}</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Building Maintenance & Water:</span>
                <span className="font-mono font-semibold text-white">₹{maintenance}</span>
              </div>
              {includeFood && (
                <div className="flex justify-between text-stone-300">
                  <span>3-Meals Daily Mess Plan:</span>
                  <span className="font-mono font-semibold text-white">₹{foodCost.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* One-time move-in capital card */}
            <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-4 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-300">Move-In Day Cash Required</span>
                <span className="font-mono font-extrabold text-amber-200 text-sm">
                  ₹{moveInDayTotal.toLocaleString()}
                </span>
              </div>
              <p className="text-[11px] text-stone-300 leading-relaxed">
                Includes Month 1 Rent (₹{recurringMonthlyCost.toLocaleString()}) + {depositMonths} Months Security Deposit (₹{securityDepositAmount.toLocaleString()}).
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleCopySummary}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Summary Copied to Clipboard!' : 'Copy Student Budget Summary'}</span>
              </button>

              <button
                onClick={() => onApplyBudgetToSearch(baseRent)}
                className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-stone-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Filter Listings with this Base Rent (₹{baseRent.toLocaleString()})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Educational Callout */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2 text-xs text-amber-900">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              <span>Mentor Tip for Hackathon Judges</span>
            </div>
            <p className="leading-relaxed text-[11px] text-amber-950">
              In college hubs like Kota, North Campus, and Koramangala, landlords exploit students' lack of commercial tariff knowledge. By mandating transparency in the booking phase, <strong>Root Force</strong> prevents mid-semester evictions and financial distress.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
