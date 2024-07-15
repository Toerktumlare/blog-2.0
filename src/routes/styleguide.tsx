import React from "react";
import BlogCard from "../components/cards/blogcard";
import { Tags } from "../utils/tags";
import { DangerBox } from "../components/boxes/DangerBox";
import WarningBox from "../components/boxes/WarningBox";
import InfoBox from "../components/boxes/InfoBox";
import Blockquote from "../components/boxes/blockquote/blockquote";

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
    <hr />
    <br />
    <h3>Boxes</h3>
    <br />
    <br />
    <Blockquote source="Mark Twain">
      The more people i meet, the more i like my dogs.
    </Blockquote>
    <br />
    <InfoBox>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </InfoBox>
    <br />
    <WarningBox>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </WarningBox>
    <br />
    <DangerBox>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </DangerBox>
    </div>
  );
}

export default Styleguide;
