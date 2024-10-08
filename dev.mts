import mdx from "@mdx-js/esbuild";
import esbuild from "esbuild";
import remarkFrontmatter from "remark-frontmatter";
import remarkImages from "remark-images";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkPrism from "remark-prism";
import { copyFile, ensureDirectoryExists, packArticles } from "./build/utils.mts";
import { copyAssetsPlugin } from "./build/plugins.mts";
import path from "path";

const distDir = "dist";
const sourceDir = "src";
const assetsDir = path.join(distDir, "assets");
const contentDir = path.join(sourceDir, "content");
const entryPoint = path.join(sourceDir, "index.jsx");
const fallback = path.join(distDir, "index.html");
const loglevel = "info";
const public_url = JSON.stringify(typeof process.env.PUBLIC_URL !== 'undefined' ? process.env.PUBLIC_URL : "");

ensureDirectoryExists(distDir);
copyFile('public/index.html', 'dist/index.html');
copyFile('public/favicon.ico', 'dist/favicon.ico');
packArticles("./build");


(async () => {
  let ctx = await esbuild.context({
    entryPoints: [entryPoint],
    platform: 'browser',
    outdir: distDir,
    logLevel: loglevel,
    bundle: true,
    sourcemap: "inline",
    define: {
      'process.env.PUBLIC_URL': public_url,
    },
    assetNames: "assets/[name]-[hash]",
    loader: {
      ".tsx": "tsx",
      ".jpg": "file",
      ".png": "file",
      ".css": "css",
      ".mdx": "jsx",
      ".gif": "file",
    },
    plugins: [
      copyAssetsPlugin({ sourceDir: contentDir, outputDir: assetsDir }),
      mdx({
        providerImportSource: "@mdx-js/react",
        remarkPlugins: [
          remarkPrism as any,
          remarkFrontmatter,
          remarkMdxFrontmatter,
          remarkImages,
        ],
      }),
    ],
  });

  await ctx.watch();

  let { host, port } = await ctx.serve({
    servedir: distDir,
    fallback: fallback,
  });
})();

