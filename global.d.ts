declare module "*.module.css";
declare module "*.jpg";
declare module "virtual:articles";
declare module "*.mdx" {
  export const frontmatter: {
    title: string,
    path: string,
    date: string,
    description: string,
    tags: string[]
  }
};
