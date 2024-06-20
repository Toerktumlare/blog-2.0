import * as React from "react"
import styles from "./main.module.css";

export default function Main({ children }: MainProps) {

  return (
    <div className={styles.main}>
      {children}
    </div>
  )
}

interface MainProps {
  children: React.ReactElement;
}
