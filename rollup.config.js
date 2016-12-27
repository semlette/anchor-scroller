import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript';
import latestTypescript from 'typescript';

const format = process.env.FORMAT;

export default {
  entry: `${__dirname}/source/AnchorScroller.ts`,
  dest: `${__dirname}/distribution/AnchorScroller${ process.env.FORMAT === 'umd' ? '' : `.${format}` }.js`,
  moduleName: 'AnchorScroller',
  format,
  sourceMap: true,
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