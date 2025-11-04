import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";

export const Hero = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <LanguageToggle />
      {/* Animated DNA Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 border-2 border-primary rounded-full animate-dna"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 border-2 border-secondary rounded-full animate-dna" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-6">
        <div className="mb-6">
          <h1 className="text-7xl md:text-8xl font-bold mb-4" style={{ 
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {t('hero.title')}
          </h1>
          <p className="text-2xl text-secondary font-semibold tracking-wider">{t('hero.subtitle')}</p>
          <p className="text-sm text-muted-foreground tracking-widest mt-2">{t('hero.arabicSubtitle')}</p>
        </div>

        <div className="bg-card/50 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-border/50 animate-pulse-glow">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('hero.welcome')}</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            {t('hero.description')}
          </p>
          
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
            <p className="text-secondary font-semibold">{t('hero.systemsOnline')}</p>
          </div>

          <Button 
            onClick={() => navigate('/input')}
            size="lg"
            className="text-lg px-8 py-6 rounded-xl font-bold"
            style={{
              background: 'var(--gradient-primary)',
              transition: 'var(--transition-smooth)'
            }}
          >
            {t('hero.startAnalysis')}
          </Button>
        </div>

        {/* Version Info */}
        <div className="mt-8 text-sm text-muted-foreground">
          {t('hero.version')}
        </div>
      </div>
    </div>
  );
};
