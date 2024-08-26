import React from "react";
import { Link } from "react-router-dom";
import "../../global.css";
import Tag from "../tag/tag.tsx";
import styles from "./blogcard.module.css";

function BlogCard({
  header,
  date,
  body,
  tags,
  className,
  path,
}: BlogCardProps) {
  const tagList = (
    <ul className={styles.none}>
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
      <header className="pb10">
        <h3>
          <Link to={path}>{header}</Link>
        </h3>
      </header>
      <section className="pb15">
        <div className={styles.date}>{d}</div>
      </section>
      <footer className="pb30">{tagList}</footer>
      <section>
        <p>{body}</p>
      </section>
    </article>
  );
}

interface BlogCardProps {
  header: string;
  path: string;
  date: Date;
  body: string;
  tags: string[];
  className?: string;
}

export default BlogCard;
