import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const ImageAnalysis = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // 🧠 جلب الصور من السيرفر
  useEffect(() => {
    fetch("http://localhost:5000/api/images")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch(() => toast.error("Failed to load images"));
  }, []);

  const handleSelect = (img) => {
    setSelectedImage(img);
    localStorage.setItem("imageAnalysis", JSON.stringify(img));
    navigate("/results");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-4xl p-8 bg-card/50 backdrop-blur-lg border-border/50">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {language === "ar" ? "اختر صورة للتحليل" : "Select an Image for Analysis"}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              onClick={() => handleSelect(img)}
              className="cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={`http://localhost:5000${img.url}`}
                alt={img.label}
                className="w-full h-48 object-cover rounded-lg border"
              />
              <p className="text-center mt-2 font-semibold">{img.label}</p>
            </div>
          ))}
        </div>

        {!images.length && (
          <p className="text-center text-muted-foreground mt-4">
            {language === "ar"
              ? "جاري تحميل الصور..."
              : "Loading images..."}
          </p>
        )}
      </Card>
    </div>
  );
};

export default ImageAnalysis;
