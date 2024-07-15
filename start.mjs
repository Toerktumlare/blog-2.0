import * as esbuild from "esbuild";
import fs from 'node:fs';
import mdx from '@mdx-js/esbuild'
import { compile } from '@mdx-js/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkImages from 'remark-images';
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import matter from 'gray-matter';
import remarkPrism from 'remark-prism';
import path from "path";

const env = process.env.NODE_ENV || "development";

fs.copyFile("public/index.html", "dist/index.html", (err) => {
  if (err) {
    console.log("Error Found:", err);
  }
});

const preProcessMdxFrontmatterPlugin = {
  name: "mdx-with-frontmatter",
  setup(build) {
    build.onResolve()
    build.onLoad(
      {
        filter: /\.mdx?$/,
      },
      async (args) => {
        const source = await fs.promises.readFile(args.path, "utf8");
        const { content, data: frontmatter } = matter(source);

        const mdx = await compile(content, { providerImportSource: "@mdx-js/react" });

        const frontmatterExport = `export const frontmatter = ${JSON.stringify(frontmatter)}`
        const contents = `${frontmatterExport}\n${mdx}`;
          
        return {
          contents,
          loader: "tsx",
        };
      },
    );
  },
};

function copyAssetsPlugin({ sourceDir, outputDir }) {
  return {
    name: 'copy-assets',
    setup(build) {
      build.onStart(() => {
        // Function to copy files recursively
        const copyFilesRecursively = (srcDir, destDir) => {
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }

          const items = fs.readdirSync(srcDir);

          items.forEach(item => {
            const srcPath = path.join(srcDir, item);
            const destPath = path.join(outputDir, item);
            const stat = fs.statSync(srcPath);

            // console.log(item);
            // console.log(srcDir);
            // console.log(destDir);

            if (stat.isDirectory()) {
              copyFilesRecursively(srcPath, destPath);
            } else {
              const ext = path.extname(item).toLowerCase();
              if (['.png', '.jpg', '.jpeg', '.gif', '.svg'].includes(ext)) {
                fs.copyFileSync(srcPath, destPath);
              }
            }
          });
        };

        // Ensure the output directory exists
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        // Copy image files recursively from sourceDir to outputDir
        copyFilesRecursively(sourceDir, outputDir);
      });
    }
  };
}

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
        remarkPrism,
        remarkFrontmatter,
        remarkMdxFrontmatter,
        remarkImages,
      ]
    })
  ]
});

await ctx.watch();

let { _host, _port } = await ctx.serve({
  servedir: "dist/",
  fallback: `dist/index.html`,
});

