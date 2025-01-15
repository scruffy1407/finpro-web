import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ButtonComponent from "./ButtonComponent";
import AsyncSelect from "react-select/async";
import { locationOptions } from "@/utils/datadummy";
import { LocationOption, LocationOptionReal } from "@/utils/interface";
import { searchLocation } from "@/pages/api/api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setCompanySearch } from "@/store/slices/companySearchSlice";

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    borderRadius: "10px",
    padding: "1px", // Adjust the value for the border radius
  }),
};
// data.ts

interface SearchProps {
  handleSearch: () => void;
}

function SearchBarCompanyListComponent({ handleSearch }: SearchProps) {
  const dispatch = useDispatch<AppDispatch>(); // Use dispatch to send actions to Redux store
  const [locations, setLocations] = useState<LocationOptionReal[]>([]);
  const { companyName } = useSelector(
    (state: RootState) => state.companySearch,
  );

  const fetchLocations = async () => {
    try {
      const response = await searchLocation();
      setLocations(
        response.data.data.map((location: any) => ({
          label: location.name,
          value: location.city_id,
        })),
      );
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  // Handle location changes
  const handleLocationChange = (selectedOption: any) => {
    if (selectedOption) {
      dispatch(
        setCompanySearch({
          companyCity: selectedOption.label,
        }),
      );
    } else {
      dispatch(
        setCompanySearch({
          companyCity: "",
        }),
      );
    }
  };

  // Combined loadOptions for city search
  const loadOptions = (inputValue: string) => {
    return new Promise<LocationOptionReal[]>((resolve) => {
      setTimeout(() => {
        const filteredCities = locations.filter((location) =>
          location.label.toLowerCase().includes(inputValue.toLowerCase()),
        );
        resolve(filteredCities);
      }, 500);
    });
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className=" flex flex-col md:flex md:flex-row gap-5 items-center md:items-end ">
      <div className="w-full md:w-[45%]">
        <Label className="font-semibold text-neutral-950" htmlFor="position">
          Company Name :{" "}
        </Label>
        <Input
          className="rounded-xl "
          id="position"
          type="text"
          placeholder="Ex : Tokopedia"
          value={companyName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
              setCompanySearch({
                companyName: e.target.value,
              }),
            );
          }}
        />
      </div>
      <div className="w-full md:w-[45%] rounded-xl">
        <Label className="font-semibold text-neutral-950" htmlFor="location">
          All Location :{" "}
        </Label>
        <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={loadOptions}
          placeholder="Search Location"
          styles={customStyles} // Apply custom styles here
          onChange={handleLocationChange}
          isClearable={true}
        />
      </div>
      <div className="hidden md:w-[10%] md:block">
        <ButtonComponent onClick={handleSearch} type="ButtonSearch" />
      </div>
      <div className="block w-full md:hidden md:w-[15%] mt-0">
        <ButtonComponent
          onClick={handleSearch}
          type="ButtonFilledCustom"
          container="search"
        />
      </div>
    </div>
  );
}

export default SearchBarCompanyListComponent;
