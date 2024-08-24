import mdx from "@mdx-js/esbuild";
import esbuild from "esbuild";
import remarkFrontmatter from "remark-frontmatter";
import remarkImages from "remark-images";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkPrism from "remark-prism";
import { copyFile, ensureDirectoryExists, packArticles } from "./build/utils.mts";
import { copyAssetsPlugin } from "./build/plugins.mts";

const distDir = "dist";

ensureDirectoryExists(distDir);
copyFile('public/index.html', 'dist/index.html');
copyFile('public/favicon.ico', 'dist/favicon.ico');
copyFile('build/CNAME', 'dist/CNAME');
packArticles("./build");
const public_url = JSON.stringify(typeof process.env.PUBLIC_URL !== 'undefined' ? process.env.PUBLIC_URL : "");

(async () => {
  await esbuild.build({
    entryPoints: ["src/index.jsx"],
    target: "es6",
    outdir: distDir,
    logLevel: "info",
    bundle: true,
    splitting: true,
    minify: true,
    define: {
      "process.env.PUBLIC_URL": public_url
    },
    assetNames: "assets/[name]-[hash]",
    format: 'esm',
    loader: {
      ".tsx": "tsx",
      ".jpg": "file",
      ".png": "file",
      ".css": "css",
      ".mdx": "jsx",
      ".gif": "file",
    },
    plugins: [
      copyAssetsPlugin({ sourceDir: "src/content", outputDir: "dist/assets" }),
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
  })
})();