import React from "react";
import BlogCard from "../components/cards/blogcard";
import { Tags } from "../utils/tags";
import "../global.css";
import ListWrapper, { Spacing } from "../components/listWrapper/listwrapper";
import styles from "./root.module.css"
import { frontmatter } from "./../content/monad-in-java/index.mdx"

export default function Root() {
  const blogList = [
    <BlogCard
      header={ frontmatter.title }
      path="/monad-in-java"
      date={new Date(frontmatter.date)}
      body={frontmatter.description}
      tags={[Tags.Java, Tags.Rust]}
      className="pb50"
    />,
    <BlogCard
      header="Write a DNS client in rust"
      date={new Date(Date.now())}
      body={ frontmatter.sometext}
      tags={[Tags.Java, Tags.Rust]}
      className="pb50"
    />,
    <BlogCard
      header="CVE 2023-1234"
      date={new Date(Date.now())}
      body="This is a super dangerous cve"
      tags={[Tags.Networking, Tags.Dns]}
      className="pb50"
    />,
    <BlogCard
      header="Some BlogBost"
      date={new Date(Date.now())}
      body="Some thing"
      tags={[Tags.Jwt]}
      className="pt50"
    />,
  ];

  
  return (
    <main className={ styles.container }>
      <ListWrapper spacing={Spacing.Large} className="pt100" items={blogList} />;
    </main>
  )
}
