import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { ShieldAlert, Users, Globe, Zap, Target, Briefcase, Search, ChevronRight, User, Phone, Mail, Calendar, Settings, FileText, CheckCircle2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import MissionControlBg from '../components/backgrounds/MissionControlBg';

interface UserData {
  uid: string;
  email: string;
  name: string;
  phoneNumber?: string;
  createdAt: string;
  provider: string;
  projectRequirements?: {
    website: string;
    automation: string;
    leads: string;
    business: string;
  };
  clientNotes?: string;
}

interface Website {
  id: string;
  name: string;
  url: string;
  status: string;
  deliveryDate: string;
}

interface Workflow {
  id: string;
  name: string;
  status: string;
  description: string;
}

interface Project {
  id: string;
  name: string;
  status: string;
  type: string;
}

export default function HostDashboard() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  // Stats
  const [stats, setStats] = useState({
    users: 0,
    websites: 0,
    automations: 0,
    leads: 0,
    business: 0
  });

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const fetchedUsers: UserData[] = [];
      querySnapshot.forEach((doc) => {
        fetchedUsers.push(doc.data() as UserData);
      });
      setUsers(fetchedUsers);
      setStats(s => ({ ...s, users: fetchedUsers.length }));
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const }
  });

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-white/20 pt-24 md:pt-32 pb-20 px-5 md:px-8 relative overflow-hidden">
      <MissionControlBg />
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[5%] w-[400px] h-[400px] bg-red-500/4 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div {...fadeUp(0)}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/15 rounded-full text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
              <ShieldAlert className="w-3.5 h-3.5" /> Host Admin Access
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-2">
              Host Dashboard
            </h1>
            <p className="text-white/30 text-lg font-light">S-Web Hub Owner Panel</p>
          </motion.div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {[
            { label: 'Users', value: stats.users, icon: Users, color: 'text-amber-400' },
            { label: 'Websites', value: stats.websites, icon: Globe, color: 'text-sky-400' },
            { label: 'Workflows', value: stats.automations, icon: Zap, color: 'text-emerald-400' },
            { label: 'Lead Systems', value: stats.leads, icon: Target, color: 'text-indigo-400' },
            { label: 'Projects', value: stats.business, icon: Briefcase, color: 'text-rose-400' }
          ].map((stat, i) => (
            <motion.div key={stat.label} {...fadeUp(i * 0.1)} className="p-6 rounded-2xl bg-[#08090e]/70 backdrop-blur-xl border border-white/[0.06] flex flex-col justify-between group">
              <stat.icon className={`w-8 h-8 ${stat.color} mb-4 opacity-70 group-hover:opacity-100 transition-opacity`} />
              <div>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-xs text-white/40 uppercase tracking-wider font-semibold">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Users List */}
          <motion.div {...fadeUp(0.2)} className="lg:col-span-1 flex flex-col gap-4">
            <div className="p-6 rounded-2xl bg-[#08090e]/70 backdrop-blur-xl border border-white/[0.06]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Clients</h2>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-amber-500/30 w-48"
                  />
                </div>
              </div>

              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {loading ? <p className="text-white/40 text-sm">Loading users...</p> : filteredUsers.map(u => (
                  <div 
                    key={u.uid} 
                    onClick={() => setSelectedUser(u)}
                    className={`p-4 rounded-xl cursor-pointer transition-all border ${selectedUser?.uid === u.uid ? 'bg-amber-500/10 border-amber-500/20' : 'bg-white/[0.02] border-white/[0.04] hover:bg-white/[0.05]'}`}
                  >
                    <p className="font-semibold text-sm">{u.name}</p>
                    <p className="text-xs text-white/40">{u.email}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* User Details */}
          <motion.div {...fadeUp(0.3)} className="lg:col-span-2">
            {selectedUser ? (
              <UserDetailPanel user={selectedUser} onUpdate={fetchUsers} />
            ) : (
              <div className="p-12 rounded-2xl bg-[#08090e]/70 backdrop-blur-xl border border-white/[0.06] flex flex-col items-center justify-center text-center h-full">
                <User className="w-16 h-16 text-white/10 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Select a Client</h3>
                <p className="text-white/40">Choose a user from the list to view and manage their projects, workflows, and details.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function UserDetailPanel({ user, onUpdate }: { user: UserData, onUpdate: () => void }) {
  const [notes, setNotes] = useState(user.clientNotes || '');
  const [saving, setSaving] = useState(false);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setNotes(user.clientNotes || '');
    const fetchData = async () => {
      try {
        const wSnap = await getDocs(collection(db, 'users', user.uid, 'websites'));
        setWebsites(wSnap.docs.map(d => ({ id: d.id, ...d.data() } as Website)));
        
        const wfSnap = await getDocs(collection(db, 'users', user.uid, 'workflows'));
        setWorkflows(wfSnap.docs.map(d => ({ id: d.id, ...d.data() } as Workflow)));
        
        const pSnap = await getDocs(collection(db, 'users', user.uid, 'projects'));
        setProjects(pSnap.docs.map(d => ({ id: d.id, ...d.data() } as Project)));
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [user]);

  const saveNotes = async () => {
    setSaving(true);
    await updateDoc(doc(db, 'users', user.uid), { clientNotes: notes });
    setSaving(false);
    onUpdate();
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="p-8 rounded-2xl bg-[#08090e]/70 backdrop-blur-xl border border-white/[0.06]">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
            <p className="text-white/40 text-sm">{user.email}</p>
          </div>
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/60 capitalize">
            {user.provider} User
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-white/30 text-xs flex items-center gap-1"><Phone className="w-3 h-3"/> Phone</span>
            <span className="text-sm">{user.phoneNumber || 'N/A'}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-white/30 text-xs flex items-center gap-1"><Calendar className="w-3 h-3"/> Joined</span>
            <span className="text-sm">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Project Requirements */}
      <div className="p-8 rounded-2xl bg-[#08090e]/70 backdrop-blur-xl border border-white/[0.06]">
        <h3 className="text-lg font-semibold mb-4 text-white">Client Requirements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl">
            <p className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-1">Website Needs</p>
            <p className="text-sm text-white/80">{user.projectRequirements?.website || 'Not specified'}</p>
          </div>
          <div className="p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl">
            <p className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-1">Automation Needs</p>
            <p className="text-sm text-white/80">{user.projectRequirements?.automation || 'Not specified'}</p>
          </div>
          <div className="p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl">
            <p className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-1">Lead Gen Needs</p>
            <p className="text-sm text-white/80">{user.projectRequirements?.leads || 'Not specified'}</p>
          </div>
          <div className="p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl">
            <p className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-1">Business Systems</p>
            <p className="text-sm text-white/80">{user.projectRequirements?.business || 'Not specified'}</p>
          </div>
        </div>
      </div>

      {/* Admin Notes */}
      <div className="p-8 rounded-2xl bg-[#08090e]/70 backdrop-blur-xl border border-white/[0.06]">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-amber-400">
          <ShieldAlert className="w-4 h-4" /> Private Host Notes
        </h3>
        <textarea 
          className="w-full h-32 bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 text-sm focus:outline-none focus:border-amber-500/30 transition-all resize-none"
          placeholder="Private notes visible only to webhub2811@gmail.com..."
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />
        <div className="flex justify-end mt-4">
          <button onClick={saveNotes} disabled={saving} className="px-4 py-2 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 rounded-lg text-sm font-semibold transition-all">
            {saving ? 'Saving...' : 'Save Notes'}
          </button>
        </div>
      </div>

      {/* Projects, Websites, Workflows */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl bg-[#08090e]/70 backdrop-blur-xl border border-white/[0.06] flex flex-col">
          <h3 className="font-semibold flex items-center gap-2 mb-4"><Globe className="w-4 h-4 text-sky-400"/> Websites</h3>
          <div className="space-y-3 flex-1 mb-4">
            {websites.map(w => (
              <div key={w.id} className="p-3 bg-white/5 rounded-lg border border-white/10 relative group">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm">{w.name}</p>
                    <p className="text-xs text-white/50">{w.status} • {w.deliveryDate}</p>
                  </div>
                  <button 
                    onClick={async () => {
                      if(window.confirm('Remove this website?')) {
                        await deleteDoc(doc(db, 'users', user.uid, 'websites', w.id));
                        setWebsites(websites.filter(x => x.id !== w.id));
                      }
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:bg-red-400/20 rounded transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
            {websites.length === 0 && <p className="text-xs text-white/40">No websites found.</p>}
          </div>
          <button 
            onClick={async () => {
              const name = prompt('Website Name:');
              if (!name) return;
              const newDoc = doc(collection(db, 'users', user.uid, 'websites'));
              await setDoc(newDoc, { name, url: '', status: 'Pending', deliveryDate: 'TBD' });
              setWebsites([...websites, { id: newDoc.id, name, url: '', status: 'Pending', deliveryDate: 'TBD' }]);
            }}
            className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-all border border-white/10"
          >
            Add Website
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-[#08090e]/70 backdrop-blur-xl border border-white/[0.06] flex flex-col">
          <h3 className="font-semibold flex items-center gap-2 mb-4"><Zap className="w-4 h-4 text-emerald-400"/> Workflows</h3>
          <div className="space-y-3 flex-1 mb-4">
            {workflows.map(w => (
              <div key={w.id} className="p-3 bg-white/5 rounded-lg border border-white/10 relative group">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm">{w.name}</p>
                    <p className="text-xs text-white/50">{w.status}</p>
                  </div>
                  <button 
                    onClick={async () => {
                      if(window.confirm('Remove this workflow?')) {
                        await deleteDoc(doc(db, 'users', user.uid, 'workflows', w.id));
                        setWorkflows(workflows.filter(x => x.id !== w.id));
                      }
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:bg-red-400/20 rounded transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
            {workflows.length === 0 && <p className="text-xs text-white/40">No workflows found.</p>}
          </div>
          <button 
            onClick={async () => {
              const name = prompt('Workflow Name:');
              if (!name) return;
              const newDoc = doc(collection(db, 'users', user.uid, 'workflows'));
              await setDoc(newDoc, { name, description: '', status: 'Pending' });
              setWorkflows([...workflows, { id: newDoc.id, name, description: '', status: 'Pending' }]);
            }}
            className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-all border border-white/10"
          >
            Add Workflow
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-[#08090e]/70 backdrop-blur-xl border border-white/[0.06] flex flex-col">
          <h3 className="font-semibold flex items-center gap-2 mb-4"><Briefcase className="w-4 h-4 text-rose-400"/> Projects</h3>
          <div className="space-y-3 flex-1 mb-4">
            {projects.map(p => (
              <div key={p.id} className="p-3 bg-white/5 rounded-lg border border-white/10 relative group">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm">{p.name}</p>
                    <p className="text-xs text-white/50">{p.status}</p>
                  </div>
                  <button 
                    onClick={async () => {
                      if(window.confirm('Remove this project?')) {
                        await deleteDoc(doc(db, 'users', user.uid, 'projects', p.id));
                        setProjects(projects.filter(x => x.id !== p.id));
                      }
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:bg-red-400/20 rounded transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
            {projects.length === 0 && <p className="text-xs text-white/40">No projects found.</p>}
          </div>
          <button 
            onClick={async () => {
              const name = prompt('Project Name:');
              if (!name) return;
              const newDoc = doc(collection(db, 'users', user.uid, 'projects'));
              await setDoc(newDoc, { name, type: 'General', status: 'Pending' });
              setProjects([...projects, { id: newDoc.id, name, type: 'General', status: 'Pending' }]);
            }}
            className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-all border border-white/10"
          >
            Add Project
          </button>
        </div>
      </div>
    </div>
  );
}
