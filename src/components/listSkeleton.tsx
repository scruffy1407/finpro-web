import React from "react";

interface ListSkeletonProp {
  numberItem: number;
  ListItemComponent: React.FC;
  className?: string; // Add className prop to the interface
  setShrink?: boolean;
}

function ListSkeleton({
  numberItem,
  ListItemComponent,
  className,
  setShrink,
}: ListSkeletonProp) {
  return (
    <div className={`${className}`}>
      {Array.from({ length: numberItem }).map((_, index) => (
        <div
          key={index}
          className={`${setShrink ? "flex-shrink-0 w-fit snap-start bg-white rounded-xl hover:shadow-lg  lg:w-full" : ""}`}
        >
          <ListItemComponent key={index} />
        </div>
      ))}
    </div>
  );
}

export default ListSkeleton;
