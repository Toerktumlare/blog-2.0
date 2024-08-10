import React from "react";
import BlogCard from "../components/cards/blogcard.tsx";
import { Tags } from "../utils/tags.ts";
import "../global.css";
import ListWrapper, {
  Spacing,
} from "../components/listWrapper/listwrapper.tsx";
import styles from "./root.module.css";
import articles from "../content/articles.tsx";
import { Metadata } from "../content/types.tsx";

export default function Root() {
  const list = articles.map((article) => {
    return article.metadata;
  });

  list.sort((a: Metadata, b: Metadata) => {
    return Math.abs(new Date(a.date).getTime() - new Date(b.date).getTime());
  });

  const blogList = list.map((f) => {
    return (
      <BlogCard
        header={f.title}
        path={f.path}
        date={new Date(f.date)}
        body={f.description}
        tags={[Tags.Java, Tags.Rust]}
        className="pb50"
      />
    );
  });

  return (
    <main className={styles.container}>
      <ListWrapper spacing={Spacing.Large} className="pt100" items={blogList} />
    </main>
  );
}
