import React from 'react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: ButtonProps) => {
  const variants = {
    primary: 'bg-brand-primary text-white hover:bg-brand-deep shadow-sm hover:shadow-md ring-1 ring-inset ring-white/10 btn-glow',
    secondary: 'bg-surface border border-border/60 text-foreground hover:bg-muted/5 hover:border-border shadow-sm',
    ghost: 'bg-transparent text-foreground hover:bg-muted/10',
    whatsapp: 'bg-[#25D366] text-white hover:bg-[#20BD5A] shadow-sm hover:shadow-md ring-1 ring-inset ring-white/10 btn-glow',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap',
    md: 'px-5 sm:px-6 py-2.5 text-sm font-medium whitespace-nowrap',
    lg: 'px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-medium whitespace-nowrap',
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'inline-flex items-center justify-center rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};
