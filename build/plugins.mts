import fs from 'fs';
import path from 'path';
import { PluginBuild } from "esbuild";
import { ensureDirectoryExists, ensureDirectoryExistsFromFile, removeFirstDirectory } from './utils.mts';

export function copyAssetsPlugin({ sourceDir, outputDir }: any) {
  return {
    name: "copy-assets",
    setup(build: PluginBuild) {
      build.onStart(() => {
        const copyFilesRecursively = (srcDir: string, destDir: string) => {
          ensureDirectoryExistsFromFile(outputDir)

          const items = fs.readdirSync(srcDir);

          items.forEach((item: any) => {
            const relativDest = srcDir.replace(sourceDir, "");

            const srcPath = path.join(srcDir, item);
            const destPath = path.join(
              outputDir,
              removeFirstDirectory(relativDest),
              item,
            );
            const stat = fs.statSync(srcPath);

            if (stat.isDirectory()) {
              copyFilesRecursively(srcPath, destPath);
            } else {
              const ext = path.extname(item).toLowerCase();
              if ([".png", ".jpg", ".jpeg", ".gif", ".svg"].includes(ext)) {
                ensureDirectoryExistsFromFile(destPath);

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
    },
  };
}
