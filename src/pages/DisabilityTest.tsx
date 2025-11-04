import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Navigation } from '@/components/Navigation';
import { Timer, Play, Pause, RotateCcw, Activity, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';

const DisabilityTest = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState(6);
  const [results, setResults] = useState<{
    time: number;
    distance: number;
    score: string;
    recommendation: string;
  } | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const calculateDisabilityScore = (timeInMs: number, distanceInM: number) => {
    const timeInSeconds = timeInMs / 1000;
    
    let score = '';
    let recommendation = '';

    if (timeInSeconds < 6) {
      score = 'ممتاز - لا توجد إعاقة ملحوظة';
      recommendation = 'القدرة الحركية ممتازة. استمر في النشاط البدني المنتظم.';
    } else if (timeInSeconds >= 6 && timeInSeconds < 10) {
      score = 'جيد - إعاقة طفيفة';
      recommendation = 'القدرة الحركية جيدة مع بعض القيود البسيطة. يُنصح بممارسة تمارين خفيفة يومياً.';
    } else if (timeInSeconds >= 10 && timeInSeconds < 15) {
      score = 'متوسط - إعاقة متوسطة';
      recommendation = 'تحتاج إلى برنامج علاج طبيعي. يُنصح بالمتابعة مع أخصائي العلاج الطبيعي.';
    } else if (timeInSeconds >= 15 && timeInSeconds < 25) {
      score = 'ضعيف - إعاقة ملحوظة';
      recommendation = 'إعاقة حركية واضحة. ضرورة المتابعة الطبية الفورية والعلاج الطبيعي المكثف.';
    } else {
      score = 'ضعيف جداً - إعاقة شديدة';
      recommendation = 'إعاقة حركية شديدة تتطلب تدخل طبي عاجل ومساعدة يومية.';
    }

    return { time: timeInMs, distance: distanceInM, score, recommendation };
  };

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      toast.success(t('disability.testStarted'));
    }
  };

  const handlePause = () => {
    setIsRunning(false);
    toast.info(t('disability.testPaused'));
  };

  const handleFinish = () => {
    setIsRunning(false);
    const result = calculateDisabilityScore(time, distance);
    setResults(result);
    toast.success(t('disability.testCompleted'));
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setResults(null);
    toast.info(t('disability.testReset'));
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
              {t('disability.title')}
            </h1>
            <p className="text-muted-foreground">{t('disability.subtitle')}</p>
          </div>

          {/* Instructions */}
          <Card className="p-6 bg-primary/10 border-primary/30">
            <div className="flex items-start gap-3">
              <Activity className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-3">{t('disability.instructions')}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                    <span>{t('disability.instruction1')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                    <span>{t('disability.instruction2')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                    <span>{t('disability.instruction3')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                    <span>{t('disability.instruction4')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Distance Input */}
          <Card className="p-6 bg-card/50 backdrop-blur-lg border-border/50">
            <label className="text-lg font-semibold mb-3 block">{t('disability.distance')}</label>
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full bg-input border border-border rounded-lg p-4 text-lg"
              disabled={isRunning || results !== null}
              min="1"
              max="100"
            />
          </Card>

          {/* Timer Display */}
          <Card className="p-8 bg-card/50 backdrop-blur-lg border-border/50 text-center">
            <Timer className={`w-16 h-16 mx-auto mb-4 ${isRunning ? 'text-primary animate-pulse' : 'text-muted-foreground'}`} />
            <div className="text-6xl font-bold mb-2 font-mono">
              {formatTime(time)}
            </div>
            <p className="text-muted-foreground">
              {isRunning ? t('disability.testInProgress') : t('disability.pressToStart')}
            </p>
          </Card>

          {/* Control Buttons */}
          <div className="grid grid-cols-2 gap-4">
            {!isRunning && !results && (
              <Button
                onClick={handleStart}
                className="col-span-2 py-6 text-lg"
                style={{ background: 'var(--gradient-primary)' }}
              >
                <Play className="w-5 h-5 ml-2" />
                {t('disability.startTest')}
              </Button>
            )}

            {isRunning && (
              <>
                <Button onClick={handlePause} variant="outline" className="py-6">
                  <Pause className="w-5 h-5 ml-2" />
                  {t('disability.pause')}
                </Button>
                <Button onClick={handleFinish} className="py-6 bg-secondary hover:bg-secondary/90">
                  {t('disability.finish')}
                </Button>
              </>
            )}

            {results && (
              <>
                <Button onClick={handleReset} variant="outline" className="py-6">
                  <RotateCcw className="w-5 h-5 ml-2" />
                  {t('disability.reset')}
                </Button>
                <Button
                  onClick={() => navigate('/results')}
                  className="py-6"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  {t('disability.viewResults')}
                  <ArrowRight className="mr-2 w-4 h-4" />
                </Button>
              </>
            )}
          </div>

          {/* Results */}
          {results && (
            <Card className="p-6 bg-card/50 backdrop-blur-lg border-border/50">
              <h3 className="text-2xl font-bold mb-6 pb-3 border-b border-border">
                {t('disability.results')}
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border/30">
                  <span className="text-muted-foreground">{t('disability.timeTaken')}</span>
                  <span className="text-xl font-bold">{formatTime(results.time)}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-border/30">
                  <span className="text-muted-foreground">{t('disability.distanceLabel')}</span>
                  <span className="text-xl font-bold">{results.distance} {t('disability.meter')}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-border/30">
                  <span className="text-muted-foreground">{t('disability.speed')}</span>
                  <span className="text-xl font-bold">
                    {((results.distance / (results.time / 1000)) * 3.6).toFixed(2)} {t('disability.kmh')}
                  </span>
                </div>
                
                <div className="bg-primary/10 rounded-lg p-6 mt-6">
                  <p className="text-sm text-muted-foreground mb-2">{t('disability.assessment')}</p>
                  <p className="text-xl font-bold text-primary mb-4">{results.score}</p>
                  
                  <p className="text-sm text-muted-foreground mb-2">{t('disability.recommendations')}</p>
                  <p className="text-base leading-relaxed">{results.recommendation}</p>
                </div>
              </div>

              <div className="text-xs text-muted-foreground text-center pt-4 mt-4 border-t border-border">
                {t('disability.disclaimer')}
              </div>
            </Card>
          )}

          {/* Back Button */}
          <Button
            onClick={() => navigate('/input')}
            variant="outline"
            className="w-full"
          >
            {t('voice.backToPrevious')}
          </Button>
        </div>
      </div>
      <Navigation />
    </>
  );
};

export default DisabilityTest;
