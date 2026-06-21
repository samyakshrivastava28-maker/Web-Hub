import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User as UserIcon, Shield, Activity, Settings, Bell, ChevronRight, Zap, Phone, CheckCircle2, ArrowRight, Globe, Briefcase } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import MissionControlBg from '../components/backgrounds/MissionControlBg';

export default function Dashboard() {
  const { currentUser, userProfile, logout, updateUserPhone } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const [savingPhone, setSavingPhone] = useState(false);
  const [websites, setWebsites] = useState<any[]>([]);
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!currentUser?.uid) return;
    
    const fetchUserData = async () => {
      try {
        const { getDocs, collection } = await import('firebase/firestore');
        const { db } = await import('../firebase');
        
        const wSnap = await getDocs(collection(db, 'users', currentUser.uid, 'websites'));
        setWebsites(wSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        
        const wfSnap = await getDocs(collection(db, 'users', currentUser.uid, 'workflows'));
        setWorkflows(wfSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        
        const pSnap = await getDocs(collection(db, 'users', currentUser.uid, 'projects'));
        setProjects(pSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error("Failed to fetch user dashboard data", e);
      } finally {
        setDataLoading(false);
      }
    };
    
    fetchUserData();
  }, [currentUser]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out");
    } finally {
      setLoggingOut(false);
    }
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const }
  });

  return (
    <div className="min-h-screen bg-[#030308] text-white selection:bg-white/20 pt-24 md:pt-32 pb-20 px-5 md:px-8 relative overflow-hidden">
      {/* Mission Control Background */}
      <MissionControlBg />

      {/* Ambient depth layers — distinct from Login/Register */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[5%] w-[400px] h-[400px] bg-sky-500/4 rounded-full blur-[120px]" />
        <div className="absolute top-[50%] left-[60%] w-[300px] h-[300px] bg-blue-400/3 rounded-full blur-[100px]" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div {...fadeUp(0)}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/15 rounded-full text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Mission Control Active
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-2">
              Welcome back, {userProfile?.name || currentUser?.displayName || 'User'}
            </h1>
            <p className="text-white/30 text-lg font-light">Your S-Web Hub operations command center.</p>
          </motion.div>
          
          <motion.div {...fadeUp(0.1)} className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm flex items-center justify-center hover:bg-white/[0.07] hover:border-white/[0.12] transition-all">
              <Bell className="w-5 h-5 text-white/50" />
            </button>
            <button className="w-10 h-10 rounded-xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm flex items-center justify-center hover:bg-white/[0.07] hover:border-white/[0.12] transition-all">
              <Settings className="w-5 h-5 text-white/50" />
            </button>
            <button 
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/8 text-red-400 border border-red-500/15 hover:bg-red-500/15 hover:border-red-500/25 transition-all text-sm font-semibold backdrop-blur-sm"
            >
              <LogOut className="w-4 h-4" /> {loggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </motion.div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content Area - 2/3 width */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Quick Stats */}
            <motion.div {...fadeUp(0.2)} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#08090e]/70 backdrop-blur-xl border border-white/[0.06] flex flex-col justify-between h-40 group relative overflow-hidden"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03), 0 8px 32px -8px rgba(0,0,0,0.3)" }}
              >
                <div className="absolute top-0 right-0 p-6 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity">
                  <Activity className="w-24 h-24" />
                </div>
                {/* Subtle top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/15 to-transparent" />
                <p className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.15em]">Project Status</p>
                <div>
                  <h3 className="text-3xl font-semibold">Active</h3>
                  <p className="text-blue-400 text-sm mt-1 font-medium">Phase 2: Development</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#08090e]/70 backdrop-blur-xl border border-white/[0.06] flex flex-col justify-between h-40 group relative overflow-hidden"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03), 0 8px 32px -8px rgba(0,0,0,0.3)" }}
              >
                <div className="absolute top-0 right-0 p-6 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity">
                  <Zap className="w-24 h-24" />
                </div>
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-400/15 to-transparent" />
                <p className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.15em]">AI Leads Generated</p>
                <div>
                  <h3 className="text-3xl font-semibold">1,248</h3>
                  <p className="text-blue-400 text-sm mt-1 font-medium">+12% this week</p>
                </div>
              </div>
            </motion.div>

            {/* My Websites */}
            <motion.div {...fadeUp(0.3)} className="p-8 rounded-2xl bg-[#08090e]/70 backdrop-blur-xl border border-white/[0.06]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Globe className="w-5 h-5 text-sky-400" /> My Websites
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dataLoading ? (
                  <p className="text-sm text-white/40">Loading websites...</p>
                ) : websites.length > 0 ? (
                  websites.map(w => (
                    <div key={w.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors cursor-pointer group">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-white/90 group-hover:text-white transition-colors">{w.name}</h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">{w.status}</span>
                      </div>
                      <p className="text-xs text-white/40 mb-1">{w.url || 'URL Pending'}</p>
                      <p className="text-xs text-white/30">Target: {w.deliveryDate}</p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full p-4 rounded-xl border border-white/[0.04] border-dashed text-center">
                    <p className="text-sm text-white/40">No active website projects.</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* My Workflows */}
            <motion.div {...fadeUp(0.4)} className="p-8 rounded-2xl bg-[#08090e]/70 backdrop-blur-xl border border-white/[0.06]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-emerald-400" /> My Workflows
                </h2>
              </div>
              
              <div className="space-y-3">
                {dataLoading ? (
                  <p className="text-sm text-white/40">Loading workflows...</p>
                ) : workflows.length > 0 ? (
                  workflows.map(w => (
                    <div key={w.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between group hover:bg-white/[0.04] transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">{w.name}</p>
                          <p className="text-xs text-white/40">{w.description || 'Active automation process'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-emerald-400">{w.status}</span>
                        <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 rounded-xl border border-white/[0.04] border-dashed text-center">
                    <p className="text-sm text-white/40">No active workflows.</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* My Projects */}
            <motion.div {...fadeUp(0.5)} className="p-8 rounded-2xl bg-[#08090e]/70 backdrop-blur-xl border border-white/[0.06]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-rose-400" /> My Projects
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dataLoading ? (
                  <p className="text-sm text-white/40">Loading projects...</p>
                ) : projects.length > 0 ? (
                  projects.map(p => (
                    <div key={p.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors cursor-pointer group">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-white/90 group-hover:text-white transition-colors">{p.name}</h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">{p.status}</span>
                      </div>
                      <p className="text-xs text-white/40">{p.type}</p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full p-4 rounded-xl border border-white/[0.04] border-dashed text-center">
                    <p className="text-sm text-white/40">No active projects.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar Area - 1/3 width */}
          <div className="flex flex-col gap-6">
            
            {/* User Profile Card */}
            <motion.div {...fadeUp(0.4)} 
              className="p-8 rounded-2xl bg-[#08090e]/70 backdrop-blur-xl border border-white/[0.06] relative overflow-hidden"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03), 0 8px 32px -8px rgba(0,0,0,0.3)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/10 to-transparent" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl" />
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.05] flex items-center justify-center border border-white/[0.08] text-white shadow-xl relative overflow-hidden">
                  {userProfile?.provider === 'google' && currentUser?.photoURL ? (
                  <img src={currentUser.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-8 h-8 opacity-40" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{userProfile?.name || currentUser?.displayName || 'Authorized User'}</h3>
                <p className="text-white/30 text-sm truncate max-w-[200px] font-light">{userProfile?.email || currentUser?.email}</p>
              </div>
            </div>
            
            <div className="space-y-4 border-t border-white/[0.05] pt-6">
              
              {/* Phone Number Display/Edit */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40 flex items-center gap-1.5 text-xs font-medium"><Phone className="w-3.5 h-3.5"/> Phone</span>
                  {!isEditingPhone && (
                    <button onClick={() => setIsEditingPhone(true)} className="text-sky-400/70 text-xs hover:text-sky-300 hover:underline transition-colors">Edit</button>
                  )}
                </div>
                {isEditingPhone ? (
                  <div className="flex items-center gap-2 mt-1">
                    <input 
                      type="tel"
                      className="flex-1 bg-white/[0.03] border border-white/[0.07] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-sky-500/30 transition-all"
                      placeholder={userProfile?.phoneNumber || "Add phone"}
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                    />
                    <button 
                      onClick={async () => {
                        if (newPhone.length > 5) {
                          setSavingPhone(true);
                          await updateUserPhone(newPhone);
                          setIsEditingPhone(false);
                          setSavingPhone(false);
                        }
                      }}
                      disabled={savingPhone}
                      className="px-3 py-1.5 bg-sky-500/15 text-sky-400 rounded-lg text-sm hover:bg-sky-500/25 transition-all"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="text-white/80 text-sm font-medium">
                    {userProfile?.phoneNumber || <span className="text-white/20 italic font-light">Not provided</span>}
                  </div>
                )}
              </div>

              <div className="h-[1px] w-full bg-white/[0.04] my-2" />

              <div className="flex items-center justify-between text-sm">
                <span className="text-white/40 text-xs font-medium">Provider</span>
                <span className="capitalize text-white/80 font-medium">{userProfile?.provider || 'Email'}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/40 text-xs font-medium">Join Date</span>
                <span className="text-white/80 font-medium">{userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/40 text-xs font-medium">Security</span>
                <span className="flex items-center gap-1 text-blue-400 font-medium"><Shield className="w-3 h-3"/> Active</span>
              </div>
            </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div {...fadeUp(0.5)} 
              className="p-8 rounded-2xl border border-white/[0.08] text-black overflow-hidden relative group cursor-pointer"
              style={{ boxShadow: "0 8px 32px -8px rgba(0,0,0,0.3)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-sky-50 opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-200/50 to-transparent" />
              <div className="relative z-10 text-black">
                <h3 className="text-xl font-bold mb-2">Upgrade Infrastructure</h3>
                <p className="text-black/50 text-sm leading-relaxed mb-6 font-light">Scale your server capacity and AI processing limits instantly.</p>
                <button className="flex items-center gap-2 font-semibold text-sm hover:gap-3 transition-all">
                  View Upgrades <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
