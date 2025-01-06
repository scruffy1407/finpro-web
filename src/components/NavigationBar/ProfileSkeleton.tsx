import React from "react";

function ProfileSkeleton() {
  return (
    <div className="hidden md:flex md:items-center md:h-[36px] md:w-56 md:bg-neutral-100 rounded-2xl animate-pulse"></div>
  );
}

export default ProfileSkeleton;
