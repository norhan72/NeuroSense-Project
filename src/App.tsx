import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ThemeToggle } from '@/components/ThemeToggle';
import { NeuralBackground } from '@/components/NeuralBackground';
const Home = lazy(() => import('./pages/Home'));
const Input = lazy(() => import('./pages/Input'));
const VoiceAnalysis = lazy(() => import('./pages/VoiceAnalysis'));
const DisabilityTest = lazy(() => import('./pages/DisabilityTest'));
const EarlyDetectionTest = lazy(() => import('./pages/EarlyDetectionTest'));
const VisualCognitive = lazy(() => import('./pages/VisualCognitive'));
const ResultsPage = lazy(() => import('./pages/ResultsPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Navigation = lazy(() => import('./components/Navigation'));
import { UserDataProvider } from './contexts/UserContext';
const TotalResult = lazy(() => import('./pages/TotalResult'));

const App = () => (
	<TooltipProvider>
		<UserDataProvider>
			<Toaster />
			<Sonner />
			<NeuralBackground />
			<LanguageToggle />
			<ThemeToggle />
			<BrowserRouter>
				<Suspense fallback={<div className='w-full h-screen flex items-center justify-center'>Loading...</div>}>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/input' element={<Input />} />
						<Route path='/image-analysis' element={<VisualCognitive />} />
						<Route path='/voice-analysis' element={<VoiceAnalysis />} />
						<Route path='/disability-test' element={<DisabilityTest />} />
						<Route path='/early-detection' element={<EarlyDetectionTest />} />
						<Route path='/survey-results' element={<ResultsPage />} />
						<Route path='/results' element={<TotalResult />} />
						{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
						<Route path='*' element={<NotFound />} />
					</Routes>
					<Navigation />
				</Suspense>
			</BrowserRouter>
		</UserDataProvider>
	</TooltipProvider>
);

export default App;
