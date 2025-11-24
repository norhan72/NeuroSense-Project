import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Mic, Activity, Camera } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserData } from '@/contexts/useUserData';
import { useTheme } from '@/contexts/ThemeContext';
import { LanguageToggle } from './LanguageToggle';
import * as Select from '@radix-ui/react-select';

export const InputForm = () => {
	const navigate = useNavigate();
	const { t, language } = useLanguage();
	const { userData, setUserData } = useUserData();
	const { theme } = useTheme();
	const [patientName, setPatientName] = useState('');
	const [age, setAge] = useState('');
	const [gender, setGender] = useState('');
	const [symptoms, setSymptoms] = useState('');
	const [medicalHistory, setMedicalHistory] = useState('');

	// Initialize local form fields from context when available
	useEffect(() => {
		if (userData) {
			setPatientName(userData.name || '');
			setAge(userData.age != null ? String(userData.age) : '');
			setGender(userData.gender || '');
			setSymptoms(userData.symptoms || '');
			setMedicalHistory(userData.medicalHistory || '');
		}
	}, [userData]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Use context values if present, otherwise use local form values
		const finalName = userData.name || patientName;
		const finalAge = userData.age != null ? String(userData.age) : age;
		const finalGender = userData.gender || gender;
		const finalSymptoms = userData?.symptoms?.length ? userData.symptoms : symptoms;
		const finalMedicalHistory = userData?.medicalHistory?.length ? userData.medicalHistory : medicalHistory;
		const finalResults = userData?.results ? userData.results : null;

		const analysisData = {
			patientName: finalName,
			age: finalAge,
			gender: finalGender,
			symptoms: finalSymptoms,
			medicalHistory: finalMedicalHistory,
			results: finalResults,
			timestamp: new Date().toISOString(),
		};

		localStorage.setItem('currentAnalysis', JSON.stringify(analysisData));
		toast.success(t('input.analyzing'));

		setTimeout(() => {
			navigate('/results');
		}, 1500);
	};

	const handleSaveData = () => {
		const finalName = userData.name || patientName;
		const finalAge = userData.age != null ? String(userData.age) : age;
		const finalGender = userData.gender || gender;
		const finalSymptoms = userData?.symptoms?.length ? userData.symptoms : symptoms;
		const finalMedicalHistory = userData?.medicalHistory?.length ? userData.medicalHistory : medicalHistory;

		if (!finalName || !finalAge || !finalGender || !finalSymptoms) {
			toast.error(t('input.errorRequired'));
			return;
		}

		// Update global user data if missing
		setUserData((prev) => ({
			...prev,
			name: prev.name || finalName,
			age: prev.age != null ? prev.age : Number(finalAge),
			gender: prev.gender || finalGender,
			symptoms: prev?.symptoms?.length ? prev.symptoms : finalSymptoms,
			medicalHistory: prev?.medicalHistory?.length ? prev.medicalHistory : finalMedicalHistory,
		}));
	};

	return (
		<div className='min-h-screen flex items-center justify-center p-6'>
			<LanguageToggle />
			<Card className='w-full max-w-2xl mb-16 p-8 bg-card/50 backdrop-blur-lg border-border/50'>
				<div className='mb-8 text-center'>
					<h2
						className='text-3xl font-bold mb-2'
						style={{
							background: 'var(--gradient-primary)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							backgroundClip: 'text',
						}}>
						{t('input.title')}
					</h2>
					<p className='text-muted-foreground'>{t('input.subtitle')}</p>
				</div>

				<form onSubmit={handleSubmit} className='space-y-6'>
					<div className='space-y-2'>
						<Label htmlFor='name' className='text-lg font-semibold'>
							{t('input.patientName')} *
						</Label>
						<Input
							id='name'
							value={patientName}
							onChange={(e) => setPatientName(e.target.value)}
							placeholder={t('input.patientNamePlaceholder')}
							className='text-lg p-6 bg-input border-border'
							required
							disabled={!!userData.name}
						/>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='age' className='text-lg font-semibold'>
							{t('input.age')} *
						</Label>
						<Input
							id='age'
							type='number'
							value={age}
							onChange={(e) => setAge(e.target.value)}
							placeholder={t('input.agePlaceholder')}
							className='text-lg p-6 bg-input border-border'
							required
							min='1'
							max='100'
							disabled={userData.age != null}
						/>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='gender' className='text-lg font-semibold'>
							{t('input.gender')} *
						</Label>
						<Select.Root
							value={gender || userData.gender || ''}
							onValueChange={(val) => setGender(val)}
							disabled={!!userData.gender}>
							<Select.Trigger
								className={`w-full text-left text-lg p-6 bg-input border-border rounded ${
									theme === 'dark' ? 'text-white' : 'text-slate-900'
								}`}
								aria-label={t('input.gender')}>
								<Select.Value placeholder={t('input.genderPlaceholder')} />
							</Select.Trigger>
							<Select.Portal>
								<Select.Content
									className={`rounded shadow-lg z-50 ${
										theme === 'dark'
											? 'bg-slate-800 text-white border border-border/60'
											: 'bg-white text-slate-900 border border-border'
									}`}>
									<Select.Viewport className='p-2'>
										<Select.Item
											value='male'
											className={`px-3 py-2 rounded ${
												theme === 'dark' ? 'hover:bg-muted/40' : 'hover:bg-muted/20'
											}`}>
											<Select.ItemText>{language === 'ar' ? 'ذكر' : 'Male'}</Select.ItemText>
										</Select.Item>
										<Select.Item
											value='female'
											className={`px-3 py-2 rounded ${
												theme === 'dark' ? 'hover:bg-muted/40' : 'hover:bg-muted/20'
											}`}>
											<Select.ItemText>{language === 'ar' ? 'أنثى' : 'Female'}</Select.ItemText>
										</Select.Item>
									</Select.Viewport>
								</Select.Content>
							</Select.Portal>
						</Select.Root>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='symptoms' className='text-lg font-semibold'>
							{t('input.symptoms')} *
						</Label>
						<Textarea
							id='symptoms'
							value={symptoms}
							onChange={(e) => setSymptoms(e.target.value)}
							placeholder={t('input.symptomsPlaceholder')}
							className='min-h-[150px] text-lg p-4 bg-input border-border resize-none'
							required
							disabled={userData.symptoms && userData.symptoms.length > 0}
						/>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='history' className='text-lg font-semibold'>
							{t('input.medicalHistory')}{' '}
							<span className='text-muted-foreground text-sm'>{t('input.optional')}</span>
						</Label>
						<Textarea
							id='history'
							value={medicalHistory}
							onChange={(e) => setMedicalHistory(e.target.value)}
							placeholder={t('input.medicalHistoryPlaceholder')}
							className='min-h-[120px] text-lg p-4 bg-input border-border resize-none'
							disabled={userData.medicalHistory && userData.medicalHistory.length > 0}
						/>
						<p className='text-sm text-muted-foreground mt-1'>{t('input.medicalHistoryNote')}</p>
					</div>

					<Button
						type='button'
						onClick={handleSaveData}
						className='w-full flex-1 text-lg py-6 font-bold'
						style={{
							background: 'var(--gradient-primary)',
							transition: 'var(--transition-smooth)',
						}}
						disabled={
							userData.results &&
							(!userData.name || !userData.age || !userData.gender || !userData.symptoms)
						}>
						{t('input.save')}
					</Button>

					{/* Additional Tests Section */}
					<div className='mt-8 p-6 bg-muted/20 rounded-lg border border-border/30'>
						<h3 className='text-xl font-bold mb-4'>{t('input.additionalTests')}</h3>
						<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
							<Button
								type='button'
								onClick={() => navigate('/image-analysis')}
								variant='outline'
								className='flex flex-col items-center gap-3 h-auto text-base'>
								<Camera className='w-8 h-8' />
								<span>{t('input.imageAnalysis')}</span>
							</Button>
							<Button
								type='button'
								onClick={() => navigate('/voice-analysis')}
								variant='outline'
								className='flex flex-col items-center gap-3 h-auto text-base'
								disabled={userData.results && !userData.results['vision']}>
								<Mic className='w-8 h-8' />
								<span>{t('input.voiceAnalysis')}</span>
							</Button>
							<Button
								type='button'
								onClick={() => navigate('/disability-test')}
								variant='outline'
								className='flex flex-col items-center gap-3 h-auto text-base'
								// disabled={userData.results && !userData.results['speech']}>
							>
								<Activity className='w-8 h-8' />
								<span>{t('input.disabilityTest')}</span>
							</Button>
							<Button
								type='button'
								onClick={() => navigate('/early-detection')}
								variant='outline'
								className='flex flex-col items-center gap-3 h-auto text-base whitespace-normal'
								disabled={userData.results && !userData.results['motion']}>
								<svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
									<path
										fillRule='evenodd'
										d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z'
										clipRule='evenodd'
									/>
								</svg>
								<span>{t('input.earlyDetection')}</span>
							</Button>
						</div>
					</div>

					<div className='flex gap-4 pt-4'>
						<Button
							type='submit'
							className='flex-1 text-lg py-6 font-bold'
							style={{
								background: 'var(--gradient-primary)',
								transition: 'var(--transition-smooth)',
							}}
							disabled={userData.results && !userData.results['survey']}>
							{t('input.analyze')}
						</Button>
						{/* <Button
							type='button'
							variant='outline'
							onClick={() => navigate('/')}
							className='flex-1 text-lg py-6'>
							{t('input.back')}
						</Button> */}
					</div>
				</form>

				<div className='mt-6 p-4 bg-muted/30 rounded-lg border border-border/30'>
					<div className='flex items-center gap-2 text-sm text-muted-foreground'>
						<svg className='w-5 h-5 text-secondary' fill='currentColor' viewBox='0 0 20 20'>
							<path
								fillRule='evenodd'
								d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
								clipRule='evenodd'
							/>
						</svg>
						<p>{t('input.privacyNote')}</p>
					</div>
				</div>
			</Card>
		</div>
	);
};
