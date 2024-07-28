import React, { type ReactNode } from "react";
import { ArticleHeader } from "../header/articleHeader";
import type { frontmatter } from "../../../frontmatter-types";

type ArticleProps = {
  frontmatter: frontmatter
  children: ReactNode
}

export function Article({ header, date, tags, children }:ArticleProps) {
  return (
    <article>
      <ArticleHeader header={header} date={date} tags={tags} />
      { children }
    </article>
  )

}