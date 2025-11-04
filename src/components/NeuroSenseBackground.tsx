import React from 'react';
import medicalNeuralBg from '@/assets/medical-neural-bg.jpg';

const NeuroSenseBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base Gradient */}
      <div className="bg-NeuroSense-gradient absolute inset-0" />
      
      {/* Medical Neural Network Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${medicalNeuralBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Animated Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-ai-particle rounded-full animate-particle-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Neural Network Lines */}
      <svg className="absolute inset-0 w-full h-full animate-neural-pulse">
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--neural-blue))" stopOpacity="0.3"/>
            <stop offset="50%" stopColor="hsl(var(--ai-particle))" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="hsl(var(--neural-blue))" stopOpacity="0.3"/>
          </linearGradient>
        </defs>
        
        {/* Connecting neural lines */}
        <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="url(#neuralGradient)" strokeWidth="1" opacity="0.4"/>
        <line x1="70%" y1="10%" x2="90%" y2="30%" stroke="url(#neuralGradient)" strokeWidth="1" opacity="0.4"/>
        <line x1="20%" y1="60%" x2="50%" y2="80%" stroke="url(#neuralGradient)" strokeWidth="1" opacity="0.4"/>
        <line x1="60%" y1="50%" x2="80%" y2="70%" stroke="url(#neuralGradient)" strokeWidth="1" opacity="0.4"/>
        
        {/* Neural nodes */}
        <circle cx="10%" cy="20%" r="3" fill="hsl(var(--ai-particle))" opacity="0.6"/>
        <circle cx="30%" cy="40%" r="2" fill="hsl(var(--neural-blue))" opacity="0.5"/>
        <circle cx="70%" cy="10%" r="2.5" fill="hsl(var(--ai-particle))" opacity="0.6"/>
        <circle cx="90%" cy="30%" r="2" fill="hsl(var(--neural-blue))" opacity="0.5"/>
      </svg>
      
      {/* DNA Helix Animation */}
      <div className="absolute top-1/4 right-4 opacity-20">
        <div className="animate-dna-rotate">
          <svg width="60" height="150" viewBox="0 0 60 150">
            <defs>
              <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--dna-helix))" stopOpacity="0.8"/>
                <stop offset="50%" stopColor="hsl(var(--primary-light))" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="hsl(var(--dna-helix))" stopOpacity="0.8"/>
              </linearGradient>
            </defs>
            
            {/* DNA double helix */}
            <path 
              d="M15 0 Q30 25 15 50 Q0 75 15 100 Q30 125 15 150"
              stroke="url(#dnaGradient)" 
              strokeWidth="2" 
              fill="none"
            />
            <path 
              d="M45 0 Q30 25 45 50 Q60 75 45 100 Q30 125 45 150"
              stroke="url(#dnaGradient)" 
              strokeWidth="2" 
              fill="none"
            />
            
            {/* Cross connections */}
            <line x1="15" y1="25" x2="45" y2="25" stroke="url(#dnaGradient)" strokeWidth="1"/>
            <line x1="15" y1="75" x2="45" y2="75" stroke="url(#dnaGradient)" strokeWidth="1"/>
            <line x1="15" y1="125" x2="45" y2="125" stroke="url(#dnaGradient)" strokeWidth="1"/>
          </svg>
        </div>
      </div>
      
      {/* Holographic Grid Lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 grid-rows-12 h-full w-full">
          {[...Array(12)].map((_, row) => (
            [...Array(8)].map((_, col) => (
              <div 
                key={`${row}-${col}`}
                className="border-r border-b border-primary-light"
                style={{
                  animationDelay: `${(row + col) * 0.1}s`
                }}
              />
            ))
          ))}
        </div>
      </div>
    </div>
  );
};

export default NeuroSenseBackground;