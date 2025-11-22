import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import VisualCognitiveTest from "@/components/VisualCognitive";

const VisualCognitivePage = () => {
  const { language } = useLanguage();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/images")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setImageUrl(`http://localhost:5000${data[0].url}`);
      })
      .catch(() => toast.error("Failed to load images"));
  }, []);

  if (!imageUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {language === "ar" ? "جاري تحميل الصورة..." : "Loading image..."}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8 bg-card/50 backdrop-blur-lg border-border/50">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {language === "ar" ? "اختبار كفاءة الرؤية" : "Visual Cognitive Test"}
        </h2>

        <VisualCognitiveTest imageUrl={imageUrl} />
      </Card>
    </div>
  );
};

export default VisualCognitivePage;
