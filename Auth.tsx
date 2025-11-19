import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Key, UserPlus, Sparkles, Rocket, Ghost, Notebook as Robot, AlignCenter as Alien } from 'lucide-react';

const avatars = [
  { icon: Ghost, color: 'from-purple-500 to-pink-500' },
  { icon: Robot, color: 'from-blue-500 to-cyan-500' },
  { icon: Alien, color: 'from-green-500 to-emerald-500' },
  { icon: Rocket, color: 'from-orange-500 to-red-500' },
];

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let success;
      if (isLogin) {
        success = await login(username, password);
        if (success) {
          navigate('/interview');
        } else {
          setError('Invalid credentials');
        }
      } else {
        if (!selectedAvatar) {
          setError('Please select an avatar');
          setIsLoading(false);
          return;
        }
        success = await register(username, password, selectedAvatar);
        if (success) {
          navigate('/interview');
        } else {
          setError('Username already taken');
        }
      }
    } catch (err) {
      setError('An error occurred');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Sparkles className="w-8 h-8 text-primary" />
          </motion.div>
          <h1 className="text-3xl font-bold">{isLogin ? 'Welcome Back!' : 'Join the Adventure!'}</h1>
          <p className="text-muted-foreground mt-2">
            {isLogin ? 'Ready to ace your interviews?' : 'Create your account and start practicing'}
          </p>
        </div>

        <motion.div
          layout
          className="bg-card rounded-lg shadow-lg p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary"
                  placeholder="Enter your username"
                  required
                />
              </motion.div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary"
                  placeholder="Enter your password"
                  required
                />
              </motion.div>
            </div>

            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium">Choose Your Avatar</label>
                  <div className="grid grid-cols-4 gap-4">
                    {avatars.map((avatar, index) => (
                      <motion.button
                        key={index}
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedAvatar(`avatar-${index}`)}
                        className={`relative p-4 rounded-lg bg-gradient-to-br ${avatar.color} ${
                          selectedAvatar === `avatar-${index}` ? 'ring-2 ring-primary' : ''
                        }`}
                      >
                        <avatar.icon className="w-8 h-8 text-white" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-destructive text-sm"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-2 rounded-lg bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              ) : (
                <>
                  {isLogin ? <User className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                  {isLogin ? 'Login' : 'Create Account'}
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline text-sm"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}