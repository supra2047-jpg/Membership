import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative text-brand-text">
      {/* Back Button */}
      <div className="p-6 flex items-center">
        <button className="p-2 -ml-2 text-zinc-500 hover:text-white transition-colors">
          <ArrowLeft size={24} strokeWidth={1.5} />
        </button>
        <h2 className="ml-4 text-[10px] uppercase tracking-[0.3em] font-bold text-white">Authentication</h2>
      </div>

      <main className="flex-1 max-w-md mx-auto w-full px-8 pt-12 pb-24 flex flex-col">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "circOut" }}
        >
          <h1 className="text-5xl font-serif italic text-white mb-4 tracking-tight">Obsidian Studio</h1>
          <p className="text-zinc-500 mb-12 uppercase tracking-widest text-[10px] font-bold">Please verify your credentials to continue</p>
        </motion.div>

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-3">
            <label className="text-[9px] font-bold text-brand-accent uppercase tracking-[0.2em] ml-1">Email Identifier</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-brand-accent transition-colors" size={18} strokeWidth={1.5} />
              <input 
                type="email" 
                placeholder="identity@aethel.studio"
                className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl pl-14 pr-4 outline-none focus:border-brand-accent/30 transition-all font-light tracking-wide text-sm placeholder:text-zinc-700"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[9px] font-bold text-brand-accent uppercase tracking-[0.2em] ml-1">Access Protocol</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-brand-accent transition-colors" size={18} strokeWidth={1.5} />
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="••••••••"
                className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl pl-14 pr-16 outline-none focus:border-brand-accent/30 transition-all font-light tracking-wide text-sm placeholder:text-zinc-700"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input type="checkbox" className="peer sr-only" />
                <div className="w-5 h-5 border border-white/10 rounded bg-white/5 peer-checked:bg-brand-accent peer-checked:border-brand-accent transition-all"></div>
                <div className="absolute opacity-0 peer-checked:opacity-100 transition-opacity">
                   <div className="w-2 h-1 border-l-2 border-b-2 border-black rotate-[-45deg] translate-y-[-1px]"></div>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors">Persistent Session</span>
            </label>
            <a href="#" className="text-[10px] font-bold text-brand-accent uppercase tracking-widest hover:brightness-110">Recover Access</a>
          </div>

          <button className="w-full h-16 bg-brand-accent text-black rounded-full font-bold text-[11px] uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(193,164,126,0.1)] hover:brightness-110 active:scale-[0.98] transition-all mt-6">
            Initialize Login
          </button>
        </form>

        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-[9px] uppercase tracking-[0.3em] font-bold text-zinc-600">
            <span className="bg-brand-surface/80 px-6 py-1 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] italic font-serif lowercase">or explore via</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-3 glass-border h-14 rounded-full bg-white/5 hover:bg-white/10 transition-colors group">
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" alt="Google" referrerPolicy="no-referrer" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-white">Google</span>
          </button>
          <button className="flex items-center justify-center gap-3 glass-border h-14 rounded-full bg-white/5 hover:bg-white/10 transition-colors group">
            <svg className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg"><path d="M11.4 24l-11.4-11.4 11.4-11.4 11.4 11.4z" fill="currentColor" /></svg>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-white">Microsoft</span>
          </button>
        </div>

        <div className="mt-auto pt-16 text-center space-y-8">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            New Entity? <a href="#" className="text-brand-accent hover:brightness-110">Contact Support</a>
          </p>
          <div className="flex items-center justify-center gap-6 text-[9px] font-bold text-zinc-600 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <span className="w-1 h-1 bg-zinc-800 rounded-full"></span>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </main>
    </div>
  );
}
