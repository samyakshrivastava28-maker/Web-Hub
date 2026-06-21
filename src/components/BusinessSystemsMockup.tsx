import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LayoutDashboard, FolderKanban, Users, Receipt, CheckSquare, LineChart, Settings, Plus, Search, Bell, Menu, CircleDashed, CheckCircle2, Circle, MoreHorizontal, ArrowRight, MessageSquare, Paperclip, ChevronDown, ChevronRight } from 'lucide-react';
import BrowserFrame from './BrowserFrame';

export default function BusinessSystemsMockup() {
  const [activeTab, setActiveTab] = useState('tasks');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BrowserFrame url="https://app.coreops.com/workspace/tasks" title="CoreOps">
      <div className="flex h-full w-full bg-[#FAFAFA] dark:bg-[#0A0A0B] text-black dark:text-white font-sans overflow-hidden">
        
        {/* Sidebar */}
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.div 
              initial={{ width: 0, opacity: 0 }} 
              animate={{ width: 220, opacity: 1 }} 
              exit={{ width: 0, opacity: 0 }}
              className="border-r border-black/5 dark:border-white/5 bg-[#F4F4F5] dark:bg-[#121214] flex flex-col shrink-0 overflow-hidden"
            >
              <div className="h-12 border-b border-black/5 dark:border-white/5 flex items-center px-4 shrink-0 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <div className="w-5 h-5 rounded bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-[10px]">CO</div>
                <div className="flex flex-col ml-2 flex-1">
                   <span className="text-[11px] font-bold text-black/90 dark:text-white/90 leading-none">Acme Corp</span>
                   <span className="text-[9px] text-black/50 dark:text-white/50 font-medium mt-0.5">Free Plan</span>
                </div>
                <ChevronDown size={12} className="text-black/40 dark:text-white/40" />
              </div>
              
              <div className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-0.5 custom-scrollbar">
                <div className="text-[8px] font-bold text-black/40 dark:text-white/40 uppercase tracking-wider px-2 mb-1">Workspace</div>
                <NavItem icon={LayoutDashboard} label="Dashboard" isActive={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
                <NavItem icon={FolderKanban} label="Projects" isActive={activeTab === 'projects'} onClick={() => setActiveTab('projects')} />
                <NavItem icon={Users} label="Clients" isActive={activeTab === 'clients'} onClick={() => setActiveTab('clients')} />
                <NavItem icon={Receipt} label="Invoices" isActive={activeTab === 'invoices'} onClick={() => setActiveTab('invoices')} />
                
                <div className="text-[8px] font-bold text-black/40 dark:text-white/40 uppercase tracking-wider px-2 mt-4 mb-1 flex items-center justify-between">
                  <span>Your Work</span>
                  <Plus size={10} className="cursor-pointer hover:text-black dark:hover:text-white" />
                </div>
                <NavItem icon={CheckSquare} label="Active Tasks" isActive={activeTab === 'tasks'} onClick={() => setActiveTab('tasks')} />
                <NavItem icon={LineChart} label="Reports" isActive={activeTab === 'reports'} onClick={() => setActiveTab('reports')} />
              </div>

              <div className="p-3 border-t border-black/5 dark:border-white/5 mt-auto">
                 <div className="flex items-center gap-2 cursor-pointer group">
                    <img src="https://i.pravatar.cc/100?img=11" alt="User" className="w-7 h-7 rounded-md object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div className="flex flex-col">
                       <span className="text-[10px] font-medium text-black/80 dark:text-white/80">John Doe</span>
                       <span className="text-[8px] text-black/40 dark:text-white/40">Settings</span>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="flex-1 relative bg-white dark:bg-[#050505] overflow-hidden flex flex-col">
          
          {/* Topbar */}
          <div className="h-12 border-b border-black/5 dark:border-white/5 bg-white/50 dark:bg-[#0f0f11]/80 backdrop-blur-md flex items-center justify-between px-4 shrink-0 z-30">
            <div className="flex items-center gap-3">
               <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">
                 <Menu size={14} />
               </button>
               <div className="flex items-center text-[10px] md:text-xs font-medium">
                  <span className="text-black/40 dark:text-white/40">Workspace</span>
                  <ChevronRight size={12} className="mx-1 text-black/20 dark:text-white/20" />
                  <span className="text-black/80 dark:text-white/90 capitalize">{activeTab}</span>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="hidden md:flex items-center bg-black/5 dark:bg-white/5 rounded-md px-2 py-1 gap-2 border border-black/5 dark:border-white/5">
                 <Search size={12} className="text-black/30 dark:text-white/30" />
                 <span className="text-[9px] text-black/40 dark:text-white/30">Search anything...</span>
               </div>
               <div className="relative">
                 <Bell size={14} className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white cursor-pointer transition-colors" />
               </div>
               <button className="bg-black dark:bg-white text-white dark:text-black text-[10px] font-medium px-3 py-1.5 rounded-md flex items-center gap-1 hover:opacity-90 transition-opacity">
                 <Plus size={12} /> Create
               </button>
            </div>
          </div>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
            <AnimatePresence mode="wait">
              {activeTab === 'dashboard' && <DashboardView key="dashboard" />}
              {activeTab === 'tasks' && <TasksView key="tasks" />}
              {activeTab === 'projects' && <ProjectsView key="projects" />}
              {activeTab === 'clients' && <ClientsView key="clients" />}
              {activeTab === 'invoices' && <PlaceholderView key="invoices" title="Billing & Invoices" icon={Receipt} />}
              {activeTab === 'reports' && <ReportsView key="reports" />}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </BrowserFrame>
  );
}

function NavItem({ icon: Icon, label, isActive, onClick }: { icon: any, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`w-full h-8 rounded-md flex items-center px-2 cursor-pointer transition-all duration-200 group ${
        isActive 
          ? 'bg-black/5 dark:bg-white/10 text-black dark:text-white font-medium' 
          : 'text-black/60 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'
      }`}
    >
      <Icon size={14} className={`shrink-0 ${isActive ? 'text-black dark:text-white' : 'text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white'} transition-colors`} />
      <span className="ml-2 text-[11px] tracking-wide">{label}</span>
    </div>
  );
}

// ---------------------------------------------------------
// Page Views
// ---------------------------------------------------------

function DashboardView() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-6 md:p-8 w-full max-w-5xl mx-auto space-y-8">
       <div>
         <h1 className="text-2xl font-semibold mb-1">Good morning, John</h1>
         <p className="text-[11px] text-black/50 dark:text-white/50">Here's what's happening across your workspace today.</p>
       </div>

       <div className="grid grid-cols-2 gap-3">
          {[
            { title: "Active Projects", value: "12", trend: "+2 this week" },
            { title: "Tasks Due Today", value: "5", trend: "3 high priority" },
            { title: "Outstanding Invoices", value: "$14,200", trend: "2 overdue" },
            { title: "Team Velocity", value: "84%", trend: "+5% vs last week" }
          ].map((kpi, i) => (
             <div key={i} className="bg-white dark:bg-[#121214] border border-black/5 dark:border-white/5 rounded-xl p-3 shadow-sm">
                <div className="text-[9px] text-black/50 dark:text-white/50 font-medium mb-1">{kpi.title}</div>
                <div className="text-lg font-semibold mb-0.5">{kpi.value}</div>
                <div className="text-[8px] text-black/40 dark:text-white/40">{kpi.trend}</div>
             </div>
          ))}
       </div>

       <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-[#121214] border border-black/5 dark:border-white/5 rounded-xl p-5 shadow-sm">
             <h3 className="text-sm font-semibold mb-4">My Priorities</h3>
             <div className="space-y-3">
                {[
                  { task: "Review Q3 Marketing Strategy", project: "Acme Rebrand", status: "In Progress" },
                  { task: "Approve final designs", project: "Website Launch", status: "To Do" },
                  { task: "Client check-in call", project: "TechCorp API", status: "To Do" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg cursor-pointer transition-colors -mx-2">
                     <CircleDashed size={14} className="text-black/30 dark:text-white/30" />
                     <div>
                        <div className="text-[11px] font-medium">{item.task}</div>
                        <div className="text-[9px] text-black/40 dark:text-white/40">{item.project}</div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
          
          <div className="bg-white dark:bg-[#121214] border border-black/5 dark:border-white/5 rounded-xl p-5 shadow-sm">
             <h3 className="text-sm font-semibold mb-4">Recent Activity</h3>
             <div className="space-y-4 relative">
                <div className="absolute left-[9px] top-2 bottom-2 w-px bg-black/10 dark:bg-white/10" />
                {[
                  { user: "Sarah", action: "completed task", target: "Setup Database", time: "2h ago" },
                  { user: "Mike", action: "uploaded file", target: "Hero_Image_v2.png", time: "4h ago" },
                  { user: "You", action: "created project", target: "Mobile App V2", time: "Yesterday" }
                ].map((act, i) => (
                  <div key={i} className="flex gap-3 relative z-10">
                     <div className="w-5 h-5 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center shrink-0 border border-white dark:border-[#121214]">
                        <span className="text-[8px] font-bold">{act.user.charAt(0)}</span>
                     </div>
                     <div className="flex flex-col mt-0.5">
                        <span className="text-[9px]"><span className="font-medium">{act.user}</span> <span className="text-black/50 dark:text-white/50">{act.action}</span> <span className="font-medium">{act.target}</span></span>
                        <span className="text-[8px] text-black/40 dark:text-white/40">{act.time}</span>
                     </div>
                  </div>
                ))}
             </div>
          </div>
       </div>
    </motion.div>
  );
}

function TasksView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 w-full h-full flex flex-col">
       <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-bold">Sprint Tasks</h2>
            <div className="flex items-center gap-2 text-[10px] text-black/50 dark:text-white/50 mt-1">
               <span className="bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">Website Redesign</span>
               <span>• 2 weeks remaining</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-lg">
             <button className="px-3 py-1.5 bg-white dark:bg-[#1A1A1C] shadow-sm rounded-md text-[10px] font-medium">Board</button>
             <button className="px-3 py-1.5 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white rounded-md text-[10px] font-medium transition-colors">List</button>
             <button className="px-3 py-1.5 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white rounded-md text-[10px] font-medium transition-colors">Timeline</button>
          </div>
       </div>

       {/* Kanban Board */}
       <div className="flex-1 flex gap-4 overflow-x-auto custom-scrollbar pb-4">
          
          <TaskColumn title="To Do" count={4}>
             <TaskCard title="Wireframe Homepage" tag="Design" tagColor="purple" pts="3" comments="2" />
             <TaskCard title="Setup Supabase Auth" tag="Backend" tagColor="blue" pts="5" comments="0" />
             <TaskCard title="Write copy for About page" tag="Content" tagColor="orange" pts="2" comments="5" />
          </TaskColumn>

          <TaskColumn title="In Progress" count={2}>
             <motion.div 
               animate={{ y: [0, -4, 0], rotate: [0, 1, 0], scale: [1, 1.02, 1], boxShadow: ["0px 1px 2px rgba(0,0,0,0.05)", "0px 15px 25px rgba(0,0,0,0.1)", "0px 1px 2px rgba(0,0,0,0.05)"] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="bg-white dark:bg-[#1C1C1E] border border-blue-500/50 rounded-xl p-3 cursor-grab relative z-50 dark:shadow-[0_0_20px_rgba(59,130,246,0.1)]"
             >
                <div className="flex gap-1 mb-2">
                   <span className="px-1.5 py-0.5 rounded-md text-[8px] font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400">Frontend</span>
                </div>
                <h4 className="text-xs font-semibold mb-3 leading-snug">Implement Dark Mode Toggle</h4>
                <div className="flex items-center justify-between text-[10px] text-black/40 dark:text-white/40">
                   <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><CheckSquare size={12}/> 1/3</span>
                      <span className="flex items-center gap-1"><MessageSquare size={12}/> 4</span>
                   </div>
                   <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-[8px]">JD</div>
                </div>
             </motion.div>
             
             <TaskCard title="Design System Tokens" tag="Design" tagColor="purple" pts="8" comments="12" />
          </TaskColumn>

          <TaskColumn title="In Review" count={1}>
             <TaskCard title="Stripe Integration" tag="Backend" tagColor="blue" pts="13" comments="8" />
          </TaskColumn>

          <TaskColumn title="Done" count={6}>
             <div className="opacity-50">
               <TaskCard title="Project Kickoff" tag="Planning" tagColor="emerald" pts="1" comments="0" />
             </div>
          </TaskColumn>

       </div>
    </motion.div>
  );
}

function TaskColumn({ title, count, children }: any) {
  return (
    <div className="w-[280px] flex flex-col shrink-0">
       <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
             <span className="text-[11px] font-semibold">{title}</span>
             <span className="text-[9px] bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded font-medium text-black/50 dark:text-white/50">{count}</span>
          </div>
          <MoreHorizontal size={14} className="text-black/30 dark:text-white/30 cursor-pointer" />
       </div>
       <div className="flex-1 flex flex-col gap-3">
          {children}
          <div className="h-8 rounded-lg border border-dashed border-black/10 dark:border-white/10 flex items-center justify-center text-[10px] font-medium text-black/40 dark:text-white/40 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors mt-1">
             + Add Task
          </div>
       </div>
    </div>
  )
}

function TaskCard({ title, tag, tagColor, pts, comments }: any) {
  return (
    <div className="bg-white dark:bg-[#1C1C1E] border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 rounded-xl p-3 shadow-sm hover:shadow-md cursor-pointer transition-all">
       <div className="flex gap-1 mb-2">
          <span className={`px-1.5 py-0.5 rounded-md text-[8px] font-semibold bg-${tagColor}-500/10 text-${tagColor}-600 dark:text-${tagColor}-400`}>{tag}</span>
       </div>
       <h4 className="text-xs font-semibold mb-3 leading-snug">{title}</h4>
       <div className="flex items-center justify-between text-[10px] text-black/40 dark:text-white/40">
          <div className="flex items-center gap-3">
             <span className="flex items-center gap-1" title="Story Points"><Circle size={10}/> {pts}</span>
             {comments > 0 && <span className="flex items-center gap-1"><MessageSquare size={12}/> {comments}</span>}
          </div>
          <div className="w-5 h-5 rounded-full bg-black/5 dark:bg-white/10 border border-white dark:border-[#1C1C1E] flex items-center justify-center">
             <Users size={10} className="text-black/30 dark:text-white/30"/>
          </div>
       </div>
    </div>
  )
}

function ProjectsView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 md:p-8 w-full max-w-5xl mx-auto space-y-6">
       <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Active Projects</h2>
          <button className="bg-black dark:bg-white text-white dark:text-black text-[10px] font-medium px-3 py-1.5 rounded-md flex items-center gap-1">
             <Plus size={12}/> New Project
          </button>
       </div>
       
       <div className="grid md:grid-cols-2 gap-4">
          <ProjectCard title="Website Redesign" client="Acme Corp" progress={65} status="On Track" color="blue" />
          <ProjectCard title="Mobile App V2" client="TechStart" progress={32} status="At Risk" color="orange" />
          <ProjectCard title="Marketing Automation" client="Global Inc" progress={88} status="On Track" color="emerald" />
          <ProjectCard title="Q4 Brand Campaign" client="Acme Corp" progress={10} status="Just Started" color="purple" />
       </div>
    </motion.div>
  )
}

function ProjectCard({ title, client, progress, status, color }: any) {
  return (
    <div className="bg-white dark:bg-[#121214] border border-black/5 dark:border-white/5 rounded-xl p-5 shadow-sm hover:shadow-md cursor-pointer transition-all group">
       <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-sm font-semibold mb-1 group-hover:text-blue-500 transition-colors">{title}</h3>
            <p className="text-[10px] text-black/50 dark:text-white/50">{client}</p>
          </div>
          <span className={`text-[8px] font-bold px-2 py-1 rounded-md bg-${color}-500/10 text-${color}-600 dark:text-${color}-400`}>{status}</span>
       </div>
       
       <div className="mb-2 flex justify-between items-end">
         <span className="text-[10px] font-medium text-black/70 dark:text-white/70">Progress</span>
         <span className="text-[10px] font-bold">{progress}%</span>
       </div>
       <div className="w-full bg-black/5 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1, ease: "easeOut" }} className={`bg-${color}-500 h-full rounded-full`} />
       </div>
    </div>
  )
}

function PlaceholderView({ title, icon: Icon }: any) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center h-full text-center p-6">
       <Icon size={32} className="text-black/10 dark:text-white/10 mb-4" />
       <h3 className="text-sm font-semibold mb-1">{title}</h3>
       <p className="text-[10px] text-black/40 dark:text-white/40 max-w-xs">This feature is fully integrated in the live production version of CoreOps.</p>
    </motion.div>
  )
}

function ClientsView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 md:p-8 w-full max-w-5xl mx-auto space-y-6">
       <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Client Directory</h2>
          <div className="flex gap-2">
             <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-3 py-1.5 rounded flex items-center gap-2 text-[10px] text-black/50 dark:text-white/50"><Search size={12}/> Search clients...</div>
             <button className="bg-black dark:bg-white text-white dark:text-black text-[10px] font-medium px-3 py-1.5 rounded-md flex items-center gap-1">
                <Plus size={12}/> Add Client
             </button>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "Acme Corp", contact: "Tony Stark", email: "tony@acme.com", rev: "$142,500", projects: 3 },
            { name: "TechStart Inc", contact: "Sarah Connor", email: "sarah@techstart.io", rev: "$84,200", projects: 1 },
            { name: "Global Logistics", contact: "Bruce Wayne", email: "bruce@global.com", rev: "$312,000", projects: 4 }
          ].map((client, i) => (
             <div key={i} className="bg-white dark:bg-[#121214] border border-black/5 dark:border-white/5 rounded-xl p-4 shadow-sm hover:shadow-md cursor-pointer transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-[30px] rounded-full group-hover:bg-blue-500/10 transition-colors" />
                <div className="flex items-center gap-3 mb-3 relative z-10">
                   <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center font-bold text-black/70 dark:text-white/70">
                      {client.name.charAt(0)}
                   </div>
                   <div>
                      <h3 className="text-xs font-semibold group-hover:text-blue-500 transition-colors">{client.name}</h3>
                      <p className="text-[9px] text-black/50 dark:text-white/50">{client.projects} Active Projects</p>
                   </div>
                </div>
                <div className="space-y-1.5 relative z-10">
                   <div className="flex justify-between text-[10px]">
                      <span className="text-black/50 dark:text-white/50">Contact</span>
                      <span className="font-medium">{client.contact}</span>
                   </div>
                   <div className="flex justify-between text-[10px]">
                      <span className="text-black/50 dark:text-white/50">Email</span>
                      <span className="font-medium">{client.email}</span>
                   </div>
                   <div className="flex justify-between text-[10px] pt-2 border-t border-black/5 dark:border-white/5 mt-2">
                      <span className="text-black/50 dark:text-white/50">Total Revenue</span>
                      <span className="font-bold text-emerald-500">{client.rev}</span>
                   </div>
                </div>
             </div>
          ))}
       </div>
    </motion.div>
  )
}

function ReportsView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 md:p-8 w-full max-w-5xl mx-auto space-y-6">
       <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Business Analytics</h2>
          <select className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded text-[10px] text-black/70 dark:text-white/70 px-2 py-1 outline-none"><option>Last 30 Days</option></select>
       </div>

       <div className="bg-white dark:bg-[#121214] border border-black/5 dark:border-white/5 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-6">Revenue Growth</h3>
          <div className="h-[250px] flex items-end justify-between gap-2 px-2 relative">
             <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
               {[1,2,3,4,5].map(i => <div key={i} className="w-full border-t border-black/10 dark:border-white/10 border-dashed" />)}
             </div>
             {[40, 60, 45, 80, 55, 90, 100, 85, 110, 95].map((height, i) => (
               <div key={i} className="w-full flex flex-col items-center gap-2 group cursor-pointer relative z-10">
                 <motion.div 
                   initial={{ height: 0 }} animate={{ height: `${height}%` }} transition={{ duration: 1, delay: i * 0.05 }}
                   className={`w-full rounded-t-sm ${i === 9 ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 'bg-black/10 dark:bg-white/10 group-hover:bg-blue-400/50'} transition-colors origin-bottom`}
                 />
               </div>
             ))}
          </div>
       </div>
    </motion.div>
  )
}
