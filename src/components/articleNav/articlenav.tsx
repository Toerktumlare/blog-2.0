import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./articlenav.module.css"

export default function ArticleNav({ next, prev }: ArticleNavProps) {
  const nextComponent = next ? <NextNavButton text={next.text} path={next.path} /> : <NextNavButton />

  const prevComponent = prev ? <PrevNavButton text={prev.text} path={prev.path} /> : <PrevNavButton />

  return (
    <div className={styles.content}>
      
      {prevComponent}
      {nextComponent}
    </div>
  )
}

interface ArticleNavProps {
  next?: {
    text: string,
    path: string
  },
  prev?: {
    text: string,
    path: string
  }
}

function NextNavButton({ text, path }: NavButtonProps) {
  return (
    <ArticleNavButton className={styles.buttonNext} buttonText='Next >>' text={text} path={path} />
  )
}

function PrevNavButton({ text, path }: NavButtonProps) {
  return (
    <ArticleNavButton className={styles.buttonPrev} buttonText='<< Prev' text={text} path={path} />
  )
}

interface NavButtonProps {
  text?: string,
  path?: string,
  isVisible?: boolean,
}

function ArticleNavButton({className, buttonText, text, path }: ArticleNavButtonProps) {
  return (
    <div className={`${styles.buttonContent} ${className} ${(text || path) ? '' : styles.hidden}`}>
      <div className='mb10'>
        <Link to={"../" + path}>{buttonText}</Link>
      </div>
      <div>
        {text}
      </div>
    </div>
  )
}

interface ArticleNavButtonProps {
  className: string,
  buttonText: string,
  text?: string,
  path?: string,
}