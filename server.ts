import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Manga Metadata
  // In a real scenario, this would fetch from Google Sheets API using a service account
  app.get("/api/manga", (req, res) => {
    const mangaData = [
      {
        id: "1",
        title: "The Great Rift Legend",
        coverImage: "https://images.unsplash.com/photo-1627389955805-402316e45391?auto=format&fit=crop&q=80&w=400",
        description: "A mysterious warrior from the Great Rift Valley discovers ancient powers.",
        status: "Ongoing",
        category: "Action",
        chapters: 124
      },
      {
        id: "2",
        title: "Savannah Samurai",
        coverImage: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=400",
        description: "Clashes under the Kenyan sun. A tale of honor and swordsmanship.",
        status: "Completed",
        category: "Adventure",
        chapters: 85
      },
      {
        id: "3",
        title: "Nairobi Nightfall",
        coverImage: "https://images.unsplash.com/photo-1634157703702-3c124b455499?auto=format&fit=crop&q=80&w=400",
        description: "The city never sleeps, and neither do the shadows that haunt its streets.",
        status: "Ongoing",
        category: "Noir",
        chapters: 42
      }
    ];
    res.json(mangaData);
  });

  // Mock endpoint for "Reader" pages
  app.get("/api/manga/:id/chapter/:chapterId", (req, res) => {
    // Return sample image URLs representing pages
    const pages = Array.from({ length: 15 }, (_, i) => 
      `https://picsum.photos/seed/${req.params.id}_${req.params.chapterId}_${i}/800/1200`
    );
    res.json({ pages });
  });

  // AppSheet Webhook Listener (Mock)
  app.post("/api/webhook/chapters", (req, res) => {
    console.log("AppSheet Webhook Received:", req.body);
    res.json({ message: "Update received and processing" });
  });

  // Leaderboard Mock Data
  app.get("/api/leaderboard", (req, res) => {
    const leaderboard = [
      { id: "1", username: "OtakuKing_KE", xp: 12540, avatar: "https://i.pravatar.cc/150?u=1", rank: 1 },
      { id: "2", username: "MangaMistress", xp: 10200, avatar: "https://i.pravatar.cc/150?u=2", rank: 2 },
      { id: "3", username: "SafariReader", xp: 9800, avatar: "https://i.pravatar.cc/150?u=3", rank: 3 },
      { id: "4", username: "NairobiNinja", xp: 8500, avatar: "https://i.pravatar.cc/150?u=4", rank: 4 },
      { id: "5", username: "UbuntuFanboy", xp: 7200, avatar: "https://i.pravatar.cc/150?u=5", rank: 5 },
    ];
    res.json(leaderboard);
  });

  // Community Feed Mock Data
  app.get("/api/community", (req, res) => {
    const posts = [
      {
        id: "101",
        user: "OtakuKing_KE",
        content: "Just finished Chapter 124 of Great Rift Legend. That cliffhanger is insane!",
        likes: 42,
        comments: 5,
        time: "2h ago",
        avatar: "https://i.pravatar.cc/150?u=1"
      },
      {
        id: "102",
        user: "MangaMistress",
        content: "Anyone have recommendations for series similar to Savannah Samurai? I love the art style.",
        likes: 12,
        comments: 18,
        time: "5h ago",
        avatar: "https://i.pravatar.cc/150?u=2"
      }
    ];
    res.json(posts);
  });

  // Streak Mock Data
  app.get("/api/user/streak", (req, res) => {
    res.json({
      currentStreak: 12,
      bestStreak: 45,
      lastRead: new Date().toISOString()
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
