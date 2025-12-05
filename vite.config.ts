import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
	server: {
		host: '::',
		port: 8080,
		// Vite expects hostnames (no scheme). Add the ngrok host here so the dev server accepts requests from it.
		allowedHosts: ['untensely-pilose-dorian.ngrok-free.dev', 'unflawed-arvilla-unacquiescently.ngrok-free.dev'],
	},
	plugins: [react(), mode === 'development' && componentTagger()].filter(Boolean),
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
}));
