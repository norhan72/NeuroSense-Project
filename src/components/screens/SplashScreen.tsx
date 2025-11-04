import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/GlassCard';
import NeurosSenseLogo from '@/assets/NeurosSensecan-logo.jpg';
import aiDoctorAvatar from '@/assets/ai-doctor-avatar.jpg';

interface SplashScreenProps {
  onNavigate: (screen: string) => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onNavigate }) => {
  const [showAvatar, setShowAvatar] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAvatar(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      {/* Main Logo */}
      <div className="mb-8 animate-hologram-flicker">
        <div className="text-center">
          <h1 className="text-6xl font-orbitron font-bold bg-gradient-to-r from-primary-light via-dna-helix to-ai-particle bg-clip-text text-transparent mb-2">
            BioScan
          </h1>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-medical-green"></div>
            <span className="text-xl font-inter font-light text-medical-green tracking-[0.3em]">
              AI
            </span>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-medical-green"></div>
          </div>
          <div className="mt-2 text-xs text-foreground-secondary/60 font-inter tracking-wider">
            ADVANCED MEDICAL ANALYSIS
          </div>
        </div>
      </div>

      {/* Welcome Card */}
      <GlassCard className="max-w-md text-center mb-8" glow animated>
        <h1 className="text-3xl font-orbitron font-bold text-foreground mb-4">
          Welcome to BioScan AI
        </h1>
        <p className="text-foreground-secondary font-inter leading-relaxed mb-6">
          Your advanced AI-powered medical analysis companion. Powered by cutting-edge 
          artificial intelligence and medical expertise.
        </p>
        
        {/* AI Heartbeat Indicator */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          <div className="w-3 h-3 bg-medical-green rounded-full animate-heartbeat"></div>
          <span className="text-sm text-medical-green font-inter">AI Systems Online</span>
        </div>

        <Button 
          onClick={() => onNavigate('input')}
          className="w-full bg-button-primary hover:bg-button-primary-hover text-primary-foreground font-inter font-semibold py-3 px-6 rounded-lg neon-glow transition-all duration-300"
        >
          Begin Analysis
        </Button>
      </GlassCard>

      {/* AI Avatar */}
      {showAvatar && (
        <div className="animate-hologram-flicker">
          <GlassCard className="max-w-xs">
            <div className="flex items-center space-x-4">
              <img 
                src={aiDoctorAvatar} 
                alt="AI Doctor Avatar" 
                className="w-16 h-16 rounded-full object-cover border-2 border-primary-light"
              />
              <div>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 bg-medical-green rounded-full animate-neural-pulse mr-2"></div>
                  <span className="text-xs text-medical-green">Ready to assist</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Version Info */}
      <div className="absolute bottom-4 left-4">
        <p className="text-xs text-foreground-secondary/50 font-inter">
          BioScan AI v2.1.0 • Neural Engine Active
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;