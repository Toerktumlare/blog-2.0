import React from "react";

export default function ListWrapper({ items, className }: ListWrapperProps) {
  const listItems = items.map((value, i) => <li key={i}>{value}</li>);
  return (
    <div className={className}>
      <ul>{listItems}</ul>
    </div>
  );
}

interface ListWrapperProps {
  className?: string;
  items: React.ReactElement[];
}
