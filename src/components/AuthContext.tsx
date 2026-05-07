import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  theme: 'light' | 'dark';
}

interface AuthContextType {
  user: any | null;
  profile: UserProfile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, profile: null, loading: false });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Guest mode only
    setUser(null);
    setProfile(null);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
