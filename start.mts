import esbuild, { PluginBuild } from 'esbuild';
import mdx from '@mdx-js/esbuild';
import remarkFrontmatter from 'remark-frontmatter';
import remarkImages from 'remark-images';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkPrism from 'remark-prism';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import crypto from 'crypto';
import mustache from 'mustache';

const env = process.env.NODE_ENV || "development";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dir = path.join(__dirname, 'dist');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

fs.copyFile("public/index.html", "dist/index.html", (err: any) => {
  if (err) {
    console.log("Error Found:", err);
  }
});

packArticlesPlugin('./build');

function copyAssetsPlugin({ sourceDir, outputDir }: any) {
  return {
    name: 'copy-assets',
    setup(build: PluginBuild) {
      build.onStart(() => {
        const copyFilesRecursively = (srcDir: string, destDir: string) => {
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }

          const items = fs.readdirSync(srcDir);

          items.forEach((item: any) => {
            const srcPath = path.join(srcDir, item);
            const destPath = path.join(outputDir, item);
            const stat = fs.statSync(srcPath);

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

const getFolderNamesInDirectory = (dir: string) => {
  return fs.readdirSync(dir).filter((item: any) => {
    const itemPath = path.join(dir, item);
    return fs.statSync(itemPath).isDirectory();
  });
};

function packArticlesPlugin(buildDir: string) {
  const cacheFilePath = path.join(buildDir, '.cache');
  const contentDirPath = path.join('src', 'content');
  const generatedDirPath = path.relative(buildDir, path.join('src', 'generated'));

  // Check and create .cache file if it does not exist
  if (!fs.existsSync(cacheFilePath)) {
    fs.writeFileSync(cacheFilePath, '');
  }

  // Read folder names in src/content
  if (fs.existsSync(contentDirPath)) {
    const folderNames = fs.readdirSync(contentDirPath).filter(file => {
      return fs.statSync(path.join(contentDirPath, file)).isDirectory();
    });

    // Sort the folder names
    const sortedFolderNames = folderNames.sort();

    // Create a string from the sorted folder names
    const folderNamesString = sortedFolderNames.join(',');

    // Generate a hash from the folder names string
    const newHash = crypto.createHash('sha256').update(folderNamesString).digest('hex');

    // Read existing hash from the cache file
    const existingHash = fs.readFileSync(cacheFilePath, 'utf-8').trim();

    // Check the existing hash and perform actions accordingly
    if (!existingHash) {
      // If there is no content in the cache file, write the new hash to it
      console.log('.cache file is empty. Writing new hash.');
      fs.writeFileSync(cacheFilePath, newHash);
    } else if (existingHash !== newHash) {
      // If the hash is different, replace the content with the new hash
      console.log('Hash in .cache file is different. Updating it.');
      fs.writeFileSync(cacheFilePath, newHash);
    } else {
      // If the hash is the same, exit the plugin early
      console.log('Hash in .cache file is the same. Exiting plugin.');
      // return;
    }

    // Read relative paths to each index.mdx file in src/content subdirectories
    const mdxPaths = sortedFolderNames.map(folder => {
      const indexPath = path.join(contentDirPath, folder, 'index.mdx');
      if (fs.existsSync(indexPath)) {
        return "./" + path.relative(contentDirPath, indexPath);
      }
      return null;
    }).filter(Boolean); // Remove null values

    console.log('Relative paths to index.mdx files:', mdxPaths);

    const data = folderNames.map((f, i) => {
      return {
        folder_name: f,
        content: generateRandomIdentifier(24),
        frontmatter: generateRandomIdentifier(24),
        index_path: mdxPaths[i],
      }
    });

    const templateFilePath = path.join(buildDir, 'article_template.mustache');
    const outputFilePath = path.join(contentDirPath, 'articles.tsx');
    
    fs.readFile(templateFilePath, 'utf-8', (err, template) => {
      if (err) {
        return console.error('Error reading the template file:', err);
      }
      const renderedOutput = mustache.render(template, { articles: data });

      // Write the rendered output to a file
      fs.writeFile(outputFilePath, renderedOutput, (err) => {
        if (err) {
          return console.error('Error writing the output file:', err);
        }
        console.log('Rendered output written to', outputFilePath);
      });

      console.log('Articles data', data);
    });

  } else {
    console.log('The src/content directory does not exist.');
  }

}

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
        rehypePlugins: [
        ]
      }),
    ]
  });

  await ctx.watch();

  let { host, port } = await ctx.serve({
    servedir: "dist/",
    fallback: `dist/index.html`,
  });
})();

function generateRandomIdentifier(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
  }
  return result.charAt(0).toUpperCase() + result.slice(1);
}
