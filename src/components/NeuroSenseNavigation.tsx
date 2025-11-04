import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, FileText, Mic, Activity, BarChart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BioScanNavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const BioScanNavigation: React.FC<BioScanNavigationProps> = ({ currentScreen, onNavigate }) => {
  const { t } = useLanguage();
  
  const navItems = [
    { screen: 'splash', label: t('nav.home'), icon: Home },
    { screen: 'input', label: t('nav.input'), icon: FileText },
    { screen: 'voice', label: t('nav.voice'), icon: Mic },
    { screen: 'disability', label: t('nav.disability'), icon: Activity },
    { screen: 'results', label: t('nav.results'), icon: BarChart },
  ];

  if (currentScreen === 'splash') return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border/50 z-50">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = currentScreen === item.screen;
            const Icon = item.icon;
            return (
              <Button
                key={item.screen}
                variant="ghost"
                onClick={() => onNavigate(item.screen)}
                className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-semibold">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BioScanNavigation;
