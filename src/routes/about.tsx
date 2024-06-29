import React from "react";
import City from "../images/city.jpg";
import "../global.css";
import styles from "./about.module.css"
import StackOverflow from "../components/stackOverflow/StackOverflow";

export default function About() {
  return (
    <div className={`${styles.row} pt75 pb50`}>
      <div className={styles.image}>
        <img src={City} alt="Logo" className={`${ styles.rounded_corners} flex1`} />
      </div>
      <div className={`${styles.column} flex1`}>
        <p>Coder by day, coder by night.</p>
        <p>
          +10 years development experience. I work at one of Scandinavia's
          leading software security companies. I'm a mediocre programmer that
          likes to understand how things work. Here i will mostly write about
          things i find interesting.
        </p>
        <StackOverflow />
      </div>
    </div>
  );
}
