import { Menu, Search, Gem, User } from "lucide-react";
import { useEffect, useState } from "react";
import { MangaService } from "../services/mangaService";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Header() {
  const [streak, setStreak] = useState(0);

  const { user, profile } = useAuth();

  useEffect(() => {
    MangaService.getStreak().then(data => setStreak(data.currentStreak));
  }, []);

  const getStreakColor = (count: number) => {
    if (count >= 30) return "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]";
    if (count >= 15) return "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]";
    if (count >= 8) return "text-zinc-300 drop-shadow-[0_0_8px_rgba(212,212,216,0.3)]";
    if (count >= 4) return "text-amber-600";
    return "text-zinc-500";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 border-b border-zinc-900 h-14">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="text-zinc-400 hover:text-white transition-colors">
            <Menu size={22} strokeWidth={2.5} />
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-display font-extrabold tracking-tighter flex items-center gap-1.5 pt-0.5">
              <span className="text-rasta-red">Ubuntu</span>
              <span className="text-white">Reads</span>
            </h1>
            {/* Kenya-style Flag Badge */}
            <div className="ke w-4.5 h-4.5 rounded-full overflow-hidden flex flex-col border border-zinc-800/50 shadow-sm opacity-80 group-hover:scale-110 transition-transform">
              <div className="flex-1 bg-rasta-green"></div>
              <div className="flex-1 bg-rasta-gold"></div>
              <div className="flex-1 bg-rasta-red"></div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 bg-zinc-900/40 px-2.5 py-1 rounded-full border border-zinc-800/50">
            <Gem size={16} className={`${getStreakColor(streak)} transition-all duration-700`} fill="currentColor" />
            <span className="text-[10px] font-black italic text-zinc-100">{streak}</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-zinc-400 hover:text-white transition-colors">
              <Search size={22} strokeWidth={2.5} />
            </button>
            <Link to={user ? "/profile" : "/login"} className="text-zinc-400 hover:text-white transition-colors">
               {user ? (
                 <div className="w-8 h-8 rounded-lg overflow-hidden border border-zinc-800">
                    <img src={profile?.photoURL || user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} className="w-full h-full object-cover" alt="" />
                 </div>
               ) : (
                 <User size={22} strokeWidth={2.5} />
               )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
