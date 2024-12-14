import React from "react";
import WorkingHistoryItem from "@/components/Profile/JobHunter/WorkingHistoryItem";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { closeModalAction, openModalAction } from "@/store/slices/ModalSlice";
import FormWorkingExperience from "@/components/Form/FormWorkingExperience";
import ModalContainer from "@/components/Modal/ModalContainer";
import FormEditWorkingExperience from "@/components/Form/FormEditWorkingExperience";

function WorkingHistorySection() {
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
        isOpen={currentModalId === "addWorkingModal"}
        onClose={handleCloseModal}
        title={"Add New Working Experience"}
      >
        <FormWorkingExperience />
      </ModalContainer>

      <section className="p-4 rounded-2xl bg-white flex flex-col gap-6 md:p-6">
        <div className={`flex items-center justify-between gap-3`}>
          <div className={`flex flex-col gap-1`}>
            <h2 className="text-lg font-bold text-neutral-950 md:text-xl">
              Working History
            </h2>
            <p className={`text-sm text-neutral-600`}>
              Share your work experience to help recruiters understand your
              expertise.
            </p>
          </div>
          <Button
            onClick={() => dispatch(openModalAction("addWorkingModal"))}
            variant={"outline"}
            size={"sm"}
          >
            Add
          </Button>
        </div>
        <div className={`grid grid-cols-1 gap-4 lg:grid-cols-2`}>
          <WorkingHistoryItem
            workingHistoryId={1}
            companyName={"Tokopedia"}
            position={"Senior UI/UX Designer"}
            description={
              "As a Senior Sales Manager at Shopee, I led and motivated a high-performing sales team to consistently exceed sales targets. I developed and executed strategic sales plans to acquire and retain key accounts, driving significant revenue growth."
            }
          />
          <WorkingHistoryItem
            workingHistoryId={2}
            companyName={"Shopee"}
            position={"Senior UI/UX Designer"}
            description={
              "As a Senior Sales Manager at Shopee, I led and motivated a high-performing sales team to consistently exceed sales targets. I developed and executed strategic sales plans to acquire and retain key accounts, driving significant revenue growth."
            }
          />
          <WorkingHistoryItem
            workingHistoryId={3}
            companyName={"Bukalapak"}
            position={"Senior UI/UX Designer"}
            description={
              "As a Senior Sales Manager at Shopee, I led and motivated a high-performing sales team to consistently exceed sales targets. I developed and executed strategic sales plans to acquire and retain key accounts, driving significant revenue growth."
            }
          />
        </div>
      </section>
    </>
  );
}

export default WorkingHistorySection;
