import React from 'react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  key?: React.Key;
}

export const Card = ({ children, className, hoverEffect = true, ...props }: CardProps) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4 } : {}}
      transition={{ type: 'spring', damping: 25, stiffness: 120 }}
      className={cn(
        'premium-card p-8 md:p-10',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading = ({
  title,
  subtitle,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        'max-w-4xl mx-auto mb-16 md:mb-20',
        align === 'center' ? 'text-center' : 'text-left',
        className
      )}
    >
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn("flex items-center gap-3 mb-6", align === 'center' ? 'justify-center' : 'justify-start')}
        >
          <span className="text-brand-primary font-medium text-xs uppercase tracking-widest block">
            {subtitle}
          </span>
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.8 }}
        className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-foreground mb-6 leading-[1.1] tracking-tight"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className={cn("text-muted text-lg md:text-xl leading-relaxed font-normal max-w-2xl", align === 'center' ? 'mx-auto' : '')}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};
