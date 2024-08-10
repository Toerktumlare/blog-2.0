import { ReactNode } from "react"

export type Metadata = {
  title: string
  path: string,
  description: string,
  tags: string[],
  date: string,
}

export type Article = {
  path: string,
  content: ReactNode,
  metadata: Metadata,
} 
