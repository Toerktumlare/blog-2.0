import * as esbuild from "esbuild";
import fs from 'node:fs';
import mdx from '@mdx-js/esbuild'
import { compile } from '@mdx-js/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import matter from 'gray-matter';
import remarkPrism from 'remark-prism';

const env = process.env.NODE_ENV || "development";

fs.copyFile("public/index.html", "dist/index.html", (err) => {
  if (err) {
    console.log("Error Found:", err);
  }
});

const preProcessMdxFrontmatterPlugin = {
  name: "mdx-with-frontmatter",
  setup(build) {
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
    ".mdx": "jsx",
  },
  plugins: [
    mdx({
      remarkPlugins: [
        remarkPrism,
        remarkFrontmatter,
        remarkMdxFrontmatter,
      ]
    })
  ]
});

await ctx.watch();

let { _host, _port } = await ctx.serve({
  servedir: "dist/",
  fallback: `dist/index.html`,
});

