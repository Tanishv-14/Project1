import React, { useState } from 'react';
import { RoommateCandidate, SleepSchedule, StudyVibe, FoodHabit, Cleanliness } from '../types';
import { INITIAL_ROOMMATES } from '../mockData';
import { 
  Users, 
  Sparkles, 
  Moon, 
  Sun, 
  BookOpen, 
  UtensilsCrossed, 
  Check, 
  Send, 
  PlusCircle, 
  Filter, 
  Clock, 
  Sparkle, 
  AlertTriangle,
  HeartHandshake,
  X
} from 'lucide-react';

export const RoommateMatcher: React.FC = () => {
  const [candidates, setCandidates] = useState<RoommateCandidate[]>(INITIAL_ROOMMATES);
  
  // User's own preferences for matching
  const [mySleep, setMySleep] = useState<SleepSchedule>('night_owl');
  const [myStudy, setMyStudy] = useState<StudyVibe>('music_ok');
  const [myFood, setMyFood] = useState<FoodHabit>('non_veg');
  const [myClean, setMyClean] = useState<Cleanliness>('moderate');
  const [myBudget, setMyBudget] = useState<number>(10000);

  // Success message state
  const [connectedIds, setConnectedIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Profile Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCollege, setNewCollege] = useState('');
  const [newBranch, setNewBranch] = useState('');
  const [newBio, setNewBio] = useState('');

  // Algorithmic compatibility calculator
  const calculateCompatibility = (c: RoommateCandidate): number => {
    let score = 0;
    
    // Sleep compatibility (30 pts)
    if (c.sleepSchedule === mySleep) score += 30;
    else if (c.sleepSchedule === 'flexible' || mySleep === 'flexible') score += 20;
    else score += 5; // Major clash (Night Owl vs Early Riser)

    // Study vibe (25 pts)
    if (c.studyVibe === myStudy) score += 25;
    else score += 10;

    // Cleanliness (20 pts)
    if (c.cleanliness === myClean) score += 20;
    else score += 10;

    // Food habit (15 pts)
    if (c.foodHabit === myFood) score += 15;
    else if (c.foodHabit === 'eggetarian' || myFood === 'eggetarian') score += 10;
    else score += 5;

    // Budget proximity (10 pts)
    const diff = Math.abs(c.maxBudget - myBudget);
    if (diff <= 1500) score += 10;
    else if (diff <= 3500) score += 6;
    else score += 2;

    return Math.min(score, 100);
  };

  // Sort candidates by match score descending
  const scoredCandidates = candidates.map(c => ({
    ...c,
    compatibilityScore: calculateCompatibility(c)
  })).sort((a, b) => (b.compatibilityScore || 0) - (a.compatibilityScore || 0));

  const handleSendRequest = (c: RoommateCandidate) => {
    setConnectedIds(prev => [...prev, c.id]);
    setToastMessage(`RootMate Request sent to ${c.name}! Mutual contact details shared.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newCandidate: RoommateCandidate = {
      id: `rm_${Date.now()}`,
      name: newName,
      age: 19,
      gender: 'Any',
      college: newCollege || 'Delhi University',
      branch: newBranch || 'Undergraduate',
      year: '1st Year',
      sleepSchedule: mySleep,
      studyVibe: myStudy,
      foodHabit: myFood,
      cleanliness: myClean,
      maxBudget: myBudget,
      preferredLocations: ['Near Campus Metro'],
      hobbies: ['Tech', 'Music', 'Fitness'],
      bio: newBio || 'Friendly student looking for a respectful roommate to split rent.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    };

    setCandidates(prev => [newCandidate, ...prev]);
    setIsModalOpen(false);
    setToastMessage('🎉 Your Roommate Profile has been posted to the Root Force student pool!');
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 border border-teal-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-teal-800/60 text-teal-200 px-3 py-1 rounded-full border border-teal-700/50">
              <Users className="w-3.5 h-3.5" />
              <span>Module 3: RootMate Algorithm</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Habit-Based Roommate Matching
            </h1>
            <p className="text-xs sm:text-sm text-teal-100/90 max-w-2xl">
              80% of student rental disputes stem from incompatible sleep schedules and study habits. Adjust your lifestyle preferences below to find your most compatible flatmates.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs rounded-xl shadow-xs transition-colors self-start sm:self-center"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List My Roommate Profile</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl p-4 flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <Check className="w-5 h-5 text-emerald-700 shrink-0" />
            <p className="text-sm font-medium">{toastMessage}</p>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-stone-400 hover:text-stone-600 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Interactive Questionnaire Panel */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <h2 className="font-bold text-stone-900 text-sm sm:text-base">
              Your Lifestyle & Study Habits Matrix
            </h2>
          </div>
          <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg">
            Live Algorithmic Weighting
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Sleep Schedule */}
          <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
            <label className="block text-xs font-bold text-stone-800">
              🌙 Sleep Schedule (Weight: 30%)
            </label>
            <div className="space-y-1 text-xs">
              {[
                { id: 'night_owl', label: 'Night Owl (Past 1 AM)', icon: Moon },
                { id: 'early_bird', label: 'Early Bird (Up at 6 AM)', icon: Sun },
                { id: 'flexible', label: 'Flexible / Adaptable', icon: Clock }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setMySleep(opt.id as SleepSchedule)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all ${
                    mySleep === opt.id
                      ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200/60'
                  }`}
                >
                  <opt.icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Study Vibe */}
          <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
            <label className="block text-xs font-bold text-stone-800">
              📚 Study Environment (Weight: 25%)
            </label>
            <div className="space-y-1 text-xs">
              {[
                { id: 'silent', label: 'Pin-Drop Silence' },
                { id: 'music_ok', label: 'Lofi / Music in Room' },
                { id: 'discussion', label: 'Group Discussions' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setMyStudy(opt.id as StudyVibe)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all ${
                    myStudy === opt.id
                      ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200/60'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cleanliness */}
          <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
            <label className="block text-xs font-bold text-stone-800">
              🧹 Cleanliness & Chores (Weight: 20%)
            </label>
            <div className="space-y-1 text-xs">
              {[
                { id: 'neat_freak', label: 'Spotless Daily' },
                { id: 'moderate', label: 'Weekend Cleaner' },
                { id: 'chill', label: 'Relaxed / Easygoing' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setMyClean(opt.id as Cleanliness)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all ${
                    myClean === opt.id
                      ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200/60'
                  }`}
                >
                  <Sparkle className="w-3.5 h-3.5 shrink-0" />
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Food & Budget */}
          <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-800">
                🥗 Dietary Preference (15%)
              </label>
              <div className="grid grid-cols-3 gap-1 text-[11px]">
                {[
                  { id: 'veg', label: 'Veg' },
                  { id: 'non_veg', label: 'Non-Veg' },
                  { id: 'eggetarian', label: 'Egg Ok' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setMyFood(opt.id as FoodHabit)}
                    className={`py-1.5 rounded-lg border text-center transition-all ${
                      myFood === opt.id
                        ? 'bg-emerald-700 text-white font-bold border-emerald-700'
                        : 'bg-white text-stone-700 border-stone-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1 pt-1 border-t border-stone-200">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-stone-700">Max Budget:</span>
                <span className="font-mono font-bold text-emerald-800">₹{myBudget.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={5000}
                max={20000}
                step={500}
                value={myBudget}
                onChange={(e) => setMyBudget(Number(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Matched Candidates Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-stone-900">
              Top Matched Roommates for You ({scoredCandidates.length})
            </h3>
            <p className="text-xs text-stone-500">
              Ranked in real-time based on sleep, study, food and budget compatibility
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scoredCandidates.map(candidate => {
            const score = candidate.compatibilityScore || 70;
            const isHighMatch = score >= 80;
            const isClashSleep = (candidate.sleepSchedule === 'night_owl' && mySleep === 'early_bird') || 
                                (candidate.sleepSchedule === 'early_bird' && mySleep === 'night_owl');
            const isRequested = connectedIds.includes(candidate.id);

            return (
              <div
                key={candidate.id}
                className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Card Top */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={candidate.avatarUrl}
                        alt={candidate.name}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-stone-100 shadow-xs"
                      />
                      <div>
                        <h4 className="font-bold text-stone-900 text-base leading-tight">
                          {candidate.name}, {candidate.age}
                        </h4>
                        <p className="text-xs text-stone-500 font-medium">{candidate.branch}</p>
                        <p className="text-[11px] text-emerald-800 font-semibold">{candidate.college}</p>
                      </div>
                    </div>

                    {/* Match Score Badge */}
                    <div className={`px-2.5 py-1 rounded-xl text-center border font-mono ${
                      isHighMatch
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : 'bg-stone-50 border-stone-200 text-stone-700'
                    }`}>
                      <span className="block text-base font-extrabold">{score}%</span>
                      <span className="text-[9px] uppercase tracking-wider block -mt-1 font-sans font-bold">Match</span>
                    </div>
                  </div>

                  {/* Bio quote */}
                  <p className="text-xs text-stone-600 italic bg-stone-50 p-3 rounded-2xl border border-stone-150">
                    "{candidate.bio}"
                  </p>

                  {/* Habit tags */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-stone-600">
                      <span>Sleep Rhythm:</span>
                      <strong className="text-stone-900">
                        {candidate.sleepSchedule === 'night_owl' ? '🌙 Night Owl' : candidate.sleepSchedule === 'early_bird' ? '☀️ Early Bird' : '⏰ Flexible'}
                      </strong>
                    </div>

                    <div className="flex items-center justify-between text-stone-600">
                      <span>Study Vibe:</span>
                      <strong className="text-stone-900">
                        {candidate.studyVibe === 'silent' ? '🤫 Silent' : candidate.studyVibe === 'music_ok' ? '🎵 Music Ok' : '🗣️ Discussion'}
                      </strong>
                    </div>

                    <div className="flex items-center justify-between text-stone-600">
                      <span>Diet Habit:</span>
                      <strong className="text-stone-900">
                        {candidate.foodHabit === 'veg' ? '🥗 Veg' : candidate.foodHabit === 'non_veg' ? '🍗 Non-Veg' : '🥚 Egg Ok'}
                      </strong>
                    </div>

                    <div className="flex items-center justify-between text-stone-600">
                      <span>Budget Target:</span>
                      <strong className="text-emerald-800 font-mono font-bold">
                        ₹{candidate.maxBudget.toLocaleString()}/mo
                      </strong>
                    </div>
                  </div>

                  {/* Clash / Synergy Indicator */}
                  {isClashSleep ? (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-2 flex items-center gap-1.5 text-[11px] text-amber-900">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Warning: Potential sleep cycle mismatch</span>
                    </div>
                  ) : isHighMatch ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2 flex items-center gap-1.5 text-[11px] text-emerald-900">
                      <HeartHandshake className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Great harmony on sleep and study habits!</span>
                    </div>
                  ) : null}

                </div>

                {/* Card Footer / Action */}
                <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center gap-2">
                  {isRequested ? (
                    <button
                      disabled
                      className="w-full py-2 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-default"
                    >
                      <Check className="w-4 h-4" />
                      <span>Request Sent</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSendRequest(candidate)}
                      className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Connect as Roommate</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* List Roommate Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden">
            <div className="bg-emerald-900 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">List Your Roommate Profile</h3>
                <p className="text-xs text-emerald-200">Appear in the student search directory</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-white/70 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProfile} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-3 py-2 text-sm border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">College</label>
                  <input
                    type="text"
                    required
                    value={newCollege}
                    onChange={(e) => setNewCollege(e.target.value)}
                    placeholder="e.g. DTU / SRCC"
                    className="w-full px-3 py-2 text-sm border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Branch / Major</label>
                  <input
                    type="text"
                    required
                    value={newBranch}
                    onChange={(e) => setNewBranch(e.target.value)}
                    placeholder="e.g. B.Tech CSE"
                    className="w-full px-3 py-2 text-sm border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Short Bio & Habits</label>
                <textarea
                  rows={3}
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                  placeholder="Describe your daily routine, what you like in a flatmate, and study habits..."
                  className="w-full px-3 py-2 text-sm border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                ></textarea>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-600">
                Note: Your current habits (Sleep: {mySleep}, Study: {myStudy}, Cleanliness: {myClean}, Budget: ₹{myBudget}) will be attached to your public listing.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-stone-200 text-stone-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-xs"
                >
                  Publish Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
