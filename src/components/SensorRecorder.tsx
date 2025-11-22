import React, { useState, useRef } from "react";

export const GLOBAL_SENSOR_DATA: Array<any> = [];

const SensorRecorder: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const sensorListener = useRef<(event: DeviceMotionEvent) => void>();
 
  const startRecording = async () => {
    // iOS requires permission
    if (
      typeof DeviceMotionEvent !== "undefined" &&
      (DeviceMotionEvent as any).requestPermission
    ) {
      const permission = await (DeviceMotionEvent as any).requestPermission();
      if (permission !== "granted") {
        alert("Permission denied for motion sensors");
        return;
      }
    }

    setRecording(true);

    sensorListener.current = (event: DeviceMotionEvent) => {
      const { acceleration, rotationRate, interval } = event;

      GLOBAL_SENSOR_DATA.push({
        ax: acceleration?.x ?? 0,
        ay: acceleration?.y ?? 0,
        az: acceleration?.z ?? 0,
        rx: rotationRate?.alpha ?? 0,
        ry: rotationRate?.beta ?? 0,
        rz: rotationRate?.gamma ?? 0,
        time: Date.now(),
        interval,
      });
    };

    window.addEventListener("devicemotion", sensorListener.current);
  };

  const stopRecording = () => {
    setRecording(false);
    if (sensorListener.current) {
      window.removeEventListener("devicemotion", sensorListener.current);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Mobile Sensor Recorder</h1>

      {!recording ? (
        <button
          onClick={startRecording}
          className="px-6 py-3 bg-green-500 text-white rounded-2xl shadow"
        >
          Start Recording
        </button>
      ) : (
        <button
          onClick={stopRecording}
          className="px-6 py-3 bg-red-500 text-white rounded-2xl shadow"
        >
          Stop Recording
        </button>
      )}

      <div className="mt-4 p-2 text-sm text-gray-600">
        Global Data Length: {GLOBAL_SENSOR_DATA.length}
      </div>
    </div>
  );
};

export default SensorRecorder;