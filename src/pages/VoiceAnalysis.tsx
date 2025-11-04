import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Navigation } from '@/components/Navigation';
import { Mic, MicOff, Volume2, Languages, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';

const VoiceAnalysis = () => {
  const navigate = useNavigate();
  const { t, language: appLanguage } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>(appLanguage);
  const [recordingTime, setRecordingTime] = useState(0);
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const [voiceAnalysisMode, setVoiceAnalysisMode] = useState<'free' | 'guided'>('guided');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
        setWaveformData(prev => [
          ...prev.slice(-20),
          Math.random() * 100
        ]);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setRecordingTime(0);
      setWaveformData([]);
      toast.success(t('voice.recordingStarted'));
    } else {
      toast.success(t('voice.recordingStopped'));
    }
  };

  const formatTime = (time: number) => {
    const seconds = Math.floor(time / 10);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const handleComplete = () => {
    if (recordingTime === 0) {
      toast.error(t('voice.errorNoRecording'));
      return;
    }
    toast.success(t('voice.recordingSaved'));
    navigate('/results');
  };

  return (
    <>
      <LanguageToggle />
      <div className="min-h-screen p-6 pb-24">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ 
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {t('voice.title')}
            </h1>
            <p className="text-muted-foreground">{t('voice.subtitle')}</p>
          </div>

          {/* Voice Analysis Mode */}
          <Card className="p-6 bg-card/50 backdrop-blur-lg border-border/50">
            <h3 className="text-lg font-semibold mb-4">{t('voice.analysisType')}</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => setVoiceAnalysisMode('guided')}
                variant={voiceAnalysisMode === 'guided' ? 'default' : 'outline'}
                className={voiceAnalysisMode === 'guided' ? 'bg-primary' : ''}
              >
                {t('voice.guidedReading')}
              </Button>
              <Button
                onClick={() => setVoiceAnalysisMode('free')}
                variant={voiceAnalysisMode === 'free' ? 'default' : 'outline'}
                className={voiceAnalysisMode === 'free' ? 'bg-primary' : ''}
              >
                {t('voice.freeSpeak')}
              </Button>
            </div>
          </Card>

          {/* Language Selection */}
          <Card className="p-6 bg-card/50 backdrop-blur-lg border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">{t('voice.languageSelect')}</h3>
                <p className="text-sm text-muted-foreground">{t('voice.languageDesc')}</p>
              </div>
              <Button
                onClick={() => setLanguage(prev => prev === 'en' ? 'ar' : 'en')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Languages className="w-4 h-4" />
                <span>{language === 'en' ? 'English' : 'العربية'}</span>
              </Button>
            </div>
          </Card>

          {/* Guided Mode - Sample Text */}
          {voiceAnalysisMode === 'guided' && (
            <Card className="p-6 bg-primary/10 border-primary/30">
              <div className="flex items-start gap-3">
                <Volume2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t('voice.sampleText')}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t('voice.sampleDesc')}
                  </p>
                  <div className="bg-card/50 rounded-lg p-4 border border-border/30">
                    <p className="text-sm leading-relaxed">
                      "{language === 'ar' ? t('voice.sampleQuoteAr') : t('voice.sampleQuoteEn')}"
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Free Mode Instructions */}
          {voiceAnalysisMode === 'free' && (
            <Card className="p-6 bg-secondary/10 border-secondary/30">
              <div className="flex items-start gap-3">
                <Volume2 className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t('voice.freeSpeakTitle')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('voice.freeSpeakDesc')}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Recording Interface */}
          <Card className="p-8 bg-card/50 backdrop-blur-lg border-border/50 text-center">
            {/* Recording Button */}
            <div className="relative mb-6 inline-block">
              <Button
                onClick={toggleRecording}
                className={`w-24 h-24 rounded-full transition-all duration-300 ${
                  isRecording 
                    ? 'bg-destructive hover:bg-destructive/80' 
                    : 'bg-primary hover:bg-primary/80'
                }`}
              >
                {isRecording ? (
                  <MicOff className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </Button>
              
              {isRecording && (
                <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-destructive animate-ping"></div>
              )}
            </div>

            {/* Status */}
            <div className="mb-4">
              <p className="text-xl font-bold mb-1">
                {isRecording ? t('voice.recording') : t('voice.pressToStart')}
              </p>
              {isRecording && (
                <p className="text-lg text-primary">
                  {formatTime(recordingTime)}
                </p>
              )}
            </div>

            {/* Waveform */}
            <div className="flex items-center justify-center gap-1 h-16 mb-4">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-primary to-secondary rounded-full transition-all duration-150"
                  style={{
                    height: isRecording 
                      ? `${Math.max(4, (waveformData[i] || 0) / 2)}px`
                      : '4px'
                  }}
                />
              ))}
            </div>

            {/* Instructions */}
            <p className="text-sm text-muted-foreground">
              {isRecording 
                ? (voiceAnalysisMode === 'guided' ? t('voice.readGuidedText') : t('voice.speakFreely'))
                : t('voice.pressToRecord')}
            </p>
          </Card>

          {/* Voice Quality */}
          <Card className="p-6 bg-card/50 backdrop-blur-lg border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{t('voice.quality')}</h3>
                <p className="text-sm text-muted-foreground">{t('voice.qualityDesc')}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-4 rounded-sm ${
                        i < (isRecording ? 4 : 2)
                          ? 'bg-green-500'
                          : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-green-500">
                  {isRecording ? t('voice.excellent') : t('voice.good')}
                </span>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
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
              disabled={isRecording}
              className="flex-1"
              style={{ background: 'var(--gradient-primary)' }}
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
