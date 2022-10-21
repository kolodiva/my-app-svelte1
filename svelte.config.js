//import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
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

	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;
