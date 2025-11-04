import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import GlassCard from '@/components/GlassCard';
import { FileText, Image, Mic, Upload, Dna, Stethoscope, Activity } from 'lucide-react';

interface UserInputScreenProps {
  onNavigate: (screen: string) => void;
}

const UserInputScreen: React.FC<UserInputScreenProps> = ({ onNavigate }) => {
  const [textData, setTextData] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setUploadedImages(prev => [...prev, ...newImages]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle dropped files here
  };

  return (
    <div className="min-h-screen p-6 pb-24">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-orbitron font-bold text-foreground mb-2">
            Medical Data Input
          </h1>
          <p className="text-foreground-secondary font-inter">
            Provide your medical information for AI analysis
          </p>
        </div>

        {/* Text Data Entry */}
        <GlassCard glow>
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary-light" />
              <Dna className="w-4 h-4 text-dna-helix animate-dna-rotate" />
            </div>
            <h2 className="text-lg font-orbitron font-semibold text-foreground">
              Medical Text Data
            </h2>
          </div>
          
          <div className="space-y-4">
            <Input
              placeholder="Patient Name"
              className="bg-glass-bg border-glass-border text-foreground placeholder:text-foreground-secondary/60"
            />
            <Input
              placeholder="Age & Gender"
              className="bg-glass-bg border-glass-border text-foreground placeholder:text-foreground-secondary/60"
            />
            <Textarea
              placeholder="Describe symptoms, medical history, current medications..."
              value={textData}
              onChange={(e) => setTextData(e.target.value)}
              className="bg-glass-bg border-glass-border text-foreground placeholder:text-foreground-secondary/60 min-h-24 resize-none"
            />
          </div>
          
          <div className="flex items-center mt-4 text-xs text-primary-light">
            <Stethoscope className="w-4 h-4 mr-2" />
            <span>Secure medical data encryption active</span>
          </div>
        </GlassCard>

        {/* Image Upload */}
        <GlassCard glow>
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center space-x-2">
              <Image className="w-5 h-5 text-primary-light" />
              <Activity className="w-4 h-4 text-medical-green animate-heartbeat" />
            </div>
            <h2 className="text-lg font-orbitron font-semibold text-foreground">
              Medical Images
            </h2>
          </div>

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
              isDragging 
                ? 'border-primary-light bg-primary-light/10' 
                : 'border-glass-border hover:border-primary-light/50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-8 h-8 text-foreground-secondary mx-auto mb-3" />
            <p className="text-foreground-secondary font-inter mb-2">
              Upload X-rays, MRI scans, or lab results
            </p>
            <p className="text-xs text-foreground-secondary/60 mb-4">
              Drag & drop files or click to browse
            </p>
            
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="inline-block bg-button-glass text-foreground px-4 py-2 rounded-lg cursor-pointer hover:bg-primary-light/20 transition-colors"
            >
              Choose Files
            </label>
          </div>

          {/* Uploaded Images Preview */}
          {uploadedImages.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-foreground-secondary mb-3">Uploaded Images:</p>
              <div className="grid grid-cols-3 gap-3">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg border border-glass-border"
                    />
                    {/* AI Scanning Animation */}
                    <div className="absolute inset-0 bg-primary-light/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-primary-light animate-scan-line"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </GlassCard>

        {/* Additional Tests */}
        <GlassCard glow>
          <h2 className="text-lg font-orbitron font-semibold text-foreground mb-4">
            اختبارات إضافية
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => onNavigate('voice')}
              variant="outline"
              className="bg-button-glass border-primary-light text-foreground hover:bg-primary-light/20 px-4 py-6 flex flex-col items-center gap-2 h-auto"
            >
              <Mic className="w-6 h-6" />
              <span className="text-sm">تحليل صوتي</span>
            </Button>
            
            <Button
              onClick={() => onNavigate('disability')}
              variant="outline"
              className="bg-button-glass border-primary-light text-foreground hover:bg-primary-light/20 px-4 py-6 flex flex-col items-center gap-2 h-auto"
            >
              <Activity className="w-6 h-6" />
              <span className="text-sm">اختبار الإعاقة</span>
            </Button>
          </div>
        </GlassCard>

        {/* AI Tip */}
        <GlassCard className="bg-primary-light/10 border-primary-light/30">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-ai-particle rounded-full animate-neural-pulse mt-2"></div>
            <div>
              <p className="text-sm font-inter font-medium text-foreground mb-1">
                AI Analysis Tip
              </p>
              <p className="text-xs text-foreground-secondary leading-relaxed">
                Clear, detailed descriptions and high-quality images provide more accurate AI analysis results.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Proceed Button */}
        <Button 
          onClick={() => onNavigate('results')}
          className="w-full bg-button-primary hover:bg-button-primary-hover text-primary-foreground font-inter font-semibold py-4 px-6 rounded-lg neon-glow transition-all duration-300"
          disabled={!textData.trim() && uploadedImages.length === 0}
        >
          Analyze Data
        </Button>
      </div>
    </div>
  );
};

export default UserInputScreen;