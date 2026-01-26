import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Suspense, lazy } from 'react';
const VoiceRecorder = lazy(() => import('@/components/VoiceRecord'));
import { BASE_SERVER_URL_1 } from '@/utils';
import { useUserData } from '@/contexts/useUserData';

const VoiceAnalysis = () => {
	const navigate = useNavigate();
	const { userData, setUserData } = useUserData();
	const { t, language: appLanguage } = useLanguage();
	const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
	const [finished, setFinished] = useState<boolean>(false);
	const [finalResult, setFinalResult] = useState<{ score: number; label_en: string; label_ar: string }>({
		score: null,
		label_ar: null,
		label_en: null,
	});

	useEffect(() => {
		if (userData?.results && userData.results['speech']) {
			navigate('/');
		}
	}, [navigate, userData.results]);

	const handleRecordComplete = (blob: Blob) => {
		setRecordedBlob(blob);
		toast.success(t('voice.recordingSaved'));
		const form = new FormData();
		const filename = 'rec_' + Date.now() + '.wav';
		form.append('file', blob, filename);
		fetch(`${BASE_SERVER_URL_1}/speech/analyze`, {
			method: 'POST',
			body: form,
		})
			.then((res) => res.json())
			.then((res) => {
				setFinalResult({ score: res.score, label_ar: res.label_ar, label_en: res.label_en });
				setFinished(true);
				setUserData({ ...userData, results: { ...userData.results, speech: res } });
			})
			.catch(() => toast.error('Failed to analyze audio - فشل تحليل الصوت'));
	};

	return (
		<div className='min-h-screen flex flex-col items-center justify-center p-6'>
			<LanguageToggle />
			<Card className='w-full max-w-lg p-8 bg-card/50 backdrop-blur-lg border-border/50'>
				<h2 className='text-2xl font-bold mb-6 text-center'>{t('voice.title')}</h2>
				{!finished ? (
					<Suspense fallback={<div>Loading Recorder...</div>}>
						<VoiceRecorder onRecordComplete={handleRecordComplete} />
					</Suspense>
				) : (
					<div className='text-center'>
						<p className='mb-4'>
							<strong>{`${t('voice.testCompleted')}:`}</strong>{' '}
							{`${Math.max(finalResult?.score * 100, finalResult?.score * -100).toFixed(2)}% - ${
								appLanguage === 'en' ? finalResult?.label_en : finalResult?.label_ar
							}`}
						</p>
						<Button onClick={() => navigate('/results')}>{t('voice.viewResults')}</Button>
					</div>
				)}
			</Card>
		</div>
	);
};

export default VoiceAnalysis;
