import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LayoutDashboard, Filter, Target, Calendar, Mail, BarChart2, Settings, Plus, Search, Bell, Users, DollarSign, ArrowUpRight, CheckCircle2, ChevronRight, Clock } from 'lucide-react';
import BrowserFrame from './BrowserFrame';

export default function LeadGenMockup() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <BrowserFrame url="https://app.growthflow.com" title="GrowthFlow CRM">
      <div className="flex h-full w-full bg-[#0A0A0B] text-white font-sans overflow-hidden">
        
        {/* Sidebar */}
        <div className="w-14 md:w-48 border-r border-white/5 bg-[#121214] flex flex-col shrink-0">
          <div className="h-12 border-b border-white/5 flex items-center justify-center md:justify-start md:px-4 shrink-0">
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <Filter size={12} className="text-white" />
            </div>
            <div className="hidden md:flex flex-col ml-2">
               <span className="text-xs font-bold text-white/90 tracking-wide leading-none">GrowthFlow</span>
               <span className="text-[8px] text-white/40 font-medium mt-0.5">Acme Corp Workspace</span>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-1 p-2 mt-2 overflow-y-auto custom-scrollbar">
            <NavItem icon={LayoutDashboard} label="Overview" isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            <NavItem icon={Filter} label="Funnel Builder" isActive={activeTab === 'funnels'} onClick={() => setActiveTab('funnels')} />
            <NavItem icon={Target} label="Pipeline" isActive={activeTab === 'pipeline'} onClick={() => setActiveTab('pipeline')} />
            <NavItem icon={Calendar} label="Meetings" isActive={activeTab === 'meetings'} onClick={() => setActiveTab('meetings')} />
            <NavItem icon={Mail} label="Campaigns" isActive={activeTab === 'campaigns'} onClick={() => setActiveTab('campaigns')} />
            <NavItem icon={BarChart2} label="Analytics" isActive={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
            <div className="mt-auto pt-4 border-t border-white/5">
               <NavItem icon={Settings} label="Settings" isActive={false} onClick={() => {}} />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 relative bg-[#050505] overflow-hidden flex flex-col">
          
          {/* Topbar */}
          <div className="h-12 border-b border-white/5 bg-[#0f0f11] flex items-center justify-between px-4 shrink-0 z-30">
            <div className="flex items-center gap-2">
               <span className="text-[10px] md:text-xs font-medium text-white/50 capitalize">{activeTab.replace('-', ' ')}</span>
            </div>
            <div className="flex items-center gap-4">
               <div className="hidden md:flex items-center bg-white/5 rounded-md px-2 py-1 gap-2 border border-white/5">
                 <Search size={12} className="text-white/30" />
                 <span className="text-[9px] text-white/30">Search leads, campaigns...</span>
                 <span className="text-[8px] text-white/20 bg-white/5 px-1 rounded ml-4">⌘K</span>
               </div>
               <div className="relative">
                 <Bell size={14} className="text-white/40 hover:text-white/80 cursor-pointer transition-colors" />
                 <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-purple-500" />
               </div>
               <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden cursor-pointer">
                  <img src="https://i.pravatar.cc/100?img=47" alt="User" className="w-full h-full object-cover opacity-80" />
               </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && <OverviewView key="overview" />}
              {activeTab === 'funnels' && <FunnelsView key="funnels" />}
              {activeTab === 'pipeline' && <PipelineView key="pipeline" />}
              {activeTab === 'meetings' && <MeetingsView key="meetings" />}
              {activeTab === 'campaigns' && <CampaignsView key="campaigns" />}
              {activeTab === 'analytics' && <AnalyticsView key="analytics" />}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </BrowserFrame>
  );
}

// ---------------------------------------------------------
// Navigation Item Component
// ---------------------------------------------------------
function NavItem({ icon: Icon, label, isActive, onClick }: { icon: any, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`w-full h-9 rounded-lg flex items-center justify-center md:justify-start md:px-3 cursor-pointer transition-all duration-200 group ${
        isActive 
          ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[inset_0_0_10px_rgba(168,85,247,0.1)]' 
          : 'text-white/40 hover:text-white/90 hover:bg-white/5 border border-transparent'
      }`}
    >
      <Icon size={14} className={isActive ? 'text-purple-400' : 'group-hover:text-white/80 transition-colors'} />
      <span className="hidden md:block ml-3 text-[10px] font-medium tracking-wide">{label}</span>
    </div>
  );
}

// ---------------------------------------------------------
// Page Views
// ---------------------------------------------------------

function OverviewView() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-4 md:p-6 w-full h-full">
      <div className="max-w-5xl mx-auto space-y-6">
         <div className="flex justify-between items-end">
            <div>
              <h2 className="text-base font-bold text-white mb-1">Sales Overview</h2>
              <p className="text-[9px] text-white/50">Performance metrics for Q3 2026.</p>
            </div>
            <div className="flex gap-2">
               <button className="hidden md:block bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[9px] font-medium px-3 py-1 rounded transition-all">Export Report</button>
               <button className="bg-purple-600 hover:bg-purple-500 text-white text-[9px] font-medium px-3 py-1 rounded shadow-lg shadow-purple-500/20 transition-all flex items-center gap-1">
                 <Plus size={10}/> New Lead
               </button>
            </div>
         </div>

         {/* KPI Cards */}
         <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Total Revenue", value: "$142,500", change: "+34%", icon: DollarSign, color: "emerald" },
              { label: "New Leads", value: "2,845", change: "+12%", icon: Users, color: "purple" },
              { label: "Appointments", value: "142", change: "+8%", icon: Calendar, color: "blue" },
              { label: "Conversion Rate", value: "4.8%", change: "+1.2%", icon: Target, color: "orange" }
            ].map((kpi, i) => (
              <div key={i} className="bg-[#121214] border border-white/5 rounded-xl p-3 shadow-xl relative overflow-hidden group">
                 <div className={`absolute top-0 right-0 w-32 h-32 bg-${kpi.color}-500/5 blur-[40px] rounded-full group-hover:bg-${kpi.color}-500/10 transition-colors`} />
                 <div className="flex items-center gap-2 mb-2 relative z-10">
                   <div className={`w-5 h-5 rounded bg-${kpi.color}-500/10 flex items-center justify-center text-${kpi.color}-400`}><kpi.icon size={10}/></div>
                   <div className="text-[8px] text-white/40 uppercase tracking-wider font-semibold">{kpi.label}</div>
                 </div>
                 <div className="flex items-end justify-between relative z-10">
                   <div className="text-lg font-bold text-white leading-none">{kpi.value}</div>
                   <div className="text-[8px] font-medium text-emerald-400 flex items-center gap-0.5"><ArrowUpRight size={8}/> {kpi.change}</div>
                 </div>
              </div>
            ))}
         </div>

         {/* Chart & Recent Leads */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#121214] border border-white/5 rounded-xl p-3 shadow-xl">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-[11px] font-semibold text-white/80">Revenue Growth</h3>
                 <select className="bg-white/5 border border-white/10 rounded text-[9px] text-white/60 px-2 py-1 outline-none"><option>Last 30 Days</option></select>
               </div>
               <div className="h-[200px] flex items-end justify-between gap-2 px-2 relative">
                  {/* Fake Chart Grid */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                    {[1,2,3,4].map(i => <div key={i} className="w-full border-t border-white/10 border-dashed" />)}
                  </div>
                  {/* Animated Bars */}
                  {[40, 60, 45, 80, 55, 90, 100, 85, 110, 95].map((height, i) => (
                    <div key={i} className="w-full flex flex-col items-center gap-2 group cursor-pointer relative z-10">
                      <motion.div 
                        initial={{ height: 0 }} animate={{ height: `${height}%` }} transition={{ duration: 1, delay: i * 0.05 }}
                        className={`w-full rounded-t-sm ${i === 9 ? 'bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'bg-white/10 group-hover:bg-purple-400/50'} transition-colors origin-bottom`}
                      />
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-[#121214] border border-white/5 rounded-xl p-3 shadow-xl flex flex-col">
               <h3 className="text-[11px] font-semibold text-white/80 mb-3">Recent Leads</h3>
               <div className="flex-1 space-y-3">
                  {[
                    { name: "Michael T.", company: "Acme Corp", status: "Hot", time: "10m ago" },
                    { name: "Sarah J.", company: "TechStart", status: "Warm", time: "1h ago" },
                    { name: "David L.", company: "Global Inc", status: "Cold", time: "3h ago" },
                    { name: "Emma W.", company: "Design Co", status: "Hot", time: "5h ago" }
                  ].map((lead, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded hover:bg-white/[0.02] cursor-pointer transition-colors border border-transparent hover:border-white/5">
                       <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/70">{lead.name.charAt(0)}</div>
                          <div>
                            <div className="text-[10px] font-medium text-white/90">{lead.name}</div>
                            <div className="text-[8px] text-white/40">{lead.company}</div>
                          </div>
                       </div>
                       <div className="flex flex-col items-end gap-1">
                          <span className={`text-[7px] px-1.5 py-0.5 rounded font-bold uppercase ${
                            lead.status === 'Hot' ? 'bg-orange-500/20 text-orange-400' : 
                            lead.status === 'Warm' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
                          }`}>{lead.status}</span>
                          <span className="text-[7px] text-white/30">{lead.time}</span>
                       </div>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-4 py-1.5 border border-white/10 rounded text-[9px] text-white/50 hover:text-white/80 transition-colors">View All Leads</button>
            </div>
         </div>
      </div>
    </motion.div>
  );
}

function FunnelsView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 w-full h-full flex flex-col">
       <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-white">Funnel Builder <span className="text-[10px] font-medium text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded ml-2 border border-purple-500/20">Active</span></h2>
       </div>

       {/* Visual Funnel */}
       <div className="flex-1 flex flex-col items-center justify-center gap-2 relative">
          
          <div className="w-full max-w-md bg-[#161618] border border-white/10 rounded-xl p-4 shadow-xl z-10 flex justify-between items-center hover:border-purple-500/30 transition-colors cursor-pointer group">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center"><Users size={14}/></div>
                <div>
                   <div className="text-xs font-semibold text-white/90 group-hover:text-purple-400 transition-colors">Traffic Source</div>
                   <div className="text-[9px] text-white/40">Facebook Ads • Google SEO</div>
                </div>
             </div>
             <div className="text-right">
                <div className="text-lg font-bold text-white">45.2k</div>
                <div className="text-[9px] text-white/40">Visitors</div>
             </div>
          </div>

          {/* Connection */}
          <div className="w-0.5 h-6 bg-gradient-to-b from-blue-500/50 to-purple-500/50 relative">
             <motion.div className="w-2 h-2 rounded-full bg-white absolute -left-[3px] top-0 shadow-[0_0_10px_white]" animate={{ top: ['0%', '100%'] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} />
          </div>

          <div className="w-[90%] max-w-md bg-[#161618] border border-white/10 rounded-xl p-4 shadow-xl z-10 flex justify-between items-center hover:border-purple-500/30 transition-colors cursor-pointer group">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center"><Filter size={14}/></div>
                <div>
                   <div className="text-xs font-semibold text-white/90 group-hover:text-purple-400 transition-colors">Opt-in Landing Page</div>
                   <div className="text-[9px] text-white/40">12% Conversion Rate</div>
                </div>
             </div>
             <div className="text-right">
                <div className="text-lg font-bold text-white">5.4k</div>
                <div className="text-[9px] text-white/40">Leads Captured</div>
             </div>
          </div>

          {/* Connection */}
          <div className="w-0.5 h-6 bg-gradient-to-b from-purple-500/50 to-orange-500/50 relative">
             <motion.div className="w-2 h-2 rounded-full bg-white absolute -left-[3px] top-0 shadow-[0_0_10px_white]" animate={{ top: ['0%', '100%'] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.5 }} />
          </div>

          <div className="w-[80%] max-w-md bg-[#161618] border border-white/10 rounded-xl p-4 shadow-xl z-10 flex justify-between items-center hover:border-orange-500/30 transition-colors cursor-pointer group">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center"><Calendar size={14}/></div>
                <div>
                   <div className="text-xs font-semibold text-white/90 group-hover:text-orange-400 transition-colors">Booking Page</div>
                   <div className="text-[9px] text-white/40">28% Qualification Rate</div>
                </div>
             </div>
             <div className="text-right">
                <div className="text-lg font-bold text-white">1.5k</div>
                <div className="text-[9px] text-white/40">Calls Booked</div>
             </div>
          </div>

          {/* Connection */}
          <div className="w-0.5 h-6 bg-gradient-to-b from-orange-500/50 to-emerald-500/50 relative">
             <motion.div className="w-2 h-2 rounded-full bg-white absolute -left-[3px] top-0 shadow-[0_0_10px_white]" animate={{ top: ['0%', '100%'] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 1 }} />
          </div>

          <div className="w-[70%] max-w-md bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 shadow-[0_0_30px_rgba(16,185,129,0.15)] z-10 flex justify-between items-center cursor-pointer group">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center"><CheckCircle2 size={14}/></div>
                <div>
                   <div className="text-xs font-semibold text-emerald-400">Closed Customers</div>
                   <div className="text-[9px] text-emerald-500/70">8.5% Close Rate</div>
                </div>
             </div>
             <div className="text-right">
                <div className="text-lg font-bold text-emerald-400">129</div>
                <div className="text-[9px] text-emerald-500/70">New Clients</div>
             </div>
          </div>

       </div>
    </motion.div>
  );
}

function PipelineView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 w-full h-full flex flex-col">
       <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-white">Sales Pipeline</h2>
          <div className="flex gap-2">
             <div className="bg-[#121214] border border-white/10 px-3 py-1.5 rounded flex items-center gap-2 text-[10px] text-white/50"><Search size={12}/> Search deals...</div>
             <button className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-medium px-3 py-1.5 rounded transition-all flex items-center gap-1">
               <Filter size={12}/> Filter
             </button>
          </div>
       </div>

       {/* Kanban Pipeline */}
       <div className="flex-1 flex gap-4 overflow-x-auto custom-scrollbar pb-4">
          
          <PipelineColumn title="New Lead" count={12} total="$45k" color="blue">
             <LeadCard name="Stark Industries" contact="Tony S." value="$12,000" days="2 days ago" />
             <LeadCard name="Wayne Ent." contact="Bruce W." value="$8,500" days="Just now" />
          </PipelineColumn>

          <PipelineColumn title="Contacted" count={8} total="$32k" color="orange">
             <LeadCard name="Daily Bugle" contact="J. Jonah" value="$4,200" days="1 day ago" />
          </PipelineColumn>

          {/* Animated Drag Simulation */}
          <PipelineColumn title="Meeting Set" count={5} total="$85k" color="purple">
             <motion.div 
               animate={{ y: [0, -5, 0], scale: [1, 1.02, 1], boxShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 10px 20px rgba(168,85,247,0.2)", "0px 0px 0px rgba(0,0,0,0)"] }}
               transition={{ duration: 3, repeat: Infinity }}
               className="bg-[#1C1C1E] border border-purple-500/50 rounded-lg p-3 shadow-lg cursor-grab relative z-50"
             >
                <div className="flex justify-between items-start mb-2">
                   <h4 className="text-xs font-semibold text-white/90">Oscorp Inc</h4>
                   <span className="text-[9px] font-mono text-purple-400 bg-purple-500/10 px-1.5 rounded">$24,000</span>
                </div>
                <div className="text-[9px] text-white/40 mb-3">Contact: Norman O.</div>
                <div className="flex items-center justify-between text-[8px] text-white/30">
                   <span className="flex items-center gap-1"><Clock size={10}/> Meeting Tomorrow</span>
                </div>
             </motion.div>
             <LeadCard name="Pym Tech" contact="Hank P." value="$61,000" days="3 days ago" />
          </PipelineColumn>

          <PipelineColumn title="Proposal Sent" count={3} total="$42k" color="yellow">
             <LeadCard name="Stark Ind (Upsell)" contact="Pepper P." value="$42,000" days="4 hours ago" />
          </PipelineColumn>

       </div>
    </motion.div>
  );
}

function PipelineColumn({ title, count, total, color, children }: any) {
  return (
    <div className="w-[260px] flex flex-col shrink-0">
       <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
          <div className="flex items-center gap-2">
             <div className={`w-2 h-2 rounded-full bg-${color}-500`} />
             <span className="text-xs font-semibold text-white/80">{title}</span>
             <span className="text-[9px] bg-white/10 px-1.5 rounded text-white/50">{count}</span>
          </div>
          <span className="text-[10px] font-mono text-white/40">{total}</span>
       </div>
       <div className="flex-1 flex flex-col gap-3">
          {children}
       </div>
    </div>
  )
}

function LeadCard({ name, contact, value, days }: any) {
  return (
    <div className="bg-[#161618] border border-white/5 hover:border-white/20 rounded-lg p-3 shadow-sm cursor-pointer transition-colors">
       <div className="flex justify-between items-start mb-2">
          <h4 className="text-xs font-semibold text-white/90">{name}</h4>
          <span className="text-[9px] font-mono text-white/70">{value}</span>
       </div>
       <div className="text-[9px] text-white/40 mb-3">Contact: {contact}</div>
       <div className="flex items-center justify-between text-[8px] text-white/30">
          <span>{days}</span>
       </div>
    </div>
  )
}

// ---------------------------------------------------------
// Placeholder Views for other pages
// ---------------------------------------------------------
function MeetingsView() { return <PlaceholderView title="Calendar & Meetings" icon={Calendar} /> }
function CampaignsView() { return <PlaceholderView title="Outreach Campaigns" icon={Mail} /> }
function AnalyticsView() { return <PlaceholderView title="Advanced Revenue Analytics" icon={BarChart2} /> }

function PlaceholderView({ title, icon: Icon }: any) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center h-full text-center p-6">
       <Icon size={32} className="text-white/10 mb-4" />
       <h3 className="text-sm font-semibold text-white/90 mb-1">{title}</h3>
       <p className="text-[10px] text-white/40 max-w-xs">This feature is fully integrated in the live production version of GrowthFlow.</p>
    </motion.div>
  )
}
