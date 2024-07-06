import * as esbuild from "esbuild";
import fs from "fs";

await esbuild.build({
  entryPoints: ["src/index.jsx"],
  outfile: "dist/bundle.js",
  logLevel: "info",
  bundle: true,
  sourcemap: "inline",
  define: { "process.env.NODE_ENV": '"production"' },
  assetNames: "assets/[name]-[hash]",
  loader: {
    ".tsx": "tsx",
    ".jpg": "file",
    ".css": "css",
  },
});

fs.copyFile("public/index.html", "dist/index.html", (err) => {
  if (err) {
    console.log("Error Found:", err);
  }
});
