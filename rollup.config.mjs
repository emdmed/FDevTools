import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

import packageJson from './package.json' assert { type: 'json' };

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    postcss({
      extensions: ['.css'],
      inject: false, // Set to false to extract CSS to a separate file
      extract: 'styles.css', // Extract CSS into dist/styles.css
      minimize: true, // Minify CSS
      plugins: [
        tailwindcss({
          config: './tailwind.config.js', // Ensure Tailwind uses the correct config
        }),
        autoprefixer(),
      ],
    }),
  ],
  external: ['react', 'react-dom'], // Exclude React and ReactDOM
};
