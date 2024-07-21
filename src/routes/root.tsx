import React from "react";
import BlogCard from "../components/cards/blogcard";
import { Tags } from "../utils/tags";
import "../global.css";
import ListWrapper, { Spacing } from "../components/listWrapper/listwrapper";
import styles from "./root.module.css";
import { frontmatter as monad } from "./../content/monad-in-java/index.mdx";
import { frontmatter as base64 } from "./../content/base64-in-rust/index.mdx";
import { frontmatter as cve } from "./../content/cve-2020-0601/index.mdx";
import { frontmatter as dnsAnatomy } from "./../content/anatomy-of-dns/index.mdx";
import { frontmatter as dnsCompression } from "./../content/dns-compression/index.mdx";

interface Frontmatter {
  title: string,
  path: string,
  date: string,
  description: string,
  tags: [Tags]
}


export default function Root() {
  const list: Frontmatter[] = [
    monad, base64, cve, dnsAnatomy, dnsCompression
  ];

  list.sort((a: Frontmatter, b: Frontmatter) => {
    return Math.abs(new Date(a.date).getTime() - new Date(b.date).getTime());
  })

  const blogList = list.map((f) => {
    return (<BlogCard
      header={f.title}
      path={f.path}
      date={new Date(f.date)}
      body={f.description}
      tags={[Tags.Java, Tags.Rust]}
      className="pb50"
    />)
  })

  return (
    <main className={styles.container}>
      <ListWrapper spacing={Spacing.Large} className="pt100" items={blogList} />
    </main>
  );
}
