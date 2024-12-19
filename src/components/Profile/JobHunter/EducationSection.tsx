import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import EducationItem from "@/components/Profile/JobHunter/EducationItem";
import ModalContainer from "@/components/Modal/ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { closeModalAction, openModalAction } from "@/store/slices/ModalSlice";
import FormEducation from "@/components/Form/FormEducation";
import Cookies from "js-cookie";
import { Education, getEducation } from "@/store/slices/EducationSlice";
import EducationSectionSkeleton from "@/components/Profile/JobHunter/skeleton/educationSection.skeleton";
import { EducationDegreeType } from "@/models/educationDegree";

function EducationSection() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { educationList, pendingState } = useSelector(
    (state: RootState) => state.education,
  );
  const { currentModalId } = useSelector(
    (state: RootState) => state.modalController,
  );

  const handleCloseModal = () => {
    dispatch(closeModalAction());
  };

  async function handleFethingEducation() {
    const accessToken = Cookies.get("accessToken");
    await dispatch(getEducation(accessToken as string));
  }

  useEffect(() => {
    if (isLoggedIn) {
      handleFethingEducation();
    }
  }, [isLoggedIn]);

  console.log("LISTNYA INI YAA", educationList);

  return (
    <>
      <ModalContainer
        isOpen={currentModalId === "addEducationModal"}
        onClose={handleCloseModal}
        title={"Add New Education"}
      >
        <FormEducation />
      </ModalContainer>
      <section className="p-4 rounded-2xl bg-white flex flex-col gap-6 md:p-6">
        <div className={`flex items-center justify-between gap-3`}>
          <div className={`flex flex-col gap-1`}>
            <h2 className="text-lg font-bold text-neutral-950 md:text-xl">
              Education
            </h2>
            <p className={`text-sm text-neutral-600`}>
              {`Tell us about your educational journey, whether it's from schools or bootcamps.
`}
            </p>
          </div>
          <Button
            onClick={() => dispatch(openModalAction("addEducationModal"))}
            variant={"outline"}
            size={"sm"}
          >
            Add
          </Button>
        </div>
        {pendingState.dataLoading ? (
          <EducationSectionSkeleton />
        ) : educationList.length === 0 ? (
          ""
        ) : (
          <div className={`grid grid-cols-1 gap-4 lg:grid-cols-2`}>
            {educationList.map((education: Education, key: number) => {
              return (
                <EducationItem
                  key={key}
                  educationId={education.educationId as number}
                  educationDegree={
                    education.education_degree as EducationDegreeType
                  }
                  gpa={education.cumulativeGpa}
                  educationName={education.educationName}
                  description={education.educationDescription}
                  educationDate={education.educationDate as string}
                  jobHunterId={education.jobHunterId as number}
                />
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}

export default EducationSection;
