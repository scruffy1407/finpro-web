import React from "react";

export interface ModalProps {
  title: string; // Added title prop
  children: React.ReactNode; // Added children prop for modal body content
}
interface ModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

import Overlay from "@/components/overlay";

function ModalContainer({
  title,
  isOpen,
  onClose,
  children,
}: ModalContainerProps) {
  return (
    <>
      {isOpen ? (
        <>
          <Overlay />
          <div
            id="generic-modal"
            tabIndex={isOpen ? -1 : 99}
            aria-hidden={isOpen ? "false" : "true"}
            className={`${
              isOpen ? "block" : "hidden"
            } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full bg-gray-950 bg-opacity-50`}
          >
            <div className="relative w-full md:max-w-xl h-full md:p-4 md:mx-auto ">
              {/* */}
              <div className="absolute px-6 py-8 w-full flex flex-col gap-6 bg-white rounded-tl-2xl rounded-tr-2xl shadow bottom-0 md:relative md:rounded-2xl ">
                {/* */}
                <div className="flex items-center justify-between rounded-t ">
                  <h3 className="text-xl font-bold text-gray-900 ">{title}</h3>{" "}
                  {/* Replaced static title with dynamic prop */}
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="generic-modal"
                    onClick={onClose}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* */}
                {children}
                {/* Replaced FormWorkingExperience with children prop */}
                {/* */}
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default ModalContainer;
