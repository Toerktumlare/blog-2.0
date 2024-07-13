import React, { type ReactElement, type ReactNode } from 'react';
import styles from './h1.module.css'

// export default function({ children }: H1props) {
//   return (
//     <h1 className={ styles.margin }>{ children }</h1>
//   )
// }

const foobar = ({ children }: H1props) => {
  return (
    <h1 className={ styles.margin }>{ children }</h1>
  )
}

export default foobar;

interface H1props {
  children?: ReactNode
}


