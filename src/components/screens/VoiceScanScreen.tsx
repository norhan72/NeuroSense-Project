import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/GlassCard';
import aiDoctorAvatar from '@/assets/ai-doctor-avatar.jpg';
import { Mic, MicOff, Volume2, Languages, ChevronRight } from 'lucide-react';

interface VoiceScanScreenProps {
  onNavigate: (screen: string) => void;
}

const VoiceScanScreen: React.FC<VoiceScanScreenProps> = ({ onNavigate }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [recordingTime, setRecordingTime] = useState(0);
  const [waveformData, setWaveformData] = useState<number[]>([]);

  const [voiceAnalysisMode, setVoiceAnalysisMode] = useState<'free' | 'guided'>('guided');

  const sampleQuotes = {
    en: "I have been experiencing headaches and fatigue for the past week. The pain is mostly in my temples and gets worse in the afternoon.",
    ar: "أعاني من صداع وإرهاق منذ الأسبوع الماضي. الألم في معظمه في الصدغين ويزداد سوءًا في فترة ما بعد الظهر."
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
        // Simulate waveform data
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
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const formatTime = (time: number) => {
    const seconds = Math.floor(time / 10);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen p-6 pb-24">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-orbitron font-bold text-foreground mb-2">
            Voice AI Analysis
          </h1>
          <p className="text-foreground-secondary font-inter">
            Speak clearly for accurate medical assessment
          </p>
        </div>

        {/* AI Doctor Avatar */}
        <GlassCard className="text-center" glow animated>
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <img 
                src={aiDoctorAvatar} 
                alt="AI Doctor" 
                className="w-20 h-20 rounded-full object-cover border-2 border-primary-light animate-hologram-flicker"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-medical-green rounded-full animate-neural-pulse flex items-center justify-center">
                <div className="w-2 h-2 bg-foreground rounded-full"></div>
              </div>
            </div>
            <p className="text-sm text-foreground-secondary font-inter">
              {isRecording ? "Analyzing your voice patterns..." : "Ready to listen to your symptoms"}
            </p>
          </div>
        </GlassCard>

        {/* Voice Analysis Mode Toggle */}
        <GlassCard>
          <div>
            <h3 className="text-sm font-orbitron font-semibold text-foreground mb-3">
              نوع التحليل الصوتي
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => setVoiceAnalysisMode('guided')}
                variant={voiceAnalysisMode === 'guided' ? 'default' : 'outline'}
                className={voiceAnalysisMode === 'guided' 
                  ? 'bg-primary-light text-foreground' 
                  : 'bg-button-glass border-primary-light/30 text-foreground hover:bg-primary-light/20'}
              >
                قراءة نص محدد
              </Button>
              <Button
                onClick={() => setVoiceAnalysisMode('free')}
                variant={voiceAnalysisMode === 'free' ? 'default' : 'outline'}
                className={voiceAnalysisMode === 'free' 
                  ? 'bg-primary-light text-foreground' 
                  : 'bg-button-glass border-primary-light/30 text-foreground hover:bg-primary-light/20'}
              >
                كلام حر
              </Button>
            </div>
          </div>
        </GlassCard>

        {/* Language Toggle */}
        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-orbitron font-semibold text-foreground mb-1">
                Language Selection
              </h3>
              <p className="text-xs text-foreground-secondary">
                Choose your preferred language
              </p>
            </div>
            <Button
              onClick={toggleLanguage}
              variant="outline"
              className="bg-button-glass border-primary-light text-foreground hover:bg-primary-light/20 flex items-center space-x-2"
            >
              <Languages className="w-4 h-4" />
              <span>{language === 'en' ? 'English' : 'العربية'}</span>
              <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
        </GlassCard>

        {/* Quote Prompt - Only shown in guided mode */}
        {voiceAnalysisMode === 'guided' && (
          <GlassCard className="bg-primary-light/10 border-primary-light/30">
            <div className="flex items-start space-x-3 space-x-reverse">
              <Volume2 className="w-5 h-5 text-primary-light mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-orbitron font-semibold text-foreground mb-2">
                  نص القراءة المحدد
                </h3>
                <p className="text-sm text-foreground-secondary font-inter leading-relaxed mb-3">
                  اقرأ هذا النص بصوت واضح لتحليل نبرة الصوت:
                </p>
                <div className="bg-glass-bg/50 rounded-lg p-3 border border-glass-border/30">
                  <p className="text-sm text-foreground font-inter leading-relaxed">
                    "{sampleQuotes[language]}"
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        )}

        {/* Free Speech Instructions - Only shown in free mode */}
        {voiceAnalysisMode === 'free' && (
          <GlassCard className="bg-secondary/10 border-secondary/30">
            <div className="flex items-start space-x-3 space-x-reverse">
              <Volume2 className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-orbitron font-semibold text-foreground mb-2">
                  التحدث الحر
                </h3>
                <p className="text-sm text-foreground-secondary font-inter leading-relaxed">
                  تحدث بحرية عن أعراضك أو أي شيء تريد. سيتم تحليل نبرة صوتك ومشاعرك من خلال طريقة حديثك.
                </p>
              </div>
            </div>
          </GlassCard>
        )}

        {/* Voice Recording Interface */}
        <GlassCard glow>
          <div className="text-center">
            {/* Recording Button */}
            <div className="relative mb-6">
              <Button
                onClick={toggleRecording}
                className={`w-24 h-24 rounded-full transition-all duration-300 ${
                  isRecording 
                    ? 'bg-medical-red hover:bg-medical-red/80 animate-heartbeat' 
                    : 'bg-button-primary hover:bg-button-primary-hover neon-glow'
                } text-primary-foreground`}
              >
                {isRecording ? (
                  <MicOff className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </Button>
              
              {/* Recording indicator ring */}
              {isRecording && (
                <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-medical-red animate-ping"></div>
              )}
            </div>

            {/* Recording Status */}
            <div className="mb-4">
              <p className="text-lg font-orbitron font-semibold text-foreground mb-1">
                {isRecording ? 'Recording...' : 'Tap to Start'}
              </p>
              {isRecording && (
                <p className="text-sm font-inter text-primary-light">
                  {formatTime(recordingTime)}
                </p>
              )}
            </div>

            {/* Waveform Visualization */}
            <div className="flex items-center justify-center space-x-1 h-16 mb-4">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 bg-gradient-to-t from-primary-light to-ai-particle rounded-full transition-all duration-150 ${
                    isRecording ? 'animate-neural-pulse' : ''
                  }`}
                  style={{
                    height: isRecording 
                      ? `${Math.max(4, (waveformData[i] || 0) / 2)}px`
                      : '4px',
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>

            {/* Instructions */}
            <p className="text-xs text-foreground-secondary font-inter">
              {isRecording 
                ? (voiceAnalysisMode === 'guided' ? "اقرأ النص المحدد أعلاه" : "تحدث بحرية عن أعراضك")
                : "اضغط على زر الميكروفون للبدء"}
            </p>
          </div>
        </GlassCard>

        {/* Voice Quality Indicator */}
        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-orbitron font-semibold text-foreground">
                Voice Quality
              </h3>
              <p className="text-xs text-foreground-secondary">
                AI analysis accuracy
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-4 rounded-sm ${
                      i < (isRecording ? 4 : 2)
                        ? 'bg-medical-green'
                        : 'bg-glass-border'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-medical-green font-inter">
                {isRecording ? 'Excellent' : 'Good'}
              </span>
            </div>
          </div>
        </GlassCard>

        {/* Complete Button */}
        <Button 
          onClick={() => onNavigate('results')}
          className="w-full bg-button-primary hover:bg-button-primary-hover text-primary-foreground font-inter font-semibold py-4 px-6 rounded-lg neon-glow transition-all duration-300"
          disabled={isRecording}
        >
          Complete Voice Analysis
        </Button>
      </div>
    </div>
  );
};

export default VoiceScanScreen;