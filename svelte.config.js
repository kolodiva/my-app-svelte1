import adapter from '@sveltejs/adapter-auto';
//import adapter from '@sveltejs/adapter-node'
//import preprocess from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/kit/vite';

const config = {
	onwarn: (warning, handler) => {
	    if (warning.code.startsWith('a11y-')) {
	      return;
	    }
	    handler(warning);
	  },
	kit: {
		adapter: adapter(),
		serviceWorker: {
    	register: false,
  	}
	},
	preprocess: vitePreprocess()
};

export default config;
