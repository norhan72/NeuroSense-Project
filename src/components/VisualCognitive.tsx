import React, { useState } from "react";

interface VisualTestProps {
  imageUrl: string;
}

const VisualCognitiveTest: React.FC<VisualTestProps> = ({ imageUrl }) => {
  const [response, setResponse] = useState<null | string>(null);
  const [data, setData] = useState<{ image: string; answer: string }[]>([]);

  const handleAnswer = (answer: string) => {
    setResponse(answer);
    setData((prev) => [...prev, { image: imageUrl, answer }]);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Visual Cognitive Test</h1>

      <div className="border p-2 rounded">
        <img src={imageUrl} alt="Test Visual" className="max-w-xs" />
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => handleAnswer("clear")}
          className="px-6 py-3 bg-green-500 text-white rounded-2xl shadow"
        >
          واضحة
        </button>

        <button
          onClick={() => handleAnswer("not clear")}
          className="px-6 py-3 bg-red-500 text-white rounded-2xl shadow"
        >
          مش واضحة
        </button>
      </div>

      {response && (
        <div className="mt-4 p-2 text-sm text-gray-600">
          إجابتك: <strong>{response}</strong>
        </div>
      )}

      <div className="mt-2 p-2 text-xs text-gray-500">
        Data Collected: {JSON.stringify(data, null, 2)}
      </div>
    </div>
  );
};

export default VisualCognitiveTest;
