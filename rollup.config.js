import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [{
    format: 'umd',
    name: 'BigTest.Mocha',
    globals: { mocha: 'mocha' },
    file: pkg.main
  }, {
    format: 'es',
    file: pkg.module
  }],
  external: ['mocha'],
  plugins: [
    resolve(),
    babel({
      babelrc: false,
      comments: false,
      presets: [
        ['@babel/env', {
          modules: false
        }]
      ]
    })
  ]
};
