import mdx from "@mdx-js/esbuild";
import esbuild from "esbuild";
import path, { dirname } from "path";
import remarkFrontmatter from "remark-frontmatter";
import remarkImages from "remark-images";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkPrism from "remark-prism";
import { fileURLToPath } from "url";
import { copyFile, ensureDirectoryExists, packArticles } from "./build/utils.mts";
import { copyAssetsPlugin } from "./build/plugins.mts";

const env = "production";
const distDir = "dist";

console.log("===== Running ======")
ensureDirectoryExists(distDir);
copyFile('public/index.html', 'dist/index.html');
copyFile('public/favicon.ico', 'dist/favicon.ico');
packArticles("./build");

esbuild.build({
    entryPoints: ["src/index.jsx"],
    outdir: distDir,
    logLevel: "info",
    bundle: true,
    // splitting: true,
    minify: true,
    define: { "process.env.NODE_ENV": JSON.stringify(env) },
    assetNames: "assets/[name]-[hash]",
    format: 'esm',
    loader: {
      ".tsx": "tsx",
      ".jpg": "file",
      ".png": "file",
      ".css": "css",
      ".mdx": "jsx",
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
        rehypePlugins: [],
      }),
    ],
});