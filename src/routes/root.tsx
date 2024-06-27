import React from "react";
import ListWrapper from "../components/listWrapper/ListWrapper";
import BlogCard from "../components/cards/BlogCard";
import { Tags } from "../utils/tags";
import "../global.css";

export default function Root() {
  const blogList = [
    <BlogCard
      header="Spring Security"
      date={new Date(Date.now())}
      body="This contains an amazing blogpost about spring security"
      tags={[Tags.Java, Tags.Rust]}
    />,
    <BlogCard
      header="Write a DNS client in rust"
      date={new Date(Date.now())}
      body="Omg so you want to build a DNS a client, yay!"
      tags={[Tags.Java, Tags.Rust]}
    />,
    <BlogCard
      header="CVE 2023-1234"
      date={new Date(Date.now())}
      body="This is a super dangerous cve"
      tags={[Tags.Networking, Tags.Dns]}
    />,
    <BlogCard
      header="Some BlogBost"
      date={new Date(Date.now())}
      body="Some thing"
      tags={[Tags.Jwt]}
    />,
  ];
  return <ListWrapper className="mt100" items={blogList} />;
}
