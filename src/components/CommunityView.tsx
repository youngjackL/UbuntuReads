import { useEffect, useState } from "react";
import { MangaService } from "../services/mangaService";
import Header from "./Header";
import { MessageCircle, Heart, Share2, Plus, Trophy, Bookmark } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

interface Post {
  id: string;
  user: string;
  content: string;
  likes: number;
  comments: number;
  time: string;
  avatar: string;
}

import FooterNav from "./FooterNav";

export default function CommunityView() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    MangaService.getCommunityPosts().then(data => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const borderColors = ["border-l-rasta-green", "border-l-rasta-gold", "border-l-rasta-red"];

  return (
    <div className="min-h-screen bg-charcoal pb-24 text-white">
      <Header />
      
      <div className="fixed top-14 left-0 right-0 z-40 flex h-[2px]">
        <div className="flex-1 bg-rasta-green"></div>
        <div className="flex-1 bg-rasta-gold"></div>
        <div className="flex-1 bg-rasta-red"></div>
      </div>

      <main className="max-w-xl mx-auto pt-20 px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-display font-black italic tracking-tighter text-white uppercase">
              COMMUNITY <span className="text-rasta-gold">WALL</span>
            </h2>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Share your thoughts</p>
          </div>
          <button className="h-10 w-10 bg-rasta-red rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(252,221,9,0.4)] active:scale-95 transition-transform">
            <Plus size={20} strokeWidth={3} />
          </button>
        </div>

        {/* Post Input Box Mock */}
        <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 mb-8">
           <div className="flex gap-3">
              <div className="h-10 w-10 rounded-full border border-rasta-gold flex-shrink-0 overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=me" alt="" />
              </div>
              <textarea 
                placeholder="What's on your mind?"
                className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium resize-none h-12 pt-2 placeholder:text-zinc-600"
              />
           </div>
           <div className="mt-4 pt-4 border-t border-zinc-800/50 flex justify-end">
              <button className="px-4 py-1.5 bg-rasta-red text-white text-[10px] font-black uppercase rounded transition-colors hover:bg-black">
                Post Now
              </button>
           </div>
        </div>

        {/* Section Divider */}
        <div className="flex h-[1px] w-full mb-8 opacity-20">
          <div className="flex-1 bg-rasta-green"></div>
          <div className="flex-1 bg-rasta-gold"></div>
          <div className="flex-1 bg-rasta-red"></div>
        </div>

        {/* Feed */}
        <div className="space-y-6">
          {loading ? (
             [...Array(2)].map((_, i) => <div key={i} className={`h-40 bg-zinc-900 animate-pulse rounded-xl border-l-4 ${borderColors[i % 3]}`} />)
          ) : (
            posts.map((post, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={post.id} 
                className={`bg-[#1a1a1a] border border-zinc-800 border-l-4 ${borderColors[index % 3]} rounded-xl p-4 hover:border-zinc-700 transition-all`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src={post.avatar} className="w-10 h-10 rounded-full object-cover border border-rasta-gold" alt="" />
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-tight text-white">{post.user}</h4>
                      <p className="text-[9px] text-zinc-500 font-bold">{post.time}</p>
                    </div>
                  </div>
                  <button className="text-zinc-600 hover:text-white transition-colors">
                    <Share2 size={16} />
                  </button>
                </div>
                
                <p className="text-sm font-medium leading-relaxed text-zinc-300 mb-6">
                  {post.content.split(' ').map((word, i) => 
                    word.toLowerCase().includes('manga') || word.toLowerCase().includes('legend') || word.toLowerCase().includes('samurai') 
                    ? <span key={i} className="text-rasta-gold font-bold">{word} </span> 
                    : word + ' '
                  )}
                </p>

                <div className="flex items-center gap-6 pt-4 border-t border-zinc-800/50">
                   <button className="flex items-center gap-2 text-rasta-green hover:text-rasta-gold transition-colors group">
                      <Heart size={18} className="group-active:scale-125 transition-transform" />
                      <span className="text-[10px] font-black">{post.likes}</span>
                   </button>
                   <button className="flex items-center gap-2 text-rasta-green hover:text-white transition-colors">
                      <MessageCircle size={18} />
                      <span className="text-[10px] font-black">{post.comments}</span>
                   </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </main>

      <FooterNav />
    </div>
  );
}
