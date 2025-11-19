import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface User {
  id: string;
  username: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string, avatar: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Temporary storage
const users: { username: string; password: string; avatar: string; id: string }[] = [];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (username: string, password: string) => {
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      const userObj = {
        id: foundUser.id,
        username: foundUser.username,
        avatar: foundUser.avatar,
      };
      setUser(userObj);
      localStorage.setItem('user', JSON.stringify(userObj));
      return true;
    }
    return false;
  };

  const register = async (username: string, password: string, avatar: string) => {
    if (users.some((u) => u.username === username)) {
      return false;
    }

    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      password,
      avatar,
    };
    users.push(newUser);
    
    // Auto login after registration
    await login(username, password);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}