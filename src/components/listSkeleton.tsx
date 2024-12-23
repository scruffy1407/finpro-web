import React from "react";

interface ListSkeletonProp {
  numberItem: number;
  ListItemComponent: React.FC;
  className?: string; // Add className prop to the interface
}

function ListSkeleton({
  numberItem,
  ListItemComponent,
  className,
}: ListSkeletonProp) {
  return (
    <div className={`${className}`}>
      {Array.from({ length: numberItem }).map((_, index) => (
        <ListItemComponent key={index} />
      ))}
    </div>
  );
}

export default ListSkeleton;
