import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/GlassCard';
import { Timer, Play, Pause, RotateCcw, Activity } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

interface DisabilityTestScreenProps {
  onNavigate: (screen: string) => void;
}

const DisabilityTestScreen: React.FC<DisabilityTestScreenProps> = ({ onNavigate }) => {
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
    const speed = distanceInM / timeInSeconds; // متر/ثانية
    
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

    return {
      time: timeInMs,
      distance: distanceInM,
      score,
      recommendation
    };
  };

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      toast.success('بدأ الاختبار! ابدأ المشي الآن');
    }
  };

  const handlePause = () => {
    setIsRunning(false);
    toast.info('تم إيقاف الاختبار مؤقتاً');
  };

  const handleFinish = () => {
    setIsRunning(false);
    const result = calculateDisabilityScore(time, distance);
    setResults(result);
    toast.success('تم الانتهاء من الاختبار');
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setResults(null);
    toast.info('تم إعادة تعيين الاختبار');
  };

  return (
    <div className="min-h-screen p-6 pb-24">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            اختبار قياس الإعاقة الحركية
          </h1>
          <p className="text-muted-foreground">
            اختبار المشي 2 متر
          </p>
        </div>

        {/* Instructions */}
        <GlassCard className="bg-primary/10 border-primary/30">
          <div className="flex items-start space-x-3 space-x-reverse">
            <Activity className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                تعليمات الاختبار
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>قف في نقطة البداية</li>
                <li>اضغط "بدء" عندما تكون جاهزاً</li>
                <li>امش 2 متر بأسرع ما يمكنك بشكل آمن</li>
                <li>اضغط "إنهاء" عند الوصول لنهاية المسافة</li>
              </ul>
            </div>
          </div>
        </GlassCard>

        {/* Distance Input */}
        <GlassCard>
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              المسافة (متر)
            </label>
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full bg-input border border-border rounded-lg p-3 text-foreground"
              disabled={isRunning || results !== null}
              min="1"
              max="100"
            />
          </div>
        </GlassCard>

        {/* Timer Display */}
        <GlassCard glow className="text-center">
          <div className="flex flex-col items-center">
            <Timer className={`w-12 h-12 mb-4 ${isRunning ? 'text-primary animate-pulse' : 'text-muted-foreground'}`} />
            <div className="text-5xl font-bold text-foreground mb-2 font-mono">
              {formatTime(time)}
            </div>
            <p className="text-sm text-muted-foreground">
              {isRunning ? 'الاختبار جارٍ...' : 'اضغط بدء لتشغيل المؤقت'}
            </p>
          </div>
        </GlassCard>

        {/* Control Buttons */}
        <div className="grid grid-cols-2 gap-4">
          {!isRunning && !results && (
            <Button
              onClick={handleStart}
              className="col-span-2 bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg"
            >
              <Play className="w-5 h-5 ml-2" />
              بدء الاختبار
            </Button>
          )}

          {isRunning && (
            <>
              <Button
                onClick={handlePause}
                variant="outline"
                className="py-6"
              >
                <Pause className="w-5 h-5 ml-2" />
                إيقاف مؤقت
              </Button>
              <Button
                onClick={handleFinish}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground py-6"
              >
                إنهاء الاختبار
              </Button>
            </>
          )}

          {results && (
            <>
              <Button
                onClick={handleReset}
                variant="outline"
                className="py-6"
              >
                <RotateCcw className="w-5 h-5 ml-2" />
                {t('disability.reset')}
              </Button>
              <Button
                onClick={() => onNavigate('results')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground py-6"
              >
                {t('disability.viewResults')}
              </Button>
            </>
          )}
        </div>

        {/* Results */}
        {results && (
          <GlassCard className="space-y-4" glow animated>
            <h3 className="text-xl font-bold text-foreground border-b border-border pb-2">
              نتائج الاختبار
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">الوقت المستغرق:</span>
                <span className="text-lg font-bold text-foreground">{formatTime(results.time)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">المسافة:</span>
                <span className="text-lg font-bold text-foreground">{results.distance} متر</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">السرعة:</span>
                <span className="text-lg font-bold text-foreground">
                  {((results.distance / (results.time / 1000)) * 3.6).toFixed(2)} كم/ساعة
                </span>
              </div>
              
              <div className="border-t border-border pt-3">
                <div className="bg-primary/10 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">التقييم:</p>
                  <p className="text-lg font-bold text-primary mb-3">{results.score}</p>
                  
                  <p className="text-sm text-muted-foreground mb-1">التوصيات:</p>
                  <p className="text-sm text-foreground leading-relaxed">{results.recommendation}</p>
                </div>
              </div>
            </div>

            <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border">
              * هذا الاختبار للأغراض التوجيهية فقط ولا يغني عن الاستشارة الطبية
            </div>
          </GlassCard>
        )}

        {/* Back Button */}
        <Button
          onClick={() => onNavigate('input')}
          variant="outline"
          className="w-full"
        >
          رجوع
        </Button>
      </div>
    </div>
  );
};

export default DisabilityTestScreen;
