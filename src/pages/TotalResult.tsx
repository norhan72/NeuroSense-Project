import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserData } from '@/contexts/useUserData';
import { useTheme } from '@/contexts/ThemeContext';
import { Separator } from '@/components/ui/separator';

export const TotalResult = () => {
	const { t, language } = useLanguage();
	const { userData, resetUserData } = useUserData();
	const { theme } = useTheme();
	const navigate = useNavigate();
	const [combinedResult, setCombinedResult] = useState<number>(0);

	useEffect(() => {
		if (
			!userData.results ||
			!userData.results['vision'] ||
			!userData.results['motion'] ||
			!userData.results['speech']
		) {
			return;
		}
		const weightedAverage =
			(userData.results['vision']?.score ?? 0) * 0.5 +
			(userData.results['motion']?.score ?? 0) * 0.3 +
			(userData.results['speech']?.score ?? 0) * 0.2;
		setCombinedResult(weightedAverage);
	}, [userData]);

	const resetAnalysis = () => {
		resetUserData();
		toast.success(t('totalResult.analysisReset'));
		setTimeout(() => navigate('/input'), 1000);
	};

	return (
		<div className='max-w-3xl mx-auto p-4 space-y-6'>
			{!userData.results ||
			!userData.results['vision'] ||
			!userData.results['motion'] ||
			!userData.results['speech'] ? (
				<div className='w-full h-screen flex justify-center items-center'>
					<Card className='flex flex-col w-full justify-center items-center p-4 space-y-10'>
						<h1 className='text-2xl font-bold'>{t('totalResult.noResults')}</h1>
						<h2 className='text-xl font-semibold'>{t('totalResult.pleaseCompleteTests')}</h2>
					</Card>
				</div>
			) : (
				<>
					<h1 className='text-2xl font-bold'>{t('totalResult.title')}</h1>
					<Card className='p-4 space-y-4'>
						<div>
							<h2 className='text-xl font-semibold mb-2'>{t('totalResult.patientInfo')}</h2>
							<p>
								<strong>{t('totalResult.name')}:</strong> {userData.name}
							</p>
							<p>
								<strong>{t('totalResult.age')}:</strong> {userData.age}
							</p>
							<p>
								<strong>{t('totalResult.gender')}:</strong> {userData.gender}
							</p>
							<p>
								<strong>{t('totalResult.symptoms')}:</strong> {userData.symptoms}
							</p>
							<p>
								<strong>{t('totalResult.medicalHistory')}:</strong> {userData.medicalHistory}
							</p>
						</div>
						<Separator orientation='horizontal' />
						<div>
							<p>
								<strong>{t('totalResult.testName')}:</strong> {t('totalResult.visionTest')}
							</p>
							<p>
								<strong>{t('totalResult.testResult')}:</strong>{' '}
								{userData.results['vision']
									? language === 'en'
										? userData.results['vision']?.label_en
										: userData.results['vision']?.label_ar
									: 'N/A'}
							</p>
							<p>
								<strong>{t('totalResult.confidence')}:</strong>{' '}
								{userData.results['vision'] ? userData.results['vision']?.score?.toFixed(2) : 'N/A'}%
							</p>
						</div>
						<Separator orientation='horizontal' />
						<div>
							<p>
								<strong>{t('totalResult.testName')}:</strong> {t('totalResult.speechTest')}
							</p>
							<p>
								<strong>{t('totalResult.testResult')}:</strong>{' '}
								{userData.results['motion']
									? language === 'en'
										? userData.results['motion']?.label_en
										: userData.results['motion']?.label_ar
									: 'N/A'}
							</p>
							<p>
								<strong>{t('totalResult.confidence')}:</strong>{' '}
								{userData.results['motion'] ? userData.results['motion']?.score?.toFixed(2) : 'N/A'}%
							</p>
						</div>
						<Separator orientation='horizontal' />
						<div>
							<p>
								<strong>{t('totalResult.testName')}:</strong> {t('totalResult.motionTest')}
							</p>
							<p>
								<strong>{t('totalResult.testResult')}:</strong>{' '}
								{userData.results['speech']
									? language === 'en'
										? userData.results['speech']?.label_en
										: userData.results['speech']?.label_ar
									: 'N/A'}
							</p>
							<p>
								<strong>{t('totalResult.confidence')}:</strong>{' '}
								{userData.results['speech'] ? userData.results['speech']?.score?.toFixed(2) : 'N/A'}%
							</p>
						</div>
						<Separator orientation='horizontal' />
						<div>
							<h2 className='text-xl font-semibold mb-2'>
								{t('totalResult.combinedResult')}: {combinedResult.toFixed(2)}%
							</h2>
							<p>{t('totalResult.combinedResultDescription')}</p>
						</div>
						<div className='flex gap-4'>
							<Button onClick={() => navigate('/')} variant='secondary' className='w-full'>
								{t('totalResult.back')}
							</Button>
							<Button onClick={resetAnalysis} variant='destructive' className='w-full'>
								{t('totalResult.newAnalysis')}
							</Button>
						</div>
					</Card>
				</>
			)}
		</div>
	);
};
