import babel from "rollup-plugin-babel";
import typescript from "rollup-plugin-typescript2";
import latestTypescript from "typescript";

export default {
  input: "source/AnchorScroller.ts",
  output: [
    { format: "es", file: "distribution/AnchorScroller.es.js" },
    { format: "cjs", file: "distribution/AnchorScroller.cjs.js" },
    { format: "umd", file: "distribution/AnchorScroller.js", name: "AnchorScroller", },
  ],
  name: "AnchorScroller",
  sourcemap: true,
  exports: "default",
  plugins: [
    typescript({
      typescript: latestTypescript,
      importHelers: false,
    }),
    babel({
      babelrc: false,
      presets: ["minify"],
    }),
  ],
};
