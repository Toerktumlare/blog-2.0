import React from "react";
import "../../global.css";
import styles from "./footer.module.css";

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={`${className}`}>
      <p className={`${styles.small} ${styles.text} ${styles.bold}`}>
        © {new Date().getFullYear()}, Built by{" "}
        <a href="http://www.github.com/toerktumlare">toerktumlare</a>
      </p>
    </footer>
  );
}

interface FooterProps {
  className?: string;
}
