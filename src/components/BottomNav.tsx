import React from 'react';
import { Home, Users, User, Settings as SettingsIcon } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'dashboard', label: 'หน้าแรก', icon: Home },
    { id: 'members', label: 'สมาชิก', icon: Users },
    { id: 'profile', label: 'โปรไฟล์', icon: User },
    { id: 'settings', label: 'ตั้งค่า', icon: SettingsIcon },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-brand-surface/50 backdrop-blur-2xl border-t border-white/10 px-4 py-3 pb-safe flex justify-around items-end sm:max-w-screen-md sm:mx-auto">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              isActive ? 'text-brand-accent' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <div className={`p-1.5 transition-colors ${isActive ? 'bg-white/5 rounded-full' : ''}`}>
              <Icon size={22} strokeWidth={isActive ? 1.5 : 2} />
            </div>
            <span className={`text-[9px] uppercase tracking-widest font-bold ${isActive ? 'opacity-100' : 'opacity-60'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
