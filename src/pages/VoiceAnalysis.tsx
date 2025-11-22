import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Navigation } from '@/components/Navigation';
import { Mic, MicOff, Volume2, Languages, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import VoiceRecorder from "@/components/VoiceRecorder";

const VoiceAnalysis = () => {
  const navigate = useNavigate();
  const { t, language: appLanguage } = useLanguage();

  const [language, setLanguage] = useState<'en' | 'ar'>(appLanguage);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);

  const handleRecordComplete = (blob: Blob) => {
    setRecordedBlob(blob);
    toast.success(t("voice.recordingSaved"));
  };

  const handleComplete = () => {
    if (!recordedBlob) {
      toast.error(t("voice.errorNoRecording"));
      return;
    }
    navigate('/results');
  };

  return (
    <>
      <LanguageToggle />
      <div className="min-h-screen p-6 pb-24">
        <div className="max-w-2xl mx-auto space-y-6">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {t('voice.title')}
            </h1>
            <p className="text-muted-foreground">{t('voice.subtitle')}</p>
          </div>

          {/* Recorder */}
          <Card className="p-8 bg-card/50 backdrop-blur-lg text-center">
            <VoiceRecorder onRecordComplete={handleRecordComplete} />

            {recordedBlob && (
              <p className="text-green-500 mt-4">{t("voice.recordingSaved")}</p>
            )}
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Button
              onClick={() => navigate('/input')}
              variant="outline"
              className="flex-1"
            >
              {t('input.back')}
            </Button>

            <Button
              onClick={handleComplete}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            >
              {t('voice.complete')}
              <ArrowRight className="mr-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <Navigation />
    </>
  );
};

export default VoiceAnalysis;
