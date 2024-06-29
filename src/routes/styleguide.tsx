import React from "react";
import BlogCard from "../components/cards/blogcard";
import { Tags } from "../utils/tags";

function Styleguide() {
  return (
    <div>
      <h1>Header 1</h1>
      <h2>Header 2</h2>
      <h3>Header 3</h3>
      <h4>Header 4</h4>
      <h5>Header 5</h5>
      <h6>Header 6</h6>
      <hr />
      <p>This is some example text in a paragraph</p>
      <hr />
      <a href="#">http://www.example.com</a>
      <hr />
      <b>This is some bold text</b>
      <br />
      <i>This is some italics</i>
      <br />
      <u>This is some underscored text</u>
      <br />
      <s>This is some strikethrough text</s>
      <br />
      <BlogCard
        header="Some BlogBost"
        date={new Date(Date.now())}
        body="Some body of some blogpost"
        tags={[Tags.Java, Tags.Rust]}
      />
    </div>
  );
}

export default Styleguide;
