import React from "react";
import "../../global.css";
import styles from "./tag.module.css";

export default function Tag({ text }: TagProps) {
  return (
    <div className={styles.container}>
      <p>#{text}</p>
    </div>
  );
}

interface TagProps {
  text: string;
}
