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

const env = process.env.NODE_ENV || "development";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = path.join(__dirname, "dist");

ensureDirectoryExists(distDir);
copyFile('public/intex.html', 'dist/index.html');
packArticles("./build");

(async () => {
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

  await ctx.watch();

  let { host, port } = await ctx.serve({
    servedir: "dist/",
    fallback: `dist/index.html`,
  });
})();

