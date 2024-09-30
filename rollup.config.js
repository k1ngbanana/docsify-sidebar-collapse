import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/docsify-sidebar-collapse.js",
      format: "iife",
    },
    {
      file: "dist/docsify-sidebar-collapse-min.js",
      format: "iife",
      plugins: [terser()],
    },
  ],
  plugins: [
    babel({
      exclude: "node_modules/**", // 只编译我们的源代码
    }),
  ],
};
