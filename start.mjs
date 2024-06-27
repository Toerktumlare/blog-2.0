import * as esbuild from "esbuild";
import fs from "fs";

const env = process.env.NODE_ENV || "development";

fs.copyFile("public/index.html", "dist/index.html", (err) => {
  if (err) {
    console.log("Error Found:", err);
  }
});

let ctx = await esbuild.context({
  entryPoints: ["src/index.jsx"],
  outfile: "dist/bundle.js",
  logLevel: "info",
  bundle: true,
  sourcemap: "inline",
  define: { "process.env.NODE_ENV": JSON.stringify(env) },
  assetNames: "assets/[name]-[hash]",
  loader: {
    ".tsx": "tsx",
    ".jpg": "file",
    ".css": "css",
  },
});

await ctx.watch();

let { host, port } = await ctx.serve({
  servedir: "dist/",
  fallback: `dist/index.html`,
});
