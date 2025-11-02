import React, { createContext, useContext, useEffect, useState } from "react";
import { mockAuth } from "@/lib/mockAuth";
import { GoogleAuthService } from "@/lib/googleAuth";

type AuthContextValue = {
  user: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      // Check for Google OAuth session first
      const googleToken = GoogleAuthService.getSessionToken();
      const googleUser = GoogleAuthService.getUserData();
      
      if (googleToken && googleUser) {
        console.log('Found Google OAuth session:', googleUser);
        if (!mounted) return;
        setUser(googleUser);
        setLoading(false);
        return;
      }

      // Fall back to mock auth
      const {
        data: { session },
      } = await mockAuth.getSession();
      if (!mounted) return;
      setUser(session?.user ?? null);
      setLoading(false);
    };

    init();

    // Listen for storage changes (when Google auth data is updated)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user_data' || e.key === 'auth_token') {
        console.log('Storage changed, refreshing auth state');
        init();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    const { data: sub } = mockAuth.onAuthStateChange((_event, session) => {
      // Only update if we don't have Google auth
      const googleUser = GoogleAuthService.getUserData();
      if (!googleUser) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      window.removeEventListener('storage', handleStorageChange);
      sub.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    // Clear Google OAuth data
    GoogleAuthService.clearSession();
    
    // Clear mock auth data
    await mockAuth.signOut();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, signOut }}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
