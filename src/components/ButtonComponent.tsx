import React from "react";
import { ButtonProps } from "@/utils/interface";
import Image from "next/image";
import loadingLoader from "@/components/LoadingLoader";

function ButtonComponent({
  container,
  type,
  onClick,
  onClickBookmark,
  isBookmarked,
  icon,
  isFullWidth = false,
  isDisabled = false,
  isSubmit = false,
  isLoading = false,
}: ButtonProps) {
  switch (type) {
    case "ButtonBorder":
      return (
        <button
          type={isSubmit ? "button" : "submit"}
          className="border font-semibold border-neutral-900 rounded-xl py-2 px-6 hover:bg-blue-500 hover:border-blue-500 hover:text-white "
          onClick={onClick}
        >
          {container}
        </button>
      );
    case "ButtonBorderCustom":
      return (
        <button
          className="h-fit w-full p-3 border border-neutral-900 font-semibold rounded-xl hover:bg-blue-500 hover:border-blue-500"
          onClick={onClick}
        >
          {container}
        </button>
      );

    case "ButtonText":
      return (
        <button
          className="py-2 font-semibold hover:text-blue-500"
          onClick={onClick}
        >
          {container}
        </button>
      );

    case "ButtonSearch":
      return (
        <button
          className="h-fit w-fit p-3 border border-white font-semibold bg-blue-500 rounded-xl hover:bg-blue-500"
          onClick={onClick}
        >
          <Image src="/search.svg" alt="Search Icon" width={20} height={20} />
        </button>
      );
    case "ButtonFilled":
      return (
        <button
          disabled={isDisabled}
          className={`h-fit flex items-center justify-center ${isFullWidth ? `w-full` : `w-fit`} p-3 border text-white border-white font-semibold ${isDisabled ? `bg-neutral-400` : `bg-blue-500 hover:bg-blue-800`}  rounded-xl `}
          onClick={onClick}
        >
          {(isLoading as boolean) ? loadingLoader() : container}
        </button>
      );
    case "ButtonFilledCustom":
      return (
        <button
          className="h-fit w-full p-3 border text-white border-white font-semibold bg-blue-500 rounded-xl hover:bg-blue-500"
          onClick={onClick}
        >
          {container}
        </button>
      );
    case "ButtonBookmark":
      return (
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onClickBookmark?.(e);
          }}
        >
          <Image
            src={
              isBookmarked
                ? "/Bookmark_Fill_Icon.svg"
                : "/Bookmark_Line_Icon.svg"
            }
            alt={
              isBookmarked ? "Bookmark Filled Icon" : "Bookmark Unfilled Icon"
            }
            width={24}
            height={24}
            className={isBookmarked ? "text-blue-500" : "text-neutral-500"}
          />
        </button>
      );
    case "ButtonSocial":
      return (
        <button
          className="flex items-center border border-white bg-white rounded-xl py-2 px-6 gap-4 hover:bg-blue-500 hover:border-blue-500 hover:text-white w-42 justify-center"
          onClick={onClick}
        >
          {icon && (
            <Image
              src={icon}
              alt={`${container} icon`}
              width={24}
              height={24}
              className="w-6 h-6"
              loading="lazy"
            />
          )}
          <span className="truncate">{container}</span>
        </button>
      );

    default:
      return (
        <button className="border rounded-xl py-2 px-4" onClick={onClick}>
          {container}
        </button>
      );
  }
}

export default ButtonComponent;
