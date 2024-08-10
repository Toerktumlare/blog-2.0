import React from "react";
import Tag from "../../tag/tag.tsx";
import styles from "./articleHeader.module.css"

type HeaderProps = {
  header: string,
  date: Date,
  tags: string[],
}

export function ArticleHeader({ header, date, tags }: HeaderProps) {

  let d = date.toLocaleString("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className={styles.content}>
      <h1>
        {header}
      </h1>
      <div className={styles.date}>
        {d}
      </div>
      <div className={styles.tags}>
      {tags.map((t) => {
        return <Tag text={t} />
      })}
      </div>
    </header>
  )
}