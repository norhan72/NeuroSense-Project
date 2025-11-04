import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Mic, Activity, Camera } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";

export const InputForm = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!patientName || !age || !gender || !symptoms) {
      toast.error(t('input.errorRequired'));
      return;
    }

    // Store data and navigate to results
    const analysisData = {
      patientName,
      age,
      gender,
      symptoms,
      medicalHistory,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('currentAnalysis', JSON.stringify(analysisData));
    toast.success(t('input.analyzing'));
    
    setTimeout(() => {
      navigate('/results');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <LanguageToggle />
      <Card className="w-full max-w-2xl p-8 bg-card/50 backdrop-blur-lg border-border/50">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2" style={{ 
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {t('input.title')}
          </h2>
          <p className="text-muted-foreground">{t('input.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-lg font-semibold">{t('input.patientName')}</Label>
            <Input
              id="name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder={t('input.patientNamePlaceholder')}
              className="text-lg p-6 bg-input border-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age" className="text-lg font-semibold">{t('input.age')}</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder={t('input.agePlaceholder')}
              className="text-lg p-6 bg-input border-border"
              required
              min="0"
              max="150"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender" className="text-lg font-semibold">{t('input.symptoms')}</Label>
            <Input
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder={t('input.symptomsPlaceholder')}
              className="text-lg p-6 bg-input border-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="symptoms" className="text-lg font-semibold">
              {language === 'ar' ? 'الأعراض' : 'Symptoms'} *
            </Label>
            <Textarea
              id="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder={language === 'ar' ? 'أدخل الأعراض التي يعاني منها المريض' : 'Enter patient symptoms'}
              className="min-h-[150px] text-lg p-4 bg-input border-border resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="history" className="text-lg font-semibold">
              {t('input.medicalHistory')} <span className="text-muted-foreground text-sm">{t('input.optional')}</span>
            </Label>
            <Textarea
              id="history"
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              placeholder={t('input.medicalHistoryPlaceholder')}
              className="min-h-[120px] text-lg p-4 bg-input border-border resize-none"
            />
            <p className="text-sm text-muted-foreground mt-1">
              {t('input.medicalHistoryNote')}
            </p>
          </div>

          {/* Additional Tests Section */}
          <div className="mt-8 p-6 bg-muted/20 rounded-lg border border-border/30">
            <h3 className="text-xl font-bold mb-4">{t('input.additionalTests')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                type="button"
                onClick={() => navigate('/voice-analysis')}
                variant="outline"
                className="flex flex-col items-center gap-3 h-24 text-base"
              >
                <Mic className="w-8 h-8" />
                <span>{t('input.voiceAnalysis')}</span>
              </Button>
              <Button
                type="button"
                onClick={() => navigate('/image-analysis')}
                variant="outline"
                className="flex flex-col items-center gap-3 h-24 text-base"
              >
                <Camera className="w-8 h-8" />
                <span>{t('input.imageAnalysis')}</span>
              </Button>
              <Button
                type="button"
                onClick={() => navigate('/disability-test')}
                variant="outline"
                className="flex flex-col items-center gap-3 h-24 text-base"
              >
                <Activity className="w-8 h-8" />
                <span>{t('input.disabilityTest')}</span>
              </Button>
              <Button
                type="button"
                onClick={() => navigate('/early-detection')}
                variant="outline"
                className="flex flex-col items-center gap-3 h-24 text-base"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <span>{t('input.earlyDetection')}</span>
              </Button>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/')}
              className="flex-1 text-lg py-6"
            >
              {t('input.back')}
            </Button>
            <Button
              type="submit"
              className="flex-1 text-lg py-6 font-bold"
              style={{
                background: 'var(--gradient-primary)',
                transition: 'var(--transition-smooth)'
              }}
            >
              {t('input.analyze')}
            </Button>
          </div>
        </form>

        <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border/30">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p>{t('input.privacyNote')}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
