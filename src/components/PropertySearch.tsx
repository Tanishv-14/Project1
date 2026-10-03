import React, { useState } from 'react';
import { PropertyListing, UserProfile } from '../types';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  SlidersHorizontal, 
  Wifi, 
  Utensils, 
  Wind, 
  Clock, 
  Check, 
  ArrowRight, 
  Zap, 
  Phone, 
  Info,
  CalendarCheck,
  ChevronRight,
  Calculator,
  Shield,
  X
} from 'lucide-react';

interface PropertySearchProps {
  properties: PropertyListing[];
  user: UserProfile;
  onOpenCalculatorForProperty: (property: PropertyListing) => void;
  onOpenVerification: () => void;
}

export const PropertySearch: React.FC<PropertySearchProps> = ({
  properties,
  user,
  onOpenCalculatorForProperty,
  onOpenVerification
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [maxRent, setMaxRent] = useState<number>(20000);
  const [maxDistance, setMaxDistance] = useState<number>(3.0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(null);
  const [contactSuccessMsg, setContactSuccessMsg] = useState<string | null>(null);

  // Available filter amenities
  const amenityOptions = [
    { id: 'High-Speed Wi-Fi', label: 'Wi-Fi' },
    { id: 'Food Included', label: 'Mess / Meals' },
    { id: 'AC & Geyser', label: 'AC & Geyser' },
    { id: 'No Curfew', label: 'No Strict Curfew' },
    { id: 'Power Backup', label: 'Power Backup' }
  ];

  const handleToggleAmenity = (amenityId: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenityId)
        ? prev.filter(a => a !== amenityId)
        : [...prev, amenityId]
    );
  };

  // Filter properties
  const filteredProperties = properties.filter(prop => {
    if (selectedType !== 'all' && prop.type !== selectedType) return false;
    if (prop.baseRent > maxRent) return false;
    if (prop.collegeDistanceKm > maxDistance) return false;
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = prop.title.toLowerCase().includes(q);
      const matchLoc = prop.location.toLowerCase().includes(q);
      const matchCollege = prop.nearbyCollege.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc && !matchCollege) return false;
    }

    if (selectedAmenities.length > 0) {
      const hasAll = selectedAmenities.every(a => 
        prop.amenities.some(item => item.toLowerCase().includes(a.toLowerCase()))
      );
      if (!hasAll) return false;
    }

    return true;
  });

  const handleContactOwner = (prop: PropertyListing) => {
    if (!user.isVerified) {
      onOpenVerification();
      return;
    }
    setContactSuccessMsg(`Direct Owner Connect: Contacted ${prop.ownerName} (${prop.ownerPhone}). Verified student pass sent with zero brokerage!`);
    setTimeout(() => setContactSuccessMsg(null), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Hero Banner for Search */}
      <div className="relative rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-950 to-stone-900 text-white p-6 sm:p-10 overflow-hidden shadow-xl border border-emerald-950">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-400/30">
            <span>🛡️ Verified Zero-Brokerage Student Housing</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Find Student Rooms & PGs Near Your College
          </h1>
          <p className="text-sm sm:text-base text-stone-300">
            Every listing features our signature <strong className="text-emerald-400">True Cost</strong> breakdown (rent + electricity slabs + Wi-Fi) so you never get blindsided by ₹5,000 in surprise month-end charges.
          </p>

          {/* Search Input Bar */}
          <div className="pt-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl p-2 shadow-lg border border-stone-200 gap-2">
              <div className="flex-1 flex items-center px-3 py-1.5 gap-2">
                <Search className="w-5 h-5 text-stone-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search college, metro station, or area (e.g. North Campus, DTU, Koramangala)..."
                  className="w-full text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
                />
              </div>

              {/* Quick college pill buttons */}
              <div className="hidden lg:flex items-center gap-1.5 px-2 border-l border-stone-200">
                <button
                  type="button"
                  onClick={() => setSearchQuery('North Campus')}
                  className="text-xs px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200"
                >
                  North Campus
                </button>
                <button
                  type="button"
                  onClick={() => setSearchQuery('Sector 62')}
                  className="text-xs px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200"
                >
                  Sector 62
                </button>
                <button
                  type="button"
                  onClick={() => setSearchQuery('Koramangala')}
                  className="text-xs px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200"
                >
                  Koramangala
                </button>
              </div>

              <button
                type="button"
                onClick={() => {}}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-xs"
              >
                Search Housing
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {contactSuccessMsg && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl p-4 flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Check className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium">{contactSuccessMsg}</p>
          </div>
          <button 
            onClick={() => setContactSuccessMsg(null)}
            className="text-stone-400 hover:text-stone-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Filter and Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Filter Sidebar */}
        <aside className="lg:col-span-1 space-y-6 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
              <h3 className="font-bold text-stone-900 text-sm">Filter Criteria</h3>
            </div>
            {(selectedType !== 'all' || maxRent < 20000 || maxDistance < 3.0 || selectedAmenities.length > 0) && (
              <button
                onClick={() => {
                  setSelectedType('all');
                  setMaxRent(20000);
                  setMaxDistance(3.0);
                  setSelectedAmenities([]);
                  setSearchQuery('');
                }}
                className="text-xs text-emerald-700 hover:underline font-medium"
              >
                Reset
              </button>
            )}
          </div>

          {/* Accommodation Type */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-2">
              Accommodation Type
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {[
                { id: 'all', label: 'All Types' },
                { id: 'pg_sharing', label: 'Sharing PG' },
                { id: 'single_room', label: 'Single Room' },
                { id: 'flat_1bhk', label: '1BHK Flat' },
                { id: 'flat_2bhk', label: '2BHK Shared' }
              ].map(type => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                    selectedType === type.id
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-600 font-semibold'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Max Rent Slider */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-stone-700">Max Base Rent</span>
              <span className="font-bold text-emerald-800 font-mono">₹{maxRent.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={4000}
              max={25000}
              step={500}
              value={maxRent}
              onChange={(e) => setMaxRent(Number(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1">
              <span>₹4k</span>
              <span>₹15k</span>
              <span>₹25k</span>
            </div>
          </div>

          {/* Distance from Campus Slider */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-stone-700">Max Distance to Campus</span>
              <span className="font-bold text-emerald-800 font-mono">{maxDistance} km</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={8.0}
              step={0.5}
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1">
              <span>Walking (0.5 km)</span>
              <span>Metro / Bike (8 km)</span>
            </div>
          </div>

          {/* Amenities filter */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-2">
              Must-Have Amenities
            </label>
            <div className="space-y-1.5">
              {amenityOptions.map(opt => {
                const isChecked = selectedAmenities.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleToggleAmenity(opt.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs border transition-all text-left ${
                      isChecked
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isChecked && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Verification Banner */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/80 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>DigiLocker Trust Guarantee</span>
            </div>
            <p className="text-stone-600 leading-relaxed text-[11px]">
              Every listed owner is verified via municipal electricity deeds. No brokers, no spam.
            </p>
            {!user.isVerified && (
              <button
                onClick={onOpenVerification}
                className="w-full mt-2 py-1.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Verify My Student Pass
              </button>
            )}
          </div>

        </aside>

        {/* Right Listings Grid */}
        <section className="lg:col-span-3 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white px-5 py-3.5 rounded-2xl border border-stone-200 shadow-xs">
            <div>
              <h2 className="font-bold text-stone-900 text-base">
                Verified Accommodations ({filteredProperties.length})
              </h2>
              <p className="text-xs text-stone-500">
                Real-time availability near your college campus
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500">Sorted by:</span>
              <span className="text-xs font-semibold text-stone-800 bg-stone-100 px-2.5 py-1 rounded-lg">
                Proximity to Campus
              </span>
            </div>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-800 text-base">No properties match your exact filters</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try widening your distance radius or increasing your max base rent budget to see more campus options.
              </p>
              <button
                onClick={() => {
                  setSelectedType('all');
                  setMaxRent(25000);
                  setMaxDistance(6.0);
                  setSelectedAmenities([]);
                  setSearchQuery('');
                }}
                className="text-xs text-emerald-700 font-semibold underline"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProperties.map(property => {
                // Calculate quick True Cost preview
                const elecEst = property.electricityRatePerUnit * property.approxUnitsPerMonth;
                const trueMonthly = property.baseRent + elecEst + property.wifiCost + property.maintenanceCost;

                return (
                  <div
                    key={property.id}
                    className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
                  >
                    {/* Image Thumbnail with badges */}
                    <div className="relative h-48 bg-stone-100 overflow-hidden">
                      <img
                        src={property.photos[0]}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>
                      
                      {/* Top Proximity Badge */}
                      <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{property.collegeDistanceKm} km to {property.nearbyCollege.split('(')[0].trim()}</span>
                      </div>

                      {/* Verified Dossier Tag */}
                      <div className="absolute top-3 right-3 bg-emerald-600/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded-lg flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verified</span>
                      </div>

                      {/* Accommodation Type Pill */}
                      <div className="absolute bottom-3 left-3 text-white text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2 py-0.5 rounded border border-white/30">
                        {property.type === 'pg_sharing' ? 'Sharing PG' : property.type === 'single_room' ? 'Single Room' : property.type === 'flat_1bhk' ? '1BHK Studio' : '2BHK Shared'}
                      </div>

                      {/* Gender policy */}
                      <div className="absolute bottom-3 right-3 text-[11px] text-stone-200 bg-stone-900/60 px-2 py-0.5 rounded">
                        {property.gender === 'unisex' ? 'Co-ed / Unisex' : property.gender === 'boys' ? 'Boys PG' : 'Girls PG'}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-1.5">
                        <h3 className="font-bold text-stone-900 text-base leading-snug line-clamp-1 group-hover:text-emerald-800 transition-colors">
                          {property.title}
                        </h3>
                        <p className="text-xs text-stone-500 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                          <span className="line-clamp-1">{property.location}</span>
                        </p>
                      </div>

                      {/* Amenities snippet */}
                      <div className="flex flex-wrap gap-1.5">
                        {property.amenities.slice(0, 3).map((amenity, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md"
                          >
                            {amenity}
                          </span>
                        ))}
                        {property.amenities.length > 3 && (
                          <span className="text-[11px] text-stone-400 px-1 py-0.5">
                            +{property.amenities.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* True Cost Highlight Box */}
                      <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-xl p-3 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-stone-500">Quoted Base Rent:</span>
                          <span className="font-semibold text-stone-900 font-mono">₹{property.baseRent.toLocaleString()}/mo</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-emerald-800 font-bold flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5 text-amber-500" />
                            <span>True Monthly Cost:</span>
                          </span>
                          <span className="font-extrabold text-emerald-900 text-sm font-mono">
                            ₹{Math.round(trueMonthly).toLocaleString()}/mo
                          </span>
                        </div>
                        <div className="text-[10px] text-stone-500 flex items-center justify-between pt-1 border-t border-emerald-100">
                          <span>Includes elec slabs + Wi-Fi</span>
                          <button
                            onClick={() => onOpenCalculatorForProperty(property)}
                            className="text-emerald-700 hover:underline font-semibold flex items-center gap-0.5"
                          >
                            <span>Inspect breakdown</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-2 flex items-center gap-2">
                        <button
                          onClick={() => setSelectedProperty(property)}
                          className="flex-1 py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-colors text-center"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleContactOwner(property)}
                          className="flex-1 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition-colors shadow-xs flex items-center justify-center gap-1"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Contact Owner</span>
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </div>

      {/* Property Details Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header Image */}
            <div className="relative h-60 bg-stone-100">
              <img
                src={selectedProperty.photos[0]}
                alt={selectedProperty.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20"></div>
              
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                    {selectedProperty.type.toUpperCase().replace('_', ' ')}
                  </span>
                  <span className="text-xs text-stone-300">
                    📍 {selectedProperty.collegeDistanceKm} km from {selectedProperty.nearbyCollege}
                  </span>
                </div>
                <h2 className="text-xl font-bold leading-tight">{selectedProperty.title}</h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
              
              {/* Owner Trust Card */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-lg">
                    {selectedProperty.ownerName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-stone-900 text-sm">{selectedProperty.ownerName}</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-xs text-stone-500">
                      Verified Municipal Property Deed · Zero Brokerage
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleContactOwner(selectedProperty)}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {selectedProperty.ownerPhone}</span>
                </button>
              </div>

              {/* Safety & Legal Verification Dossier */}
              <div className="border border-stone-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                  <Shield className="w-4 h-4 text-emerald-700" />
                  <span>Verified Legal & Safety Dossier</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-stone-50 rounded-xl">
                    <span className="text-stone-500 block">Police Clearance Status:</span>
                    <strong className="text-emerald-800 font-medium">{selectedProperty.verifiedDossier.policeStationName}</strong>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl">
                    <span className="text-stone-500 block">Fire Safety & Emergency Exit:</span>
                    <strong className="text-emerald-800 font-medium">NOC Certified (2026-2027)</strong>
                  </div>
                </div>
              </div>

              {/* True Cost Breakdown comparison */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-emerald-950 text-sm flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-emerald-700" />
                    <span>Property True Cost Breakdown</span>
                  </h4>
                  <span className="text-xs font-bold text-emerald-800 font-mono">
                    Total: ₹{Math.round(selectedProperty.baseRent + (selectedProperty.electricityRatePerUnit * selectedProperty.approxUnitsPerMonth) + selectedProperty.wifiCost + selectedProperty.maintenanceCost).toLocaleString()}/mo
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                    <span className="text-stone-500 block text-[11px]">Quoted Rent</span>
                    <span className="font-bold text-stone-900">₹{selectedProperty.baseRent.toLocaleString()}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                    <span className="text-stone-500 block text-[11px]">Electricity ({selectedProperty.approxUnitsPerMonth} units)</span>
                    <span className="font-bold text-stone-900">₹{Math.round(selectedProperty.electricityRatePerUnit * selectedProperty.approxUnitsPerMonth)}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                    <span className="text-stone-500 block text-[11px]">Wi-Fi Share</span>
                    <span className="font-bold text-stone-900">₹{selectedProperty.wifiCost}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                    <span className="text-stone-500 block text-[11px]">Security Deposit</span>
                    <span className="font-bold text-emerald-700">{selectedProperty.securityDepositMonths} Months</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const p = selectedProperty;
                    setSelectedProperty(null);
                    onOpenCalculatorForProperty(p);
                  }}
                  className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Launch Interactive Calculator for this Property</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Amenities */}
              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-2.5">Building Amenities & Student Rules</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {selectedProperty.amenities.map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-stone-700 bg-stone-50 p-2 rounded-lg">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-1.5 text-xs text-stone-700 bg-stone-50 p-2 rounded-lg">
                    <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Curfew: {selectedProperty.curfewTime}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-stone-50 px-6 py-4 border-t border-stone-200 flex justify-end gap-3">
              <button
                onClick={() => setSelectedProperty(null)}
                className="px-4 py-2 border border-stone-300 text-stone-700 rounded-xl text-xs font-semibold hover:bg-stone-100"
              >
                Close
              </button>
              <button
                onClick={() => handleContactOwner(selectedProperty)}
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold"
              >
                Book Inspection Visit
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
