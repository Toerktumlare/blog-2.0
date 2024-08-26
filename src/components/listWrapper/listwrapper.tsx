import React from "react";
// import styles from "./listwrapper.module.css"

export default function ListWrapper({
  items,
  className,
  spacing,
}: ListWrapperProps) {
  let spacingClass: string;
  switch (spacing) {
    case Spacing.Small:
      spacingClass = ".pb15";
      break;
    case Spacing.Large:
      spacingClass = "pb50";
      break;
    default:
      spacingClass = ".pb100";
      break;
  }
  const listItems = items.map((value, i) => <li className="pb130" key={i}>{value}</li>);
  return (
    <div className={className}>
      <ol className={`pl0 pr0`}>{listItems}</ol>
    </div>
  );
}

interface ListWrapperProps {
  className?: string;
  items: React.ReactElement[];
  spacing: Spacing;
}

export enum Spacing {
  Small,
  Medium,
  Large,
}
