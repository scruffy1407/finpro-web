import React, { useState, useEffect } from "react";
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
import { getCategories, searchLocation } from "@/pages/api/api";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/store/slices/searchQuerySlice"; // Import the action

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    borderRadius: "12px",
    padding: "1px", // Adjust the value for the border radius
    borderColor: "rgb(228 228 261)",
  }),
};

interface SearchBarProps {
  onSearch: (searchParams: {
    jobTitle?: string;
    categoryId?: string;
    companyCity?: string;
  }) => void;
}

export interface CategoriesReal {
  categoryId: string;
  category_name: string;
}

function SearchBarComponent({ onSearch }: SearchBarProps) {
  const dispatch = useDispatch<AppDispatch>(); // Use dispatch to send actions to Redux store
  const searchQuery = useSelector((state: RootState) => state.searchQuery); // Access current search query state from Redux
  const { categoryId, companyCity, jobTitle, jobType } = searchQuery;

  const [category, setCategory] = useState<CategoriesReal[]>([]);
  const [locations, setLocations] = useState<LocationOptionReal[]>([]);

  // Local state for input values
  const [localJobTitle, setLocalJobTitle] = useState<string>(jobTitle || "");
  const [localCategoryId, setLocalCategoryId] = useState<string>(categoryId || "");
  const [localCompanyCity, setLocalCompanyCity] = useState<string>(companyCity || "");

  // Fetch categories and locations on mount
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

    const fetchLocations = async () => {
      try {
        const response = await searchLocation();
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

  // Dispatch updates to Redux store
  const dispatchUpdate = (updatedValues: { [key: string]: string }) => {
    dispatch(setSearchQuery({ ...searchQuery, ...updatedValues }));
  };

  // Handle search
  const handleSearch = () => {
    const searchParams = {
      jobTitle: localJobTitle,
      categoryId: localCategoryId === "all" ? "" : localCategoryId,
      companyCity: localCompanyCity,
      jobType: jobType, // Preserve the current jobType value
    };
    onSearch(searchParams);

    // Update Redux store with the new search query
    dispatchUpdate({ jobTitle: localJobTitle, categoryId: localCategoryId, companyCity: localCompanyCity });
  };

  // Handle location changes
  const handleLocationChange = (selectedOption: any) => {
    if (selectedOption) {
      setLocalCompanyCity(selectedOption.label);
      dispatchUpdate({ companyCity: selectedOption.label });
    } else {
      setLocalCompanyCity("");
      dispatchUpdate({ companyCity: "" });
    }
  };

  // Combined loadOptions for city search
  const loadOptions = (inputValue: string) => {
    return new Promise<LocationOptionReal[]>((resolve) => {
      setTimeout(() => {
        const filteredCities = locations.filter((location) =>
          location.label.toLowerCase().includes(inputValue.toLowerCase())
        );
        resolve(filteredCities);
      }, 500);
    });
  };

  return (
    <div className="flex flex-col md:flex md:flex-row gap-5 items-center md:items-end mt-2">
      <div className="w-full md:w-[35%]">
        <Label className="font-semibold text-neutral-950" htmlFor="position">
          Position :{" "}
        </Label>
        <Input
          className="rounded-xl "
          id="position"
          type="text"
          placeholder="Ex : Web Developer"
          value={localJobTitle}
          onChange={(e) => setLocalJobTitle(e.target.value)}
        />
      </div>

      <div className="w-full md:w-[40%]">
        <Label className="font-semibold text-neutral-950" htmlFor="position">
          Job Category :{" "}
        </Label>
        <Select
          value={localCategoryId}
          onValueChange={(value) => setLocalCategoryId(value)}
        >
          <SelectTrigger className="w-full md:w-full rounded-xl">
            <div className="text-slate-500">
              <SelectValue placeholder="Select Job Category" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {category.length > 0 ? (
              category.map((categoryItem, index) => (
                <SelectItem key={categoryItem.categoryId} value={`${index + 1}`}>
                  {categoryItem.category_name}
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

      <div className="w-full md:w-[35%] rounded-xl">
        <Label className="font-semibold text-neutral-950" htmlFor="location">
          Location :{" "}
        </Label>
        <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={loadOptions} // Load cities based on search term
          placeholder="Search Location"
          styles={customStyles} // Apply custom styles here
          value={companyCity ? { label: companyCity, value: companyCity } : null} // Set to null if location is cleared
          onChange={handleLocationChange}
          isClearable={true}
        />
      </div>

      <div className="hidden md:w-[15%] md:block">
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
