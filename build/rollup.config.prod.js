import { uglify } from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'umd',
    name: 'lxWx',
    sourcemap: true
  },
  plugins: [
    babel({
      exclude: "node_modules/**"
    }),
    uglify()
  ]
};