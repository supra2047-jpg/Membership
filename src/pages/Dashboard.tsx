import React, { useState, useEffect } from 'react';
import { Menu, Bell, PersonStanding, CreditCard, Mail, Edit3, ArrowRight, Plus, Search, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { Activity } from '../types';

export default function Dashboard() {
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock Activities
  const [activities] = useState<Activity[]>([
    { id: '1', type: 'join', title: 'Sarah Jenkins เข้าร่วมแล้ว', description: 'ระดับพรีเมียม • 2 นาทีที่แล้ว', timestamp: new Date().toISOString() },
    { id: '2', type: 'payment', title: 'ชำระค่าต่ออายุ', description: 'Michael Chen • 15 นาทีที่แล้ว', timestamp: new Date().toISOString() },
    { id: '3', type: 'system', title: 'ส่งการแจ้งเตือนวันหมดอายุแล้ว', description: 'ผู้ใช้งาน 5 ราย • 1 ชั่วโมงที่แล้ว', timestamp: new Date().toISOString() },
    { id: '4', type: 'edit', title: 'อัปเดตโปรไฟล์แล้ว', description: 'Alex Rivera • 3 ชั่วโมงที่แล้ว', timestamp: new Date().toISOString() },
  ]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('อรุณสวัสดิ์');
    else if (hour < 17) setGreeting('สวัสดีตอนบ่าย');
    else setGreeting('สวัสดีตอนเย็น');

    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: 'สมาชิกทั้งหมด', value: '12,840', trend: '+12%', icon: PersonStanding },
    { label: 'ใช้งานอยู่ตอนนี้', value: '8,420', trend: '+5%', icon: TrendingUp },
    { label: 'สมัครสมาชิกใหม่', value: '145', trend: '+8%', icon: Plus },
    { label: 'แจ้งเตือนหมดอายุ', value: '12', trend: '-2%', isCritical: true },
  ];

  const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'];
  const chartData = [40, 55, 48, 70, 65, 85];

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg pb-24 text-brand-text selection:bg-brand-accent/30">
      {/* Top Header */}
      <header className="flex items-center justify-between px-6 py-8 border-b border-white/5 bg-[#0A0A0B]/50 backdrop-blur-xl sticky top-0 z-30">
        <div className="flex items-center gap-5">
          <div className="w-10 h-10 rounded-full glass-border flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
            <Menu className="text-zinc-500" size={20} />
          </div>
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">System Node A-12</h2>
            <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-white">แผงควบคุม</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end mr-2 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
             <span>{currentTime.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}</span>
             <span className="text-brand-accent">{currentTime.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <button className="relative p-3 bg-white/5 rounded-full border border-white/5 hover:border-brand-accent/50 transition-all group">
            <Bell size={18} className="text-brand-accent group-hover:scale-110 transition-transform" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-accent rounded-full shadow-[0_0_8px_rgba(193,164,126,0.6)]"></span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full pt-10">
        {/* Welcome Section */}
        <section className="px-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-2"
          >
            <h2 className="text-5xl font-serif italic text-white tracking-tight leading-none group">
              {greeting}, <span className="text-brand-accent/80 group-hover:text-brand-accent transition-colors duration-700">ผู้ดูแลระบบ</span>
            </h2>
            <p className="text-xs text-zinc-500 uppercase tracking-[0.2em] font-medium flex items-center gap-3">
              <span className="w-8 h-px bg-zinc-800"></span>
              ข้อมูลสรุปผู้ใช้งาน &bull; ระยะที่ 01
            </p>
          </motion.div>
        </section>

        {/* Quick Search */}
        <section className="px-6 mb-10">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-brand-accent transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="ค้นหาสมาชิก หรือ บันทึกย่อ..."
              className="w-full h-16 bg-white/5 border border-white/5 rounded-full pl-16 pr-8 text-[10px] font-bold tracking-[0.2em] uppercase outline-none focus:border-brand-accent/30 transition-all placeholder:text-zinc-800"
            />
          </div>
        </section>

        {/* Core Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              key={stat.label}
              className="glass-card p-6 flex flex-col gap-4 group cursor-pointer hover:border-white/10"
            >
              <div className="flex justify-between items-start">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-300 transition-colors">{stat.label}</p>
                {stat.isCritical && <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]"></div>}
              </div>
              <div>
                <h3 className="text-3xl font-light text-white tracking-tighter mb-1">{stat.value}</h3>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${stat.isCritical ? 'text-red-400' : 'text-brand-accent'}`}>
                    {stat.trend}
                  </span>
                  <span className="text-[8px] text-zinc-700 font-bold uppercase tracking-tighter">เทียบกับเดือนก่อน</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Curation & Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 px-6 mb-12">
          {/* Analysis Chart */}
          <div className="md:col-span-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-white">ความเปลี่ยนแปลงของสมาชิก</h3>
              <div className="flex gap-4">
                <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest cursor-pointer hover:text-white">ไตรมาส 1</span>
                <span className="text-[9px] font-bold text-brand-accent border-b border-brand-accent/40 uppercase tracking-widest cursor-pointer">ไตรมาส 2</span>
              </div>
            </div>
            <div className="glass-card p-10 h-[320px] flex items-end justify-between gap-4">
              {chartData.map((val, i) => (
                <div key={i} className="flex flex-col items-center flex-1 gap-4 h-full justify-end group">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    transition={{ duration: 1.2, ease: "circOut", delay: i * 0.1 }}
                    className={`w-full rounded-t-lg transition-all duration-500 ${i === chartData.length - 1 ? 'bg-gradient-to-t from-brand-accent to-brand-accent/50 shadow-[0_0_30px_rgba(193,164,126,0.15)]' : 'bg-zinc-800/50 group-hover:bg-zinc-800'}`}
                  ></motion.div>
                  <span className={`text-[9px] font-black uppercase tracking-[0.2em] transition-colors ${i === chartData.length - 1 ? 'text-brand-accent' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                    {months[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Archival Logs */}
          <div className="md:col-span-4 flex flex-col">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-white mb-6">กิจกรรมล่าสุด</h3>
            <div className="glass-card flex-1 divide-y divide-white/5 overflow-hidden">
              {activities.map((act) => (
                <div key={act.id} className="p-5 hover:bg-white/5 transition-all cursor-pointer group flex gap-4 items-start">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-accent/30 group-hover:bg-brand-accent transition-colors"></div>
                  <div>
                    <h4 className="text-[11px] font-bold text-zinc-200 leading-tight mb-1">{act.title}</h4>
                    <p className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold">{act.description}</p>
                  </div>
                </div>
              ))}
              <button className="w-full p-4 text-[9px] font-black uppercase tracking-[0.3em] text-brand-accent hover:bg-brand-accent/5 transition-all">
                ซิงค์ลำดับสมบูรณ์ &bull; ดูเพิ่มเติม
              </button>
            </div>
          </div>
        </div>

        {/* Global CTA */}
        <section className="px-6 mb-12">
          <div className="bg-brand-accent rounded-[40px] p-12 text-black relative overflow-hidden group cursor-pointer active:scale-[0.99] transition-all">
            <div className="relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">อัปเกรดเชิงกลยุทธ์</span>
              <h4 className="text-4xl font-serif italic leading-none mb-8 tracking-tighter">ขยายเครือข่ายของคุณ <br/>ด้วยความเร็วสูงสุด</h4>
              <button className="bg-black text-[#E0E0E0] px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 transition-all">
                เริ่มใช้งานระบบอัตโนมัติ
              </button>
            </div>
            <div className="absolute right-[-10%] bottom-[-20%] opacity-10 pointer-events-none">
               <TrendingUp size={300} strokeWidth={0.5} className="-rotate-12" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
