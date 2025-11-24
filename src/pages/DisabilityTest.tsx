import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Timer, Play, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { BASE_SERVER_URL_1 } from '@/utils';
import { useUserData } from '@/contexts/useUserData';

const DisabilityTest = () => {
	const navigate = useNavigate();
	const { t, language } = useLanguage();
	const { userData, setUserData } = useUserData();
	const [isRunning, setIsRunning] = useState(false);
	const [analysisComplete, setAnalysisComplete] = useState(false);
	const [time, setTime] = useState(0);
	const [finalResult, setFinalResult] = useState<{ score: number; label_en: string; label_ar: string }>({
		score: null,
		label_ar: null,
		label_en: null,
	});
	const [samples, setSamples] = useState<
		{
			t: number;
			ax: number;
			ay: number;
			az: number;
			alpha: number;
			beta: number;
			gamma: number;
		}[]
	>([]);

	useEffect(() => {
		if (userData?.results && userData.results['motion']) {
			navigate('/');
		}
	}, []);

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (isRunning) {
			interval = setInterval(() => {
				setTime((prev) => prev + 10);
			}, 10);
		}
		return () => clearInterval(interval);
	}, [isRunning]);

	useEffect(() => {
		const onMotionHandler = (e: DeviceMotionEvent) => {
			const acc = e.acceleration ?? e.accelerationIncludingGravity ?? {};
			const rot = e.rotationRate ?? {};

			setSamples((prev) => [
				...prev,
				{
					t: Date.now(),
					ax: acc.x || 0,
					ay: acc.y || 0,
					az: acc.z || 0,
					alpha: rot.alpha || 0,
					beta: rot.beta || 0,
					gamma: rot.gamma || 0,
				},
			]);
		};

		if (isRunning) {
			window.addEventListener('devicemotion', onMotionHandler, { passive: true });
		}

		return () => {
			window.removeEventListener('devicemotion', onMotionHandler);
		};
	}, [isRunning]);

	const formatTime = (ms: number) => {
		const minutes = Math.floor(ms / 60000);
		const seconds = Math.floor((ms % 60000) / 1000);
		const centiseconds = Math.floor((ms % 1000) / 10);
		return `${minutes}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
	};

	async function requestPermission() {
		if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
			try {
				const response = await DeviceMotionEvent.requestPermission();
				if (response !== 'granted') {
					toast.error('Motion permission denied');
					return false;
				}
			} catch (err) {
				toast.error('Motion permission error');
				return false;
			}
		}
		return true;
	}

	const startRecording = async () => {
		const ok = await requestPermission();
		if (!ok) {
			return;
		}
		setSamples([]);
		setIsRunning(true);
	};

	const stopRecording = () => {
		setIsRunning(false);
	};

	const analyzSamples = () => {
		if (!samples || !samples.length) {
			toast.error(t('disability.errorNoData'));
			return;
		}
		fetch(`${BASE_SERVER_URL_1}/motion/analyze`, { method: 'POST', body: JSON.stringify({ samples }) })
			.then((res) => res.json())
			.then((res) => {
				toast.success(t('disability.analysisSuccess'));
				setAnalysisComplete(true);
				setFinalResult({ score: res.score, label_en: res.label_en, label_ar: res.label_ar });
				setUserData({
					...userData,
					results: { ...userData.results, motion: { ...res, score: Math.max(res.score, -res.score) } },
				});
			})
			.catch(() => toast.error(t('disability.errorFail')));
	};

	return (
		<div className='min-h-screen p-6 pb-24'>
			<div className='max-w-2xl mx-auto space-y-6'>
				{/* Header */}
				<div className='text-center mb-8'>
					<h1
						className='text-3xl font-bold mb-2'
						style={{
							background: 'var(--gradient-primary)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							backgroundClip: 'text',
						}}>
						{t('disability.title')}
					</h1>
					<p className='text-muted-foreground text-xl'>{t('disability.subtitle')}</p>
				</div>

				{/* Instructions */}
				{!analysisComplete && (
					<Card className='p-6 bg-primary/10 border-primary/30'>
						<div className='flex items-start gap-3'>
							<Activity className='w-6 h-6 text-primary mt-1 flex-shrink-0' />
							<div>
								<h3 className='text-lg font-semibold mb-3'>{t('disability.instructions')}</h3>
								<ul className='space-y-2 text-sm text-muted-foreground'>
									<li className='flex items-center gap-2'>
										<div className='w-2 h-2 rounded-full bg-primary flex-shrink-0'></div>
										<span>{t('disability.instruction1')}</span>
									</li>
									<li className='flex items-center gap-2'>
										<div className='w-2 h-2 rounded-full bg-primary flex-shrink-0'></div>
										<span>{t('disability.instruction2')}</span>
									</li>
									<li className='flex items-center gap-2'>
										<div className='w-2 h-2 rounded-full bg-primary flex-shrink-0'></div>
										<span>{t('disability.instruction3')}</span>
									</li>
									<li className='flex items-center gap-2'>
										<div className='w-2 h-2 rounded-full bg-primary flex-shrink-0'></div>
										<span>{t('disability.instruction4')}</span>
									</li>
								</ul>
							</div>
						</div>
					</Card>
				)}

				{/* Timer Display */}
				<Card className='p-8 bg-card/50 backdrop-blur-lg border-border/50 text-center'>
					{analysisComplete ? (
						<p>
							<strong>{`${t('voice.testCompleted')}:`}</strong>{' '}
							{`${finalResult?.score?.toFixed(2)}% - ${
								language === 'en' ? finalResult?.label_en : finalResult?.label_ar
							}`}
						</p>
					) : (
						<>
							<Timer
								className={`w-16 h-16 mx-auto mb-4 ${
									isRunning ? 'text-primary animate-pulse' : 'text-muted-foreground'
								}`}
							/>
							<div className='text-6xl font-bold mb-2 font-mono'>{formatTime(time)}</div>
							<p className='text-muted-foreground'>
								{isRunning ? t('disability.testInProgress') : t('disability.pressToStart')}
							</p>
						</>
					)}
				</Card>

				{/* Control Buttons */}
				<div className='grid gap-4'>
					{!isRunning && (
						<Button
							onClick={startRecording}
							className='py-6 text-lg'
							style={{ background: 'var(--gradient-primary)' }}>
							<Play className='w-5 h-5 ml-2' />
							{t('disability.startTest')}
						</Button>
					)}

					{isRunning && (
						<Button onClick={stopRecording} className='py-6 bg-secondary hover:bg-secondary/90'>
							{t('disability.finish')}
						</Button>
					)}

					{!isRunning && samples.length > 0 && (
						<Button onClick={analyzSamples} variant='destructive' className='py-6'>
							{t('disability.analyze')}
						</Button>
					)}

					{analysisComplete && (
						<Button
							type='button'
							onClick={() => navigate('/early-detection')}
							variant='outline'
							className='flex flex-col items-center gap-3 h-auto text-base'>
							<span>{t('disability.nextTest')}</span>
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default DisabilityTest;
