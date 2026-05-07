import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Manga, MangaService } from "../services/mangaService";
import { ChevronLeft, Play, BookmarkPlus, Info, Star, Clock, BookOpen, MessageCircle, Send, Trash2, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./Header";
import FooterNav from "./FooterNav";
import { useAuth } from "./AuthContext";

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  content: string;
  createdAt: any;
}

export default function MangaDetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  
  const [manga, setManga] = useState<Manga | null>(null);
  const [chapters, setChapters] = useState<{ id: string, title: string, date: string }[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [activeTab, setActiveTab] = useState<'info' | 'comments'>('info');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    window.scrollTo(0, 0);

    Promise.all([
      MangaService.getById(id),
      MangaService.getChapterList(id)
    ])
      .then(([mangaData, chapterData]) => {
        setManga(mangaData);
        setChapters(chapterData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    // Mock comments
    setComments([
      {
        id: '1',
        userId: 'system',
        userName: 'ZionRider',
        userPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zion',
        content: "This manga is pure fire! The art style in Chapter 5 is just next level.",
        createdAt: new Date(Date.now() - 3600000)
      },
      {
        id: '2',
        userId: 'system',
        userName: 'MangaOtaku',
        userPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=otaku',
        content: "Wait, isn't this the same author who did that other crazy series?",
        createdAt: new Date(Date.now() - 86400000)
      }
    ]);
  }, [id]);

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim() || !id) return;

    setSending(true);
    // Local mock post
    setTimeout(() => {
       const comment: Comment = {
          id: Math.random().toString(),
          userId: user.uid,
          userName: profile?.displayName || user.displayName || "User",
          userPhoto: profile?.photoURL || user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`,
          content: newComment.trim(),
          createdAt: new Date()
       };
       setComments(prev => [comment, ...prev]);
       setNewComment("");
       setSending(false);
    }, 500);
  };

  const handleDeleteComment = (commentId: string) => {
    if (!window.confirm("Delete this comment?")) return;
    setComments(prev => prev.filter(c => c.id !== commentId));
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="w-10 h-10 border-4 border-rasta-gold border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!manga) return (
    <div className="h-screen flex items-center justify-center bg-[#0a0a0a] text-zinc-500 font-bold uppercase italic">
      Manga not found.
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-24">
      <Header />
      
      {/* Tri-color divider */}
      <div className="fixed top-14 left-0 right-0 z-40 flex h-[2px]">
        <div className="flex-1 bg-rasta-green"></div>
        <div className="flex-1 bg-rasta-gold"></div>
        <div className="flex-1 bg-rasta-red"></div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[45vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={manga.coverImage} 
            className="w-full h-full object-cover blur-sm opacity-40 scale-110"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent"></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-6 py-8 flex gap-6 items-end">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="w-32 sm:w-40 aspect-[2/2.8] rounded-xl overflow-hidden border-2 border-rasta-gold shadow-2xl flex-shrink-0 bg-[#1a1a1a]"
           >
              <img src={manga.coverImage} className="w-full h-full object-cover" alt={manga.title} />
           </motion.div>
           <div className="flex-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-2 mb-2">
                   <span className="bg-rasta-green/20 text-rasta-green text-[8px] font-black uppercase px-2 py-0.5 rounded border border-rasta-green/30 tracking-widest">{manga.status}</span>
                   <span className="bg-rasta-gold/20 text-rasta-gold text-[8px] font-black uppercase px-2 py-0.5 rounded border border-rasta-gold/30 tracking-widest">{manga.category}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-display font-black text-white italic tracking-tighter uppercase leading-tight line-clamp-2">
                   {manga.title}
                </h1>
                <div className="flex items-center gap-4 mt-4">
                   <div className="flex flex-col">
                      <span className="text-[7px] font-black text-zinc-500 uppercase tracking-tighter">Chapters</span>
                      <span className="text-[12px] font-black text-white italic">{manga.chapters} EPS</span>
                   </div>
                   <div className="w-[1px] h-6 bg-zinc-800"></div>
                   <div className="flex flex-col">
                      <span className="text-[7px] font-black text-zinc-500 uppercase tracking-tighter">Community</span>
                      <span className="text-[12px] font-black text-rasta-gold italic">{comments.length} MSG</span>
                   </div>
                </div>
              </motion.div>
           </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 mt-8">
         <div className="flex gap-8 border-b border-zinc-900 pb-px">
            <button 
              onClick={() => setActiveTab('info')}
              className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] relative transition-colors ${activeTab === 'info' ? 'text-white' : 'text-zinc-500'}`}
            >
               Overview
               {activeTab === 'info' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-rasta-gold" />}
            </button>
            <button 
              onClick={() => setActiveTab('comments')}
              className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] relative transition-colors ${activeTab === 'comments' ? 'text-white' : 'text-zinc-500'}`}
            >
               Talk Zone ({comments.length})
               {activeTab === 'comments' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-rasta-red" />}
            </button>
         </div>
      </div>

      <main className="px-6 pt-8 max-w-4xl mx-auto">
         <AnimatePresence mode="wait">
            {activeTab === 'info' ? (
               <motion.div 
                 key="info"
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: 10 }}
                 className="space-y-10"
               >
                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                     <Link 
                       to={`/reader/${id}`}
                       className="flex items-center justify-center gap-2 bg-rasta-red text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-tighter shadow-lg shadow-rasta-red/20 active:scale-95 transition-transform"
                     >
                        <Play size={16} fill="currentColor" /> START READING
                     </Link>
                     <button className="flex items-center justify-center gap-2 bg-[#1a1a1a] border border-zinc-800 text-rasta-green py-4 rounded-xl font-black text-[10px] uppercase tracking-tighter active:scale-95 transition-transform">
                        <BookmarkPlus size={16} /> ADD TO LIST
                     </button>
                  </div>

                  {/* Synopsis */}
                  <section>
                    <h3 className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <Info size={12} className="text-rasta-gold" /> SYNOPSIS
                    </h3>
                    <p className="text-zinc-300 text-sm leading-relaxed font-medium italic">
                       {manga.description}
                    </p>
                  </section>

                  {/* Chapters List */}
                  <section>
                    <h3 className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <BookOpen size={12} className="text-rasta-green" /> CHAPTERS
                    </h3>
                    <div className="space-y-3">
                       {chapters.map((chap, idx) => (
                          <Link 
                            key={`chapter-${chap.id}-${idx}`}
                            to={`/reader/${id}?chap=${chap.id}`}
                            className="flex items-center justify-between p-4 bg-[#141414] border border-zinc-900 rounded-xl hover:border-rasta-gold/40 transition-colors group"
                          >
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center text-[10px] font-black text-zinc-500 group-hover:text-rasta-gold transition-colors">
                                   {chap.id.padStart(2, '0')}
                                </div>
                                <div>
                                   <p className="text-xs font-bold text-white uppercase group-hover:text-rasta-gold transition-colors">{chap.title}</p>
                                   <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mt-0.5">{chap.date}</p>
                                </div>
                             </div>
                             <Play size={14} className="text-zinc-700 group-hover:text-rasta-gold group-hover:translate-x-1 transition-all" />
                          </Link>
                       ))}
                    </div>
                  </section>
               </motion.div>
            ) : (
               <motion.div 
                 key="comments"
                 initial={{ opacity: 0, x: 10 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -10 }}
                 className="space-y-8"
               >
                  {/* Comment Input */}
                  <div className="bg-[#141414] border border-zinc-800 rounded-2xl p-4">
                     {user ? (
                        <form onSubmit={handlePostComment} className="space-y-4">
                           <div className="flex gap-4">
                              <img src={profile?.photoURL || user.photoURL || ""} className="w-10 h-10 rounded-lg object-cover" alt="" />
                              <textarea 
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write something cold..."
                                className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-xl p-3 text-xs font-bold text-white placeholder:text-zinc-600 focus:outline-none focus:border-rasta-red transition-all min-h-[100px] resize-none"
                              />
                           </div>
                           <div className="flex justify-end">
                              <button 
                                type="submit"
                                disabled={sending || !newComment.trim()}
                                className="bg-rasta-red text-white px-6 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg shadow-rasta-red/20 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all flex items-center gap-2"
                              >
                                {sending ? "CHILL..." : <><Send size={12} /> SHOUT IT OUT</>}
                              </button>
                           </div>
                        </form>
                     ) : (
                        <div className="text-center py-6">
                           <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-4">You need to be in the clan to talk</p>
                           <Link to="/login" className="text-rasta-gold text-[10px] font-black uppercase tracking-widest underline decoration-2 underline-offset-4">Join Clan / Login</Link>
                        </div>
                     )}
                  </div>

                  {/* Comments List */}
                  <div className="space-y-6">
                     {comments.length > 0 ? (
                        comments.map((comment, idx) => (
                           <motion.div 
                             layout
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             key={`comment-${comment.id}-${idx}`} 
                             className="group flex gap-4"
                           >
                              <div className="relative flex-shrink-0">
                                 <img src={comment.userPhoto} className="w-10 h-10 rounded-lg object-cover border border-zinc-800" alt="" />
                                 <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-rasta-green rounded-full border-2 border-[#0a0a0a] flex items-center justify-center">
                                    <ShieldCheck size={8} className="text-white" />
                                 </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                 <div className="flex items-center justify-between mb-1">
                                    <h4 className="text-[10px] font-black text-white uppercase italic truncate pr-2">
                                       {comment.userName}
                                       {comment.userId === manga.id && <span className="ml-2 text-rasta-gold text-[8px] border border-rasta-gold/30 px-1 rounded">AUTH</span>}
                                    </h4>
                                    <div className="flex items-center gap-3">
                                       <span className="text-[7px] font-black text-zinc-600 uppercase">
                                          {comment.createdAt instanceof Date ? comment.createdAt.toLocaleDateString() : (comment.createdAt?.toDate?.() ? comment.createdAt.toDate().toLocaleDateString() : "JUST NOW")}
                                       </span>
                                       {user && comment.userId === user.uid && (
                                          <button 
                                            onClick={() => handleDeleteComment(comment.id)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity text-rasta-red"
                                          >
                                             <Trash2 size={12} />
                                          </button>
                                       )}
                                    </div>
                                 </div>
                                 <div className="bg-[#141414] border border-zinc-900 rounded-xl p-3">
                                    <p className="text-xs text-zinc-300 font-medium leading-relaxed">
                                       {comment.content}
                                    </p>
                                 </div>
                              </div>
                           </motion.div>
                        ))
                     ) : (
                        <div className="text-center py-20 grayscale opacity-40">
                           <MessageCircle size={40} className="mx-auto text-zinc-800 mb-4" />
                           <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] italic">Dead silence here. Be the first to shout.</p>
                        </div>
                     )}
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </main>

      <FooterNav />
    </div>
  );
}
