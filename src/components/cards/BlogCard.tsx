import React from "react"
import { Tags } from "../../utils/tags"

function BlogCard({ header, date, body, tags }: BlogCardProps) {
  
  const tagList = (<ul>
    {tags.map((tag, i) =>
      <li key={i}>
        #{tag}
      </li>
    )}
  </ul>)

  return (
    <div>
      <h3>{header}</h3>
      <h6>{date.toISOString()}</h6>
      <h4>{body}</h4>
      {tagList}
    </div>
  )
}

interface BlogCardProps {
  header: string,
  date: Date,
  body: string,
  tags: Tags[],
}

export default BlogCard