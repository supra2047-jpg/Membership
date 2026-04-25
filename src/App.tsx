import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import BottomNav from './components/BottomNav';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Members from './pages/Members';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      case 'members':
        return <Members />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg font-sans max-w-screen-md mx-auto relative shadow-[0_0_100px_rgba(0,0,0,0.5)] border-x border-white/5">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "circOut" }}
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
      
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

