import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Anime, AnimeService } from "../services/animeService";
import Header from "./Header";
import FooterNav from "./FooterNav";
import AnimeCard from "./AnimeCard";
import { Search, X, ChevronRight, Play, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const FILTER_PILLS = ["All", "Action", "Romance", "Fantasy", "Isekai", "Shounen", "Mecha", "Horror"];

export default function AnimeView() {
  const [featured, setFeatured] = useState<Anime[]>([]);
  const [trending, setTrending] = useState<Anime[]>([]);
  const [topRated, setTopRated] = useState<Anime[]>([]);
  const [newReleases, setNewReleases] = useState<Anime[]>([]);
  const [movies, setMovies] = useState<Anime[]>([]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Anime[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initial Data Fetch
  useEffect(() => {
    setLoading(true);
    Promise.all([
      AnimeService.getTopAiring(),
      AnimeService.getTrending(),
      AnimeService.getTopRated(),
      AnimeService.getNewReleases(),
      AnimeService.getMovies(),
    ])
      .then(([airing, popular, top, recent, film]) => {
        setFeatured(airing.slice(0, 3));
        setTrending(popular);
        setTopRated(top);
        setNewReleases(recent);
        setMovies(film);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Couldn't load anime right now. Check your connection.");
        setLoading(false);
      });
  }, []);

  // Banner Auto-rotation
  useEffect(() => {
    if (featured.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featured.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featured]);

  // Debounced Search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setSearchLoading(true);
    const timeoutId = setTimeout(() => {
      AnimeService.search(searchQuery)
        .then((results) => {
          setSearchResults(results);
          setSearchLoading(false);
        })
        .catch(() => {
          setSearchLoading(false);
        });
    }, 500); // 500ms debounce as requested

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const Section = ({ title, data, icon: Icon }: { title: string, data: Anime[], icon?: any }) => (
    <section className="mb-10 last:mb-0">
      <div className="flex items-center justify-between mb-4 px-4 font-display">
        <h2 className="text-sm font-black tracking-tight text-white italic uppercase flex items-center gap-2">
          {Icon && <Icon size={14} className="text-rasta-gold" />}
          {title.split(' ')[0]} <span className={title.includes('TRENDING') ? 'text-rasta-gold' : title.includes('TOP') ? 'text-rasta-green' : 'text-rasta-red'}>{title.split(' ')?.[1] || ""}</span>
        </h2>
        <button className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest hover:text-white transition-colors">
          SEE ALL
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar px-4 scroll-smooth">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={`skeleton-${title}-${i}`} className="w-36 sm:w-44 aspect-[2/2.8] bg-zinc-900 animate-pulse rounded-xl" />
          ))
        ) : (
          data.map((anime, idx) => (
            <AnimeCard key={`${title}-${anime.mal_id}-${idx}`} anime={anime} index={idx} />
          ))
        )}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-24 text-white">
      <Header />
      
      {/* Tri-color divider */}
      <div className="fixed top-14 left-0 right-0 z-40 flex h-[2px]">
        <div className="flex-1 bg-rasta-green"></div>
        <div className="flex-1 bg-rasta-gold"></div>
        <div className="flex-1 bg-rasta-red"></div>
      </div>

      <main className="max-w-7xl mx-auto pt-16">
        {/* Search & Filters */}
        <div className="px-4 my-6 space-y-4">
          <div className="relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search anime, genres, studios..."
              className="w-full bg-[#1a1a1a] border border-zinc-800 rounded-xl py-3 px-11 text-xs font-bold text-zinc-300 focus:outline-none focus:border-rasta-gold focus:ring-1 focus:ring-rasta-gold/20 transition-all placeholder:text-zinc-600"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-rasta-gold">
               <Search size={16} strokeWidth={3} />
            </div>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
              >
                <X size={16} strokeWidth={3} />
              </button>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {FILTER_PILLS.map((pill) => (
              <button
                key={pill}
                onClick={() => setActiveFilter(pill)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all border ${
                  activeFilter === pill 
                    ? "bg-rasta-red border-rasta-red text-white shadow-lg shadow-rasta-red/20" 
                    : "bg-[#1a1a1a] border-zinc-800 text-zinc-500 hover:border-zinc-600"
                }`}
              >
                {pill}
              </button>
            ))}
          </div>
        </div>

        {isSearching ? (
          <div className="px-4">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-black text-white italic uppercase font-display">
                  SEARCH <span className="text-rasta-gold">RESULTS</span>
                </h2>
                {searchLoading && <div className="w-4 h-4 border-2 border-rasta-gold border-t-transparent rounded-full animate-spin"></div>}
             </div>

             {searchLoading ? (
               <div className="grid grid-cols-2 gap-4">
                 {[...Array(6)].map((_, i) => (
                   <div key={`search-skeleton-${i}`} className="aspect-[2/2.8] bg-zinc-900 animate-pulse rounded-xl" />
                 ))}
               </div>
             ) : searchResults.length > 0 ? (
               <div className="grid grid-cols-2 gap-4">
                 {searchResults.map((anime, idx) => (
                   <div key={`search-${anime.mal_id}-${idx}`} className="w-full">
                     <AnimeCard anime={anime} index={idx} />
                   </div>
                 ))}
               </div>
             ) : (
               <div className="text-center py-20">
                  <p className="text-zinc-600 text-sm font-bold uppercase italic">No results found for "{searchQuery}"</p>
               </div>
             )}
          </div>
        ) : (
          <>
            {/* Hero Banner */}
            <section className="mb-10 relative">
               <div className="relative aspect-[16/10] sm:aspect-video w-full overflow-hidden bg-zinc-900">
                  <AnimatePresence mode="wait">
                    {featured.length > 0 && (
                      <motion.div 
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                      >
                        <img 
                          src={featured[currentSlide].images.jpg.large_image_url} 
                          className="w-full h-full object-cover" 
                          alt=""
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 via-transparent to-transparent"></div>
                        
                        <div className="absolute bottom-10 left-6 right-6">
                           <div className="flex gap-2 mb-2">
                              {featured[currentSlide].genres.slice(0, 2).map((g, i) => (
                                <span key={i} className="text-rasta-gold text-[8px] font-black uppercase tracking-widest">{g.name}</span>
                              ))}
                              <span className="text-zinc-400 text-[8px] font-black uppercase">• {featured[currentSlide].episodes || "?"} EPISODES</span>
                           </div>
                           <h1 className="text-3xl font-display font-black text-white italic tracking-tighter uppercase mb-6 leading-tight max-w-[80%]">
                              {featured[currentSlide].title}
                           </h1>
                           <Link 
                             to={`/anime/${featured[currentSlide].mal_id}`}
                             className="inline-flex items-center gap-2 bg-rasta-red text-white px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-tighter shadow-lg shadow-rasta-red/30 active:scale-95 transition-transform"
                           >
                              <Info size={14} /> VIEW DETAILS
                           </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
               {/* Dots Indicator */}
               <div className="flex justify-center gap-1.5 mt-4">
                  {featured.map((_, i) => (
                    <button 
                      key={i} 
                      onClick={() => setCurrentSlide(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === i ? 'w-6 bg-rasta-gold' : 'w-1.5 bg-zinc-800'}`} 
                    />
                  ))}
               </div>
            </section>

            {error ? (
              <div className="px-4 py-20 text-center">
                 <p className="text-zinc-600 font-bold mb-6 italic">{error}</p>
                 <button 
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 bg-rasta-gold text-black font-black uppercase rounded shadow-lg shadow-rasta-gold/20 active:scale-95 transition-transform"
                 >
                    Retry
                 </button>
              </div>
            ) : (
              <>
                <Section title="🔥 TRENDING NOW" data={trending} />
                
                <div className="flex h-[1px] w-full my-4 opacity-10">
                  <div className="flex-1 bg-rasta-green"></div>
                  <div className="flex-1 bg-rasta-gold"></div>
                  <div className="flex-1 bg-rasta-red"></div>
                </div>

                <Section title="⭐ TOP RATED" data={topRated} />
                <Section title="🆕 NEW RELEASES" data={newReleases} />
                <Section title="🎬 MOVIES" data={movies} />
              </>
            )}
          </>
        )}
      </main>

      <FooterNav />
    </div>
  );
}
