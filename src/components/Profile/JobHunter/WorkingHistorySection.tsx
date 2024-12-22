import React, { useEffect } from "react";
import WorkingHistoryItem from "@/components/Profile/JobHunter/WorkingHistoryItem";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { closeModalAction, openModalAction } from "@/store/slices/ModalSlice";
import FormWorkingExperience from "@/components/Form/FormWorkingExperience";
import ModalContainer from "@/components/Modal/ModalContainer";
import Cookies from "js-cookie";
import {
  clearSelectedItem,
  getWorkingExperience,
  setSelectedItem,
} from "@/store/slices/WorkingExpSlice";

function WorkingHistorySection() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { workingExpList, pendingState } = useSelector(
    (state: RootState) => state.workExperience,
  );

  const { currentModalId } = useSelector(
    (state: RootState) => state.modalController,
  );

  const handleCloseModal = () => {
    dispatch(clearSelectedItem());
    dispatch(closeModalAction());
  };

  async function handleFethingExperience() {
    const accessToken = Cookies.get("accessToken");
    await dispatch(
      getWorkingExperience({
        token: accessToken as string,
        wReview: false,
      }),
    );
  }

  useEffect(() => {
    if (isLoggedIn) {
      if (!pendingState.isRender) {
        handleFethingExperience();
      }
    }
  }, [isLoggedIn]);

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
        {workingExpList.length > 0 ? (
          <div className={`grid grid-cols-1 gap-4`}>
            {workingExpList.map((workExp, key: number) => {
              return (
                <WorkingHistoryItem
                  key={key}
                  companyId={workExp.companyId as number}
                  workingHistoryId={workExp.workingExperienceId as number}
                  companyName={workExp.companyName}
                  position={workExp.jobTitle}
                  description={workExp.jobDescription}
                  onEdit={() => {
                    dispatch(
                      setSelectedItem(workExp.workingExperienceId as number),
                    );
                    dispatch(openModalAction("editWorkingModal"));
                  }}
                />
              );
            })}
          </div>
        ) : (
          ""
        )}
      </section>
    </>
  );
}

export default WorkingHistorySection;
