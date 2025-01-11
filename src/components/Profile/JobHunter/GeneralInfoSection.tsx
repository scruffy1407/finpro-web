import React, { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LocationOption } from "@/utils/interface";
import {
  CityItem,
  JobHunterGeneralInfoData,
  locationList,
  ProvinceItem,
} from "@/models/auth.model";
import Cookies from "js-cookie";
import { ProfileHandler } from "@/utils/profile.utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import Select, { SingleValue } from "react-select";
import { LocationHandler } from "@/utils/location.utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { updateName } from "@/store/slices/authSlice";
import LoadingLoader from "@/components/LoadingLoader";
import GeneralInfoSectionSkeleton from "@/components/Profile/JobHunter/GeneralInfoSkeleton";

function GeneralInfoSection() {
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

  const [formGeneralInfo, setFormGeneralInfo] =
    useState<JobHunterGeneralInfoData>({
      name: "",
      dob: "",
      expectedSalary: "",
      gender: undefined,
      locationCity: "",
      locationProvince: "",
      jobHunterId: "",
      summary: "",
      cityId: undefined,
      provinceId: undefined,
    });

  async function handleGetGeneralInfo() {
    try {
      const response = await profileHandler.getProfileJobhunter(
        accessToken as string
      );

      if (!response.data.cityId) {
        handleGetProvince();
        setFormGeneralInfo({
          ...response.data,
        });
      } else {
        console.log("has city", response);
        const userLocation = await handleGetUseLocation(response.data.cityId);
        await handleGetProvince();
        await handleGetCity(userLocation.provinceId);

        setFormGeneralInfo({
          name: response.data.name,
          locationCity: response.data.locationCity,
          locationProvince: response.data.locationProvince,
          jobHunterId: response.data.jobHunterId,
          expectedSalary: response.data.expectedSalary,
          summary: response.data.summary,
          gender: response.data.gender,
          cityId: userLocation.city_id,
          provinceId: userLocation.provinceId,
          dob: new Date(response.data.dob).toISOString().split("T")[0],
        });
      }
    } catch (e) {
      console.error(e, "Something went wrong,please refresh your browser");
      toast.error("Something went wrong,please refresh your browser");
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
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.error(e, "Something went wrong,please refresh your browser");
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
      console.error(e, "Something went wrong,please refresh your browser");
    }
  }

  // HANDLE INPUT CHANGE

  function handleProvinceChange(
    selectedOption: SingleValue<locationList> | null
  ) {
    setFormGeneralInfo({
      ...formGeneralInfo,
      locationProvince: selectedOption?.label as string,
      provinceId: Number(selectedOption?.value),
      locationCity: null,
      cityId: undefined,
    }); // Update provinceId in formGeneralInfo on change
    handleGetCity(Number(selectedOption?.value));
    setDisable(false);
  }
  function handleCityChange(selectedOption: SingleValue<locationList> | null) {
    setFormGeneralInfo({
      ...formGeneralInfo,
      locationCity: selectedOption?.label as string,
      cityId: selectedOption?.value as number,
    }); // Update provinceId in formGeneralInfo on change
    setDisable(false);
  }
  function hanleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    // It handle name,description and expected salary
    const { name, value } = e.target;
    if (name === "dob") {
      setFormGeneralInfo({
        ...formGeneralInfo,
        [name]: new Date(value),
      });
    }
    setFormGeneralInfo({
      ...formGeneralInfo,
      [name]: value,
    });
    setDisable(false);
  }

  function handleGenderChange(value: "male" | "female" | "other") {
    setFormGeneralInfo({
      ...formGeneralInfo,
      gender: value,
    });
    setDisable(false);
  }

  async function handleSubmitChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setDisable(true);
    if (formGeneralInfo.name === "") {
      setLoading(false);
      setDisable(false);
      toast.error("Please do not leave your name empty.");
      return;
    }
    console.log(formGeneralInfo.locationProvince, formGeneralInfo.locationCity);
    if (
      formGeneralInfo.locationProvince !== "" &&
      formGeneralInfo.locationCity === null
    ) {
      setDisable(true);
      setLoading(false);
      toast.error("please select the city");
      return;
    }

    try {
      const response = await profileHandler.updateInfoJobhunter(
        accessToken as string,
        formGeneralInfo
      );

      if (response.status === 200) {
        toast.success("Successfully updated profile");
        dispatch(updateName(response.data.name));
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
      console.error(e, "Something went wrong,please refresh your browser");
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
      initialLoading.current = false; // Update ref value
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
                Full Name <span className={"text-red-500"}>*</span>
              </Label>
              <Input
                className="rounded-xl "
                name={`name`}
                onChange={hanleInputChange}
                value={formGeneralInfo.name}
                type="text"
                placeholder="Enter your name"
              />
            </div>

            {/*JOB HUNTER DESCRIPTION*/}
            <div>
              <Label
                htmlFor={`summary`}
                className="block mb-2 text-neutral-950"
              >
                Tell us about yourself
              </Label>
              <Textarea
                name={`summary`}
                onChange={hanleInputChange}
                className="rounded-xl "
                placeholder={"Type your description here"}
                value={formGeneralInfo.summary}
              />
            </div>

            <div>
              {/*FULL NAME*/}
              <Label
                aria-required
                htmlFor={`expectedSalary`}
                className="block mb-2 text-neutral-950"
              >
                Your Expected salary for a job (In Rupiah)
              </Label>
              <p className={`text-xs text-neutral-400 mb-2`}>
                Expected salary help recruiter to understand what your
                expectation in current state
              </p>
              <Input
                className="rounded-xl "
                name={`expectedSalary`}
                onChange={hanleInputChange}
                value={formGeneralInfo.expectedSalary as number}
                type="number"
                placeholder="Ex 5000000"
              />
            </div>

            {/*GENDER*/}
            <div>
              <Label htmlFor={`email`} className="block mb-2 text-neutral-950">
                Gender
              </Label>
              <RadioGroup
                className={`flex gap-4`}
                defaultValue={formGeneralInfo.gender}
                onValueChange={(value: "male" | "female" | "other") =>
                  handleGenderChange(value)
                }
                value={formGeneralInfo.gender}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    radioGroup={"gender"}
                    value="male"
                    id="male"
                  />
                  <Label className="text-neutral-950" htmlFor="male">
                    Male
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label className="text-neutral-950" htmlFor="female">
                    Female
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label className="text-neutral-950" htmlFor="others">
                    Other
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/*DATE OF BIRTH*/}
            <div>
              <Label htmlFor={`dob`} className="block mb-2 text-neutral-950">
                Date of Birth
              </Label>
              <input
                name={"dob"}
                className={`h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300`}
                type="date"
                onChange={hanleInputChange}
                value={formGeneralInfo.dob as string}
              />
            </div>
            <div>
              <div>
                <Label
                  htmlFor={`email`}
                  className="block mb-2 text-neutral-950"
                >
                  Where do you currently live?
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
                    } // Set default selected province from formGeneralInfo
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
                    } // Set default selected city from formGeneralInfo
                    className={"w-full"}
                    onChange={handleCityChange}
                    options={listCity}
                  />
                </div>
              </div>
            </div>
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

export default GeneralInfoSection;
