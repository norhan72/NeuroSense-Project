import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Languages } from "lucide-react";

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      size="sm"
      className="fixed top-4 left-4 z-50 gap-2"
    >
      <Languages className="w-4 h-4" />
      {language === 'ar' ? 'English' : 'العربية'}
    </Button>
  );
};
