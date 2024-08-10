import React from "react";
import BlogCard from "../components/cards/blogcard.tsx";
import { Tags } from "../utils/tags.ts";
import "../global.css";
import ListWrapper, {
  Spacing,
} from "../components/listWrapper/listwrapper.tsx";
import styles from "./root.module.css";
import articles from "../content/articles.tsx";
import { Article, Metadata } from "../content/types.tsx";

export default function Root() {

  articles.sort((a: Article, b: Article) => {
    return Math.abs(new Date(a.metadata.date).getTime() - new Date(b.metadata.date).getTime());
  });

  const blogList = articles.map((f) => {
    return (
      <BlogCard
        header={f.metadata.title}
        path={f.path}
        date={new Date(f.metadata.date)}
        body={f.metadata.description}
        tags={f.metadata.tags}
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
