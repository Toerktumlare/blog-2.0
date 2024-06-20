import * as React from "react"
import styles from "./layoutWrapper.module.css";

export default function LayoutWrapper({ children }: LayoutWrapperProps ) {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  )
}

interface LayoutWrapperProps {
    children: React.ReactElement;
}
