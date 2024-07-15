import React, { type ReactNode } from "react";
import styles from "./attentionbox.module.css";

export enum BoxType {
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'danger',
  QUOTE = 'quote'
}

export function AttentionBox({
  children, boxtype
}: BoxProps) {
  let css;
  switch (boxtype) {
    case BoxType.INFO:
      css = styles.info;
      break;
    case BoxType.WARNING:
      css = styles.warning;
      break;
    case BoxType.DANGER:
      css = styles.danger;
      break;
    case BoxType.QUOTE:
      css = styles.quote;
      break;
  }
  return (
    <div className={ styles.padding }>
      <div
        className={`${styles.container} ${css} ${styles.border}`}
      >
        {children}
      </div>
    </div>
  );
}

export function Icon({ children }: Child ) {
  return (
    <div className={styles.icon}>
      {children}
    </div>
  )
}

export function Content({ children }: Child ) {
  return (
    <div className={styles.content}>
      {children}
    </div>
  )
}

export function Header({ children }: Child ) {
  return (
    <div className={styles.header}>
      {children}
    </div>
  )
}

export function Footer({ children }: Child ) {
  return (
    <div className={styles.footer}>
      {children}
    </div>
  )
}

interface BoxProps {
  children: ReactNode;
  boxtype: BoxType
}

interface Child {
  children: ReactNode
}
