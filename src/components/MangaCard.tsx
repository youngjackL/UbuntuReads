import React from "react";
import { Manga } from "../services/mangaService";
import { Link } from "react-router-dom";

interface MangaCardProps {
  manga: Manga;
  isLarge?: boolean;
  index?: number;
}

const MangaCard: React.FC<MangaCardProps> = ({ manga, isLarge, index = 0 }) => {
  const borderColors = ["border-rasta-green", "border-rasta-gold", "border-rasta-red"];
  const bColor = borderColors[index % 3];

  return (
    <Link 
      to={`/manga/${manga.id}`}
      className={`group relative flex flex-col ${isLarge ? 'w-52' : ''}`}
    >
      <div className={`aspect-[2/2.8] rounded overflow-hidden relative bg-[#1a1a1a] border-2 ${bColor} group-hover:scale-[1.02] transition-transform duration-300`}>
        <img 
          src={manga.coverImage} 
          alt={manga.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Badges */}
        {manga.id === "1" && (
          <div className="absolute top-2 left-0 px-2 py-0.5 bg-rasta-red text-[8px] font-black uppercase tracking-tighter rounded-r shadow-[2px_0_10px_rgba(218,18,26,0.4)]">
            POPULAR
          </div>
        )}
        {manga.id === "2" && (
          <div className="absolute top-2 left-0 px-2 py-0.5 bg-rasta-gold text-black text-[8px] font-black uppercase tracking-tighter rounded-r shadow-[2px_0_10px_rgba(252,221,9,0.4)]">
            HOT
          </div>
        )}
        
        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
        
        {/* Text over image on large cards */}
        {isLarge && (
           <div className="absolute bottom-2 left-2 right-2">
             <h3 className="font-display font-bold text-xs leading-tight line-clamp-2">
               {manga.title}
             </h3>
             <div className="flex gap-1.5 mt-1">
               <span className="text-[9px] text-rasta-gold font-bold">{manga.category}</span>
               <span className="text-[9px] text-zinc-500">•</span>
               <span className="text-[9px] text-zinc-300 font-medium">Survivor</span>
             </div>
           </div>
        )}
      </div>

      {/* Text below for standard grid */}
      {!isLarge && (
        <div className="mt-2 px-0.5">
          <h3 className="font-display font-bold text-[11px] leading-tight line-clamp-2 group-hover:text-rasta-gold transition-colors capitalize">
            {manga.title.toLowerCase()}
          </h3>
          {manga.status === "New" && (
            <div className="mt-1 text-[8px] font-black text-rasta-green uppercase">NEW RELEASE</div>
          )}
          {manga.status !== "New" && (
             <p className="mt-1 text-[9px] text-zinc-500 font-bold">Ch. {manga.chapters} / 102</p>
          )}
        </div>
      )}
    </Link>
  );
};

export default MangaCard;
