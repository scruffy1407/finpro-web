import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const BurgerIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userRole = useSelector((state: RootState) => state.login.user_role);

  // Dynamic color based on user role
  const burgerColor = userRole === "company" ? "bg-white" : "bg-black";

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <button
      className="relative w-8 h-8 flex flex-col justify-between items-center group"
      onClick={toggleMenu}
      aria-label="Toggle menu"
    >
      {/* Top line */}
      <span
        className={`block w-full h-1 ${burgerColor} rounded transition-transform duration-300 ${
          isOpen ? "rotate-45 translate-y-2.5" : "rotate-0"
        }`}
      ></span>

      {/* Middle line (hidden when open) */}
      <span
        className={`block w-full h-1 ${burgerColor} rounded transition-opacity duration-300 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      ></span>

      {/* Bottom line */}
      <span
        className={`block w-full h-1 ${burgerColor} rounded transition-transform duration-300 ${
          isOpen ? "-rotate-45 -translate-y-2.5" : "rotate-0"
        }`}
      ></span>
    </button>
  );
};

export default BurgerIcon;
