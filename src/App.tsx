import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import IntroPreloader from './components/IntroPreloader';
import GlobalNav from './components/GlobalNav';
import PageLayout from './layouts/PageLayout';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HostProtectedRoute from './components/HostProtectedRoute';

// Pages
import Home from './pages/Home';
import ServicesHub from './pages/ServicesHub';
import WebsiteDevelopment from './pages/WebsiteDevelopment';
import AIAutomation from './pages/AIAutomation';
import LeadGeneration from './pages/LeadGeneration';
import BusinessSystems from './pages/BusinessSystems';
import Portfolio from './pages/Portfolio';
import AboutServices from './pages/AboutServices';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import HostDashboard from './pages/HostDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AgencyPolicy from './pages/AgencyPolicy';
import ClickSpark from './components/ClickSpark';
import AIChatbot from './components/AIChatbot';
import Footer from './components/Footer';

function App() {
  const location = useLocation();
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <AuthProvider>
      <ClickSpark sparkColor="#ffffff" sparkSize={12} sparkRadius={20} sparkCount={6} duration={500}>
        <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20 selection:text-white flex flex-col">
      
      {/* Intro — sits above EVERYTHING, no other UI visible */}
      <IntroPreloader onIntroComplete={() => setIntroComplete(true)} />
      
      {/* Nav + Chatbot — only appear after intro completes */}
      <AnimatePresence>
        {introComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlobalNav />
          </motion.div>
        )}
      </AnimatePresence>
      
      <main className="w-full relative">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageLayout><Home /></PageLayout>} />
            <Route path="/services" element={<PageLayout><AboutServices /></PageLayout>} />
            <Route path="/services/website-development" element={<PageLayout><WebsiteDevelopment /></PageLayout>} />
            <Route path="/services/ai-automation" element={<PageLayout><AIAutomation /></PageLayout>} />
            <Route path="/services/lead-generation-systems" element={<PageLayout><LeadGeneration /></PageLayout>} />
            <Route path="/services/business-systems" element={<PageLayout><BusinessSystems /></PageLayout>} />
            <Route path="/portfolio" element={<PageLayout><Portfolio /></PageLayout>} />
            <Route path="/pricing" element={<PageLayout><Pricing /></PageLayout>} />
            <Route path="/contact" element={<PageLayout><Contact /></PageLayout>} />
            
            {/* Legal Pages */}
            <Route path="/privacy-policy" element={<PageLayout><PrivacyPolicy /></PageLayout>} />
            <Route path="/terms-of-service" element={<PageLayout><TermsOfService /></PageLayout>} />
            <Route path="/agency-policy" element={<PageLayout><AgencyPolicy /></PageLayout>} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<PageLayout><Login /></PageLayout>} />
            <Route path="/register" element={<PageLayout><Register /></PageLayout>} />
            <Route path="/forgot-password" element={<PageLayout><ForgotPassword /></PageLayout>} />
            <Route path="/phone-number" element={
              <ProtectedRoute>
                <PageLayout><Onboarding /></PageLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <PageLayout><Dashboard /></PageLayout>
              </ProtectedRoute>
            } />
            <Route path="/host-dashboard" element={
              <HostProtectedRoute>
                <PageLayout><HostDashboard /></PageLayout>
              </HostProtectedRoute>
            } />
          </Routes>
        </AnimatePresence>
        
        {introComplete && <AIChatbot />}
        {introComplete && <Footer />}
        </main>
      </div>
      </ClickSpark>
    </AuthProvider>
  );
}

export default App;
