import React from "react";
import SearchBarCompanyListComponent from "./SearchBarCompanyListComponent";

interface SearchProps {
  handleSearch: () => void;
}
function HeroCompanyListComponent({ handleSearch }: SearchProps) {
  return (
    <div className="w-full bg-white rounded-xl px-4 md:px-0">
      <div className="flex flex-col md:pl-8 py-6 md:gap-11 ">
        <h1 className="font-bold text-2xl md:text-4xl ">Explore Companies</h1>
        <div className="w-full">
          <SearchBarCompanyListComponent handleSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
}

export default HeroCompanyListComponent;
