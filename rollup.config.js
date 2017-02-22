import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript';
import latestTypescript from 'typescript';

export default {
  entry: 'source/AnchorScroller.ts',
  targets: [
    { format: 'es', dest: 'distribution/AnchorScroller.es.js' },
    { format: 'cjs', dest: 'distribution/AnchorScroller.cjs.js' },
    { format: 'umd', dest: 'distribution/AnchorScroller.js' }
  ],
  moduleName: 'AnchorScroller',
  sourceMap: true,
  exports: 'default',
  plugins: [
    typescript({
      typescript: latestTypescript
    }),
    babel({
      babelrc: false,
      presets: [
        'babili'
      ]
    })
  ]
}