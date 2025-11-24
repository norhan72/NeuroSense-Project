import React, { useState, useRef } from 'react';

interface RecorderProps {
	onRecordComplete: (audioBlob: Blob) => void;
}

const VoiceRecorder: React.FC<RecorderProps> = ({ onRecordComplete }) => {
	const [recording, setRecording] = useState(false);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunksRef = useRef<Blob[]>([]);

	const startRecording = async () => {
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		const mediaRecorder = new MediaRecorder(stream);
		mediaRecorderRef.current = mediaRecorder;
		audioChunksRef.current = [];

		mediaRecorder.ondataavailable = (event) => {
			audioChunksRef.current.push(event.data);
		};

		mediaRecorder.onstop = async () => {
			const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
			onRecordComplete(blob);
		};

		mediaRecorder.start();
		setRecording(true);
	};

	const stopRecording = () => {
		mediaRecorderRef.current?.stop();
		setRecording(false);
	};

	return (
		<div className='text-center'>
			{!recording ? (
				<button onClick={startRecording} className='px-6 py-3 bg-green-500 text-white rounded-2xl shadow'>
					Start Recording
				</button>
			) : (
				<button onClick={stopRecording} className='px-6 py-3 bg-red-500 text-white rounded-2xl shadow'>
					Stop Recording
				</button>
			)}
		</div>
	);
};

export default VoiceRecorder;
