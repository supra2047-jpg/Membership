import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight, Mail, Bell, Lock, Layout, Moon, Sun, Shield, Globe, CheckCircle, Loader2, Save, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Settings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [systemNotif, setSystemNotif] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState('THAI');

  // Account State
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [accountData, setAccountData] = useState({
    email: 'admin@organization.com',
    idPattern: 'MEM-YYYY-XXXX'
  });
  const [accountDraft, setAccountDraft] = useState(accountData);

  // Password State
  const [passwords, setPasswords] = useState({ current: '', new: '' });
  const [passStatus, setPassStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // Global Save State
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Load initial from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('app_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setEmailNotif(parsed.emailNotif ?? true);
        setSystemNotif(parsed.systemNotif ?? false);
        setIsDarkMode(parsed.isDarkMode ?? true);
        setLanguage(parsed.language ?? 'THAI');
        if (parsed.accountData) setAccountData(parsed.accountData);
      } catch (e) {}
    }
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveAccount = () => {
    setAccountData(accountDraft);
    setIsEditingAccount(false);
    showToast('อัปเดตข้อมูลบัญชีสำเร็จ');
  };

  const handleVerifyCredentials = () => {
    if (!passwords.current || !passwords.new) {
      showToast('กรุณากรอกรหัสผ่านให้ครบถ้วน');
      return;
    }
    setPassStatus('loading');
    setTimeout(() => {
      setPassStatus('success');
      setPasswords({ current: '', new: '' });
      showToast('เปลี่ยนรหัสผ่านสำเร็จ');
      setTimeout(() => setPassStatus('idle'), 2000);
    }, 1500);
  };

  const handleCommitChanges = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('app_settings', JSON.stringify({
        emailNotif,
        systemNotif,
        isDarkMode,
        language,
        accountData
      }));
      setIsSaving(false);
      showToast('บันทึกการตั้งค่าสำเร็จ');
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent pb-24 text-brand-text">
      {/* Header */}
      <header className="glass-border bg-brand-surface/60 backdrop-blur-xl border-b sticky top-0 z-20">
        <div className="flex items-center px-6 py-5 max-w-screen-xl mx-auto w-full">
          <button className="text-zinc-500 hover:text-white transition-colors">
            <ArrowLeft size={24} strokeWidth={1.5} />
          </button>
          <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-white ml-6">การตั้งค่า</h1>
        </div>
      </header>

      <main className="p-6 space-y-8 max-w-screen-xl mx-auto w-full relative">
        {/* Account Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between ml-2">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-accent">การตั้งค่าบัญชีทั่วไป</h3>
            {isEditingAccount ? (
              <div className="flex gap-2">
                <button 
                  onClick={() => { setIsEditingAccount(false); setAccountDraft(accountData); }}
                  className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors flex items-center gap-1"
                >
                  <X size={12} /> ยกเลิก
                </button>
                <button 
                  onClick={handleSaveAccount}
                  className="text-[9px] font-bold uppercase tracking-widest text-brand-accent hover:brightness-110 transition-all flex items-center gap-1"
                >
                  <Save size={12} /> บันทึก
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { setAccountDraft(accountData); setIsEditingAccount(true); }}
                className="text-[9px] font-bold uppercase tracking-widest text-brand-accent hover:brightness-110 transition-all"
              >
                แก้ไข
              </button>
            )}
          </div>
          <div className="glass-card divide-y divide-white/5 overflow-hidden">
            <div className="w-full flex items-center justify-between p-6 transition-all text-left">
              <div className="flex items-center gap-4 w-full">
                <div className="p-3 bg-white/5 rounded-full glass-border text-brand-accent shrink-0">
                  <Mail size={18} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">อีเมลหลัก</p>
                  {isEditingAccount ? (
                    <input 
                      type="email"
                      value={accountDraft.email}
                      onChange={(e) => setAccountDraft({...accountDraft, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm font-medium text-white outline-none focus:border-brand-accent/50"
                    />
                  ) : (
                    <p className="text-sm font-medium text-white">{accountData.email}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full flex items-center justify-between p-6 transition-all text-left">
              <div className="flex items-center gap-4 w-full">
                <div className="p-3 bg-white/5 rounded-full glass-border text-brand-accent shrink-0">
                  <Shield size={18} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">รูปแบบไอดีสมาชิก</p>
                  {isEditingAccount ? (
                    <input 
                      type="text"
                      value={accountDraft.idPattern}
                      onChange={(e) => setAccountDraft({...accountDraft, idPattern: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm font-medium text-white outline-none focus:border-brand-accent/50"
                    />
                  ) : (
                    <p className="text-sm font-medium text-white tracking-widest">{accountData.idPattern}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="space-y-4">
          <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-accent ml-2">การแจ้งเตือน</h3>
          <div className="glass-card p-6 space-y-6">
            <div className="flex items-center justify-between group">
              <div className="flex-1">
                <p className="text-sm font-medium text-white">แจ้งเตือนทางอีเมล</p>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">สรุปรายงานรายสัปดาห์</p>
              </div>
              <button 
                onClick={() => setEmailNotif(!emailNotif)}
                className={`w-12 h-6 rounded-full transition-all relative flex items-center px-1 border border-white/10 ${emailNotif ? 'bg-brand-accent' : 'bg-zinc-900'}`}
              >
                <motion.div 
                  layout
                  className={`w-4 h-4 rounded-full shadow-lg ${emailNotif ? 'bg-black translate-x-6' : 'bg-zinc-700 translate-x-0'}`}
                ></motion.div>
              </button>
            </div>
            <div className="flex items-center justify-between group">
              <div className="flex-1">
                <p className="text-sm font-medium text-white">แจ้งเตือนในระบบ</p>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">แจ้งเตือนสถานะสำคัญ</p>
              </div>
              <button 
                onClick={() => setSystemNotif(!systemNotif)}
                className={`w-12 h-6 rounded-full transition-all relative flex items-center px-1 border border-white/10 ${systemNotif ? 'bg-brand-accent' : 'bg-zinc-900'}`}
              >
                <motion.div 
                  layout
                  className={`w-4 h-4 rounded-full shadow-lg ${systemNotif ? 'bg-black translate-x-6' : 'bg-zinc-700 translate-x-0'}`}
                ></motion.div>
              </button>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="space-y-4">
          <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-accent ml-2">ความปลอดภัย</h3>
          <div className="glass-card p-8 space-y-8">
            <div className="space-y-3">
              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">รหัสผ่านปัจจุบัน</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-700" size={16} strokeWidth={1.5} />
                <input 
                  type="password" 
                  value={passwords.current}
                  onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                  placeholder="••••••••"
                  className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl pl-14 pr-4 outline-none focus:border-brand-accent/30 transition-all font-light tracking-widest text-sm"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">รหัสผ่านใหม่</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-700" size={16} strokeWidth={1.5} />
                <input 
                  type="password" 
                  value={passwords.new}
                  onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                  placeholder="••••••••"
                  className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl pl-14 pr-4 outline-none focus:border-brand-accent/30 transition-all font-light tracking-widest text-sm"
                />
              </div>
            </div>
            <button 
              onClick={handleVerifyCredentials}
              disabled={passStatus === 'loading'}
              className="w-full h-14 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.3em] text-white rounded-full hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {passStatus === 'loading' ? (
                <><Loader2 size={14} className="animate-spin" /> กำลังตรวจสอบ...</>
              ) : passStatus === 'success' ? (
                <><CheckCircle size={14} className="text-green-400" /> ยืนยันแล้ว</>
              ) : (
                'เปลี่ยนรหัสผ่าน'
              )}
            </button>
          </div>
        </section>

        {/* Display Settings */}
        <section className="space-y-4">
          <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-accent ml-2">การแสดงผล</h3>
          <div className="glass-card p-6 space-y-8">
            <div>
              <p className="text-sm font-medium text-white mb-4">โหมดการแสดงผล</p>
              <div className="flex gap-2 p-1.5 bg-zinc-900/50 rounded-full border border-white/5 w-fit">
                <button 
                  onClick={() => { setIsDarkMode(false); showToast('ถูกล็อกให้ใช้งานในโหมดมืดโดยผู้ดูแลระบบ'); }}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${!isDarkMode ? 'bg-brand-accent text-black shadow-lg' : 'text-zinc-500'}`}
                >
                  <Sun size={14} /> สว่าง
                </button>
                <button 
                  onClick={() => setIsDarkMode(true)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${isDarkMode ? 'bg-brand-accent text-black shadow-lg' : 'text-zinc-500'}`}
                >
                  <Moon size={14} /> มืด
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-medium text-white">ภาษาที่เลือก</p>
              <div className="relative group">
                <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-700" size={16} />
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl pl-14 pr-8 text-[10px] font-bold uppercase tracking-widest text-zinc-300 outline-none appearance-none focus:border-brand-accent/30 transition-all"
                >
                  <option value="THAI" className="bg-zinc-900">ไทย (THAI)</option>
                  <option value="ENGLISH (US)" className="bg-zinc-900">ENGLISH (US)</option>
                  <option value="JAPANESE" className="bg-zinc-900">日本語 (JAPANESE)</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-700">
                    <ChevronRight size={16} className="rotate-90" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Action */}
        <div className="py-8">
            <button 
            onClick={handleCommitChanges}
            disabled={isSaving}
            className="w-full h-16 bg-brand-accent text-black rounded-full font-bold text-[11px] uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(193,164,126,0.1)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSaving ? <Loader2 className="animate-spin" size={18} /> : null}
            {isSaving ? 'กำลังบันทึกข้อมูล...' : 'บันทึกการเปลี่ยนแปลงทั้งหมด'}
          </button>
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
