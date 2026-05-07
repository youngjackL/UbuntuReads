import { useEffect, useState } from "react";
import { Manga, MangaService } from "../services/mangaService";
import Header from "./Header";
import { Bookmark, CheckCircle2, Clock } from "lucide-react";
import { Link } from "react-router-dom";

import FooterNav from "./FooterNav";

export default function LibraryView() {
  const [library, setLibrary] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    MangaService.getAll().then((data) => {
      setLibrary(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-charcoal">
      <Header />
      
      <div className="fixed top-14 left-0 right-0 z-40 flex h-[2px]">
        <div className="flex-1 bg-rasta-green"></div>
        <div className="flex-1 bg-rasta-gold"></div>
        <div className="flex-1 bg-rasta-red"></div>
      </div>

      <main className="max-w-7xl mx-auto pt-16 px-4">
        {/* Library Header */}
        <div className="my-8">
           <h2 className="text-xl font-display font-black tracking-tight text-white mb-4 uppercase italic">
             BOOK<span className="text-rasta-gold">SHELF</span>
           </h2>
           <div className="flex gap-6">
             <button className="text-[10px] font-black text-rasta-red uppercase border-b-2 border-rasta-red pb-1">Reading</button>
             <button className="text-[10px] font-black text-zinc-500 uppercase hover:text-white transition-colors">Completed</button>
             <button className="text-[10px] font-black text-zinc-500 uppercase hover:text-white transition-colors">Wishlist</button>
           </div>
        </div>

        {/* Library List */}
        <div className="space-y-8">
          {loading ? (
             [...Array(2)].map((_, i) => <div key={`lib-skeleton-${i}`} className="h-48 bg-zinc-900 animate-pulse rounded" />)
          ) : (
            library.map((manga, idx) => {
              const borderColors = ["border-rasta-green", "border-rasta-gold", "border-rasta-red"];
              const bColor = borderColors[idx % 3];
              return (
                <Link 
                  key={`lib-${manga.id}-${idx}`} 
                  to={`/manga/${manga.id}`}
                  className={`flex gap-4 group bg-[#1a1a1a] rounded-xl p-3 border-l-4 ${bColor} shadow-lg shadow-black/20`}
                >
                  <div className="w-28 aspect-[2/2.8] rounded-lg overflow-hidden flex-shrink-0 border border-zinc-800">
                    <img src={manga.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="flex-1 py-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-bold text-sm group-hover:text-rasta-gold transition-colors capitalize leading-snug">
                        {manga.title.toLowerCase()}
                      </h3>
                      <p className="text-[10px] text-zinc-500 mt-1 uppercase font-bold tracking-widest">
                        {manga.category}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                          <div className={`h-full ${idx % 3 === 0 ? 'bg-rasta-green' : idx % 3 === 1 ? 'bg-rasta-gold' : 'bg-rasta-red'} w-3/4 shadow-[0_0_8px_rgba(252,221,9,0.3)]`}></div>
                        </div>
                        <span className="text-[9px] font-black text-zinc-400">75%</span>
                      </div>
                      <div className="flex items-center gap-4 text-[9px] font-black text-zinc-500 uppercase">
                        <span className="flex items-center gap-1"><Clock size={10} className="text-rasta-gold" /> Ch. 84 / 102</span>
                        <span className="flex items-center gap-1"><CheckCircle2 size={10} className="text-rasta-green" /> Updated</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </main>
      
      <FooterNav />
    </div>
  );
}
