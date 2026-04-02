import React from 'react';
import { motion } from 'motion/react';
import { useHomepageStats } from '../lib/site-data';

export const StatsSection = () => {
  const stats = useHomepageStats();

  return (
    <section className="py-24 px-6 bg-brand-primary text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-4xl md:text-5xl lg:text-6xl font-display font-medium mb-2 tracking-tight">{stat.value}</p>
              <p className="text-white/70 font-medium text-[10px] uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
