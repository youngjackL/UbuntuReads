import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      alert("Authentication Service is currently offline. Logged in as Guest.");
      navigate('/');
    }, 1000);
  };

  const handleForgotPassword = () => {
    alert("Auth services are disconnected.");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-[#141414] p-8 rounded-2xl border border-zinc-800 shadow-2xl"
      >
        <div className="text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-rasta-red/10 mb-4">
            <LogIn className="h-8 w-8 text-rasta-red" />
          </div>
          <h2 className="text-3xl font-display font-black text-white italic tracking-tighter uppercase">
            Welcome <span className="text-rasta-gold">Back</span>
          </h2>
          <p className="mt-2 text-zinc-500 font-bold uppercase text-[10px] tracking-widest italic">
            Log in to access your collection
          </p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-rasta-red/10 border border-rasta-red/20 p-4 rounded-xl flex items-center gap-3 text-rasta-red text-xs font-bold"
          >
            <AlertCircle size={16} />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 mb-1 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-white focus:outline-none focus:border-rasta-gold focus:ring-1 focus:ring-rasta-gold/20 transition-all placeholder:text-zinc-700"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 mb-1 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-white focus:outline-none focus:border-rasta-gold focus:ring-1 focus:ring-rasta-gold/20 transition-all placeholder:text-zinc-700"
                  placeholder="••••••••"
                />
              </div>
              <button 
                type="button"
                onClick={handleForgotPassword}
                className="absolute right-0 top-0 text-[10px] font-black text-rasta-gold uppercase hover:underline"
              >
                Forgot?
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rasta-red text-white py-4 rounded-xl font-black text-xs uppercase tracking-tighter shadow-lg shadow-rasta-red/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : (
              <>
                CONTINUE <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-6">
          New here? <Link to="/signup" className="text-rasta-gold hover:underline">Create an account</Link>
        </p>
      </motion.div>
    </div>
  );
}
