import React, { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LocationOption } from "@/utils/interface";
import {
  CityItem,
  CompanyGeneralInfo,
  locationList,
  ProvinceItem,
  CompanyIndustry,
  CompanySize,
} from "@/models/auth.model";
import Cookies from "js-cookie";
import { ProfileHandler } from "@/utils/profile.utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import Select, { SingleValue } from "react-select";
import { LocationHandler } from "@/utils/location.utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { updateName, updatePhone } from "@/store/slices/authSlice";
import LoadingLoader from "@/components/LoadingLoader";
import GeneralInfoSectionSkeleton from "@/components/Profile/JobHunter/GeneralInfoSkeleton";

type SelectOption = {
  value: string;
  label: string;
};

function CompanyGeneralInfoSection() {
  const profileHandler = new ProfileHandler();
  const locationHandler = new LocationHandler();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const initialLoading = useRef(true);

  const dispatch = useDispatch<AppDispatch>();
  const [listProvince, setListProvince] = useState<locationList[]>([]);
  const [listCity, setListCity] = useState<locationList[]>([]);
  const [isDisable, setDisable] = useState<boolean>(true);
  const [isLoading, setLoading] = useState(false);
  const accessToken = Cookies.get("accessToken");

  const [formGeneralInfo, setFormGeneralInfo] = useState<CompanyGeneralInfo>({
    companyId: "",
    company_name: "",
    phone_number: "",
    address_details: "",
    company_description: "",
    company_city: "",
    company_province: "",
    company_industry: "",
    company_size: "",
    provinceId: undefined,
    cityId: undefined,
  });

  const companyIndustryOptions = Object.entries(CompanyIndustry).map(
    ([key, value]) => ({
      label: key.replace(/([A-Z])/g, " $1").trim(),
      value,
    })
  );

  const companySizeOptions = Object.entries(CompanySize).map(
    ([key, value]) => ({
      label: key.replace(/([A-Z])/g, " $1").trim(),
      value,
    })
  );

  async function handleGetGeneralInfo() {
    try {
      const response = await profileHandler.getProfileCompany(
        accessToken as string
      );
      if (!response.data.cityId) {
        handleGetProvince();
        setFormGeneralInfo({
          ...response.data,
        });
      } else {
        const userLocation = await handleGetUseLocation(response.data.cityId);
        await handleGetProvince();
        await handleGetCity(userLocation.provinceId);

        setFormGeneralInfo({
          company_name: response.data.company_name,
          phone_number: response.data.phone_number,
          address_details: response.data.address_details,
          company_description: response.data.company_description,
          company_city: response.data.companyCity,
          company_province: response.data.companyProvince,
          companyId: response.data.company_id,
          company_industry: response.data.company_industry,
          company_size: response.data.company_size,
          cityId: response.data.cityId,
          provinceId: userLocation.provinceId,
        });
      }
    } catch (e) {
      console.error(e, "Something went wrong, please refresh your browser");
      toast.error("Something went wrong, please refresh your browser");
    }
  }
  async function handleGetProvince() {
    try {
      const response = await locationHandler.getAllProvince();
      const mappedProvinces: LocationOption[] = response.data.map(
        (province: ProvinceItem) => ({
          value: province.province_id,
          label: province.name,
        })
      );
      setListProvince(mappedProvinces); // Update state with correctly mapped data
    } catch (e) {
      console.error(
        e,
        "We're sorry, we failed to get location data. Please refresh your browser"
      );
      toast.error(
        "We're sorry, we failed to get location data. Please refresh your browser"
      );
    }
  }

  async function handleGetUseLocation(cityId: number) {
    try {
      const response = await locationHandler.getUserLocation(cityId);
      return response.data;
    } catch (e) {
      console.error(e, "Something went wrong, please refresh your browser");
      toast.error(
        <>
          <h5>Failed to get location information</h5>
          <p>Please refresh your browser</p>
        </>
      );
    }
  }

  async function handleGetCity(provinceId: number) {
    try {
      const response = await locationHandler.getCity(provinceId);
      const mappedCity: LocationOption[] = response.data.map(
        (city: CityItem) => ({
          value: city.city_id,
          label: city.name,
        })
      );
      setListCity(mappedCity);
    } catch (e) {
      console.error(e, "Something went wrong, please refresh your browser");
    }
  }

  // HANDLE INPUT CHANGE

  function handleProvinceChange(
    selectedOption: SingleValue<locationList> | null
  ) {
    setFormGeneralInfo({
      ...formGeneralInfo,
      company_province: selectedOption?.label as string,
      provinceId: Number(selectedOption?.value),
      company_city: null,
      cityId: undefined,
    }); // Update provinceId in formGeneralInfo on change
    handleGetCity(Number(selectedOption?.value));
    setDisable(false);
  }
  function handleCityChange(selectedOption: SingleValue<locationList> | null) {
    setFormGeneralInfo({
      ...formGeneralInfo,
      company_city: selectedOption?.label as string,
      cityId: selectedOption?.value as number,
    }); // Update provinceId in formGeneralInfo on change
    setDisable(false);
  }
  function handleIndustryChange(selectedOption: SingleValue<SelectOption>) {
    setFormGeneralInfo({
      ...formGeneralInfo,
      company_industry: selectedOption?.value || "",
    });
    setDisable(false);
  }
  function handleSizeChange(selectedOption: SingleValue<SelectOption>) {
    setFormGeneralInfo({
      ...formGeneralInfo,
      company_size: selectedOption?.value || "",
    });
    setDisable(false);
  }
  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormGeneralInfo({
      ...formGeneralInfo,
      [name]: value,
    });
    setDisable(false);
  }
  async function handleSubmitChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setDisable(true);
    if (formGeneralInfo.company_name === "") {
      setLoading(false);
      setDisable(false);
      toast.error("Please do not leave your name empty.");
      return;
    }

    if (formGeneralInfo.phone_number === "") {
      setLoading(false);
      setDisable(false);
      toast.error("Please do not leave your phone number empty.");
      return;
    }

    if (
      formGeneralInfo.company_province !== "" &&
      formGeneralInfo.company_city === null
    ) {
      setDisable(true);
      setLoading(false);
      toast.error("please select the city");
      return;
    }

    try {
      const response = await profileHandler.updateInfoCompany(
        accessToken as string,
        formGeneralInfo
      );

      if (response.status === 204) {
        toast.success("Successfully updated profile");
        dispatch(updateName(formGeneralInfo.company_name));
        dispatch(updatePhone(formGeneralInfo.phone_number));
      } else {
        setDisable(true);
        setLoading(false);
        toast.error("Something went wrong, please refresh your browser");
      }
      setDisable(true);
      setLoading(false);
    } catch (e) {
      setDisable(true);
      setLoading(false);
      console.error(e, "Something went wrong, please refresh your browser");
      toast.error("Something went wrong, please refresh your browser");
    }
  }

  const noOptionsMessage = (obj: { inputValue: string }) => {
    return (
      <div>
        {obj.inputValue === ""
          ? "Start typing to search for cities"
          : `No results found for "${obj.inputValue}"`}
      </div>
    );
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      handleGetGeneralInfo();
      initialLoading.current = false;
    }
  }, [isLoggedIn]);

  return (
    <>
      {initialLoading.current ? (
        <GeneralInfoSectionSkeleton />
      ) : (
        <section className="p-4 rounded-2xl bg-white flex flex-col gap-6 md:p-6">
          <div className={`flex flex-col gap-1`}>
            <h2 className="text-lg font-bold text-neutral-950 md:text-xl">
              General Information
            </h2>
            <p className={`text-sm text-neutral-600`}>
              Providing complete personal information helps recruiters get to
              know you better.
            </p>
          </div>
          <form onSubmit={handleSubmitChange} className="flex flex-col gap-5">
            <div>
              {/*FULL NAME*/}
              <Label
                aria-required
                htmlFor={`name`}
                className="block mb-2 text-neutral-950"
              >
                Company Name <span className={"text-red-500"}>*</span>
              </Label>
              <Input
                className="rounded-xl "
                name={`company_name`}
                onChange={handleInputChange}
                value={formGeneralInfo.company_name}
                type="text"
                placeholder="Enter your name"
              />
            </div>

            {/* PHONE NUMBER */}
            <div>
              <Label
                aria-required
                htmlFor={`phone_number`}
                className="block mb-2 text-neutral-950"
              >
                Phone Number <span className={"text-red-500"}>*</span>
              </Label>
              <Input
                className="rounded-xl "
                name={`phone_number`}
                onChange={handleInputChange}
                value={formGeneralInfo.phone_number}
                type="text"
                placeholder="Enter your phone number"
              />
            </div>

            {/*Company DESCRIPTION*/}
            <div>
              <Label
                htmlFor={`company_description`}
                className="block mb-2 text-neutral-950"
              >
                Tell us about your company
              </Label>
              <Textarea
                name={`company_description`}
                onChange={handleInputChange}
                className="rounded-xl "
                placeholder={"Type your description here"}
                value={formGeneralInfo.company_description}
              />
            </div>

            <div>
              <div>
                <Label
                  htmlFor={`email`}
                  className="block mb-2 text-neutral-950"
                >
                  Where is your company location?
                </Label>
                <div
                  className={`flex flex-col item-center gap-2 md:flex-row md:w-full`}
                >
                  <Select
                    noOptionsMessage={noOptionsMessage}
                    theme={(theme) => {
                      return {
                        ...theme,
                        borderRadius: 12,
                        colors: {
                          ...theme.colors,
                          primary25: "#f8f7f7",
                          primary: "black",
                        },
                      };
                    }}
                    value={
                      formGeneralInfo.provinceId
                        ? listProvince.find(
                            (option) =>
                              option.value === formGeneralInfo.provinceId
                          )
                        : null
                    }
                    className={"w-full"}
                    onChange={handleProvinceChange}
                    options={listProvince}
                  />
                  <Select
                    theme={(theme) => {
                      return {
                        ...theme,
                        borderRadius: 12,
                        colors: {
                          ...theme.colors,
                          primary25: "#f8f7f7",
                          primary: "black",
                        },
                      };
                    }}
                    defaultValue={
                      formGeneralInfo.cityId
                        ? listCity.find(
                            (option) =>
                              option.value ===
                              (formGeneralInfo.cityId as number)
                          )
                        : null
                    }
                    value={
                      formGeneralInfo.cityId
                        ? listCity.find(
                            (option) => option.value === formGeneralInfo.cityId
                          )
                        : null
                    }
                    className={"w-full"}
                    onChange={handleCityChange}
                    options={listCity}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label
                htmlFor={"address_details"}
                className="block mb-2 text-neutral-950"
              >
                Company Address
              </Label>
              <Textarea
                name={"address_details"}
                onChange={handleInputChange}
                className="rounded-xl "
                placeholder={"Type your company address here"}
                value={formGeneralInfo.address_details}
              />
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-5 md:flex-row md:gap-4">
                {/* Company Industry */}
                <div className="flex-1">
                  <Label htmlFor="company_industry">Company Industry</Label>
                  <Select
                    theme={(theme) => {
                      return {
                        ...theme,
                        borderRadius: 12,
                        colors: {
                          ...theme.colors,
                          primary25: "#f8f7f7",
                          primary: "black",
                        },
                      };
                    }}
                    options={companyIndustryOptions}
                    value={companyIndustryOptions.find(
                      (option) =>
                        option.value === formGeneralInfo.company_industry
                    )}
                    onChange={handleIndustryChange}
                    className="rounded-xl"
                  />
                </div>

                {/* Company Size */}
                <div className="flex-1">
                  <Label htmlFor="company_size">Company Size</Label>
                  <Select
                    theme={(theme) => {
                      return {
                        ...theme,
                        borderRadius: 12,
                        colors: {
                          ...theme.colors,
                          primary25: "#f8f7f7",
                          primary: "black",
                        },
                      };
                    }}
                    options={companySizeOptions}
                    value={companySizeOptions.find(
                      (option) => option.value === formGeneralInfo.company_size
                    )}
                    onChange={handleSizeChange}
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <Button
              type={"submit"}
              disabled={isDisable}
              variant={"primary"}
              size={"default"}
              className={"w-fit"}
            >
              {isLoading ? LoadingLoader() : "Save Change"}
            </Button>
          </form>
        </section>
      )}
    </>
  );
}

export default CompanyGeneralInfoSection;
