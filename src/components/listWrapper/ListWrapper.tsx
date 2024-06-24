import React from 'react'

export default function ListWrapper({ items }: ListWrapperProps) {
  const listItems = items.map((value, i) => <li key={i}>{value}</li>);
  return (
    <ul>
      {listItems}
    </ul>
  )
}

interface ListWrapperProps {
  items: React.ReactElement[]
}