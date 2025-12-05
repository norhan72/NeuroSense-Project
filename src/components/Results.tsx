import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { AlertCircle, CheckCircle2, TrendingUp, Brain, Activity, Eye, Zap, Heart, Moon, History } from 'lucide-react';

interface AnalysisData {
	patientName: string;
	age: string;
	gender?: string; // Gender field
	symptoms: string; // Symptoms field
	medicalHistory: string;
	timestamp: string;
}

interface DetailedResults {
	Voice: { score: number; level: string };
	Movement: { score: number; level: string };
	Vision: { score: number; level: string };
	Cognitive: { score: number; level: string };
	Pain: { score: number; level: string };
	Mood: { score: number; level: string };
	History: { score: number; level: string };
	totalScore: number;
	answers?: Record<string, boolean>;
	timestamp?: string;
}

interface MedicalAnalysis {
	summary: string;
	detailedAnalysis: string;
	recommendation: string;
	specificRecommendations?: string[];
	suspectedConditions?: string[];
}

interface MedicalReportsData {
	analysis: {
		highRisk: { ar: string; en: string };
		noHighRisk: { ar: string; en: string };
		moodHigh: { ar: string; en: string };
		cognitiveIrregular: { ar: string; en: string };
		movementConcern: { ar: string; en: string };
		visionIssues: { ar: string; en: string };
		painPatterns: { ar: string; en: string };
		voiceChanges: { ar: string; en: string };
		familyHistory: { ar: string; en: string };
	};
	recommendations: {
		highRisk: { ar: string; en: string };
		mediumRisk: { ar: string; en: string };
		lowRisk: { ar: string; en: string };
		cognitive: { ar: string; en: string };
		vision: { ar: string; en: string };
		movement: { ar: string; en: string };
		mood: { ar: string; en: string };
	};
	conditions: {
		multipleSclerosis: { ar: string; en: string };
		peripheralNeuropathy: { ar: string; en: string };
		opticNeuritis: { ar: string; en: string };
		myastheniaGravis: { ar: string; en: string };
		parkinsons: { ar: string; en: string };
		fibromyalgia: { ar: string; en: string };
		chronicFatigue: { ar: string; en: string };
		anxietyDisorder: { ar: string; en: string };
		depression: { ar: string; en: string };
	};
	detailedAnalysis: {
		introduction: { ar: string; en: string };
		conclusion: { ar: string; en: string };
	};
}

export const Results = () => {
	const navigate = useNavigate();
	const { t, language } = useLanguage();
	const [data, setData] = useState<AnalysisData | null>(null);
	const [detailedResults, setDetailedResults] = useState<DetailedResults | null>(null);
	const [medicalReportsData, setMedicalReportsData] = useState<MedicalReportsData | null>(null);
	const [medicalAnalysis, setMedicalAnalysis] = useState<MedicalAnalysis | null>(null);
	const [loading, setLoading] = useState(true);

	// Section configuration with icons and translations
	const sectionConfig = [
		{
			key: 'Cognitive',
			icon: <Zap className='w-5 h-5' />,
			nameAr: 'التركيز والطاقة',
			nameEn: 'Focus and Energy',
			maxScore: 10,
		},
		{
			key: 'Pain',
			icon: <Heart className='w-5 h-5' />,
			nameAr: 'الألم والتحكم في الجسم',
			nameEn: 'Pain and Body Control',
			maxScore: 10,
		},
		{
			key: 'Mood',
			icon: <Moon className='w-5 h-5' />,
			nameAr: 'المزاج والنوم',
			nameEn: 'Mood and Sleep',
			maxScore: 10,
		},
		{
			key: 'History',
			icon: <History className='w-5 h-5' />,
			nameAr: 'التاريخ المرضي والعائلة',
			nameEn: 'Medical and Family History',
			maxScore: 10,
		},
	];

	const getLevelColor = (level: string) => {
		switch (level) {
			case 'high':
				return 'text-destructive bg-destructive/10 border-destructive';
			case 'medium':
				return 'text-yellow-600 dark:text-yellow-400 bg-yellow-500/10 border-yellow-500';
			case 'low':
				return 'text-green-600 dark:text-green-400 bg-green-500/10 border-green-500';
			default:
				return 'text-muted-foreground bg-muted border-border';
		}
	};

	const getLevelIcon = (level: string) => {
		switch (level) {
			case 'high':
				return <AlertCircle className='w-5 h-5' />;
			case 'medium':
				return <TrendingUp className='w-5 h-5' />;
			case 'low':
				return <CheckCircle2 className='w-5 h-5' />;
			default:
				return null;
		}
	};

	const getLevelText = (level: string) => {
		if (language === 'ar') {
			switch (level) {
				case 'high':
					return 'عالي';
				case 'medium':
					return 'متوسط';
				case 'low':
					return 'منخفض';
				default:
					return 'غير محدد';
			}
		} else {
			switch (level) {
				case 'high':
					return 'High';
				case 'medium':
					return 'Medium';
				case 'low':
					return 'Low';
				default:
					return 'Unknown';
			}
		}
	};

	useEffect(() => {
		// Load patient data
		const savedData = localStorage.getItem('currentAnalysis');
		if (savedData) {
			setData(JSON.parse(savedData));
		}

		// Load detailed results
		const detailedData = localStorage.getItem('detailedResults');
		if (detailedData) {
			setDetailedResults(JSON.parse(detailedData));
		}

		// Load medical reports data
		fetch('/data/medical_reports.json')
			.then((res) => res.json())
			.then((data: MedicalReportsData) => {
				setMedicalReportsData(data);
			})
			.catch((err) => {
				console.error('Failed to load medical reports:', err);
			});

		setTimeout(() => {
			setLoading(false);
		}, 1500);
	}, []);

	// Generate medical analysis based on section scores
	const generateMedicalAnalysis = (
		results: DetailedResults,
		adviceData: MedicalReportsData,
		lang: 'ar' | 'en'
	): MedicalAnalysis => {
		const analysis: string[] = [];
		const detailedAnalysis: string[] = [];
		const specificRecommendations: string[] = [];
		const suspectedConditions: string[] = [];

		// Get high-risk sections
		const highRiskSections = Object.keys(results)
			.filter((key) => key !== 'totalScore' && key !== 'answers' && key !== 'timestamp')
			.filter((section) => {
				const sectionData = results[section as keyof DetailedResults] as { score: number; level: string };
				return sectionData?.level === 'high';
			});

		// Get medium-risk sections
		const mediumRiskSections = Object.keys(results)
			.filter((key) => key !== 'totalScore' && key !== 'answers' && key !== 'timestamp')
			.filter((section) => {
				const sectionData = results[section as keyof DetailedResults] as { score: number; level: string };
				return sectionData?.level === 'medium';
			});

		// Get section names for display
		const getSectionName = (sectionKey: string): string => {
			const section = sectionConfig.find((s) => s.key === sectionKey);
			return lang === 'ar' ? section?.nameAr || sectionKey : section?.nameEn || sectionKey;
		};

		// Start with introduction
		detailedAnalysis.push(adviceData.detailedAnalysis.introduction[lang]);

		// Main analysis
		if (highRiskSections.length === 0) {
			analysis.push(adviceData.analysis.noHighRisk[lang]);
			detailedAnalysis.push(adviceData.analysis.noHighRisk[lang]);
		} else {
			const sectionNames = highRiskSections.map(getSectionName).join(', ');
			analysis.push(adviceData.analysis.highRisk[lang].replace('{sections}', sectionNames));
			detailedAnalysis.push(adviceData.analysis.highRisk[lang].replace('{sections}', sectionNames));
		}

		// Section-specific analysis with detailed information
		if (results.Mood?.level === 'high') {
			analysis.push(adviceData.analysis.moodHigh[lang]);
			detailedAnalysis.push(adviceData.analysis.moodHigh[lang]);
			specificRecommendations.push(adviceData.recommendations.mood[lang]);
			suspectedConditions.push(adviceData.conditions.anxietyDisorder[lang]);
			suspectedConditions.push(adviceData.conditions.depression[lang]);
		}

		if (results.Cognitive?.level === 'medium' || results.Cognitive?.level === 'high') {
			analysis.push(adviceData.analysis.cognitiveIrregular[lang]);
			detailedAnalysis.push(adviceData.analysis.cognitiveIrregular[lang]);
			detailedAnalysis.push(
				lang === 'ar'
					? 'قد يشير هذا إلى مشاكل في الذاكرة قصيرة المدى، صعوبة في التركيز، أو بطء في معالجة المعلومات. هذه الأعراض قد تكون مرتبطة بحالات عصبية مختلفة.'
					: 'This may indicate issues with short-term memory, difficulty concentrating, or slow information processing. These symptoms may be associated with various neurological conditions.'
			);
			specificRecommendations.push(adviceData.recommendations.cognitive[lang]);
			suspectedConditions.push(adviceData.conditions.multipleSclerosis[lang]);
			suspectedConditions.push(adviceData.conditions.chronicFatigue[lang]);
		}

		if (results.Movement?.level === 'high' || results.Movement?.level === 'medium') {
			analysis.push(adviceData.analysis.movementConcern[lang]);
			detailedAnalysis.push(adviceData.analysis.movementConcern[lang]);
			detailedAnalysis.push(
				lang === 'ar'
					? 'قد تشمل هذه المشاكل ضعف العضلات، التنميل، الوخز، أو صعوبة في التنسيق الحركي. هذه الأعراض قد تشير إلى مشاكل في الجهاز العصبي المحيطي أو المركزي.'
					: 'These may include muscle weakness, numbness, tingling, or coordination difficulties. These symptoms may indicate problems with the peripheral or central nervous system.'
			);
			specificRecommendations.push(adviceData.recommendations.movement[lang]);
			suspectedConditions.push(adviceData.conditions.multipleSclerosis[lang]);
			suspectedConditions.push(adviceData.conditions.peripheralNeuropathy[lang]);
			if (results.Pain?.level === 'high') {
				suspectedConditions.push(adviceData.conditions.fibromyalgia[lang]);
			}
		}

		if (results.Vision?.level === 'high' || results.Vision?.level === 'medium') {
			analysis.push(adviceData.analysis.visionIssues[lang]);
			detailedAnalysis.push(adviceData.analysis.visionIssues[lang]);
			detailedAnalysis.push(
				lang === 'ar'
					? 'قد تشمل ضبابية الرؤية، فقدان الرؤية المؤقت في عين واحدة، ألم في العين عند الحركة، أو رؤية ألوان باهتة. هذه الأعراض قد تكون علامة على التهاب العصب البصري.'
					: 'These may include blurred vision, temporary vision loss in one eye, eye pain when moving, or faded colors. These symptoms may be a sign of optic neuritis.'
			);
			specificRecommendations.push(adviceData.recommendations.vision[lang]);
			suspectedConditions.push(adviceData.conditions.opticNeuritis[lang]);
			suspectedConditions.push(adviceData.conditions.multipleSclerosis[lang]);
		}

		if (results.Pain?.level === 'high') {
			analysis.push(adviceData.analysis.painPatterns[lang]);
			detailedAnalysis.push(adviceData.analysis.painPatterns[lang]);
			detailedAnalysis.push(
				lang === 'ar'
					? 'الألم العصبي قد يكون حارقاً، لاسعاً، أو يشبه الصعقة الكهربائية. قد يكون ثابتاً أو متقطعاً وقد يزداد سوءاً في الليل أو مع الحركة.'
					: 'Neuropathic pain may be burning, stinging, or electric shock-like. It may be constant or intermittent and may worsen at night or with movement.'
			);
			suspectedConditions.push(adviceData.conditions.peripheralNeuropathy[lang]);
			suspectedConditions.push(adviceData.conditions.fibromyalgia[lang]);
		}

		if (results.Voice?.level === 'high') {
			analysis.push(adviceData.analysis.voiceChanges[lang]);
			detailedAnalysis.push(adviceData.analysis.voiceChanges[lang]);
			detailedAnalysis.push(
				lang === 'ar'
					? 'التغييرات في الصوت قد تشمل البحة، ضعف الصوت، صعوبة في نطق بعض الحروف، أو تغيير نبرة الصوت. قد تشير هذه الأعراض إلى مشاكل في الأعصاب القحفية المسؤولة عن الكلام.'
					: 'Voice changes may include hoarseness, voice weakness, difficulty pronouncing certain letters, or changes in voice pitch. These symptoms may indicate problems with the cranial nerves responsible for speech.'
			);
			suspectedConditions.push(adviceData.conditions.myastheniaGravis[lang]);
			suspectedConditions.push(adviceData.conditions.multipleSclerosis[lang]);
		}

		if (results.History?.level === 'high' || results.History?.level === 'medium') {
			analysis.push(adviceData.analysis.familyHistory[lang]);
			detailedAnalysis.push(adviceData.analysis.familyHistory[lang]);
			detailedAnalysis.push(
				lang === 'ar'
					? 'العوامل الوراثية قد تلعب دوراً مهماً في تطور بعض الحالات العصبية. وجود تاريخ عائلي يزيد من احتمالية الحاجة للمتابعة المنتظمة والفحوصات الدورية.'
					: 'Genetic factors may play an important role in the development of some neurological conditions. Family history increases the likelihood of needing regular monitoring and periodic examinations.'
			);
		}

		// Calculate section percentages for more accurate analysis
		const calculateSectionPercentage = (sectionKey: string): number => {
			const sectionData = results[sectionKey as keyof DetailedResults] as { score: number; level: string };
			const section = sectionConfig.find((s) => s.key === sectionKey);
			if (!sectionData || !section) return 0;
			return Math.round((sectionData.score / section.maxScore) * 100);
		};

		// Add suspected conditions based on precise combination of symptoms and percentages
		// Multiple Sclerosis: Vision + Movement + Cognitive (all high) OR Vision + Movement (both high with high total score)
		// const visionPercentage = calculateSectionPercentage('Vision');
		// const movementPercentage = calculateSectionPercentage('Movement');
		const cognitivePercentage = calculateSectionPercentage('Cognitive');

		if (
			(results.Vision?.level === 'high' &&
				results.Movement?.level === 'high' &&
				results.Cognitive?.level === 'high') ||
			(results.Vision?.level === 'high' && results.Movement?.level === 'high' && results.totalScore >= 40) ||
			cognitivePercentage >= 50
		) {
			if (!suspectedConditions.includes(adviceData.conditions.multipleSclerosis[lang])) {
				suspectedConditions.unshift(adviceData.conditions.multipleSclerosis[lang]);
			}
		}

		// Chronic Fatigue: Mood + Cognitive (both high) with high total score
		const moodPercentage = calculateSectionPercentage('Mood');
		if (
			(results.Mood?.level === 'high' && results.Cognitive?.level === 'high' && results.totalScore >= 35) ||
			(moodPercentage >= 60 && cognitivePercentage >= 50 && results.totalScore >= 30)
		) {
			if (!suspectedConditions.includes(adviceData.conditions.chronicFatigue[lang])) {
				suspectedConditions.push(adviceData.conditions.chronicFatigue[lang]);
			}
		}

		// Fibromyalgia: Movement + Pain (both high) OR Pain high with Mood medium/high
		const painPercentage = calculateSectionPercentage('Pain');
		if (
			(results.Movement?.level === 'high' && results.Pain?.level === 'high') ||
			(results.Pain?.level === 'high' && (results.Mood?.level === 'medium' || results.Mood?.level === 'high')) ||
			painPercentage >= 70
		) {
			if (!suspectedConditions.includes(adviceData.conditions.fibromyalgia[lang])) {
				suspectedConditions.push(adviceData.conditions.fibromyalgia[lang]);
			}
		}

		// Peripheral Neuropathy: Movement + Pain (both high) with no Vision issues
		if (results.Movement?.level === 'high' && results.Pain?.level === 'high' && results.Vision?.level !== 'high') {
			if (!suspectedConditions.includes(adviceData.conditions.peripheralNeuropathy[lang])) {
				suspectedConditions.unshift(adviceData.conditions.peripheralNeuropathy[lang]);
			}
		}

		// Myasthenia Gravis: Voice + Movement (both high) with no Cognitive issues
		if (
			results.Voice?.level === 'high' &&
			results.Movement?.level === 'high' &&
			results.Cognitive?.level !== 'high'
		) {
			if (!suspectedConditions.includes(adviceData.conditions.myastheniaGravis[lang])) {
				suspectedConditions.unshift(adviceData.conditions.myastheniaGravis[lang]);
			}
		}

		// Parkinson's: Movement high with History high/medium
		if (
			results.Movement?.level === 'high' &&
			(results.History?.level === 'high' || results.History?.level === 'medium')
		) {
			if (!suspectedConditions.includes(adviceData.conditions.parkinsons[lang])) {
				suspectedConditions.push(adviceData.conditions.parkinsons[lang]);
			}
		}

		// Optic Neuritis: Vision high alone or with low other scores
		if (
			results.Vision?.level === 'high' &&
			results.Movement?.level !== 'high' &&
			results.Cognitive?.level !== 'high'
		) {
			if (!suspectedConditions.includes(adviceData.conditions.opticNeuritis[lang])) {
				suspectedConditions.unshift(adviceData.conditions.opticNeuritis[lang]);
			}
		}

		// Remove duplicates
		const uniqueConditions = Array.from(new Set(suspectedConditions));

		// Add conclusion
		detailedAnalysis.push(adviceData.detailedAnalysis.conclusion[lang]);

		// Main recommendation based on risk level
		let mainRecommendation: string;
		if (highRiskSections.length > 0) {
			mainRecommendation = adviceData.recommendations.highRisk[lang];
		} else if (mediumRiskSections.length > 0) {
			mainRecommendation = adviceData.recommendations.mediumRisk[lang];
		} else {
			mainRecommendation = adviceData.recommendations.lowRisk[lang];
		}

		return {
			summary: analysis.join(' '),
			detailedAnalysis: detailedAnalysis.join(' '),
			recommendation: mainRecommendation,
			specificRecommendations: specificRecommendations.length > 0 ? specificRecommendations : undefined,
			suspectedConditions: uniqueConditions.length > 0 ? uniqueConditions : undefined,
		};
	};

	// Generate medical analysis when both detailedResults and medicalReportsData are available
	useEffect(() => {
		if (detailedResults && medicalReportsData) {
			const analysis = generateMedicalAnalysis(detailedResults, medicalReportsData, language);
			setMedicalAnalysis(analysis);
		}
	}, [detailedResults, medicalReportsData, language]);

	if (!data && !detailedResults) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<LanguageToggle />
				<Card className='p-8 text-center'>
					<p className='text-xl mb-4'>{t('results.noData')}</p>
					<Button onClick={() => navigate('/input')}>{t('results.newInput')}</Button>
				</Card>
			</div>
		);
	}

	return (
		<div className='p-6'>
			<LanguageToggle />
			<div className='max-w-4xl mx-auto'>
				<div className='mb-8 text-center'>
					<h2
						className='text-4xl font-bold mb-2'
						style={{
							background: 'var(--gradient-primary)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							backgroundClip: 'text',
						}}>
						{t('results.title')}
					</h2>
					<p className='text-muted-foreground'>{t('results.subtitle')}</p>
				</div>

				{loading ? (
					<Card className='p-12 bg-card/50 backdrop-blur-lg border-border/50'>
						<div className='text-center space-y-4'>
							<div className='w-16 h-16 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
							<p className='text-xl font-semibold'>{t('results.analyzing')}</p>
							<p className='text-muted-foreground'>{t('results.processing')}</p>
						</div>
					</Card>
				) : (
					<div className='space-y-6'>
						{/* Basic Information Card - جمع كل المعلومات الأساسية */}
						{data && (
							<Card className='p-6 bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-lg border-2 border-primary/20 shadow-lg'>
								<h3 className='text-2xl font-bold mb-6 flex items-center gap-3'>
									<svg className='w-7 h-7 text-primary' fill='currentColor' viewBox='0 0 20 20'>
										<path
											fillRule='evenodd'
											d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
											clipRule='evenodd'
										/>
									</svg>
									{language === 'ar' ? 'المعلومات الأساسية' : 'Basic Information'}
								</h3>

								<div className='grid md:grid-cols-2 gap-6'>
									{/* Patient Name */}
									<div className='p-4 bg-card/50 rounded-lg border border-border/30'>
										<p className='text-sm text-muted-foreground mb-2'>{t('results.name')}</p>
										<p className='text-xl font-bold'>{data.patientName}</p>
									</div>

									{/* Age */}
									<div className='p-4 bg-card/50 rounded-lg border border-border/30'>
										<p className='text-sm text-muted-foreground mb-2'>{t('results.ageLabel')}</p>
										<p className='text-xl font-bold'>
											{data.age} {t('results.years')}
										</p>
									</div>

									{/* Gender */}
									{data.gender && (
										<div className='p-4 bg-card/50 rounded-lg border border-border/30'>
											<p className='text-sm text-muted-foreground mb-2'>
												{language === 'ar' ? 'الجنس' : 'Gender'}
											</p>
											<p className='text-xl font-bold'>{data.gender}</p>
										</div>
									)}

									{/* Date */}
									{data.timestamp && (
										<div className='p-4 bg-card/50 rounded-lg border border-border/30'>
											<p className='text-sm text-muted-foreground mb-2'>
												{language === 'ar' ? 'تاريخ الإدخال' : 'Date'}
											</p>
											<p className='text-lg font-semibold'>
												{new Date(data.timestamp).toLocaleDateString(
													language === 'ar' ? 'ar-SA' : 'en-US',
													{
														year: 'numeric',
														month: 'long',
														day: 'numeric',
													}
												)}
											</p>
										</div>
									)}
								</div>

								{/* Symptoms */}
								<div className='mt-6 p-5 bg-card/60 rounded-lg border-2 border-secondary/20'>
									<h4 className='text-lg font-bold mb-3 flex items-center gap-2'>
										<svg className='w-5 h-5 text-secondary' fill='currentColor' viewBox='0 0 20 20'>
											<path
												fillRule='evenodd'
												d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
												clipRule='evenodd'
											/>
										</svg>
										{language === 'ar' ? 'الأعراض المذكورة' : 'Reported Symptoms'}
									</h4>
									<p className='text-base leading-relaxed whitespace-pre-line'>{data.symptoms}</p>
								</div>

								{/* Medical History */}
								{data.medicalHistory && (
									<div className='mt-6 p-5 bg-card/60 rounded-lg border-2 border-accent/20'>
										<h4 className='text-lg font-bold mb-3 flex items-center gap-2'>
											<svg
												className='w-5 h-5 text-accent'
												fill='currentColor'
												viewBox='0 0 20 20'>
												<path d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z' />
												<path
													fillRule='evenodd'
													d='M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z'
													clipRule='evenodd'
												/>
											</svg>
											{t('results.medicalHistoryLabel')}
										</h4>
										<p className='text-base leading-relaxed whitespace-pre-line'>
											{data.medicalHistory}
										</p>
									</div>
								)}
							</Card>
						)}

						{/* Detailed Results Card */}
						{detailedResults && (
							<Card className='p-6 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-lg border-primary/30'>
								<div className='mb-6'>
									<h3 className='text-2xl font-bold mb-2 flex items-center gap-2'>
										<svg className='w-6 h-6 text-primary' fill='currentColor' viewBox='0 0 20 20'>
											<path d='M13 7H7v6h6V7z' />
											<path
												fillRule='evenodd'
												d='M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z'
												clipRule='evenodd'
											/>
										</svg>
										{language === 'ar' ? 'نتائج التحليل التفصيلي' : 'Detailed Analysis Results'}
									</h3>
									<div className='flex items-center gap-4 mb-4'>
										<div className='text-3xl font-bold'>
											{detailedResults.totalScore} {language === 'ar' ? 'نقطة' : 'points'}
										</div>
										<div className='text-sm text-muted-foreground'>
											{language === 'ar' ? 'إجمالي النقاط' : 'Total Score'}
										</div>
									</div>
								</div>

								{/* Section Breakdown */}
								<div className='space-y-4'>
									{sectionConfig.map((section) => {
										const sectionData = detailedResults[section.key as keyof DetailedResults] as {
											score: number;
											level: string;
										};
										if (!sectionData) return null;

										const percentage = Math.round((sectionData.score / section.maxScore) * 100);
										const levelColor = getLevelColor(sectionData.level);
										const levelIcon = getLevelIcon(sectionData.level);
										const levelText = getLevelText(sectionData.level);

										return (
											<Card key={section.key} className={`p-4 border-2 ${levelColor}`}>
												<div className='flex items-center justify-between mb-3'>
													<div className='flex items-center gap-3'>
														<div className='text-primary'>{section.icon}</div>
														<div>
															<h4 className='font-semibold text-lg'>
																{language === 'ar' ? section.nameAr : section.nameEn}
															</h4>
															<p className='text-sm text-muted-foreground'>
																{sectionData.score} / {section.maxScore}{' '}
																{language === 'ar' ? 'نقطة' : 'points'} ({percentage}%)
															</p>
														</div>
													</div>
													<div className='flex items-center gap-2'>
														{levelIcon}
														<span className='font-semibold'>{levelText}</span>
													</div>
												</div>
												<div className='w-full bg-muted rounded-full h-2'>
													<div
														className={`h-2 rounded-full ${
															sectionData.level === 'high'
																? 'bg-destructive'
																: sectionData.level === 'medium'
																? 'bg-yellow-500'
																: 'bg-green-500'
														}`}
														style={{ width: `${Math.min(percentage, 100)}%` }}
													/>
												</div>
											</Card>
										);
									})}
								</div>
							</Card>
						)}

						{/* AI Analysis Card */}
						<Card className='p-6 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-lg border-primary/30'>
							<h3 className='text-xl font-bold mb-4 flex items-center gap-2'>
								<svg className='w-6 h-6 text-primary' fill='currentColor' viewBox='0 0 20 20'>
									<path d='M13 7H7v6h6V7z' />
									<path
										fillRule='evenodd'
										d='M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z'
										clipRule='evenodd'
									/>
								</svg>
								{t('results.aiAnalysis')}
							</h3>
							<div className='space-y-4'>
								<div className='p-4 bg-card/50 rounded-lg'>
									<p className='text-sm text-muted-foreground mb-2'>{t('results.diagnosis')}</p>
									<p className='text-lg'>
										{detailedResults && detailedResults.totalScore >= 30
											? language === 'ar'
												? 'بناءً على نتائج الاستبيان التفصيلي، هناك مؤشرات قوية على وجود أعراض أولية. يُنصح بشدة بإجراء فحوصات طبية متخصصة.'
												: 'Based on the detailed survey results, there are strong indicators of early symptoms. It is highly recommended to undergo specialized medical tests.'
											: t('results.diagnosisText')}
									</p>
								</div>
								<div className='p-4 bg-card/50 rounded-lg'>
									<p className='text-sm text-muted-foreground mb-2'>
										{t('results.recommendationsLabel')}
									</p>
									<ul className='list-disc list-inside space-y-2 text-lg'>
										<li>{t('results.recommendation1')}</li>
										<li>{t('results.recommendation2')}</li>
										<li>{t('results.recommendation3')}</li>
										{detailedResults && detailedResults.totalScore >= 30 && (
											<li className='font-semibold text-destructive'>
												{language === 'ar'
													? 'فحوصات متخصصة: MRI للدماغ والحبل الشوكي، فحص السائل النخاعي، فحوصات الدم'
													: 'Specialized tests: Brain and spinal cord MRI, cerebrospinal fluid examination, blood tests'}
											</li>
										)}
									</ul>
								</div>
							</div>
						</Card>

						{/* AI-Powered Medical Summary - Only show if detailedResults exists */}
						{medicalAnalysis && detailedResults && (
							<Card className='p-8 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-lg border-2 border-blue-500/30 shadow-xl'>
								<div className='mb-8'>
									<div className='flex items-center gap-4 mb-4'>
										<div className='w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg'>
											<Brain className='w-8 h-8 text-white' />
										</div>
										<div>
											<h3 className='text-3xl font-bold mb-2'>
												{language === 'ar'
													? 'التقرير الطبي الذكي'
													: 'AI-Powered Medical Summary'}
											</h3>
											<p className='text-base text-muted-foreground'>
												{language === 'ar'
													? 'تحليل شامل ومفصل بناءً على جميع الأقسام والنتائج التفصيلية'
													: 'Comprehensive and detailed analysis based on all sections and detailed results'}
											</p>
										</div>
									</div>
								</div>

								<div className='space-y-8'>
									{/* Detailed Medical Analysis */}
									<div className='p-6 bg-card/80 rounded-xl border-2 border-border/60 shadow-lg'>
										<h4 className='text-xl font-bold mb-4 flex items-center gap-3'>
											<svg
												className='w-6 h-6 text-primary'
												fill='currentColor'
												viewBox='0 0 20 20'>
												<path
													fillRule='evenodd'
													d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
													clipRule='evenodd'
												/>
											</svg>
											{language === 'ar' ? 'التحليل الطبي التفصيلي' : 'Detailed Medical Analysis'}
										</h4>
										<div className='prose prose-lg dark:prose-invert max-w-none'>
											<p className='text-base leading-7 text-foreground whitespace-pre-line'>
												{medicalAnalysis.detailedAnalysis}
											</p>
										</div>
									</div>

									{/* Suspected Conditions */}
									{medicalAnalysis.suspectedConditions &&
										medicalAnalysis.suspectedConditions.length > 0 && (
											<div className='p-6 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl border-2 border-red-500/30 shadow-lg'>
												<h4 className='text-xl font-bold mb-4 flex items-center gap-3'>
													<AlertCircle className='w-6 h-6 text-red-500' />
													{language === 'ar' ? 'الأمراض المشتبه بها' : 'Suspected Conditions'}
												</h4>
												<p className='text-sm text-muted-foreground mb-4'>
													{language === 'ar'
														? 'بناءً على الأعراض والنتائج، قد تشير الحالة إلى إمكانية وجود أحد الحالات التالية. هذه القائمة ليست تشخيصاً نهائياً وتتطلب فحصاً سريرياً متخصصاً:'
														: 'Based on symptoms and results, the condition may indicate the possibility of one of the following conditions. This list is not a definitive diagnosis and requires specialized clinical examination:'}
												</p>
												<div className='grid md:grid-cols-2 gap-3'>
													{medicalAnalysis.suspectedConditions.map((condition, index) => (
														<div
															key={index}
															className='p-4 bg-card/70 rounded-lg border-2 border-red-500/20 hover:border-red-500/40 transition-colors'>
															<div className='flex items-center gap-2'>
																<div className='w-2 h-2 rounded-full bg-red-500 flex-shrink-0' />
																<p className='text-lg font-semibold text-red-600 dark:text-red-400'>
																	{condition}
																</p>
															</div>
														</div>
													))}
												</div>
											</div>
										)}

									{/* Main Recommendation */}
									<div className='p-6 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-xl border-2 border-primary/40 shadow-lg'>
										<h4 className='text-xl font-bold mb-4 flex items-center gap-3'>
											<CheckCircle2 className='w-6 h-6 text-primary' />
											{language === 'ar'
												? 'التوصية الرئيسية والخطوات التالية'
												: 'Primary Recommendation & Next Steps'}
										</h4>
										<p className='text-base font-medium leading-7 text-foreground'>
											{medicalAnalysis.recommendation}
										</p>
									</div>

									{/* Specific Recommendations */}
									{medicalAnalysis.specificRecommendations &&
										medicalAnalysis.specificRecommendations.length > 0 && (
											<div className='p-6 bg-card/70 rounded-xl border-2 border-border/60 shadow-lg'>
												<h4 className='text-xl font-bold mb-4 flex items-center gap-3'>
													<AlertCircle className='w-6 h-6 text-secondary' />
													{language === 'ar'
														? 'توصيات إضافية مخصصة حسب الأقسام'
														: 'Additional Section-Specific Recommendations'}
												</h4>
												<ul className='space-y-4'>
													{medicalAnalysis.specificRecommendations.map((rec, index) => (
														<li
															key={index}
															className='flex items-start gap-4 p-4 bg-card/50 rounded-lg border border-border/30'>
															<div className='w-3 h-3 rounded-full bg-secondary mt-1 flex-shrink-0' />
															<p className='text-base leading-relaxed flex-1'>{rec}</p>
														</li>
													))}
												</ul>
											</div>
										)}

									{/* Additional Information */}
									<div className='p-6 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 rounded-xl border-2 border-yellow-500/30'>
										<h4 className='text-lg font-bold mb-3 flex items-center gap-2'>
											<svg
												className='w-5 h-5 text-yellow-600 dark:text-yellow-400'
												fill='currentColor'
												viewBox='0 0 20 20'>
												<path
													fillRule='evenodd'
													d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
													clipRule='evenodd'
												/>
											</svg>
											{language === 'ar' ? 'معلومات مهمة' : 'Important Information'}
										</h4>
										<div className='space-y-2 text-sm text-foreground leading-relaxed'>
											<p>
												{language === 'ar'
													? '• هذا التحليل تم إنشاؤه تلقائياً بناءً على نتائج الاستبيان والذكاء الاصطناعي.'
													: '• This analysis was automatically generated based on survey results and artificial intelligence.'}
											</p>
											<p>
												{language === 'ar'
													? '• النتائج المذكورة هي تقييم أولي وليست تشخيصاً طبياً نهائياً.'
													: '• The mentioned results are a preliminary assessment and not a definitive medical diagnosis.'}
											</p>
											<p>
												{language === 'ar'
													? '• يُنصح بشدة بمراجعة طبيب أعصاب أو طبيب متخصص في أقرب وقت ممكن لإجراء فحص سريري شامل.'
													: '• It is strongly recommended to consult a neurologist or specialist as soon as possible for a comprehensive clinical examination.'}
											</p>
											<p>
												{language === 'ar'
													? '• القائمة أعلاه للأمراض المشتبه بها هي احتمالات فقط وتتطلب تأكيداً من خلال الفحوصات الطبية المتخصصة.'
													: '• The list of suspected conditions above are possibilities only and require confirmation through specialized medical tests.'}
											</p>
										</div>
									</div>
								</div>

								<div className='mt-8 p-5 bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg border-2 border-border/50'>
									<div className='flex items-start gap-3'>
										<svg
											className='w-5 h-5 text-secondary mt-0.5 flex-shrink-0'
											fill='currentColor'
											viewBox='0 0 20 20'>
											<path
												fillRule='evenodd'
												d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
												clipRule='evenodd'
											/>
										</svg>
										<p className='text-sm leading-relaxed text-foreground'>
											{language === 'ar'
												? 'هذا التقرير هو أداة مساعدة للتقييم الأولي ولا يغني عن الاستشارة الطبية المتخصصة. يُرجى مراجعة طبيب متخصص لتأكيد التشخيص والحصول على العلاج المناسب.'
												: 'This report is an aid for preliminary assessment and does not replace specialized medical consultation. Please consult a specialist to confirm the diagnosis and obtain appropriate treatment.'}
										</p>
									</div>
								</div>
							</Card>
						)}

						{/* Actions */}
						<div className='flex gap-4 pt-3 pb-16'>
							<Button
								onClick={() => navigate('/input')}
								variant='outline'
								className='flex-1 text-lg py-6'>
								{t('results.newAnalysis')}
							</Button>
							<Button
								onClick={() => navigate('/')}
								className='flex-1 text-lg py-6 font-bold'
								style={{
									background: 'var(--gradient-primary)',
									transition: 'var(--transition-smooth)',
								}}>
								{t('results.home')}
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
