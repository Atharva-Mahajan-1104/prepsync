import React from 'react';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { Moon, Sun, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavItemProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

function NavItem({ to, children, onClick }: NavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `px-4 py-2 rounded-lg transition-colors ${
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-secondary'
        }`
      }
    >
      {children}
    </NavLink>
  );
}

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <NavLink to="/" className="text-2xl font-bold">
              AI Coach
            </NavLink>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavItem to="/">Home</NavItem>
            {isAuthenticated ? (
              <>
                <NavItem to="/interview">Practice</NavItem>
                <NavItem to="/dashboard">Dashboard</NavItem>
              </>
            ) : (
              <NavItem to="/auth">Login</NavItem>
            )}
            <NavItem to="/resources">Resources</NavItem>
            <NavItem to="/contact">Contact</NavItem>
            
            {isAuthenticated && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-destructive/10 text-destructive"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </motion.button>
            )}
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-secondary"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-secondary"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 space-y-2"
          >
            <NavItem to="/" onClick={toggleMenu}>Home</NavItem>
            {isAuthenticated ? (
              <>
                <NavItem to="/interview" onClick={toggleMenu}>Practice</NavItem>
                <NavItem to="/dashboard" onClick={toggleMenu}>Dashboard</NavItem>
              </>
            ) : (
              <NavItem to="/auth" onClick={toggleMenu}>Login</NavItem>
            )}
            <NavItem to="/resources" onClick={toggleMenu}>Resources</NavItem>
            <NavItem to="/contact" onClick={toggleMenu}>Contact</NavItem>
            
            {isAuthenticated && (
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-destructive/10 text-destructive"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            )}
            
            <div className="pt-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="w-full p-2 rounded-lg bg-secondary flex items-center justify-center gap-2"
              >
                {darkMode ? (
                  <>
                    <Sun className="h-5 w-5" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}