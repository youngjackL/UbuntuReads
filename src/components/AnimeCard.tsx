import React from "react";
import { Link } from "react-router-dom";
import { Anime } from "../services/animeService";
import { Star } from "lucide-react";

interface AnimeCardProps {
  anime: Anime;
  index?: number;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, index = 0 }) => {
  const borderColors = ["border-rasta-green", "border-rasta-gold", "border-rasta-red"];
  const bColor = borderColors[index % 3];

  return (
    <Link 
      to={`/anime/${anime.mal_id}`}
      className="group block flex-shrink-0 w-36 sm:w-44"
    >
      <div className={`aspect-[2/2.8] rounded-xl overflow-hidden relative bg-[#1a1a1a] border-2 ${bColor} group-hover:scale-[1.02] transition-transform duration-300 shadow-lg shadow-black/40`}>
        <img 
          src={anime.images.jpg.image_url} 
          alt={anime.title}
          className="w-full h-full object-cover"
        />
        
        {/* Score Badge */}
        <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-rasta-green/90 backdrop-blur-sm text-[10px] font-black text-white rounded flex items-center gap-1 shadow-md">
          <Star size={8} fill="currentColor" stroke="none" />
          {anime.score || "N/A"}
        </div>

        {/* Badges */}
        {anime.rank && anime.rank <= 10 && (
          <div className="absolute top-2 left-0 px-2 py-0.5 bg-rasta-red text-[8px] font-black uppercase tracking-tighter rounded-r shadow-[2px_0_10px_rgba(218,18,26,0.4)]">
            POPULAR
          </div>
        )}
        {anime.airing && (
          <div className="absolute top-2 left-0 px-2 py-0.5 bg-rasta-gold text-black text-[8px] font-black uppercase tracking-tighter rounded-r shadow-[2px_0_10px_rgba(252,221,9,0.4)]">
            HOT
          </div>
        )}
      </div>

      <div className="mt-2 px-0.5">
        <h3 className="font-display font-bold text-[11px] leading-tight line-clamp-2 text-white group-hover:text-rasta-gold transition-colors">
          {anime.title}
        </h3>
        <p className="mt-1 text-[9px] text-rasta-gold font-bold uppercase tracking-wider">
          {anime.genres?.[0]?.name || "Anime"}
        </p>
      </div>
    </Link>
  );
};

export default AnimeCard;
