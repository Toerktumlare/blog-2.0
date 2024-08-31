import React from "react";
import BlogCard from "../components/cards/blogcard.tsx";
import ListWrapper, {
  Spacing,
} from "../components/listWrapper/listwrapper.tsx";
import articles from "../content/articles.tsx";
import { Article } from "../content/types.tsx";
import "../global.css";

export default function Root() {
  articles.sort((a: Article, b: Article) => {
    return (
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    );
  });

  const blogList = articles.map((f) => {
    return (
      <BlogCard
        header={f.metadata.title}
        path={f.path}
        date={new Date(f.metadata.date)}
        body={f.metadata.description}
        tags={f.metadata.tags}
      />
    );
  });

  return (
    <main>
      <ListWrapper spacing={Spacing.Large} className="pt100" items={blogList} />
    </main>
  );
}
