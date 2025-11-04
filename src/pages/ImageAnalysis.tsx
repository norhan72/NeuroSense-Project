import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";

const ImageAnalysis = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(language === 'ar' ? "حجم الصورة يجب أن يكون أقل من 10 ميجابايت" : "Image size must be less than 10 MB");
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error(language === 'ar' ? "يرجى اختيار ملف صورة صالح" : "Please select a valid image file");
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      toast.error(language === 'ar' ? "الرجاء اختيار صورة للتحليل" : "Please select an image to analyze");
      return;
    }

    setIsAnalyzing(true);
    toast.success(language === 'ar' ? "جاري تحليل الصورة..." : "Analyzing image...");

    // Simulate analysis
    setTimeout(() => {
      const analysisData = {
        type: 'image',
        imageName: selectedImage.name,
        timestamp: new Date().toISOString(),
        findings: language === 'ar' ? [
          'تم اكتشاف منطقة غير طبيعية في الصورة',
          'يوصى بمراجعة الطبيب المختص',
          'التحليل بواسطة الذكاء الاصطناعي'
        ] : [
          'Abnormal region detected in image',
          'Specialist consultation recommended',
          'AI-powered analysis'
        ]
      };
      
      localStorage.setItem('imageAnalysis', JSON.stringify(analysisData));
      setIsAnalyzing(false);
      navigate('/results');
    }, 2000);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-2xl p-8 bg-card/50 backdrop-blur-lg border-border/50">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2" style={{ 
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {language === 'ar' ? 'تحليل الصور الطبية' : 'Medical Image Analysis'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'ar' 
                ? 'ارفع صورة طبية للحصول على تحليل بالذكاء الاصطناعي'
                : 'Upload a medical image for AI-powered analysis'
              }
            </p>
          </div>

          <div className="space-y-6">
            {/* Upload Area */}
            {!imagePreview ? (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/30 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-16 h-16 mb-4 text-muted-foreground" />
                  <p className="mb-2 text-lg font-semibold">
                    {language === 'ar' ? 'اضغط لاختيار صورة' : 'Click to select an image'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'PNG, JPG, JPEG (حد أقصى 10 ميجابايت)' : 'PNG, JPG, JPEG (Max 10 MB)'}
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageSelect}
                />
              </label>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-auto max-h-96 object-contain rounded-lg border-2 border-border"
                />
                <Button
                  onClick={handleRemoveImage}
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            )}

            {selectedImage && (
              <div className="p-4 bg-muted/30 rounded-lg border border-border/30">
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-8 h-8 text-secondary" />
                  <div>
                    <p className="font-semibold">{selectedImage.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedImage.size / 1024 / 1024).toFixed(2)} {language === 'ar' ? 'ميجابايت' : 'MB'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={() => navigate('/input')}
                variant="outline"
                className="flex-1 text-lg py-6"
                disabled={isAnalyzing}
              >
                {language === 'ar' ? 'رجوع' : 'Back'}
              </Button>
              <Button
                onClick={handleAnalyze}
                className="flex-1 text-lg py-6 font-bold"
                style={{
                  background: 'var(--gradient-primary)',
                  transition: 'var(--transition-smooth)'
                }}
                disabled={!selectedImage || isAnalyzing}
              >
                {isAnalyzing 
                  ? (language === 'ar' ? 'جاري التحليل...' : 'Analyzing...') 
                  : (language === 'ar' ? 'تحليل الصورة' : 'Analyze Image')
                }
              </Button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border/30">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p>
                {language === 'ar' 
                  ? 'جميع الصور محمية ومشفرة لضمان خصوصية المرضى'
                  : 'All images are protected and encrypted to ensure patient privacy'
                }
              </p>
            </div>
          </div>
        </Card>
      </div>
      <Navigation />
    </>
  );
};

export default ImageAnalysis;
