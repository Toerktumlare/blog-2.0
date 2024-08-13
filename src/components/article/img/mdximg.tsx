import React from "react";
import styles from "./mdximg.module.css";

export default function MdxImg({ src, alt, width, height }: ImgProps) {
  const imgsrc = "./assets/" + src;
  return (
    <div className={styles.center}>
      <img src={imgsrc} alt={alt} width={width} height={height} />
    </div>
  );
}

interface ImgProps {
  src: string;
  alt?: string;
  width?: number,
  height?: number,
}
