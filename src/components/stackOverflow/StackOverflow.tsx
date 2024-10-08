import React from "react";
import "../../global.css";
import styles from "./stackoverflow.module.css";

export default function StackOverflow() {
  return (
    <div className={styles.container}>
      <a href="https://stackexchange.com/users/2064278">
        <img
          src="https://stackexchange.com/users/flair/2064278.png?theme=dark"
          width="208"
          height="58"
          alt="profile for Toerktumlare on Stack Exchange, a network of free, community-driven Q&amp;A sites"
          title="profile for Toerktumlare on Stack Exchange, a network of free, community-driven Q&amp;A sites"
        />
      </a>
    </div>
  );
}
