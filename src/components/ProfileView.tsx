import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Settings, LogOut, User, Mail, Calendar, ShieldCheck, ChevronRight, Edit3 } from 'lucide-react';
import { motion } from 'motion/react';
import Header from './Header';
import FooterNav from './FooterNav';

export default function ProfileView() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged out (Mock)");
    navigate('/login');
  };

  if (loading) return (
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

      <main className="max-w-2xl mx-auto pt-24 px-6">
        {/* Profile Header */}
        <div className="relative mb-12">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-rasta-gold p-1 bg-black shadow-2xl shadow-rasta-gold/20">
                <img 
                  src={profile?.photoURL || user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} 
                  alt={profile?.displayName}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-rasta-green rounded-lg flex items-center justify-center border-2 border-[#0a0a0a] shadow-lg">
                <ShieldCheck size={16} className="text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-display font-black text-white italic tracking-tighter uppercase leading-tight">
                {profile?.displayName || user.displayName || 'Unnamed Otaku'}
              </h1>
              <p className="text-rasta-gold text-[10px] font-black uppercase tracking-[0.2em] mt-1 italic">
                S-Rank Member
              </p>
              <div className="flex gap-2 mt-4">
                <Link to="/settings" className="px-4 py-1.5 bg-[#1a1a1a] border border-zinc-800 rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center gap-2 hover:bg-zinc-800 transition-colors">
                  <Edit3 size={12} /> Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="space-y-4">
          <div className="bg-[#141414] border border-zinc-800 rounded-2xl p-6 space-y-6">
            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-3">User Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-zinc-500">
                    <User size={16} />
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-zinc-600 uppercase tracking-tighter">Full Name</p>
                    <p className="text-xs font-bold text-white uppercase">{profile?.displayName || user.displayName || 'N/A'}</p>
                  </div>
                </div>
                <ChevronRight size={14} className="text-zinc-700" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-zinc-500">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-zinc-600 uppercase tracking-tighter">Email Address</p>
                    <p className="text-xs font-bold text-white uppercase">{user.email}</p>
                  </div>
                </div>
                <ChevronRight size={14} className="text-zinc-700" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-zinc-500">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-zinc-600 uppercase tracking-tighter">Account Created</p>
                    <p className="text-xs font-bold text-white uppercase">{user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>
                <ChevronRight size={14} className="text-zinc-700" />
              </div>
            </div>
          </div>

          <div className="bg-[#141414] border border-zinc-800 rounded-2xl p-6">
             <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-3 mb-6">Quick Actions</h3>
             <div className="grid grid-cols-2 gap-4">
                <Link to="/settings" className="flex flex-col items-center justify-center py-6 bg-[#1a1a1a] border border-zinc-800 rounded-xl gap-2 hover:border-rasta-gold transition-colors group">
                   <Settings size={20} className="text-zinc-500 group-hover:text-rasta-gold transition-colors" />
                   <span className="text-[9px] font-black uppercase text-zinc-500 group-hover:text-white transition-colors">Settings</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex flex-col items-center justify-center py-6 bg-[#1a1a1a] border border-zinc-800 rounded-xl gap-2 hover:border-rasta-red transition-colors group"
                >
                   <LogOut size={20} className="text-zinc-500 group-hover:text-rasta-red transition-colors" />
                   <span className="text-[9px] font-black uppercase text-zinc-500 group-hover:text-white transition-colors">Logout</span>
                </button>
             </div>
          </div>
        </div>
      </main>

      <FooterNav />
    </div>
  );
}
