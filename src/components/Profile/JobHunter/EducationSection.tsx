import React from "react";
import { Button } from "@/components/ui/button";
import EducationItem from "@/components/Profile/JobHunter/EducationItem";
import ModalContainer from "@/components/Modal/ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { closeModalAction, openModalAction } from "@/store/slices/ModalSlice";
import FormEducation from "@/components/Form/FormEducation";

function EducationSection() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentModalId } = useSelector(
    (state: RootState) => state.modalController,
  );

  const handleCloseModal = () => {
    dispatch(closeModalAction());
  };
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
        <div className={`grid grid-cols-1 gap-4 lg:grid-cols-2`}>
          <EducationItem
            educationId={1}
            educationName={`Bina Nusantara University`}
            educationDegree={`Bachelor Degree`}
            gpa={4}
            description={`As a Senior Sales Manager at Shopee, I led and motivated a high-performing sales team to consistently exceed sales targets. I developed and executed strategic sales plans to acquire and retain key accounts, driving significant revenue growth.`}
          />
        </div>
      </section>
    </>
  );
}

export default EducationSection;
