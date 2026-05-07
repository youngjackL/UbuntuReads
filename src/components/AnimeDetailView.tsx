import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Anime, AnimeService } from "../services/animeService";
import { ChevronLeft, Play, BookmarkPlus, Info, Star, Clock, User, Tv } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import AnimeCard from "./AnimeCard";

export default function AnimeDetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [recommendations, setRecommendations] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    window.scrollTo(0, 0);

    Promise.all([
      AnimeService.getById(id),
      AnimeService.getRecommendations(id)
    ])
      .then(([animeData, recData]) => {
        setAnime(animeData);
        setRecommendations(recData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Couldn't load anime right now. Check your connection.");
        setLoading(false);
      });
  }, [id]);

  const addToLibrary = () => {
    if (!anime) return;
    const library = JSON.parse(localStorage.getItem('anime_library') || '[]');
    if (!library.find((item: any) => item.mal_id === anime.mal_id)) {
      localStorage.setItem('anime_library', JSON.stringify([...library, anime]));
      alert('Added to library!');
    } else {
      alert('Already in library!');
    }
  };

  const getSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleWatchNow = () => {
    if (!anime) return;
    
    // Pattern: https://animepahe.pw/play/[slug]/[episode-id]
    // Since exact episode IDs require a backend mapping or scraper, 
    // we implement the requested Search Fallback as the primary reliable driver.
    const slug = getSlug(anime.title);
    const searchUrl = `https://animepahe.pw/anime?q=${encodeURIComponent(anime.title)}`;
    
    // Implementation: Deep Linking strategy via browser redirect
    // Security: Using noopener,noreferrer to protect user session
    window.open(searchUrl, '_blank', 'noopener,noreferrer');
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="w-10 h-10 border-4 border-rasta-gold border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (error || !anime) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-center px-4">
      <p className="text-zinc-500 font-bold mb-6">{error || "Anime not found."}</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-8 py-3 bg-rasta-red text-white font-black uppercase rounded shadow-lg shadow-rasta-red/20 active:scale-95 transition-transform"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-20">
      {/* Hero Section */}
      <div className="relative h-[65vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={anime.images.jpg.large_image_url} 
            className="w-full h-full object-cover"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent"></div>
        </div>

        {/* Top Nav */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white">
              <Star size={20} className={anime.score > 8 ? "text-rasta-gold" : "text-white"} />
            </button>
          </div>
        </div>

        {/* Title & Static Info */}
        <div className="absolute bottom-6 left-0 right-0 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-display font-black text-white italic tracking-tighter uppercase leading-tight">
              {anime.title}
            </h1>
            <p className="text-zinc-400 font-bold text-xs mt-1 uppercase tracking-widest">
              {anime.title_japanese}
            </p>

            {/* Badges Row */}
            <div className="flex flex-wrap gap-2 mt-6">
               <div className="bg-[#1a1a1a] border border-zinc-800 rounded px-3 py-2 flex flex-col gap-0.5 min-w-[70px]">
                  <span className="text-[7px] font-black text-zinc-500 uppercase tracking-tighter">Episodes</span>
                  <span className="text-[10px] font-black text-rasta-gold uppercase">{anime.episodes || "?"} EPS</span>
               </div>
               <div className="bg-[#1a1a1a] border border-zinc-800 rounded px-3 py-2 flex flex-col gap-0.5 min-w-[70px]">
                  <span className="text-[7px] font-black text-zinc-500 uppercase tracking-tighter">Status</span>
                  <span className="text-[10px] font-black text-rasta-gold uppercase truncate">{anime.status}</span>
               </div>
               <div className="bg-[#1a1a1a] border border-zinc-800 rounded px-3 py-2 flex flex-col gap-0.5 min-w-[70px]">
                  <span className="text-[7px] font-black text-zinc-500 uppercase tracking-tighter">Rating</span>
                  <span className="text-[10px] font-black text-rasta-gold uppercase truncate">{anime.rating?.split(' ')[0] || "PG-13"}</span>
               </div>
               <div className="bg-[#1a1a1a] border border-zinc-800 rounded px-3 py-2 flex flex-col gap-0.5 min-w-[70px]">
                  <span className="text-[7px] font-black text-zinc-500 uppercase tracking-tighter">Studio</span>
                  <span className="text-[10px] font-black text-rasta-gold uppercase truncate">{anime.studios?.[0]?.name || "N/A"}</span>
               </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <main className="px-6 space-y-8">
        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button 
            onClick={handleWatchNow}
            className="w-full py-4 bg-rasta-red text-white flex items-center justify-center gap-2 rounded-xl font-black text-xs uppercase tracking-tighter shadow-lg shadow-rasta-red/30 active:scale-[0.98] transition-transform"
          >
            <Play size={16} fill="currentColor" />
            WATCH NOW
          </button>
          <button 
            onClick={addToLibrary}
            className="w-full py-4 border-2 border-rasta-green text-rasta-green flex items-center justify-center gap-2 rounded-xl font-black text-xs uppercase tracking-tighter active:scale-[0.98] transition-transform font-bold"
          >
            <BookmarkPlus size={16} />
            ADD TO LIBRARY
          </button>
        </div>

        {/* Synopsis */}
        <section>
          <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2 font-display">
            <Info size={12} className="text-rasta-gold" /> SYNOPSIS
          </h3>
          <div className="relative">
            <p className={`text-zinc-300 text-sm leading-relaxed font-medium transition-all duration-300 ${showFullSynopsis ? '' : 'line-clamp-4'}`}>
              {anime.synopsis}
            </p>
            <button 
              onClick={() => setShowFullSynopsis(!showFullSynopsis)}
              className="text-rasta-gold text-[10px] font-black uppercase mt-2 tracking-tighter hover:underline"
            >
              {showFullSynopsis ? "Show Less" : "Show More"}
            </button>
          </div>
        </section>

        {/* Genres */}
        <section>
          <div className="flex flex-wrap gap-2">
            {anime.genres.map((genre, i) => (
              <span key={i} className="px-3 py-1.5 bg-rasta-green/10 border border-rasta-green/30 text-rasta-green text-[10px] font-black uppercase rounded-full tracking-wider">
                {genre.name}
              </span>
            ))}
          </div>
        </section>

        {/* Related */}
        <section>
          <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <Tv size={12} className="text-rasta-gold" /> RELATED ANIME
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
            {recommendations.length > 0 ? (
              recommendations.map((rec, i) => (
                <AnimeCard key={`${rec.mal_id || i}-${i}`} anime={rec as any} index={i} />
              ))
            ) : (
              <p className="text-zinc-600 text-[10px] font-bold uppercase italic">No recommendations found yet...</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
