import React from 'react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/GlassCard';
import { Mic, Image, FileText, Download, Share2, TrendingUp, AlertTriangle, CheckCircle, Brain } from 'lucide-react';

interface ResultsScreenProps {
  onNavigate: (screen: string) => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ onNavigate }) => {
  const analysisResults = {
    voice: {
      confidence: 92,
      findings: ["Voice pattern indicates mild stress", "Breathing patterns normal", "No speech impediment detected"],
      recommendation: "Consider stress management techniques"
    },
    image: {
      confidence: 87,
      findings: ["X-ray shows normal lung structure", "No abnormalities detected", "Image quality: Excellent"],
      recommendation: "Regular check-ups recommended"
    },
    text: {
      confidence: 95,
      findings: ["Symptoms align with common cold", "Duration suggests viral infection", "No red flag symptoms"],
      recommendation: "Rest and hydration advised"
    }
  };

  const overallRisk = "Low";
  const aiInsights = [
    "Patient shows signs of mild viral infection",
    "Stress levels may be contributing to fatigue",
    "Recommend 7-10 days rest period",
    "Follow-up if symptoms persist"
  ];

  return (
    <div className="min-h-screen p-6 pb-24">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-orbitron font-bold text-foreground mb-2">
            Analysis Results
          </h1>
          <p className="text-foreground-secondary font-inter">
            AI-powered medical assessment complete
          </p>
        </div>

        {/* Overall Assessment */}
        <GlassCard glow className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-medical-green to-primary-light flex items-center justify-center animate-neural-pulse">
                <Brain className="w-8 h-8 text-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-medical-green rounded-full animate-heartbeat flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-foreground" />
              </div>
            </div>
          </div>
          
          <h2 className="text-xl font-orbitron font-bold text-foreground mb-2">
            Overall Risk Level: {overallRisk}
          </h2>
          <p className="text-foreground-secondary font-inter mb-4">
            Based on comprehensive AI analysis of your medical data
          </p>
          
          <div className="flex justify-center space-x-6 text-sm">
            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-medical-green">94%</div>
              <div className="text-foreground-secondary">Confidence</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-primary-light">3</div>
              <div className="text-foreground-secondary">Data Sources</div>
            </div>
          </div>
        </GlassCard>

        {/* Analysis Cards */}
        <div className="space-y-4">
          {/* Voice Analysis */}
          <GlassCard>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-primary-light/20 flex items-center justify-center">
                <Mic className="w-6 h-6 text-primary-light" />
                <div className="absolute w-12 h-12 rounded-lg animate-neural-pulse border border-primary-light/30"></div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-orbitron font-semibold text-foreground">
                    Voice Analysis
                  </h3>
                  <span className="text-sm font-inter text-medical-green">
                    {analysisResults.voice.confidence}% Match
                  </span>
                </div>
                
                <div className="space-y-2">
                  {analysisResults.voice.findings.map((finding, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-medical-green" />
                      <span className="text-sm text-foreground-secondary font-inter">{finding}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 p-2 bg-primary-light/10 rounded-lg">
                  <p className="text-xs text-foreground-secondary font-inter">
                    <strong>Recommendation:</strong> {analysisResults.voice.recommendation}
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Image Analysis */}
          <GlassCard>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-ai-particle/20 flex items-center justify-center relative">
                <Image className="w-6 h-6 text-ai-particle" />
                {/* Scanning animation */}
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-ai-particle animate-scan-line"></div>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-orbitron font-semibold text-foreground">
                    Image Analysis
                  </h3>
                  <span className="text-sm font-inter text-medical-green">
                    {analysisResults.image.confidence}% Match
                  </span>
                </div>
                
                <div className="space-y-2">
                  {analysisResults.image.findings.map((finding, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-medical-green" />
                      <span className="text-sm text-foreground-secondary font-inter">{finding}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 p-2 bg-ai-particle/10 rounded-lg">
                  <p className="text-xs text-foreground-secondary font-inter">
                    <strong>Recommendation:</strong> {analysisResults.image.recommendation}
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Text Analysis */}
          <GlassCard>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-dna-helix/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-dna-helix animate-dna-rotate" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-orbitron font-semibold text-foreground">
                    Text Data Summary
                  </h3>
                  <span className="text-sm font-inter text-medical-green">
                    {analysisResults.text.confidence}% Match
                  </span>
                </div>
                
                <div className="space-y-2">
                  {analysisResults.text.findings.map((finding, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-medical-green" />
                      <span className="text-sm text-foreground-secondary font-inter">{finding}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 p-2 bg-dna-helix/10 rounded-lg">
                  <p className="text-xs text-foreground-secondary font-inter">
                    <strong>Recommendation:</strong> {analysisResults.text.recommendation}
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* AI Insights */}
        <GlassCard className="bg-neural-blue/10 border-neural-blue/30" animated>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-neural-blue/30 flex items-center justify-center animate-neural-pulse">
              <Brain className="w-4 h-4 text-neural-blue" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-orbitron font-semibold text-foreground mb-3">
                AI Medical Insights
              </h3>
              <div className="space-y-2">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <TrendingUp className="w-3 h-3 text-neural-blue mt-1" />
                    <span className="text-sm text-foreground-secondary font-inter">{insight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3">
          <Button 
            className="w-full bg-button-primary hover:bg-button-primary-hover text-primary-foreground font-inter font-semibold py-4 px-6 rounded-lg neon-glow transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Report</span>
          </Button>
          
          <div className="flex space-x-3">
            <Button 
              variant="outline"
              className="flex-1 bg-button-glass border-primary-light text-foreground hover:bg-primary-light/20 flex items-center justify-center space-x-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </Button>
            
            <Button 
              onClick={() => onNavigate('input')}
              variant="outline"
              className="flex-1 bg-button-glass border-primary-light text-foreground hover:bg-primary-light/20"
            >
              New Analysis
            </Button>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <GlassCard className="bg-medical-red/10 border-medical-red/30">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-medical-red mt-1" />
            <div>
              <p className="text-xs text-foreground-secondary font-inter leading-relaxed">
                <strong>Medical Disclaimer:</strong> This AI analysis is for informational purposes only. 
                Always consult with a qualified healthcare professional for medical advice and diagnosis.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default ResultsScreen;