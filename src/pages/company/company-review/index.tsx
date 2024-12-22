import React, { useState } from "react";
import NavbarComponent from "@/components/NavbarComponent";
import { Label } from "@/components/ui/label";
import AsyncSelect from "react-select/async";
import { Button } from "@/components/ui/button";
import { ProfileHandler } from "@/utils/profile.utils";
import { reviewResponse } from "@/models/company.model";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { AuthHandler } from "@/utils/auth.utils";
import { SingleValue } from "react-select";
import RatingComponent from "@/components/Form/RatingComponent";

function Index() {
  const authHandler = new AuthHandler();
  authHandler.authorizeUser("jobhunter");
  const profileHandler = new ProfileHandler();

  const { innerId } = useSelector((state: RootState) => state.auth);
  const [reviewForm, setReviewForm] = useState<reviewResponse>({
    careerPathRating: 0,
    culturalRating: 0,
    facilityRating: 0,
    reviewDescription: "",
    reviewTitle: "",
    workLifeBalanceRating: 0,
    jobunterId: innerId as number,
    companyId: 0,
    companyName: "",
  });

  const options = (inputValue: string, callback: (options: []) => void) => {
    fetchCompanyData(inputValue)
      .then((data) => callback(data))
      .catch(() => callback([])); // Handle errors with an empty array
  };

  async function fetchCompanyData(keyword: string) {
    try {
      const response = await profileHandler.searchCompany(keyword);
      return response.data;
    } catch (e: unknown) {
      return []; // Handle errors with an empty array
    }
  }

  function handleCompanyChange(
    selectedOption: SingleValue<{
      value: number | null;
      label: string | undefined;
    }> | null,
  ) {
    if (selectedOption) {
      setReviewForm({
        ...reviewForm,
        companyId: selectedOption?.value as number,
        companyName: selectedOption?.label as string,
      });
    }
  }

  const handleRatingChange = (
    ratingType: keyof reviewResponse,
    newRating: number,
  ) => {
    setReviewForm((prevForm) => ({
      ...prevForm,
      [ratingType]: newRating,
    }));
  };

  console.log(reviewForm);
  return (
    <>
      <NavbarComponent
        findJobs="Find Jobs"
        skillAssessment="Skill Assessment"
        exploreCompanies="Explore Companies"
        loginJobHunter="Login"
        loginCompanies="Login as Recruiter"
      />
      <section className={"w-full p-4"}>
        <div className="max-w-screen-sm mx-auto p-8 bg-white rounded-2xl flex flex-col gap-8">
          <div className={"flex flex-col gap-2"}>
            <h1 className={"text-2xl font-bold text-neutral-950"}>
              Review Company
            </h1>
            <p className={"text-sm text-neutral-600 max-w-[600px]"}>
              It only takes a minute Your review can help other job seekers find
              the right fit.
            </p>
          </div>
          <form className={`flex flex-col gap-8`}>
            <div>
              {/*FULL NAME*/}

              {/*<AsyncSelect*/}
              {/*  name="companyId"*/}
              {/*  cacheOptions*/}
              {/*  defaultOptions*/}
              {/*  loadOptions={options}*/}
              {/*  defaultValue={{*/}
              {/*    value: reviewForm.companyId,*/}
              {/*    label: reviewForm.companyName,*/}
              {/*  }} // Set default value*/}
              {/*  onChange={handleCompanyChange}*/}
              {/*  theme={(theme) => {*/}
              {/*    return {*/}
              {/*      ...theme,*/}
              {/*      borderRadius: 12,*/}
              {/*      colors: {*/}
              {/*        ...theme.colors,*/}
              {/*        primary25: "#f8f7f7",*/}
              {/*        primary: "black",*/}
              {/*      },*/}
              {/*    };*/}
              {/*  }}*/}
              {/*/>*/}
              <Label
                htmlFor={`companyId`}
                className="block mb-2 text-neutral-950"
              >
                Select the Company You Want to Review
              </Label>
              <p className={'text-xs text-neutral-600 max-w-[600px]"}>'}>
                Choose from your previously added work experiences.
              </p>
            </div>

            <div className="border-t-[1px] border-gray-200 w-full"></div>
            <div className={`flex flex-col gap-5`}>
              <div className={"flex items-center gap-5 justify-between"}>
                <Label
                  htmlFor={`companyId`}
                  className="block mb-2 text-neutral-950"
                >
                  Work Culture
                </Label>
                <RatingComponent
                  selectedRating={reviewForm.culturalRating}
                  onRatingChange={(newRating) =>
                    handleRatingChange("culturalRating", newRating)
                  }
                />
              </div>

              <div className={"flex items-center gap-5 justify-between"}>
                <Label
                  htmlFor={`companyId`}
                  className="block mb-2 text-neutral-950"
                >
                  Company Facility
                </Label>
                <RatingComponent
                  selectedRating={reviewForm.facilityRating}
                  onRatingChange={(newRating) =>
                    handleRatingChange("facilityRating", newRating)
                  }
                />
              </div>

              <div className={"flex items-center gap-5 justify-between"}>
                <Label
                  htmlFor={`companyId`}
                  className="block mb-2 text-neutral-950"
                >
                  Work Life Balance
                </Label>
                <RatingComponent
                  selectedRating={reviewForm.workLifeBalanceRating}
                  onRatingChange={(newRating) =>
                    handleRatingChange("workLifeBalanceRating", newRating)
                  }
                />
              </div>

              <div className={"flex items-center gap-5 justify-between"}>
                <Label
                  htmlFor={`companyId`}
                  className="block mb-2 text-neutral-950"
                >
                  Career Opportunity
                </Label>
                <RatingComponent
                  selectedRating={reviewForm.careerPathRating}
                  onRatingChange={(newRating) =>
                    handleRatingChange("careerPathRating", newRating)
                  }
                />
              </div>
            </div>

            <Button disabled={true} variant="primary" type="submit">
              {/*{isLoading ? LoadingLoader() : "Save Changes"}*/}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Index;
