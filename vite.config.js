import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

const config = {
	plugins: [tailwindcss(), sveltekit()],
	// server: {
	// 	port: 3000,
	// 	strictPort: false,
	// },
	preview: {
		port: 3000,
		strictPort: false,
	},
};

export default config;
