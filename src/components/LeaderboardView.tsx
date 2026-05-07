import { useEffect, useState } from "react";
import { MangaService } from "../services/mangaService";
import Header from "./Header";
import { Trophy, Medal, Crown, Bookmark } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

interface UserRank {
  id: string;
  username: string;
  xp: number;
  avatar: string;
  rank: number;
}

import FooterNav from "./FooterNav";

export default function LeaderboardView() {
  const [ranks, setRanks] = useState<UserRank[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    MangaService.getLeaderboard().then(data => {
      setRanks(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-charcoal pb-24 text-white">
      <Header />
      
      <div className="fixed top-14 left-0 right-0 z-40 flex h-[2px]">
        <div className="flex-1 bg-rasta-green"></div>
        <div className="flex-1 bg-rasta-gold"></div>
        <div className="flex-1 bg-rasta-red"></div>
      </div>

      <main className="max-w-xl mx-auto pt-20 px-4">
        {/* ... existing content ... */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-black italic tracking-tighter text-white mb-2 uppercase">
            LEADER<span className="text-rasta-gold">BOARD</span>
          </h2>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">Top Survivors of the Savanna</p>
        </div>

        {/* Ranking Categories */}
        <div className="flex bg-[#1a1a1a] p-1 rounded-lg mb-8 border border-zinc-800">
          <button 
            onClick={() => setCategory("daily")}
            className={`flex-1 py-1.5 text-[10px] font-black uppercase rounded ${category === "daily" ? "bg-rasta-green text-white" : "text-zinc-500"}`}
          >
            Daily
          </button>
          <button 
            onClick={() => setCategory("weekly")}
            className={`flex-1 py-1.5 text-[10px] font-black uppercase rounded ${category === "weekly" ? "bg-rasta-gold text-black" : "text-zinc-500"}`}
          >
            Weekly
          </button>
          <button 
            onClick={() => setCategory("all")}
            className={`flex-1 py-1.5 text-[10px] font-black uppercase rounded ${category === "all" ? "bg-rasta-red text-white" : "text-zinc-500"}`}
          >
            All Time
          </button>
        </div>

        {/* Top 3 Podium */}
        {!loading && ranks.length >= 3 && (
          <div className="flex items-end justify-center gap-4 mb-10 pt-4">
            {/* Rank 2 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-rasta-green p-0.5 mb-2 relative">
                <img src={ranks[1].avatar} className="w-full h-full rounded-full object-cover" alt="" />
                <div className="absolute -top-2 -right-1 bg-rasta-green p-1 rounded-full text-white shadow-lg shadow-rasta-green/20"><Medal size={12} /></div>
              </div>
              <span className="text-[10px] font-black truncate w-20 text-center mb-1">{ranks[1].username}</span>
              <div className="h-20 w-16 bg-zinc-900 rounded-t-lg flex items-center justify-center font-black text-xl text-rasta-green border-t-2 border-rasta-green">2</div>
            </div>

            {/* Rank 1 */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-2 border-rasta-gold p-0.5 mb-2 relative">
                <img src={ranks[0].avatar} className="w-full h-full rounded-full object-cover" alt="" />
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-rasta-gold animate-bounce"><Crown size={20} fill="currentColor" /></div>
              </div>
              <span className="text-xs font-black truncate w-24 text-center mb-1 text-rasta-gold">{ranks[0].username}</span>
              <div className="h-28 w-20 bg-gradient-to-t from-rasta-red/80 to-rasta-red rounded-t-lg flex items-center justify-center font-black text-4xl shadow-xl shadow-rasta-red/20">1</div>
            </div>

            {/* Rank 3 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-rasta-red p-0.5 mb-2 relative">
                <img src={ranks[2].avatar} className="w-full h-full rounded-full object-cover" alt="" />
                <div className="absolute -top-2 -right-1 bg-rasta-red p-1 rounded-full text-white shadow-lg shadow-rasta-red/20"><Medal size={12} /></div>
              </div>
              <span className="text-[10px] font-black truncate w-20 text-center mb-1">{ranks[2].username}</span>
              <div className="h-16 w-16 bg-zinc-900 rounded-t-lg flex items-center justify-center font-black text-xl text-rasta-red border-t-2 border-rasta-red">3</div>
            </div>
          </div>
        )}

        {/* Regular List */}
        <div className="space-y-3">
          {!loading && ranks.slice(3).map((item, idx) => {
              const borderColors = ["border-rasta-green", "border-rasta-gold", "border-rasta-red"];
              const bColor = borderColors[idx % 3];
              return (
                <div key={item.id} className={`bg-[#1a1a1a] border-l-4 ${bColor} rounded-lg p-3 flex items-center justify-between hover:border-zinc-700 transition-colors`}>
                  <div className="flex items-center gap-4">
                    <span className="w-6 font-black text-zinc-600 italic">#{item.rank}</span>
                    <img src={item.avatar} className="w-10 h-10 rounded-full object-cover border border-rasta-gold" alt="" />
                    <span className="text-[11px] font-black uppercase tracking-tight">{item.username}</span>
                  </div>
                  <div className="flex flex-col items-end">
                     <span className="text-[10px] font-black text-rasta-gold">{item.xp.toLocaleString()} XP</span>
                     <span className="text-[8px] font-bold text-zinc-600 uppercase">Points</span>
                  </div>
                </div>
              );
          })}
        </div>
      </main>

      <FooterNav />
    </div>
  );
}
