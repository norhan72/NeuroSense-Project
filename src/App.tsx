import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ThemeToggle } from '@/components/ThemeToggle';
import { NeuralBackground } from '@/components/NeuralBackground';
import Home from './pages/Home';
import Input from './pages/Input';
import Index from './pages/Index';
import VoiceAnalysis from './pages/VoiceAnalysis';
import DisabilityTest from './pages/DisabilityTest';
import EarlyDetectionTest from './pages/EarlyDetectionTest';
import VisualCognitive from './pages/VisualCognitive';
import ResultsPage from './pages/ResultsPage';
import NotFound from './pages/NotFound';
import { Navigation } from './components/Navigation';
import { UserDataProvider } from './contexts/UserContext';

// const queryClient = new QueryClient();

const App = () => (
	// <QueryClientProvider client={queryClient}>
	<TooltipProvider>
		<UserDataProvider>
			<Toaster />
			<Sonner />
			<NeuralBackground />
			<LanguageToggle />
			<ThemeToggle />
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/input' element={<Input />} />
					{/* <Route path='/index' element={<Index />} /> */}
					<Route path='/voice-analysis' element={<VoiceAnalysis />} />
					<Route path='/disability-test' element={<DisabilityTest />} />
					<Route path='/early-detection' element={<EarlyDetectionTest />} />
					<Route path='/image-analysis' element={<VisualCognitive />} />
					<Route path='/results' element={<ResultsPage />} />
					{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
					<Route path='*' element={<NotFound />} />
				</Routes>
				<Navigation />
			</BrowserRouter>
		</UserDataProvider>
	</TooltipProvider>
	// </QueryClientProvider>
);

export default App;
