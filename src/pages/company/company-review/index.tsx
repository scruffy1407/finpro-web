import React, { useEffect, useState } from "react";
import NavbarComponent from "@/components/NavbarComponent";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { reviewResponse } from "@/models/company.model";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { AuthHandler } from "@/utils/auth.utils";
import RatingComponent from "@/components/Form/RatingComponent";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  addJobs,
  clearSelectedItem,
  getWorkingExperience,
} from "@/store/slices/WorkingExpSlice";
import LoadingLoader from "@/components/LoadingLoader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Cookies from "js-cookie";
import { CompanyUtils } from "@/utils/company.utils";
import { toast } from "sonner";
import { useRouter } from "next/router";
import FormWorkingExperience from "@/components/Form/FormWorkingExperience";
import ModalContainer from "@/components/Modal/ModalContainer";
import { closeModalAction, openModalAction } from "@/store/slices/ModalSlice";
import CompanyReviewSkeleton from "@/components/Skeleton/CompanyReview.skeleton";
import { Navbar } from "@/components/NavigationBar/Navbar";

type FormInputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

function Index() {
  const authHandler = new AuthHandler();
  authHandler.authorizeUser("jobhunter");
  const companyUtils = new CompanyUtils();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [indexSelect, setIndexSelect] = useState<number | null>(null);
  const { pendingState, workingExpList } = useSelector(
    (state: RootState) => state.workExperience,
  );
  const { currentModalId } = useSelector(
    (state: RootState) => state.modalController,
  );
  const callbackURL = router.query.callback;

  const [reviewForm, setReviewForm] = useState<reviewResponse>({
    careerPathRating: 0,
    workExperienceId: 0,
    culturalRating: 0,
    facilityRating: 0,
    reviewDescription: "",
    reviewTitle: "",
    workLifeBalanceRating: 0,
  });

  const handleCloseModal = () => {
    dispatch(clearSelectedItem());
    dispatch(closeModalAction());
  };

  const handleRatingChange = (
    ratingType: keyof reviewResponse,
    newRating: number,
  ) => {
    setReviewForm((prevForm) => ({
      ...prevForm,
      [ratingType]: newRating,
    }));
  };
  console.log("WORK EXP LIST :", workingExpList);

  async function handleFethingExperience() {
    const accessToken = Cookies.get("accessToken");
    await dispatch(
      getWorkingExperience({
        token: accessToken as string,
        wReview: true,
      }),
    );
  }

  function handleCompanyChange(value: number) {
    setIndexSelect(value);
    setReviewForm({
      ...reviewForm,
      workExperienceId: workingExpList[value].workingExperienceId as number,
    });
  }
  function handleInputChange(e: FormInputEvent) {
    const { name, value } = e.target;
    setReviewForm({
      ...reviewForm,
      [name]: value,
    });
  }

  async function handleSubmitReview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validData = companyUtils.validateReviewData(reviewForm);
    if (!validData) {
      return;
    }

    setIsLoading(true);
    setIsDisable(true);
    const token = Cookies.get("accessToken");
    try {
      const response = await companyUtils.createCompanyReview(
        token as string,
        reviewForm,
      );
      console.log(response);
      if (response.status === 201) {
        toast.success("Thank for your review");
        dispatch(addJobs({ index: indexSelect, reviewForm: reviewForm }));
        router.push(callbackURL ? (callbackURL as string) : "/", undefined, {
          scroll: false,
        });
      } else {
        console.log("init");
        const message = response.data.message;
        toast.error(message);
      }
    } catch (e) {
      toast.error(
        "Something went wrong, cannot create your review. Please try again or refresh your browser",
      );
      setIsDisable(false);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      if (!pendingState.isRender) {
        handleFethingExperience();
        setReviewForm({
          ...reviewForm,
        });
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (
      reviewForm.workLifeBalanceRating === 0 ||
      reviewForm.facilityRating === 0 ||
      reviewForm.culturalRating === 0 ||
      reviewForm.careerPathRating === 0 ||
      reviewForm.reviewDescription === "" ||
      reviewForm.reviewTitle === "" ||
      reviewForm.workExperienceId === 0
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [reviewForm]);

  return (
    <>
      <ModalContainer
        isOpen={currentModalId === "addWorkingModal"}
        onClose={handleCloseModal}
        title={"Add New Working Experience"}
      >
        <FormWorkingExperience />
      </ModalContainer>
      <Navbar pageRole={"jobhunter"} />

      {pendingState.isRender ? (
        <section className={"w-full p-4"}>
          <div className="max-w-screen-sm mx-auto p-8 bg-white rounded-2xl flex flex-col gap-8">
            <div className={"flex flex-col gap-2"}>
              <h1 className={"text-2xl font-bold text-neutral-950"}>
                Review Company
              </h1>
              <p className={"text-sm text-neutral-600 max-w-[600px]"}>
                It only takes a minute Your review can help other job seekers
                find the right fit.
              </p>
            </div>
            <form
              onSubmit={handleSubmitReview}
              className={`flex flex-col gap-8`}
            >
              <div className={"flex flex-col gap-6 p-4 rounded-2xl bg-zinc-50"}>
                <div className={"flex flex-col gap-2"}>
                  <h2 className="text-neutral-950 font-semibold">
                    Select the company you want to review
                  </h2>
                  <p className={'text-xs text-neutral-600 max-w-[600px]"}>'}>
                    Choose from your previously added work experiences.
                  </p>
                </div>
                {workingExpList.length === 0 ? (
                  <Button
                    type={"button"}
                    className={"w-fit"}
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => dispatch(openModalAction("addWorkingModal"))}
                  >
                    Add Working Experience
                  </Button>
                ) : (
                  <RadioGroup
                    className={`flex gap-5 flex-wrap`}
                    onValueChange={(value: string) =>
                      handleCompanyChange(Number(value))
                    }
                    value={indexSelect?.toString()}
                  >
                    {workingExpList.map((workExp, i: number) => {
                      if (workExp?.jobReview?.length === 0) {
                        return (
                          <div key={i} className="flex items-center space-x-2">
                            <RadioGroupItem
                              radioGroup={"company"}
                              value={(i as number).toString()}
                              id={workExp.companyName}
                            />
                            <div className={"flex flex-col gap-1"}>
                              <Label
                                className="text-neutral-950 font-medium"
                                htmlFor={(i as number).toString()}
                              >
                                {workExp.companyName}
                              </Label>
                              <span className={`text-xs text-neutral-400`}>
                                As {workExp.jobTitle}
                              </span>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </RadioGroup>
                )}
                {workingExpList.length === 0 ? (
                  ""
                ) : (
                  <Button
                    type={"button"}
                    className={"w-fit"}
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => dispatch(openModalAction("addWorkingModal"))}
                  >
                    Review Other Company
                  </Button>
                )}
              </div>
              {indexSelect !== null ? (
                <>
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
                  <div className="border-t-[1px] border-gray-200 w-full"></div>
                  <div className={"flex flex-col gap-4"}>
                    <div className={"flex flex-col gap-2"}>
                      <div className={"flex flex-col gap-1"}>
                        <Label
                          aria-required
                          htmlFor={`reviewTitle`}
                          className="block text-neutral-950"
                        >
                          Your Position or Department
                        </Label>
                        <p
                          className={
                            'text-xs text-neutral-600 max-w-[600px]"}>'
                          }
                        >
                          {`To maintain anonymity, avoid sharing overly specific
                      details. Instead of saying 'Marketing Assistant', use more
                      general terms like 'Marketing Department'.`}
                        </p>
                      </div>
                      <Input
                        className="rounded-xl "
                        name={`reviewTitle`}
                        type="text"
                        value={reviewForm.reviewTitle}
                        onChange={handleInputChange}
                        placeholder="Ex: Marketing Department"
                      />
                    </div>
                    <div>
                      <Label
                        aria-required
                        htmlFor={`reviewDescription`}
                        className="block mb-2 text-neutral-950"
                      >
                        Share your experience working in company
                      </Label>

                      <Textarea
                        className="rounded-xl "
                        name={`reviewDescription`}
                        onChange={handleInputChange}
                        value={reviewForm.reviewDescription}
                        placeholder="Ex: I'm happy with my role at [Company Name]. There's always room for improvement, but overall it's a positive experience."
                      />
                    </div>
                  </div>
                  <Button disabled={isDisable} variant="primary" type="submit">
                    {isLoading ? LoadingLoader() : "Review Company"}
                  </Button>
                </>
              ) : (
                ""
              )}
            </form>
          </div>
        </section>
      ) : (
        <CompanyReviewSkeleton />
      )}
    </>
  );
}

export default Index;
