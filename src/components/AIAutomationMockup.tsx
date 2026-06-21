import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LayoutDashboard, Workflow, MessageSquare, BarChart2, Settings, Play, Bot, Share2, Database, Plus, Search, Bell, CheckCircle2, Layers } from 'lucide-react';
import BrowserFrame from './BrowserFrame';

export default function AIAutomationMockup() {
  const [activeTab, setActiveTab] = useState('workflows');

  return (
    <BrowserFrame url="https://app.flowai.com" title="FlowAI">
      <div className="flex h-full w-full bg-[#0A0A0B] text-white font-sans overflow-hidden">
        
        {/* Sidebar */}
        <div className="w-14 md:w-48 border-r border-white/5 bg-[#121214] flex flex-col shrink-0">
          <div className="h-12 border-b border-white/5 flex items-center justify-center md:justify-start md:px-4 shrink-0">
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <Bot size={12} className="text-white" />
            </div>
            <span className="hidden md:block ml-2 text-xs font-bold text-white/90 tracking-wide">FlowAI</span>
          </div>
          
          <div className="flex-1 flex flex-col gap-1 p-2 mt-2 overflow-y-auto custom-scrollbar">
            <NavItem icon={LayoutDashboard} label="Dashboard" isActive={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
            <NavItem icon={Workflow} label="Workflows" isActive={activeTab === 'workflows'} onClick={() => setActiveTab('workflows')} />
            <NavItem icon={Share2} label="Integrations" isActive={activeTab === 'integrations'} onClick={() => setActiveTab('integrations')} />
            <NavItem icon={Layers} label="Templates" isActive={activeTab === 'templates'} onClick={() => setActiveTab('templates')} />
            <NavItem icon={MessageSquare} label="Messages" isActive={activeTab === 'messages'} onClick={() => setActiveTab('messages')} />
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
               <span className="text-[10px] md:text-xs font-medium text-white/50 capitalize">{activeTab}</span>
            </div>
            <div className="flex items-center gap-3">
               <Search size={14} className="text-white/40 hover:text-white/80 cursor-pointer transition-colors" />
               <div className="relative">
                 <Bell size={14} className="text-white/40 hover:text-white/80 cursor-pointer transition-colors" />
                 <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-blue-500" />
               </div>
               <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden cursor-pointer">
                  <img src="https://i.pravatar.cc/100?img=33" alt="User" className="w-full h-full object-cover opacity-80" />
               </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
            <AnimatePresence mode="wait">
              {activeTab === 'dashboard' && <DashboardView key="dashboard" />}
              {activeTab === 'workflows' && <WorkflowsView key="workflows" />}
              {activeTab === 'integrations' && <IntegrationsView key="integrations" />}
              {activeTab === 'templates' && <TemplatesView key="templates" />}
              {activeTab === 'messages' && <MessagesView key="messages" />}
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
          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[inset_0_0_10px_rgba(59,130,246,0.1)]' 
          : 'text-white/40 hover:text-white/90 hover:bg-white/5 border border-transparent'
      }`}
    >
      <Icon size={14} className={isActive ? 'text-blue-400' : 'group-hover:text-white/80 transition-colors'} />
      <span className="hidden md:block ml-3 text-[10px] font-medium tracking-wide">{label}</span>
    </div>
  );
}

// ---------------------------------------------------------
// Page Views
// ---------------------------------------------------------

function DashboardView() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      className="p-4 md:p-6 w-full h-full"
    >
      <div className="max-w-4xl mx-auto space-y-4">
         <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-base font-bold text-white mb-1">Welcome back, Alex.</h2>
              <p className="text-[9px] text-white/50">Your automations saved you 42 hours this week.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 text-white text-[9px] font-medium px-3 py-1.5 rounded shadow-lg shadow-blue-500/20 transition-all flex items-center gap-1">
              <Plus size={10}/> New Flow
            </button>
         </div>

         {/* KPI Cards */}
         <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Active Flows", value: "14", change: "+2", color: "blue" },
              { label: "Executions (30d)", value: "128.4K", change: "+14%", color: "emerald" },
              { label: "Tasks Automated", value: "842K", change: "+8%", color: "purple" }
            ].map((kpi, i) => (
              <div key={i} className="bg-[#121214] border border-white/5 rounded-xl p-3 shadow-xl">
                 <div className="text-[8px] text-white/40 uppercase tracking-wider mb-1">{kpi.label}</div>
                 <div className="flex items-end gap-2">
                   <div className="text-lg font-bold text-white leading-none">{kpi.value}</div>
                   <div className={`text-[8px] font-medium mb-0.5 ${
                     kpi.color === 'blue' ? 'text-blue-400' : kpi.color === 'emerald' ? 'text-emerald-400' : 'text-purple-400'
                   }`}>{kpi.change}</div>
                 </div>
              </div>
            ))}
         </div>

         {/* Recent Activity */}
         <div className="bg-[#121214] border border-white/5 rounded-xl p-4 shadow-xl mt-6">
            <h3 className="text-xs font-semibold text-white/80 mb-4">Live Execution Feed</h3>
            <div className="space-y-3">
               {[
                 { flow: "Lead Routing", time: "Just now", status: "Success", node: "HubSpot CRM" },
                 { flow: "Customer Onboarding", time: "2m ago", status: "Success", node: "SendGrid Email" },
                 { flow: "Invoice Processor", time: "15m ago", status: "Success", node: "Stripe API" },
                 { flow: "Support Triage", time: "1h ago", status: "Warning", node: "OpenAI Token Limit" }
               ].map((log, i) => (
                 <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0 group cursor-pointer hover:bg-white/[0.02] -mx-2 px-2 rounded">
                    <div className="flex items-center gap-3">
                       <div className={`w-1.5 h-1.5 rounded-full ${log.status === 'Success' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                       <div>
                         <div className="text-[10px] font-medium text-white/90 group-hover:text-blue-400 transition-colors">{log.flow}</div>
                         <div className="text-[8px] text-white/40">{log.node}</div>
                       </div>
                    </div>
                    <div className="text-[9px] text-white/30">{log.time}</div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </motion.div>
  );
}

function WorkflowsView() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full relative"
    >
      <div className="absolute inset-0 bg-[#0A0A0B] overflow-auto custom-scrollbar">
        <div className="w-[600px] h-[300px] relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />

          {/* SVG Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
             {/* Base Lines */}
             <motion.path d="M 140 100 L 220 100" stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none" />
             <motion.path d="M 360 100 C 400 100, 400 60, 440 60" stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none" />
             <motion.path d="M 360 100 C 400 100, 400 140, 440 140" stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none" />

             {/* Animated Flow Lines */}
             <motion.path d="M 140 100 L 220 100" stroke="#3B82F6" strokeWidth="3" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, repeat: Infinity }} />
             <motion.path d="M 360 100 C 400 100, 400 60, 440 60" stroke="#A855F7" strokeWidth="3" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }} />
             <motion.path d="M 360 100 C 400 100, 400 140, 440 140" stroke="#10B981" strokeWidth="3" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }} />

             {/* Animated Data Packets */}
             <motion.circle r="4" fill="#60A5FA" className="shadow-[0_0_10px_#60A5FA]">
               <animateMotion dur="1.5s" repeatCount="indefinite" path="M 140 100 L 220 100" />
             </motion.circle>
             <motion.circle r="4" fill="#C084FC" className="shadow-[0_0_10px_#C084FC]">
               <animateMotion dur="1.5s" begin="0.5s" repeatCount="indefinite" path="M 360 100 C 400 100, 400 60, 440 60" />
             </motion.circle>
          </svg>

          {/* Nodes */}
          <div className="relative w-full h-full z-20">
             <div onClick={() => setSelectedNode('webhook')} className={`absolute left-[20px] top-[80px] w-[120px] bg-[#161618] border ${selectedNode === 'webhook' ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-white/10'} rounded-xl shadow-xl cursor-pointer hover:border-white/30 transition-all`}>
               <div className="px-3 py-2 flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center text-blue-400"><MessageSquare size={12}/></div>
                  <span className="text-[10px] font-medium text-white/90">WhatsApp In</span>
               </div>
             </div>

             <div onClick={() => setSelectedNode('gpt')} className={`absolute left-[220px] top-[70px] w-[140px] bg-[#161618] border ${selectedNode === 'gpt' ? 'border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'border-purple-500/50'} rounded-xl shadow-xl cursor-pointer hover:border-purple-500 transition-all`}>
               <div className="px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center text-purple-400"><Bot size={12}/></div>
                    <span className="text-[10px] font-medium text-white/90">GPT-4o Parse</span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_#10B981]" />
               </div>
             </div>

             <div className="absolute left-[440px] top-[40px] w-[130px] bg-[#161618] border border-white/10 rounded-xl shadow-xl opacity-70">
               <div className="px-3 py-2 flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-orange-500/20 flex items-center justify-center text-orange-400"><Play size={12}/></div>
                  <span className="text-[10px] font-medium text-white/90">Zendesk Ticket</span>
               </div>
             </div>

             <div onClick={() => setSelectedNode('crm')} className={`absolute left-[440px] top-[120px] w-[130px] bg-[#161618] border ${selectedNode === 'crm' ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-emerald-500/40'} rounded-xl shadow-xl cursor-pointer hover:border-emerald-500 transition-all`}>
               <div className="px-3 py-2 flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-400"><Database size={12}/></div>
                  <span className="text-[10px] font-medium text-white/90">HubSpot CRM</span>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Side Panel Inspector */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div 
            initial={{ x: '100%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '100%', opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 bottom-0 w-[240px] bg-[#121214] border-l border-white/10 shadow-2xl z-50 flex flex-col"
          >
             <div className="h-12 border-b border-white/5 flex items-center justify-between px-4 shrink-0 bg-[#161618]">
                <span className="text-xs font-semibold text-white/90">Node Config</span>
                <button onClick={() => setSelectedNode(null)} className="text-white/40 hover:text-white transition-colors">✕</button>
             </div>
             <div className="p-4 flex-1 overflow-y-auto space-y-4 custom-scrollbar">
                {selectedNode === 'gpt' && (
                  <>
                    <div>
                      <label className="text-[8px] text-white/40 uppercase font-bold mb-1 block">Model</label>
                      <select className="w-full bg-[#0a0a0a] border border-white/10 rounded text-[10px] text-white p-2 outline-none focus:border-purple-500">
                         <option>gpt-4o-2024-05-13</option>
                         <option>claude-3-opus</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[8px] text-white/40 uppercase font-bold mb-1 block">System Prompt</label>
                      <textarea className="w-full h-32 bg-[#0a0a0a] border border-white/10 rounded text-[9px] text-white/70 p-2 outline-none focus:border-purple-500 font-mono resize-none" defaultValue={"Extract the user's intent, budget, and timeline from the incoming WhatsApp message. Output strictly as JSON."} />
                    </div>
                    <button className="w-full bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-medium py-2 rounded shadow-lg shadow-purple-500/20 transition-all">Test Step</button>
                  </>
                )}
                {selectedNode === 'webhook' && (
                  <div className="text-[10px] text-white/50">Listening on: <br/><span className="text-emerald-400 font-mono">https://api.flowai.com/v1/wh/8f92a...</span></div>
                )}
             </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}

function MessagesView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex w-full h-full">
       <div className="w-1/3 border-r border-white/5 bg-[#121214] flex flex-col">
          <div className="p-3 border-b border-white/5">
             <div className="bg-[#0a0a0a] border border-white/10 rounded px-2 py-1.5 flex items-center gap-2">
                <Search size={10} className="text-white/30" />
                <input type="text" placeholder="Search conversations..." className="bg-transparent text-[10px] text-white outline-none w-full placeholder:text-white/30" />
             </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
             {[
               { name: "+1 (555) 019-2834", msg: "I'd like to book a demo.", time: "10:42 AM", unread: true },
               { name: "Sarah Jenkins", msg: "Perfect, the pricing works.", time: "Yesterday", unread: false },
               { name: "Michael T.", msg: "When can we start?", time: "Tuesday", unread: false }
             ].map((chat, i) => (
               <div key={i} className={`p-2 rounded-lg cursor-pointer flex flex-col gap-1 ${i === 0 ? 'bg-white/5' : 'hover:bg-white/[0.02]'}`}>
                  <div className="flex justify-between items-center">
                     <span className="text-[10px] font-semibold text-white/90">{chat.name}</span>
                     <span className="text-[8px] text-white/30">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className={`text-[9px] truncate w-32 ${chat.unread ? 'text-white/70 font-medium' : 'text-white/40'}`}>{chat.msg}</span>
                     {chat.unread && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                  </div>
               </div>
             ))}
          </div>
       </div>
       <div className="flex-1 bg-[#0A0A0B] flex flex-col">
          <div className="h-12 border-b border-white/5 flex items-center px-4 shrink-0 bg-[#0f0f11]">
             <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center mr-2"><MessageSquare size={10} className="text-emerald-400"/></div>
             <span className="text-xs font-semibold text-white">+1 (555) 019-2834</span>
             <span className="ml-auto text-[9px] px-2 py-1 bg-white/5 rounded border border-white/10 text-white/50">Via WhatsApp</span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
             <div className="flex justify-start">
                <div className="bg-[#1C1C1E] border border-white/5 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[70%]">
                   <p className="text-[10px] text-white/90">Hi, I'm interested in the enterprise package. I'd like to book a demo for my team of 15 next week.</p>
                   <span className="text-[7px] text-white/30 mt-1 block">10:42 AM</span>
                </div>
             </div>
             
             {/* AI Auto-reply badge */}
             <div className="flex justify-center my-2">
                <span className="text-[8px] text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                   <Bot size={8} /> Handled by AutoFlow AI
                </span>
             </div>

             <div className="flex justify-end">
                <div className="bg-emerald-600 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[70%]">
                   <p className="text-[10px] text-white">Hello! Thanks for reaching out. We'd love to show you the enterprise package.</p>
                   <p className="text-[10px] text-white mt-1">Here is a link to book a demo at your convenience: <span className="underline">cal.com/swebhub/demo</span></p>
                   <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-[7px] text-emerald-200">10:42 AM</span>
                      <CheckCircle2 size={8} className="text-emerald-200" />
                   </div>
                </div>
             </div>
          </div>
          <div className="p-3 border-t border-white/5 bg-[#0f0f11]">
             <div className="bg-[#1a1a1a] border border-white/10 rounded-full px-3 py-2 flex items-center">
                <input type="text" placeholder="Type a message... (AI is currently paused for this chat)" className="bg-transparent text-[10px] text-white outline-none w-full placeholder:text-white/30" />
             </div>
          </div>
       </div>
    </motion.div>
  );
}

function AnalyticsView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 w-full h-full flex flex-col items-center justify-center text-center">
       <BarChart2 size={32} className="text-white/10 mb-4" />
       <h3 className="text-sm font-semibold text-white/90 mb-1">Advanced Analytics</h3>
       <p className="text-[10px] text-white/40 max-w-xs">Connect your data warehouse to unlock predictive workflow insights and ROI calculation.</p>
       <button className="mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-[10px] font-medium text-white transition-colors">Upgrade to Pro</button>
    </motion.div>
  )
}

function IntegrationsView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 w-full h-full">
       <h2 className="text-lg font-bold text-white mb-6">App Integrations</h2>
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["WhatsApp Business", "Slack", "HubSpot CRM", "Stripe", "Gmail", "Google Sheets", "Salesforce", "Zendesk"].map((app, i) => (
             <div key={i} className="bg-[#121214] border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-white/20 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                   <Share2 size={16} className="text-white/50 group-hover:text-blue-400" />
                </div>
                <div className="text-[10px] font-medium text-white/90">{app}</div>
                <div className="text-[8px] text-emerald-400 mt-1 flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"/> Connected</div>
             </div>
          ))}
       </div>
    </motion.div>
  )
}

function TemplatesView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 w-full h-full flex flex-col items-center justify-center text-center">
       <Layers size={32} className="text-white/10 mb-4" />
       <h3 className="text-sm font-semibold text-white/90 mb-1">Workflow Templates</h3>
       <p className="text-[10px] text-white/40 max-w-xs">Start building faster with 150+ pre-configured AI automation templates for Sales, Support, and Marketing.</p>
       <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-[10px] font-medium text-white transition-colors shadow-lg shadow-blue-500/20">Browse Template Library</button>
    </motion.div>
  )
}
