import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Chapter, MangaService } from "../services/mangaService";
import { ChevronLeft, MoreVertical, Bookmark, Monitor, Scroll, Sparkles, BookOpen, ChevronRight } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";

export default function ReaderView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (id) {
      MangaService.getChapter(id, "1").then((data) => {
        setChapter(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="w-8 h-8 border-2 border-rasta-red border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="bg-charcoal min-h-screen reader-container">
      {/* Top Bar - Manga Zone Style */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md h-16 px-4 border-b border-zinc-900 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/")}
            className="text-white hover:text-rasta-red transition-colors"
          >
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>
          <div className="leading-tight">
            <h1 className="text-xs font-black tracking-tight text-white uppercase italic">
              Ch. 1: <span className="text-rasta-gold">The Awakening</span>
            </h1>
            <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">
              Vol. 1 • UBUNTU READS
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5 text-zinc-400">
          <button className="hover:text-rasta-gold transition-colors"><Bookmark size={20} strokeWidth={2.5} /></button>
          <button className="hover:text-white transition-colors"><MoreVertical size={20} strokeWidth={2.5} /></button>
        </div>
      </nav>

      {/* Pages */}
      <main className="max-w-3xl mx-auto pt-16 pb-32">
        <div className="flex flex-col items-center">
          {chapter?.pages.map((page, index) => (
            <motion.div 
              key={index}
              className="w-full relative"
              onViewportEnter={() => setCurrentPage(index + 1)}
            >
              <img 
                src={page} 
                alt={`Page ${index + 1}`}
                className="w-full h-auto select-none"
                loading={index < 3 ? "eager" : "lazy"}
              />
            </motion.div>
          ))}
        </div>
      </main>

      {/* Bottom Controls - Manga Zone Style */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 border-t border-zinc-900 px-4 pb-6 pt-3">
        <div className="max-w-4xl mx-auto">
          {/* Page Slider */}
          <div className="flex items-center gap-4 mb-4 px-2">
            <span className="text-[10px] font-black text-zinc-500 font-mono w-4">{currentPage}</span>
            <div className="flex-1 h-1 bg-zinc-900 relative rounded-full overflow-hidden">
               <motion.div 
                 className="absolute inset-y-0 left-0 bg-gradient-to-r from-rasta-green via-rasta-gold to-rasta-red origin-left"
                 style={{ scaleX }}
               />
            </div>
            <span className="text-[10px] font-black text-zinc-500 font-mono w-4">{chapter?.pages.length}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-zinc-400">
              <button className="flex flex-col items-center gap-1 hover:text-rasta-red transition-colors">
                <Monitor size={18} strokeWidth={2.5} />
                <span className="text-[8px] font-black uppercase">Display</span>
              </button>
              <button className="flex flex-col items-center gap-1 hover:text-rasta-gold transition-colors">
                <Scroll size={18} strokeWidth={2.5} />
                <span className="text-[8px] font-black uppercase">Scroll</span>
              </button>
              <button className="flex flex-col items-center gap-1 hover:text-rasta-green transition-colors">
                <Sparkles size={18} strokeWidth={2.5} />
                <span className="text-[8px] font-black uppercase">AI Clean</span>
              </button>
              <button className="flex flex-col items-center gap-1 hover:text-rasta-gold transition-colors">
                <BookOpen size={18} strokeWidth={2.5} />
                <span className="text-[8px] font-black uppercase">Reader</span>
              </button>
            </div>

            <button className="bg-rasta-red text-white py-2 px-5 rounded flex items-center gap-2 group transition-transform active:scale-95 shadow-lg shadow-rasta-red/20 focus:ring-2 focus:ring-rasta-gold">
              <span className="text-[10px] font-black uppercase tracking-tighter">Next Chapter</span>
              <ChevronRight size={14} strokeWidth={4} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
