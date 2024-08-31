import React, { type ReactNode } from "react";
import type { Frontmatter } from "../../../frontmatter-types.ts";
import { ArticleHeader } from "../header/articleHeader.tsx";
import styles from "./article.module.css";
import ArticleNav from "../../articleNav/articlenav.tsx";

type ArticleProps = {
  currentArticle: Frontmatter;
  children: ReactNode;
  prevArticle?: {
    text: string
    path: string
  };
  nextArticle?: {
    text: string,
    path: string,
  };
};

export function Article(articleProps: ArticleProps) {
  const { title, date, tags } = articleProps.currentArticle;
  return (
    <article style={styles}>
      <ArticleHeader header={title} date={new Date(date)} tags={tags} />
      {articleProps.children}
      <hr className="mb20"/>
      <ArticleNav next={articleProps.nextArticle} prev={articleProps.prevArticle}/>
    </article>
  );
}
