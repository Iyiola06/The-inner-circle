import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';
import { motion } from 'motion/react';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="p-2 rounded-full glass hover:bg-muted/10 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-brand-primary" />
      ) : (
        <Sun className="w-5 h-5 text-brand-primary" />
      )}
    </motion.button>
  );
};
