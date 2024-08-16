import path from "path";
import fs from "fs";
import crypto from "crypto";
import mustache from "mustache";

export function ensureDirectoryExistsFromFile(filePath: string) {
  const dir = path.dirname(filePath);
  ensureDirectoryExists(dir);
};

export function ensureDirectoryExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export function packArticles(buildDir: string) {
  const cacheFilePath = path.join(buildDir, ".cache");
  const contentDirPath = path.join("src", "content");

  // Check and create .cache file if it does not exist
  if (!fs.existsSync(cacheFilePath)) {
    fs.writeFileSync(cacheFilePath, "");
  }

  // Read folder names in src/content
  if (fs.existsSync(contentDirPath)) {
    const folderNames = fs.readdirSync(contentDirPath).filter((file) => {
      return fs.statSync(path.join(contentDirPath, file)).isDirectory();
    });

    // Sort the folder names
    const sortedFolderNames = folderNames.sort();

    // Create a string from the sorted folder names
    const folderNamesString = sortedFolderNames.join(",");

    // Generate a hash from the folder names string
    const newHash = crypto
      .createHash("sha256")
      .update(folderNamesString)
      .digest("hex");

    // Read existing hash from the cache file
    const existingHash = fs.readFileSync(cacheFilePath, "utf-8").trim();

    // Check the existing hash and perform actions accordingly
    if (!existingHash) {
      // If there is no content in the cache file, write the new hash to it
      console.log(".cache file is empty. Writing new hash.");
      fs.writeFileSync(cacheFilePath, newHash);
    } else if (existingHash !== newHash) {
      // If the hash is different, replace the content with the new hash
      console.log("Hash in .cache file is different. Updating it.");
      fs.writeFileSync(cacheFilePath, newHash);
    } else {
      // If the hash is the same, exit the plugin early
      console.log(
        "Hash in .cache file is the same. No need to generate new file. Exiting plugin.",
      );
      // return;
    }

    // Read relative paths to each index.mdx file in src/content subdirectories
    const mdxPaths = sortedFolderNames
      .map((folder) => {
        const indexPath = path.join(contentDirPath, folder, "index.mdx");
        if (fs.existsSync(indexPath)) {
          return "./" + path.relative(contentDirPath, indexPath);
        }
        return null;
      })
      .filter(Boolean); // Remove null values

    console.log("Relative paths to index.mdx files:", mdxPaths);

    const data = folderNames.map((f, i) => {
      return {
        folder_name: f,
        content: generateRandomIdentifier(24),
        frontmatter: generateRandomIdentifier(24),
        index_path: mdxPaths[i],
      };
    });

    const templateFilePath = path.join(buildDir, "article_template.mustache");
    const outputFilePath = path.join(contentDirPath, "articles.tsx");

    fs.readFile(templateFilePath, "utf-8", (err, template) => {
      if (err) {
        return console.error("Error reading the template file:", err);
      }
      const renderedOutput = mustache.render(template, { articles: data });

      // Write the rendered output to a file
      fs.writeFile(outputFilePath, renderedOutput, (err) => {
        if (err) {
          return console.error("Error writing the output file:", err);
        }
        console.log("Rendered output written to", outputFilePath);
      });

      console.log("Articles data", data);
    });
  } else {
    console.log("The src/content directory does not exist.");
  }
}

export function removeFirstDirectory(filePath: string) {
  if (filePath.startsWith("/")) {
    filePath = filePath.slice(1);
  }

  // Normalize the path to ensure consistent formatting
  const normalizedPath = path.normalize(filePath);

  // Split the path into its components
  const parts = normalizedPath.split(path.sep);

  // Check if there are enough parts to remove the first directory
  if (parts.length < 1) {
    return filePath;
  }

  // Remove the first directory and reassemble the path
  const newPath = path.join(...parts.slice(1));

  return newPath;
};

export function generateRandomIdentifier(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export function copyFile(start: string, dest: string) {
  fs.copyFile(start, dest, (err: any) => {
    if (err) {
      console.log("Error Found:", err);
    }
  });
}
