import React from "react";
import styles from "./mdximg.module.css";

export default function MdxImg({ src, alt }: ImgProps) {
  const imgsrc = "./assets/" + src;
  return (
    <div className={styles.center}>
      <img src={imgsrc} alt={alt} />
    </div>
  );
}

interface ImgProps {
  src?: string;
  alt?: string;
}
