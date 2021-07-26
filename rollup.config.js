import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import marked from 'marked';

import { dmath, dmath_block, quote_dmath_html, macro_convert } from './src/rollup_preprocess.js';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

marked.use({ extensions: [dmath, dmath_block] });

const defaultPlugins = [
  svelte({
    extensions: ['.svelte', '.md'],
    preprocess: [
      { 
        markup: ({ content, filename }) => {
          // console.log(`Processing ${filename}\n\n\n`);
          if (filename.slice(-2) == 'md') {
            content = macro_convert(content);
            // console.log('After macro_convert');
            // console.log(content);

            content = marked(content);
            // console.log('After marked');
            // console.log(content);

          } else {
            content = quote_dmath_html(content);
            /*
            if (filename == 'src/KernelHeatmap.svelte') { 
              console.log('After quote_dmath_html');
              console.log(content);
            }
            */
          }

          return { code: content };
        }
      }
    ],
    compilerOptions: {
      // enable run-time checks when not in production
      dev: !production
    }
  }),
  // we'll extract any component CSS out into
  // a separate file - better for performance
  css({ output: 'bundle.css' }),

  // If you have external dependencies installed from
  // npm, you'll most likely need these plugins. In
  // some cases you'll need additional configuration -
  // consult the documentation for details:
  // https://github.com/rollup/plugins/tree/master/packages/commonjs
  resolve({
    browser: true,
    dedupe: ['svelte']
  }),
  commonjs(),

  // In dev mode, call `npm run start` once
  // the bundle has been generated
  !production && serve(),

  // Watch the `public` directory and refresh the
  // browser on changes when not in production
  !production && livereload('public'),

  // If we're building for production (npm run build
  // instead of npm run dev), minify
  production && terser()
];

export default [
  {
    input: 'src/main.js',
    output: {
      sourcemap: true,
      format: 'iife',
      name: 'app',
      file: 'public/build/bundle.js'
    },
    plugins: defaultPlugins,
    watch: {
      clearScreen: false
    }
  }
];

