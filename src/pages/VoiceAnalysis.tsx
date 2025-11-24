import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import VoiceRecorder from '@/components/VoiceRecord';
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

	const handleComplete = () => {
		if (!recordedBlob) {
			toast.error(t('voice.errorNoRecording'));
			return;
		}
		navigate('/');
	};

	return (
		<>
			<LanguageToggle />
			<div className='min-h-screen p-6 pb-24'>
				<div className='max-w-2xl mx-auto space-y-6'>
					{/* Header */}
					<div className='text-center mb-8'>
						<h1 className='text-3xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent'>
							{t('voice.title')}
						</h1>
						<p className='text-muted-foreground'>{t('voice.subtitle')}</p>
					</div>

					{/* Recorder */}
					{finished ? (
						<span>{`${t('voice.testCompleted')}: ${finalResult.score} - ${finalResult.label_en}`}</span>
					) : (
						<Card className='p-8 bg-card/50 backdrop-blur-lg text-center'>
							<VoiceRecorder onRecordComplete={handleRecordComplete} />

							{recordedBlob && <p className='text-green-500 mt-4'>{t('voice.recordingSaved')}</p>}
						</Card>
					)}

					{/* Submit */}
					<div className='flex gap-4'>
						<Button onClick={() => navigate('/input')} variant='outline' className='flex-1'>
							{t('input.back')}
						</Button>

						<Button
							onClick={handleComplete}
							className='flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white'>
							{t('voice.complete')}
							{appLanguage === 'en' ? (
								<ArrowRight className='mr-2 w-4 h-4' />
							) : (
								<ArrowLeft className='mr-2 w-4 h-4' />
							)}
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default VoiceAnalysis;
