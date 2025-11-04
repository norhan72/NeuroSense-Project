import neuralBg from '@/assets/neural-network-bg.jpg';

export const NeuralBackground = () => {
  return (
    <div 
      className="neural-background animate-neural"
      style={{ backgroundImage: `url(${neuralBg})` }}
    />
  );
};
