export interface Manga {
  id: string;
  title: string;
  coverImage: string;
  description: string;
  status: string;
  category: string;
  chapters: number;
}

export interface Chapter {
  pages: string[];
}

export const MangaService = {
  async getAll(): Promise<Manga[]> {
    const res = await fetch("/api/manga");
    if (!res.ok) throw new Error("Failed to fetch manga metadata");
    return res.json();
  },

  async getById(id: string): Promise<Manga> {
    const res = await fetch("/api/manga");
    if (!res.ok) throw new Error("Failed to fetch manga metadata");
    const mangas: Manga[] = await res.json();
    const manga = mangas.find(m => m.id === id);
    if (!manga) throw new Error("Manga not found");
    return manga;
  },

  async getChapterList(mangaId: string): Promise<{ id: string, title: string, date: string }[]> {
    // In this mock-ish API setup, we might have static chapters
    return Array.from({ length: 15 }, (_, i) => ({
      id: `${i + 1}`,
      title: `Chapter ${i + 1}`,
      date: new Date(Date.now() - i * 86400000).toLocaleDateString()
    }));
  },

  async getChapter(mangaId: string, chapterId: string): Promise<Chapter> {
    const res = await fetch(`/api/manga/${mangaId}/chapter/${chapterId}`);
    if (!res.ok) throw new Error("Failed to fetch chapter pages");
    return res.json();
  },

  async syncToLibrary(mangaId: string, status: "read" | "library") {
    // This would normally call a Google Sheets script or AppSheet API
    console.log(`Syncing ${mangaId} to ${status} in AppSheet Database...`);
    return true;
  },

  async getLeaderboard() {
    const res = await fetch("/api/leaderboard");
    if (!res.ok) throw new Error("Failed to fetch leaderboard");
    return res.json();
  },

  async getCommunityPosts() {
    const res = await fetch("/api/community");
    if (!res.ok) throw new Error("Failed to fetch community posts");
    return res.json();
  },

  async getStreak() {
    const res = await fetch("/api/user/streak");
    if (!res.ok) throw new Error("Failed to fetch streak data");
    return res.json();
  }
};
