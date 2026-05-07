import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomeView from "./components/HomeView";
import ReaderView from "./components/ReaderView";
import MangaDetailView from "./components/MangaDetailView";
import LibraryView from "./components/LibraryView";
import LeaderboardView from "./components/LeaderboardView";
import CommunityView from "./components/CommunityView";
import AnimeView from "./components/AnimeView";
import AnimeDetailView from "./components/AnimeDetailView";
import LoginView from "./components/LoginView";
import SignupView from "./components/SignupView";
import ProfileView from "./components/ProfileView";
import SettingsView from "./components/SettingsView";
import { AuthProvider, useAuth } from "./components/AuthContext";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-black text-white font-sans selection:bg-rasta-gold/30 selection:text-white">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/manga/:id" element={<MangaDetailView />} />
            <Route path="/library" element={<LibraryView />} />
            <Route path="/leaderboard" element={<LeaderboardView />} />
            <Route path="/community" element={<CommunityView />} />
            <Route path="/reader/:id" element={<ReaderView />} />
            <Route path="/anime" element={<AnimeView />} />
            <Route path="/anime/:id" element={<AnimeDetailView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/signup" element={<SignupView />} />
            <Route path="/profile" element={<PrivateRoute><ProfileView /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><SettingsView /></PrivateRoute>} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}
