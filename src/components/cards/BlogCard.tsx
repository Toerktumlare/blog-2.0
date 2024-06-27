import React from "react";
import { Tags } from "../../utils/tags";
import styles from "./blogcard.module.css";
import "../../global.css";

function BlogCard({ header, date, body, tags }: BlogCardProps) {
  const tagList = (
    <ul>
      {tags.map((tag, i) => (
        <li key={i}>#{tag}</li>
      ))}
    </ul>
  );

  let d = date.toLocaleString("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="mt50">
      <h3 className="mt20 mb10">{header}</h3>
      <h6 className={`${styles.white} ${styles.gray} mt10`}>{d}</h6>
      <p className="mt10">{body}</p>
      {tagList}
    </div>
  );
}

interface BlogCardProps {
  header: string;
  date: Date;
  body: string;
  tags: Tags[];
}

export default BlogCard;
