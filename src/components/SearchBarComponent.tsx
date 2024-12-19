import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ButtonComponent from "./ButtonComponent";
import AsyncSelect from "react-select/async";
import { LocationOptionReal } from "@/utils/interface";
import { useState, useEffect } from "react";
import { getCategories, searchLocation } from "@/pages/api/api";

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    borderRadius: "12px",
    padding: "1px", // Adjust the value for the border radius
    borderColor: "rgb(228 228 261)",
  }),
};

export interface SearchBarProps {
  onSearch: (searchParams: {
    jobTitle: string;
    categoryId: string;
    jobType: string;
    dateRange: string;
    sortOrder: string;
    companyCity: string;
  }) => void;
}

export interface CategoriesReal {
  categoryId: string;
  category_name: string;
}

function SearchBarComponent({ onSearch }: SearchBarProps) {
  const [jobTitle, setJobTitle] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [category, setCategory] = useState<CategoriesReal[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true); // Loading state for categories
  const [jobType, setJobType] = useState<string>("");
  const [dateRange, setDateRange] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [locations, setLocations] = useState<LocationOptionReal[]>([]); // Holds all locations (provinces and cities)
  const [companyCity, setCompanyCity] = useState<string>("");

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch locations on mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await searchLocation(); // Pass an empty string to get all locations
        console.log(response.data.data);
        setLocations(
          response.data.data.map((location: any) => ({
            label: location.name,
            value: location.city_id,
          }))
        );
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);

  // Handle search
  const handleSearch = () => {
    const clearLocation = () => {
      setCompanyCity(""); // Reset companyCity to empty
    };

    console.log("companyCity before search:", companyCity); // This should log the correct city name.

    const searchParams = {
      jobTitle,
      categoryId: categoryId === "all" ? "" : categoryId, // If "all" is selected, pass an empty string
      jobType,
      dateRange,
      sortOrder,
      companyCity,
    };
    console.log("Search Parameters:", searchParams); // This will help you debug
    onSearch(searchParams);
    clearLocation();
  };

  // Combined loadOptions for city search
  const loadOptions = (inputValue: string) => {
    return new Promise<LocationOptionReal[]>((resolve) => {
      setTimeout(() => {
        const filteredCities = locations.filter((location) =>
          location.label.toLowerCase().includes(inputValue.toLowerCase())
        );
        resolve(filteredCities);
      }, 500); // Simulate async loading
    });
  };

  useEffect(() => {
    if (companyCity) {
      console.log("companyCity has been updated to:", companyCity);
    }
  }, [companyCity]); // This hook will run when companyCity changes

  // Handle location changes
  const handleLocationChange = (selectedOption: any) => {
    if (selectedOption) {
      setCompanyCity(selectedOption.label); // Set the cityName
    } else {
      setCompanyCity(""); // Reset if nothing is selected
    }
    console.log("Selected Location:", selectedOption);
  };

  return (
    <div className="flex flex-col md:flex md:flex-row gap-5 items-center md:items-end mt-2">
      <div className="w-full">
        <Label className="font-semibold text-neutral-950" htmlFor="position">
          Position :
        </Label>
        <Input
          className="rounded-xl text-sm w-full"
          id="position"
          type="text"
          placeholder="Ex : Web Developer"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>
      <div className="w-full">
        <Label className="font-semibold text-neutral-950" htmlFor="position">
          Job Category :
        </Label>
        <Select onValueChange={setCategoryId}>
          <SelectTrigger className=" w-full rounded-xl text-sm">
            <div className="text-neutral-500">
              <SelectValue placeholder="Select Job Category" />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all">All categories</SelectItem>
            {/* Dynamically generate SelectItem for each category */}
            {category.length > 0 ? (
              category.map((categoryItem, index) => (
                <SelectItem
                  key={categoryItem.categoryId}
                  value={`${index + 1}`}
                >
                  {categoryItem.category_name} {/* Display category name */}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-categories" disabled>
                No categories available
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full rounded-xl z-50">
        <Label className="font-semibold text-neutral-950" htmlFor="location">
          Location :
        </Label>
        <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={loadOptions} // Load cities based on search term
          placeholder="Search Location"
          className="w-full text-sm"
          styles={customStyles} // Apply custom styles here
          value={
            companyCity ? { label: companyCity, value: companyCity } : null
          } // Set to null if location is cleared
          onChange={handleLocationChange}
        />
      </div>
      <div className="hidden md:w-[33%] md:block">
        <ButtonComponent onClick={handleSearch} type="ButtonSearch" />
      </div>
      <div className="block w-full md:hidden md:w-[15%] mt-0">
        <ButtonComponent
          type="ButtonFilledCustom"
          container="search"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
}

export default SearchBarComponent;
