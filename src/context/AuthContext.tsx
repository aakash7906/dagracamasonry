import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  handle?: string;
  bio?: string;
  location?: string;
  websiteUrl?: string;
  githubHandle?: string;
  xHandle?: string;
  role?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => Promise<boolean>;
  signup: (name: string, email: string) => Promise<boolean>;
  updateUser: (data: Partial<User>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'dagraca_auth_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (!parsed.createdAt) {
          parsed.createdAt = new Date().toISOString();
        }
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {
      // localStorage may fail in private mode
    }
  }, [user]);

  const login = async (email: string, name?: string): Promise<boolean> => {
    // Simulating authentication delay
    await new Promise((r) => setTimeout(r, 600));
    const displayName = name || email.split('@')[0];
    const newUser: User = {
      id: 'usr_' + Date.now(),
      email,
      name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
      handle: displayName.toLowerCase().replace(/\s+/g, ''),
      role: 'Client',
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    return true;
  };

  const signup = async (name: string, email: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 700));
    const newUser: User = {
      id: 'usr_' + Date.now(),
      email,
      name: name.trim(),
      handle: name.trim().toLowerCase().replace(/\s+/g, ''),
      role: 'Client',
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    return true;
  };

  const updateUser = (data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) {
        return {
          id: 'usr_' + Date.now(),
          name: data.name || 'Aakash',
          email: data.email || 'a@gmail.com',
          handle: data.handle || 'aakash',
          role: 'Client',
          ...data,
        };
      }
      return { ...prev, ...data };
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
