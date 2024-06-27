import React from "react";
import City from "../images/city.jpg";
import StackOverflow from "../components/stackOverflow/StackOverflow";

export default function About() {
  return (
    <div>
      <img src={City} alt="Logo" />
      <div>
        <p>Coder by day, coder by night.</p>
        <p>
          +10 years development experience. I work at one of Scandinavia's
          leading software security companies. I'm a mediocre programmer that
          likes to understand how things work. Here i will mostly write about
          things i find interesting.
        </p>
      </div>
      <StackOverflow />
    </div>
  );
}
