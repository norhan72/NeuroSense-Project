import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import VisualCognitiveTest from '@/components/VisualCognitive';

const VisualCognitivePage = () => {
	const { t } = useLanguage();

	return (
		<div className='min-h-screen flex items-center justify-center p-6'>
			<Card className='w-full max-w-md p-8 bg-card/50 backdrop-blur-lg border-border/50'>
				<h2 className='text-2xl font-bold mb-6 text-center'>{t('vision.title')}</h2>
				<VisualCognitiveTest />
			</Card>
		</div>
	);
};

export default VisualCognitivePage;
