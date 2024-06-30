import React from "react";
import { Tags } from "../../utils/tags";
import styles from "./blogcard.module.css";
import "../../global.css";
import Tag from "../tag/tag";

function BlogCard({ header, date, body, tags, className }: BlogCardProps) {
  const tagList = (
    <ul>
      {tags.map((tagText, i) => (
        <li key={i}>
          <Tag text={tagText} />
        </li>
      ))}
    </ul>
  );

  let d = date.toLocaleString("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className={`${className} ${styles.container}`}>
      <header className="pb20">
        <h3>{header}</h3>
      </header>
      <section className="pb20">
        <p className={styles.date}>{d}</p>
      </section>
      <section className="pb20">
        <p>{body}</p>
      </section>
      <footer>
        {tagList}
      </footer>
    </article>
  );
}

interface BlogCardProps {
  header: string;
  date: Date;
  body: string;
  tags: Tags[];
  className?: string
}

export default BlogCard;
