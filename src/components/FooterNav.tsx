import { Link, useLocation } from "react-router-dom";
import { Bookmark, Trophy, Home, PlayCircle, MessageSquare, User } from "lucide-react";

export default function FooterNav() {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (p: string) => path === p;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/95 border-t border-zinc-900 py-3 flex justify-around items-center z-50">
      <Link 
        to="/" 
        className={`flex flex-col items-center gap-1 transition-colors ${isActive('/') ? 'text-rasta-gold' : 'text-zinc-500 hover:text-white'}`}
      >
        <Home size={20} strokeWidth={2.5} className={isActive('/') ? 'fill-rasta-gold' : ''} />
        <span className="text-[8px] font-black uppercase text-center w-full">Home</span>
      </Link>
      
      <Link 
        to="/library" 
        className={`flex flex-col items-center gap-1 transition-colors ${isActive('/library') ? 'text-rasta-gold' : 'text-zinc-500 hover:text-white'}`}
      >
        <Bookmark size={20} strokeWidth={2.5} className={isActive('/library') ? 'fill-rasta-gold' : ''} />
        <span className="text-[8px] font-black uppercase text-center w-full">Library</span>
      </Link>

      <Link 
        to="/anime" 
        className={`flex flex-col items-center gap-1 transition-colors ${isActive('/anime') ? 'text-rasta-gold' : 'text-zinc-500 hover:text-white'}`}
      >
        <PlayCircle size={20} strokeWidth={2.5} className={isActive('/anime') ? 'fill-rasta-gold' : ''} />
        <span className="text-[8px] font-black uppercase text-center w-full">Anime</span>
      </Link>

      <Link 
        to="/community" 
        className={`flex flex-col items-center gap-1 transition-colors ${isActive('/community') ? 'text-rasta-gold' : 'text-zinc-500 hover:text-white'}`}
      >
        <MessageSquare size={20} strokeWidth={2.5} className={isActive('/community') ? 'fill-rasta-gold' : ''} />
        <span className="text-[8px] font-black uppercase text-center w-full">Wall</span>
      </Link>

      <Link 
        to="/profile" 
        className={`flex flex-col items-center gap-1 transition-colors ${isActive('/profile') ? 'text-rasta-gold' : 'text-zinc-500 hover:text-white'}`}
      >
        <User size={20} strokeWidth={2.5} className={isActive('/profile') ? 'fill-rasta-gold' : ''} />
        <span className="text-[8px] font-black uppercase text-center w-full">You</span>
      </Link>
    </nav>
  );
}
