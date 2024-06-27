import * as esbuild from "esbuild";
import fs from "fs";

await esbuild.build({
  entryPoints: ["src/index.jsx"],
  outfile: "dist/bundle.js",
  logLevel: "info",
  bundle: true,
  sourcemap: "inline",
  define: { "process.env.NODE_ENV": '"production"' },
});

fs.copyFile("public/index.html", "dist/index.html", (err) => {
  if (err) {
    console.log("Error Found:", err);
  }
});
