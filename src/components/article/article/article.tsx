import React, { type ReactNode } from "react";
import { ArticleHeader } from "../header/articleHeader.tsx";
import type { Frontmatter } from "../../../frontmatter-types.ts";

type ArticleProps = {
  frontmatter: Frontmatter
  children: ReactNode
}

export function Article(articleProps: ArticleProps) {
  const { title, date, tags } = articleProps.frontmatter;
  return (
    <article>
      <ArticleHeader header={title} date={new Date(date)} tags={tags} />
      { articleProps.children }
    </article>
  )

}