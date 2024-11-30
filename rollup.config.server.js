import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json'; // Import the JSON plugin

export default {
  input: 'src/codeMonger/index.js', // Entry point for the server
  output: {
    file: 'dist/codeMonger/index.cjs',
    format: 'cjs', // CommonJS format for Node.js
  },
  plugins: [
    resolve({
      preferBuiltins: true, // Prefer Node.js built-ins
    }),
    commonjs(), // Convert CommonJS modules to ES modules
    json(), // Handle JSON imports
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      ignore: [/node_modules\/@babel\/parser/], // Ignore large files
    }),
  ],
  external: ['fs', 'path'], // Exclude only built-in Node.js modules
};
