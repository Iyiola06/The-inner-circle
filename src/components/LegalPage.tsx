import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Shield, FileText, Cookie } from 'lucide-react';
import { Button } from './Button';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'cookie';
  onBack: () => void;
}

const legalData = {
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'Your Data & Privacy',
    icon: Shield,
    content: `
      <h2>1. Introduction</h2>
      <p>The Inner Circle ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and join our community.</p>
      
      <h2>2. Information We Collect</h2>
      <p>We collect information that you provide directly to us when you join our community, subscribe to our newsletter, or communicate with us via WhatsApp or other platforms. This may include your name, email address, phone number, and payment information.</p>
      
      <h2>3. How We Use Your Information</h2>
      <p>We use the information we collect to provide, maintain, and improve our services, to process your membership, to communicate with you, and to send you updates and promotional materials.</p>
      
      <h2>4. Data Security</h2>
      <p>We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.</p>
      
      <h2>5. Your Rights</h2>
      <p>You have the right to access, correct, or delete your personal information. You may also object to the processing of your personal information or request that we restrict the processing of your personal information.</p>
    `
  },
  terms: {
    title: 'Terms of Service',
    subtitle: 'Community Guidelines & Terms',
    icon: FileText,
    content: `
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing our website and joining our community, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
      
      <h2>2. Membership and Conduct</h2>
      <p>Membership in The Inner Circle is a privilege. We expect all members to conduct themselves with intentionality, discipline, and respect for others. We reserve the right to terminate membership for any conduct that we deem inappropriate or harmful to the community.</p>
      
      <h2>3. Fees and Payments</h2>
      <p>Membership fees are non-refundable unless otherwise stated. We reserve the right to change our fees at any time, but we will provide you with notice of any such changes.</p>
      
      <h2>4. Intellectual Property</h2>
      <p>All content and materials provided as part of our services are the property of The Inner Circle or its licensors and are protected by intellectual property laws.</p>
      
      <h2>5. Limitation of Liability</h2>
      <p>In no event shall The Inner Circle be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of our services.</p>
    `
  },
  cookie: {
    title: 'Cookie Policy',
    subtitle: 'How We Use Cookies',
    icon: Cookie,
    content: `
      <h2>1. What are Cookies?</h2>
      <p>Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.</p>
      
      <h2>2. How We Use Cookies</h2>
      <p>We use cookies to understand how you use our website, to remember your preferences, and to improve your overall experience. We may use both session cookies and persistent cookies.</p>
      
      <h2>3. Types of Cookies We Use</h2>
      <p>We use essential cookies for the operation of our website, analytical cookies to understand our audience, and functional cookies to remember your choices.</p>
      
      <h2>4. Managing Cookies</h2>
      <p>You can manage your cookie preferences through your browser settings. However, please note that disabling certain cookies may affect the functionality of our website.</p>
    `
  }
};

export const LegalPage: React.FC<LegalPageProps> = ({ type, onBack }) => {
  const data = legalData[type];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-12 group gap-2 text-muted hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Button>

        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-8"
          >
            <data.icon className="w-8 h-8" />
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-primary font-medium text-xs uppercase tracking-widest mb-4"
          >
            {data.subtitle}
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-display font-medium text-foreground tracking-tight mb-6"
          >
            {data.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg leading-relaxed font-normal"
          >
            Last updated: April 2, 2026
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-invert max-w-none prose-headings:font-display prose-headings:font-medium prose-headings:text-foreground prose-p:text-muted prose-p:leading-relaxed prose-p:font-normal prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </div>
    </div>
  );
};
