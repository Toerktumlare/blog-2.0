import React, { type ReactElement, type ReactNode } from 'react';
import styles from './h1.module.css'

export function h1({ children }: H1props) {
  return (
    <h1 className={ styles.margin }>{ children }</h1>
  )
}

interface H1props {
  children?: ReactNode
}


