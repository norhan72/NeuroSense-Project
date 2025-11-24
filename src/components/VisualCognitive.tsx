import React, { useEffect, useState } from 'react';
import { toast } from './ui/sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BASE_SERVER_URL_1 } from '@/utils';
import { useUserData } from '@/contexts/useUserData';

const VisualCognitiveTest: React.FC = () => {
	const navigate = useNavigate();
	const { userData, setUserData } = useUserData();
	const [seen, setSeen] = useState<boolean | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [session_id, setSessionId] = useState<string | null>(null);
	const [difficulty, setDifficulty] = useState<number | null>(null);
	const [finalResult, setFinalResult] = useState<{
		vision_score: number;
		interpretation_en: string;
		interpretation_ar: string;
	}>({
		vision_score: null,
		interpretation_en: null,
		interpretation_ar: null,
	});
	const [finished, setFinished] = useState<boolean>(false);
	const { t } = useLanguage();

	useEffect(() => {
		fetch(`${BASE_SERVER_URL_1}/vision/start`)
			.then((res) => res.json())
			.then((data) => {
				if (data && data.image) {
					setImageUrl(data.image);
					setSessionId(data.session_id);
					setDifficulty(data.difficulty);
				} else {
					toast.error('Failed to load image');
				}
			})
			.catch((error) => toast.error('Failed to load image', error));
	}, []);

	useEffect(() => {
		if (seen === null || session_id === null || difficulty === null) return;
		fetch(`${BASE_SERVER_URL_1}/vision/answer`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ seen, difficulty, session_id }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.status === 'finished') {
					setFinished(true);
					setFinalResult({
						vision_score: data.vision_score,
						interpretation_en: data.interpretation_en,
						interpretation_ar: data.interpretation_ar,
					});
					setUserData({ ...userData, results: { ...userData.results, vision: data } });
				} else if (data && data.image) {
					setImageUrl(data.image);
					setDifficulty(data.difficulty);
					setSeen(null);
				} else {
					toast.error('Failed to load next image');
				}
			})
			.catch((error) => toast.error(t('vision.error')));
	}, [seen, difficulty, session_id]);

	const handleAnswer = (answer: string) => {
		setSeen(answer === 'clear');
	};

	return (
		<div className='flex flex-col items-center gap-4 p-4'>
			<h1 className='text-2xl font-bold'>{t('vision.question')}</h1>
			{!finished ? (
				<div className='flex flex-col justify-center items-center gap-4'>
					<div className='border p-2 rounded'>
						<img src={`/vision/${imageUrl}`} alt='Test Visual' className='max-w-xs' />
					</div>

					<div className='flex gap-4'>
						<button
							onClick={() => handleAnswer('clear')}
							className='px-6 py-3 bg-green-500 text-white rounded-2xl shadow'>
							{t('vision.btnClear')}
						</button>

						<button
							onClick={() => handleAnswer('not clear')}
							className='px-6 py-3 bg-red-500 text-white rounded-2xl shadow'>
							{t('vision.btnNonClear')}
						</button>
					</div>
				</div>
			) : (
				<>
					<span>{`${t('vision.completed')} - ${finalResult.vision_score} - ${
						finalResult.interpretation_en
					}`}</span>
					<Button
						onClick={() => navigate('/voice-analysis')}
						className='flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white'>
						{t('vision.btnCompleted')}
						<ArrowRight className='mr-2 w-4 h-4' />
					</Button>
				</>
			)}
		</div>
	);
};

export default VisualCognitiveTest;
