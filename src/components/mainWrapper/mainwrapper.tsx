import React, { ReactNode } from "react";
import styles from "./mainwrapper.module.css"

export default function MainWrapper({
  children
}: MainWrapperProps) {
  return (
    <div className={styles.outerMargin}>
      {children}
    </div>
  );
}

interface MainWrapperProps {
  children: ReactNode
}
