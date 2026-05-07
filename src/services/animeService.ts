export interface Anime {
  mal_id: number;
  title: string;
  title_japanese: string;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
  };
  score: number;
  episodes: number;
  status: string;
  rating: string;
  synopsis: string;
  genres: { name: string }[];
  studios: { name: string }[];
  rank: number;
  airing: boolean;
  type: string;
}

export const AnimeService = {
  async search(query: string): Promise<Anime[]> {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Anime search error:", error);
      throw error;
    }
  },

  async getTopAiring(): Promise<Anime[]> {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/top/anime?filter=airing`);
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Top airing error:", error);
      throw error;
    }
  },

  async getTrending(): Promise<Anime[]> {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/top/anime?filter=bypopularity`);
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Trending error:", error);
      throw error;
    }
  },

  async getTopRated(): Promise<Anime[]> {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/top/anime?filter=favorite`);
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Top rated error:", error);
      throw error;
    }
  },

  async getNewReleases(): Promise<Anime[]> {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/seasons/now`);
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("New releases error:", error);
      throw error;
    }
  },

  async getMovies(): Promise<Anime[]> {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/top/anime?type=movie`);
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Movies error:", error);
      throw error;
    }
  },

  async getById(id: string): Promise<Anime> {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Get anime by id error:", error);
      throw error;
    }
  },

  async getRecommendations(id: string): Promise<Anime[]> {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`);
      const data = await response.json();
      return data.data?.map((rec: any) => rec.entry) || [];
    } catch (error) {
      console.error("Recommendations error:", error);
      throw error;
    }
  }
};
