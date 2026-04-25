import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bell, Edit2, Shield, Users, Calendar, CheckCircle, ChevronRight, UserPlus, Settings, Smartphone, Save, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'ผู้ดูแลระบบ',
    email: 'admin@organization.com',
    phone: '+66 81-234-5678',
    security: 'Tier 1 Security',
    company: 'สถาบันนวัตกรรมแห่งชาติ',
    department: 'บริหารจัดการสมาชิก'
  });

  const [editForm, setEditForm] = useState(profileData);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('admin_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProfileData(parsed);
        setEditForm(parsed);
      } catch (e) {}
    }
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setEditForm(profileData); // Reset on cancel
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setProfileData(editForm);
      localStorage.setItem('admin_profile', JSON.stringify(editForm));
      setIsEditing(false);
      setIsSaving(false);
      showToast('บันทึกข้อมูลส่วนตัวสำเร็จ');
    }, 800);
  };

  const stats = [
    { label: 'กลุ่มทั้งหมด', value: '24', icon: Users },
    { label: 'กิจกรรมที่จัด', value: '12', icon: Calendar },
    { label: 'เป็นสมาชิกตั้งแต่ปี', value: '2021', icon: CheckCircle },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg pb-24 font-sans text-brand-text">
      {/* Header */}
      <header className="glass-border bg-brand-bg/80 backdrop-blur-md border-b sticky top-0 z-20">
        <div className="flex items-center justify-between px-6 py-5 max-w-screen-xl mx-auto w-full">
          <div className="flex items-center gap-6">
            <button className="text-zinc-500 hover:text-white transition-colors">
              <ArrowLeft size={24} strokeWidth={1.5} />
            </button>
            <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-white">โปรไฟล์</h1>
          </div>
          <button className="text-brand-accent">
            <Bell size={22} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-screen-xl mx-auto w-full">
        {/* Profile Hero */}
        <section className="p-6">
          <div className="glass-card p-10 flex flex-col items-center">
            <div className="relative mb-8 group">
              <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-brand-accent to-zinc-800">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&h=200&auto=format&fit=crop"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            {isEditing ? (
              <input 
                type="text" 
                value={editForm.name} 
                onChange={e => setEditForm({...editForm, name: e.target.value})}
                className="text-2xl text-center bg-white/5 border border-white/10 rounded-lg px-4 py-2 font-serif italic text-white mb-2 outline-none focus:border-brand-accent/50 selection:bg-brand-accent/30"
              />
            ) : (
              <h2 className="text-4xl font-serif italic text-white mb-2 tracking-tight">{profileData.name}</h2>
            )}

            <div className="flex items-center gap-2 mb-10">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent">สมาชิกปัจจุบัน</span>
            </div>
            
            {isEditing ? (
              <div className="flex gap-4 w-full">
                <button 
                  onClick={handleEditToggle}
                  disabled={isSaving}
                  className="flex-1 bg-white/5 text-zinc-400 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all disabled:opacity-50"
                >
                  ยกเลิก
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-[2] bg-brand-accent text-black py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  {isSaving ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
                </button>
              </div>
            ) : (
              <button 
                onClick={handleEditToggle}
                className="w-full bg-brand-accent text-black py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Edit2 size={14} /> แก้ไขโปรไฟล์
              </button>
            )}
          </div>
        </section>

        {/* Info Stats */}
        <section className="px-6 mb-10">
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  key={stat.label}
                  className="glass-card p-6 flex flex-col items-center text-center gap-2"
                >
                  <span className="text-2xl font-light text-white tracking-tight">{stat.value}</span>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-zinc-500">
                    <Icon size={10} className="text-brand-accent" />
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Detailed Sections */}
        <div className="px-6 space-y-10 mb-10">
          <section>
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-accent mb-6">ข้อมูลส่วนตัว</h3>
            <div className="space-y-4">
              <div className="glass-card p-6 group">
                <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mb-3">ที่อยู่อีเมล</p>
                {isEditing ? (
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={e => setEditForm({...editForm, email: e.target.value})}
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white outline-none focus:border-brand-accent/50"
                  />
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">{profileData.email}</p>
                    <ChevronRight size={16} className="text-zinc-700 group-hover:text-brand-accent transition-colors hidden" />
                  </div>
                )}
              </div>
              <div className="glass-card p-6 group">
                <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mb-3">เบอร์โทรศัพท์</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={e => setEditForm({...editForm, phone: e.target.value})}
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white outline-none focus:border-brand-accent/50"
                  />
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">{profileData.phone}</p>
                    <ChevronRight size={16} className="text-zinc-700 group-hover:text-brand-accent transition-colors hidden" />
                  </div>
                )}
              </div>
              <div className="glass-card p-6 group">
                <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mb-3">สถานะความปลอดภัย</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield size={16} className="text-brand-accent" strokeWidth={1.5} />
                    <p className="text-sm font-medium text-white">{profileData.security}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-accent mb-6">องค์กร</h3>
            <div className="space-y-4">
              <div className="glass-card p-6 group">
                <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mb-3">หน่วยงาน</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.company}
                    onChange={e => setEditForm({...editForm, company: e.target.value})}
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white outline-none focus:border-brand-accent/50 font-serif italic"
                  />
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium italic font-serif text-white tracking-wide">{profileData.company}</p>
                  </div>
                )}
              </div>
              <div className="glass-card p-6 group">
                <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mb-3">แผนก</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.department}
                    onChange={e => setEditForm({...editForm, department: e.target.value})}
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white outline-none focus:border-brand-accent/50"
                  />
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">{profileData.department}</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-accent mb-6">ไทม์ไลน์กิจกรรม</h3>
            <div className="space-y-6 ml-4 border-l glass-border pl-8">
              <div className="relative">
                <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-brand-bg glass-border flex items-center justify-center">
                   <div className="w-1.5 h-1.5 rounded-full bg-brand-accent"></div>
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-widest mb-1">สมาชิกใหม่ 5 ท่าน</p>
                  <p className="text-[10px] text-zinc-500 uppercase font-medium">2 ชั่วโมงที่แล้ว &bull; รอการอนุมัติ</p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-brand-bg glass-border flex items-center justify-center">
                   <div className="w-1.5 h-1.5 rounded-full bg-zinc-700"></div>
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">อัปเดตการตั้งค่า</p>
                  <p className="text-[10px] text-zinc-600 uppercase font-medium">เมื่อวานนี้ &bull; บันทึกระบบ</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed bottom-24 sm:bottom-10 left-1/2 -translate-x-1/2 z-50 px-6 py-4 bg-zinc-900 border border-white/10 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex items-center gap-3"
            >
              <CheckCircle size={16} className="text-brand-accent" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white whitespace-nowrap">
                {toast}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
