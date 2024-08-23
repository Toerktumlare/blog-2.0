import React, { type ReactNode } from "react";
import type { Frontmatter } from "../../../frontmatter-types.ts";
import { ArticleHeader } from "../header/articleHeader.tsx";
import styles from "./article.module.css";

type ArticleProps = {
  frontmatter: Frontmatter;
  children: ReactNode;
};

export function Article(articleProps: ArticleProps) {
  const { title, date, tags } = articleProps.frontmatter;
  return (
    <article style={styles}>
      <ArticleHeader header={title} date={new Date(date)} tags={tags} />
      {articleProps.children}
    </article>
  );
}
