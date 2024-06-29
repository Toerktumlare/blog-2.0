import React from "react";
import BlogCard from "../components/cards/blogcard";
import { Tags } from "../utils/tags";
import "../global.css";
import ListWrapper, { Spacing } from "../components/listWrapper/listwrapper";
import styles from "./root.module.css"

export default function Root() {
  const blogList = [
    <BlogCard
      header="Compression in DNS messages"
      date={new Date(Date.now())}
      body='When writing my DNS client "Who are you?" i had no idea that there was compression built into DNS messages. This blog post will explain how compression in DNS messages work and how i went about solving it.'
      tags={[Tags.Java, Tags.Rust]}
      className="pb50"
    />,
    <BlogCard
      header="Write a DNS client in rust"
      date={new Date(Date.now())}
      body="Omg so you want to build a DNS a client, yay!"
      tags={[Tags.Java, Tags.Rust]}
      className="pt50"
    />,
    <BlogCard
      header="CVE 2023-1234"
      date={new Date(Date.now())}
      body="This is a super dangerous cve"
      tags={[Tags.Networking, Tags.Dns]}
      className="pt50"
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
