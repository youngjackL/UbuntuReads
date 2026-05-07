import { useEffect, useState } from "react";
import { Manga, MangaService } from "../services/mangaService";
import Header from "./Header";
import MangaCard from "./MangaCard";
import { ChevronRight, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

import FooterNav from "./FooterNav";

export default function HomeView() {
  const [mangaList, setMangaList] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    MangaService.getAll().then((data) => {
      setMangaList(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-charcoal pb-24">
      <Header />
      
      <div className="fixed top-14 left-0 right-0 z-40 flex h-[2px]">
        <div className="flex-1 bg-rasta-green"></div>
        <div className="flex-1 bg-rasta-gold"></div>
        <div className="flex-1 bg-rasta-red"></div>
      </div>

      <main className="max-w-7xl mx-auto pt-16 px-4">
        {/* Search Bar - Stylized like the image */}
        <div className="my-6">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search for titles, authors, or genres..."
              className="w-full bg-[#1a1a1a] border border-zinc-800 rounded-lg py-2.5 px-10 text-xs font-medium text-zinc-300 focus:outline-none focus:border-rasta-gold focus:ring-1 focus:ring-rasta-gold/20 transition-all"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-rasta-green">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
          </div>
        </div>

        {/* Trending Now */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-display font-black tracking-tight text-white italic uppercase">
              TRENDING <span className="text-rasta-gold">NOW</span>
            </h2>
            <button className="text-[10px] text-rasta-red font-black uppercase tracking-tighter flex items-center gap-0.5 hover:text-rasta-gold transition-colors">
              SEE ALL <ChevronRight size={10} strokeWidth={4} />
            </button>
          </div>
          
          <div className="manga-grid-trending -mx-4 px-4">
            {loading ? (
               [...Array(3)].map((_, i) => <div key={`trending-skeleton-${i}`} className="w-52 aspect-[2/2.8] bg-zinc-900 animate-pulse rounded" />)
            ) : (
              mangaList.map((manga, idx) => (
                <MangaCard key={`trending-${manga.id}`} manga={manga} isLarge={true} index={idx} />
              ))
            )}
          </div>
        </section>

        {/* Section Divider */}
        <div className="flex h-[1px] w-full mb-8 opacity-20">
          <div className="flex-1 bg-rasta-green"></div>
          <div className="flex-1 bg-rasta-gold"></div>
          <div className="flex-1 bg-rasta-red"></div>
        </div>

        {/* New Releases */}
        <section>
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-900">
            <h2 className="text-sm font-display font-black tracking-tight text-white italic uppercase">
              NEW <span className="text-rasta-green">RELEASES</span>
            </h2>
          </div>

          {loading ? (
            <div className="manga-grid-main">
              {[...Array(8)].map((_, i) => (
                <div key={`main-skeleton-${i}`} className="aspect-[2/2.8] bg-zinc-900 animate-pulse rounded" />
              ))}
            </div>
          ) : (
            <div className="manga-grid-main">
              {/* Duplicate list to fill grid more for visual demo */}
              {[...mangaList, ...mangaList, ...mangaList].map((manga, idx) => (
                <MangaCard 
                  key={`main-${manga.id}-${idx}`} 
                  manga={{...manga, status: idx < 3 ? 'New' : manga.status}} 
                  index={idx}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <FooterNav />
    </div>
  );
}
