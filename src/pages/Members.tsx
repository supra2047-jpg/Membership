import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, Filter, Edit2, Trash2, X, AlertTriangle, ArrowLeft, Upload, Check } from 'lucide-react';
import { Member } from '../types';

const INITIAL_MEMBERS: Member[] = [
  { id: 'MEM-2023-001', name: 'Sarah Jenkins', email: 'sarah.j@example.com', status: 'active', tier: 'premium', joinDate: '2023-10-12' },
  { id: 'MEM-2023-042', name: 'Michael Chen', email: 'm.chen@example.com', status: 'active', tier: 'enterprise', joinDate: '2023-11-05' },
  { id: 'MEM-2024-001', name: 'Alex Rivera', email: 'arivera@example.com', status: 'pending', tier: 'free', joinDate: '2024-01-20' },
  { id: 'MEM-2022-114', name: 'Emily Thorne', email: 'emily.t@example.com', status: 'inactive', tier: 'premium', joinDate: '2022-06-15' },
];

export default function Members() {
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  const [formData, setFormData] = useState<Partial<Member>>({});

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [csvData, setCsvData] = useState<{headers: string[], rows: string[][]}>({headers: [], rows: []});
  const [csvMapping, setCsvMapping] = useState<Record<string, string>>({});

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(search.toLowerCase()) || 
                          member.email.toLowerCase().includes(search.toLowerCase()) ||
                          member.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || member.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleOpenModal = (member?: Member) => {
    if (member) {
      setEditingMember(member);
      setFormData(member);
    } else {
      setEditingMember(null);
      setFormData({
        name: '',
        email: '',
        status: 'active',
        tier: 'free',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
    setFormData({});
  };

  const handleSave = () => {
    if (!formData.name || !formData.email) return;

    if (editingMember) {
      setMembers(members.map(m => m.id === editingMember.id ? { ...m, ...formData } as Member : m));
    } else {
      const newMember: Member = {
        id: `MEM-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        name: formData.name,
        email: formData.email,
        status: formData.status as any || 'active',
        tier: formData.tier as any || 'free',
        joinDate: new Date().toISOString().split('T')[0],
      };
      setMembers([newMember, ...members]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบรายการนี้?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim() !== '');
      if (lines.length < 2) {
        alert('ไฟล์ขัดข้อง หรือไม่มีข้อมูล');
        return;
      }
      
      const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
      const rows = lines.slice(1).map(line => {
        return line.split(',').map(c => c.trim().replace(/^["']|["']$/g, ''));
      });
      
      setCsvData({ headers, rows });
      
      const initialMapping: Record<string, string> = {
        name: headers.find(h => h.toLowerCase().includes('name')) || '',
        email: headers.find(h => h.toLowerCase().includes('email') || h.toLowerCase().includes('mail')) || '',
        status: headers.find(h => h.toLowerCase().includes('status')) || '',
        tier: headers.find(h => h.toLowerCase().includes('tier')) || '',
      };
      setCsvMapping(initialMapping);
      setIsImportModalOpen(true);
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset to allow same file again
  };

  const handleImportSubmit = () => {
    if (!csvMapping.name || !csvMapping.email) {
      alert("คุณต้องจับคู่ ชื่อ และ อีเมล เพื่อดำเนินการต่อ");
      return;
    }

    const nameIndex = csvData.headers.indexOf(csvMapping.name);
    const emailIndex = csvData.headers.indexOf(csvMapping.email);
    const statusIndex = csvMapping.status ? csvData.headers.indexOf(csvMapping.status) : -1;
    const tierIndex = csvMapping.tier ? csvData.headers.indexOf(csvMapping.tier) : -1;

    const newMembers: Member[] = csvData.rows.map((row, i) => {
      return {
        id: `MEM-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}-${i}`,
        name: row[nameIndex] || 'Unknown',
        email: row[emailIndex] || '',
        status: (statusIndex >= 0 ? (row[statusIndex] as any) : 'active') || 'active',
        tier: (tierIndex >= 0 ? (row[tierIndex] as any) : 'free') || 'free',
        joinDate: new Date().toISOString().split('T')[0],
      };
    }).filter(m => m.email); // Ensure required field

    setMembers([...newMembers, ...members]);
    setIsImportModalOpen(false);
    setCsvData({headers: [], rows: []});
    setCsvMapping({});
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent pb-24 text-brand-text">
      {/* Header */}
      <header className="glass-border bg-brand-surface/60 backdrop-blur-xl border-b sticky top-0 z-20">
        <div className="flex items-center px-6 py-5 max-w-screen-xl mx-auto w-full">
          <button className="text-zinc-500 hover:text-white transition-colors">
            <ArrowLeft size={24} strokeWidth={1.5} />
          </button>
          <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-white ml-6">ทะเบียนสมาชิก</h1>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full pt-10 px-6">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-serif italic text-white tracking-tight leading-none mb-2">ทำเนียบสมาชิก</h2>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">จำนวนทั้งหมด: {members.length}</p>
          </div>
          <div className="flex items-center gap-3 sm:flex-row flex-col">
            <label className="cursor-pointer bg-white/5 border border-white/5 text-zinc-300 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 active:scale-95 transition-all flex items-center gap-2">
              <Upload size={14} strokeWidth={2.5} /> นำเข้า CSV
              <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
            </label>
            <button 
              onClick={() => handleOpenModal()}
              className="bg-brand-accent text-black px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 w-full sm:w-auto"
            >
              <Plus size={14} strokeWidth={2.5} /> เพิ่มรายใหม่
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-brand-accent transition-colors" size={18} strokeWidth={1.5} />
            <input 
              type="text" 
              placeholder="ค้นหาด้วยชื่อ หรือ ไอดี..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 bg-white/5 border border-white/5 rounded-full pl-14 pr-6 text-[10px] font-bold tracking-[0.2em] uppercase outline-none focus:border-brand-accent/30 transition-all placeholder:text-zinc-700"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar shrink-0">
            {[
              { id: 'all', label: 'ทั้งหมด' },
              { id: 'active', label: 'ใช้งาน' },
              { id: 'pending', label: 'รอดำเนินการ' },
              { id: 'inactive', label: 'ไม่ใช้งาน' }
            ].map(state => (
              <button
                key={state.id}
                onClick={() => setFilter(state.id as any)}
                className={`px-5 h-14 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                  filter === state.id 
                    ? 'bg-zinc-800 text-brand-accent border border-white/10 shadow-lg' 
                    : 'bg-white/5 text-zinc-500 border border-white/5 hover:bg-white/10'
                }`}
              >
                {state.label}
              </button>
            ))}
          </div>
        </div>

        {/* Member List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredMembers.map(member => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 group hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full border border-white/10 bg-zinc-900/50 flex items-center justify-center text-sm font-serif italic text-white flex-shrink-0">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-sm mb-1">{member.name}</h3>
                    <div className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-widest text-zinc-500">
                      <span>{member.id}</span>
                      <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                      <span className="lowercase font-medium tracking-wider text-zinc-400">{member.email}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-4 sm:mt-0 border-t border-white/5 sm:border-none pt-4 sm:pt-0">
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-1 items-end sm:items-start">
                      <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">สถานะ</span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${
                        member.status === 'active' ? 'text-green-400' :
                        member.status === 'pending' ? 'text-amber-400' : 'text-red-400'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          member.status === 'active' ? 'bg-green-400' :
                          member.status === 'pending' ? 'bg-amber-400' : 'bg-red-400'
                        }`}></div>
                        {member.status === 'active' ? 'ใช้งาน' : member.status === 'pending' ? 'รอดำเนินการ' : 'ไม่ใช้งาน'}
                      </span>
                    </div>
                    
                    <div className="flex flex-col gap-1 items-end sm:items-start">
                      <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">ระดับ</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                        {member.tier}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleOpenModal(member)}
                      className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white"
                    >
                      <Edit2 size={16} strokeWidth={1.5} />
                    </button>
                    <button 
                      onClick={() => handleDelete(member.id)}
                      className="p-3 bg-red-500/5 hover:bg-red-500/10 rounded-full transition-colors text-red-500/70 hover:text-red-400"
                    >
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredMembers.length === 0 && (
            <div className="py-20 text-center">
              <AlertTriangle className="mx-auto mt-8 mb-4 text-zinc-700" size={48} strokeWidth={1} />
              <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px]">ไม่พบข้อมูลที่ตรงกับเงื่อนไข</p>
            </div>
          )}
        </div>
      </main>

      {/* Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0D0D0E] border border-white/10 rounded-[32px] w-full max-w-lg p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif italic text-white tracking-tight">
                  {editingMember ? 'แก้ไขข้อมูล' : 'สร้างรายการใหม่'}
                </h2>
                <button onClick={handleCloseModal} className="p-2 text-zinc-500 hover:text-white transition-colors bg-white/5 rounded-full">
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-brand-accent uppercase tracking-[0.2em] ml-1">ชื่อ / นามแฝง</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="ระบุชื่อ-นามสกุล"
                    className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-5 outline-none focus:border-brand-accent/30 transition-all font-light tracking-wide text-sm placeholder:text-zinc-700"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-brand-accent uppercase tracking-[0.2em] ml-1">อีเมลติดต่อ</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="entity@domain.ext"
                    className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-5 outline-none focus:border-brand-accent/30 transition-all font-light tracking-wide text-sm placeholder:text-zinc-700 lowercase"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-brand-accent uppercase tracking-[0.2em] ml-1">ระดับการเข้าถึง</label>
                    <select
                      value={formData.tier || 'free'}
                      onChange={e => setFormData({...formData, tier: e.target.value as any})}
                      className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-5 outline-none focus:border-brand-accent/30 transition-all font-bold tracking-widest uppercase text-[10px] text-zinc-300 appearance-none"
                    >
                      <option value="free" className="bg-zinc-900">ฟรี</option>
                      <option value="premium" className="bg-zinc-900">พรีเมียม</option>
                      <option value="enterprise" className="bg-zinc-900">องค์กร</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-brand-accent uppercase tracking-[0.2em] ml-1">สถานะดำเนินการ</label>
                    <select
                      value={formData.status || 'active'}
                      onChange={e => setFormData({...formData, status: e.target.value as any})}
                      className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-5 outline-none focus:border-brand-accent/30 transition-all font-bold tracking-widest uppercase text-[10px] text-zinc-300 appearance-none"
                    >
                      <option value="active" className="bg-zinc-900 text-green-400">ใช้งาน</option>
                      <option value="pending" className="bg-zinc-900 text-amber-400">รอดำเนินการ</option>
                      <option value="inactive" className="bg-zinc-900 text-red-400">ไม่ใช้งาน</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-10">
                 <button 
                  onClick={handleCloseModal}
                  className="flex-1 h-14 bg-white/5 text-zinc-400 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all border border-transparent hover:border-white/10"
                >
                  ยกเลิก
                </button>
                <button 
                  onClick={handleSave}
                  disabled={!formData.name || !formData.email}
                  className="flex-[2] h-14 bg-brand-accent text-black rounded-full font-bold text-[10px] uppercase tracking-[0.3em] hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(193,164,126,0.2)]"
                >
                  บันทึกข้อมูล
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Import Mapping Modal */}
      <AnimatePresence>
        {isImportModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0D0D0E] border border-white/10 rounded-[32px] w-full max-w-lg p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif italic text-white tracking-tight">
                  จับคู่ข้อมูล
                </h2>
                <button onClick={() => setIsImportModalOpen(false)} className="p-2 text-zinc-500 hover:text-white transition-colors bg-white/5 rounded-full">
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-sm text-zinc-400">จับคู่คอลัมน์ในไฟล์ CSV กับช่องข้อมูลของระบบให้ถูกต้องเพื่อทำการซิงก์</p>
                
                {['name', 'email', 'status', 'tier'].map((field) => (
                  <div key={field} className="flex items-center justify-between gap-4">
                    <label className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.2em] w-1/3">
                      {field} {['name', 'email'].includes(field) && '*'}
                    </label>
                    <select
                      value={csvMapping[field] || ''}
                      onChange={e => setCsvMapping({...csvMapping, [field]: e.target.value})}
                      className="w-2/3 h-12 bg-white/5 border border-white/5 rounded-2xl px-5 outline-none focus:border-brand-accent/30 transition-all font-bold tracking-widest text-[10px] text-zinc-300 appearance-none"
                    >
                      <option value="" className="bg-zinc-900">-- เลือกคอลัมน์ --</option>
                      {csvData.headers.map(h => (
                        <option key={h} value={h} className="bg-zinc-900">{h}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 mt-10">
                 <button 
                  onClick={() => setIsImportModalOpen(false)}
                  className="flex-1 h-14 bg-white/5 text-zinc-400 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all border border-transparent hover:border-white/10"
                >
                  ยกเลิก
                </button>
                <button 
                  onClick={handleImportSubmit}
                  disabled={!csvMapping.name || !csvMapping.email}
                  className="flex-[2] h-14 bg-brand-accent text-black rounded-full font-bold text-[10px] uppercase tracking-[0.3em] hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(193,164,126,0.2)] flex items-center justify-center gap-2"
                >
                  <Check size={16} strokeWidth={2.5} /> ซิงก์ข้อมูล
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
