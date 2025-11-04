import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  animated?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className, 
  glow = false,
  animated = false 
}) => {
  return (
    <div className={cn(
      "bg-glass-morphism rounded-lg p-6 backdrop-blur-md",
      "border border-glass-border/30",
      glow && "neon-glow",
      animated && "animate-hologram-flicker",
      className
    )}>
      {children}
    </div>
  );
};

export default GlassCard;