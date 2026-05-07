import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Moon, Sun, User, Camera, LogOut, Trash2, Save, Loader2, AlertTriangle, Check, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './Header';
import FooterNav from './FooterNav';

export default function SettingsView() {
  const { user, profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [displayName, setDisplayName] = useState(profile?.displayName || '');
  const [photoURL, setPhotoURL] = useState(profile?.photoURL || '');
  const [theme, setTheme] = useState<'light' | 'dark'>(profile?.theme || 'dark');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    // Simulate update
    setTimeout(() => {
       setLoading(false);
       setMessage({ type: 'success', text: 'Local Profile updated (Mock)!' });
       setTimeout(() => setMessage(null), 3000);
    }, 1000);
  };

  const handleLogout = () => {
    alert("Session ended. Redirecting...");
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    alert("Account deletion is disabled when offline.");
    setShowDeleteConfirm(false);
  };

  if (authLoading) return (
    <div className="h-screen flex items-center justify-center bg-[#0a0a0a]">
       <div className="w-10 h-10 border-4 border-rasta-gold border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-24 text-white">
      <Header />
      
      {/* Tri-color divider */}
      <div className="fixed top-14 left-0 right-0 z-40 flex h-[2px]">
        <div className="flex-1 bg-rasta-green"></div>
        <div className="flex-1 bg-rasta-gold"></div>
        <div className="flex-1 bg-rasta-red"></div>
      </div>

      <main className="max-w-2xl mx-auto pt-20 px-6">
        <div className="flex items-center gap-4 mb-8">
           <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
              <ChevronLeft size={20} />
           </button>
           <h1 className="text-2xl font-display font-black uppercase italic tracking-tighter">Settings</h1>
        </div>

        <section className="space-y-8">
           {/* Appearance */}
           <div className="bg-[#141414] border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-3 mb-6">Appearance</h3>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center text-rasta-gold">
                       {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                    </div>
                    <div>
                       <p className="text-xs font-bold text-white uppercase">Theme Mode</p>
                       <p className="text-[10px] text-zinc-500 font-medium uppercase">{theme === 'dark' ? 'Dark Mode Active' : 'Light Mode Active'}</p>
                    </div>
                 </div>
                 <div className="flex bg-[#1a1a1a] p-1 rounded-xl border border-zinc-800">
                    <button 
                      onClick={() => setTheme('light')}
                      className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${theme === 'light' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                    >
                       Light
                    </button>
                    <button 
                      onClick={() => setTheme('dark')}
                      className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${theme === 'dark' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-white'}`}
                    >
                       Dark
                    </button>
                 </div>
              </div>
           </div>

           {/* Profile Update */}
           <form onSubmit={handleUpdateProfile} className="bg-[#141414] border border-zinc-800 rounded-2xl p-6 space-y-6">
              <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-3 mb-6">Edit Profile</h3>
              
              <div className="space-y-4">
                 <div className="relative">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 mb-1 block">Username</label>
                    <div className="relative">
                       <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                       <input
                         type="text"
                         value={displayName}
                         onChange={(e) => setDisplayName(e.target.value)}
                         className="w-full bg-[#1a1a1a] border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-white focus:outline-none focus:border-rasta-gold transition-all"
                         placeholder="Display Name"
                       />
                    </div>
                 </div>

                 <div className="relative">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 mb-1 block">Profile Photo URL</label>
                    <div className="relative">
                       <Camera className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                       <input
                         type="text"
                         value={photoURL}
                         onChange={(e) => setPhotoURL(e.target.value)}
                         className="w-full bg-[#1a1a1a] border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-white focus:outline-none focus:border-rasta-gold transition-all"
                         placeholder="Image URL"
                       />
                    </div>
                 </div>
              </div>

              {message && (
                <div className={`p-4 rounded-xl flex items-center gap-3 text-xs font-bold border ${message.type === 'success' ? 'bg-rasta-green/10 border-rasta-green/20 text-rasta-green' : 'bg-rasta-red/10 border-rasta-red/20 text-rasta-red'}`}>
                   {message.type === 'success' ? <Check size={16} /> : <AlertTriangle size={16} />}
                   {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-rasta-gold text-black py-4 rounded-xl font-black text-xs uppercase tracking-tighter shadow-lg shadow-rasta-gold/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : (
                  <>
                    SAVE CHANGES <Save size={18} />
                  </>
                )}
              </button>
           </form>

           {/* Account Actions */}
           <div className="bg-[#141414] border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-3 mb-6 text-rasta-red">Danger Zone</h3>
              <div className="space-y-4">
                 <button 
                   onClick={handleLogout}
                   className="w-full flex items-center justify-between p-4 bg-[#1a1a1a] border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-colors group"
                 >
                    <div className="flex items-center gap-3">
                       <LogOut size={18} className="text-zinc-500 group-hover:text-white" />
                       <span className="text-[10px] font-black uppercase tracking-widest">Logout Session</span>
                    </div>
                    <ChevronRight size={14} className="text-zinc-700" />
                 </button>

                 <div className="relative">
                    {!showDeleteConfirm ? (
                       <button 
                         onClick={() => setShowDeleteConfirm(true)}
                         className="w-full flex items-center justify-between p-4 bg-rasta-red/5 border border-rasta-red/20 rounded-xl hover:bg-rasta-red/10 transition-colors group"
                       >
                          <div className="flex items-center gap-3">
                             <Trash2 size={18} className="text-rasta-red" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-rasta-red">Delete Account</span>
                          </div>
                          <ChevronRight size={14} className="text-rasta-red/40" />
                       </button>
                    ) : (
                       <motion.div 
                         initial={{ opacity: 0, scale: 0.95 }}
                         animate={{ opacity: 1, scale: 1 }}
                         className="p-4 bg-black border-2 border-rasta-red rounded-xl space-y-4"
                       >
                          <p className="text-[10px] font-black uppercase text-rasta-red text-center italic tracking-widest">Are you absolutely sure?<br/><span className="text-zinc-500">This action is permanent and irreversible.</span></p>
                          <div className="grid grid-cols-2 gap-3">
                             <button 
                               onClick={() => setShowDeleteConfirm(false)}
                               className="py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-[9px] font-black uppercase"
                             >
                                Cancel
                             </button>
                             <button 
                               onClick={handleDeleteAccount}
                               className="py-2 bg-rasta-red text-white rounded-lg text-[9px] font-black uppercase shadow-lg shadow-rasta-red/20"
                             >
                                Yes, Delete
                             </button>
                          </div>
                       </motion.div>
                    )}
                 </div>
              </div>
           </div>
        </section>
      </main>

      <FooterNav />
    </div>
  );
}
