import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { closeModalAction, openModalAction } from "@/store/slices/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import FormEditWorkingExperience from "@/components/Form/FormEditWorkingExperience";
import ModalContainer from "@/components/Modal/ModalContainer";
import ConfirmDelete from "@/components/Modal/ConfirmDelete";
import { deleteWorkingExperience } from "@/store/slices/WorkingExpSlice";
import Cookies from "js-cookie";

interface WorkingHistoryProps {
  companyId: number;
  workingHistoryId: number;
  companyName: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
  onDelete?: () => void;
  onEdit?: () => void;
}

function WorkingHistoryItem({
  workingHistoryId,
  companyName,
  position,
  description,
  companyId,
  startDate,
  endDate,
}: WorkingHistoryProps) {
  const accessToken = Cookies.get("accessToken");
  const dispatch = useDispatch<AppDispatch>();
  const { innerId } = useSelector((state: RootState) => state.auth);

  const { pendingState } = useSelector(
    (state: RootState) => state.workExperience
  );

  const { currentModalId, editId } = useSelector(
    (state: RootState) => state.modalController
  );
  const handleCloseModal = () => {
    dispatch(closeModalAction());
  };

  return (
    <>
      <ModalContainer
        isOpen={
          currentModalId === "editWorkingModal" && editId === workingHistoryId
        }
        onClose={handleCloseModal}
        title={`Edit Working Experience`}
      >
        <FormEditWorkingExperience
          jobDescription={description as string}
          jobTitle={position as string}
          companyName={companyName as string}
          companyId={companyId}
          workingExperienceId={workingHistoryId as number}
          jobHunterId={innerId as number}
          startDate={startDate}
          endDate={endDate}
        />
      </ModalContainer>

      <ModalContainer
        isOpen={
          currentModalId === "deleteWorkingModal" && editId === workingHistoryId
        }
        onClose={handleCloseModal}
      >
        <ConfirmDelete
          disableState={pendingState.actionDisable}
          loadingState={pendingState.actionLoading}
          onDelete={() => {
            dispatch(
              deleteWorkingExperience({
                token: accessToken as string,
                workExp: workingHistoryId as number,
              })
            );
          }}
        />
      </ModalContainer>

      <div
        className={`border border-neutral-200 rounded-xl p-4 flex flex-col gap-4`}
      >
        <div className={`flex gap-2 item-center justify-between`}>
          <div className={`flex flex-col gap-1`}>
            <p className={`text-xs text-neutral-600`}>{companyName}</p>
            <h3 className={`text-sm font-bold text-neutral-950`}>{position}</h3>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                width={24}
                height={24}
                alt={`Menu`}
                src={`/moreMenu.svg`}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() =>
                  dispatch(
                    openModalAction("editWorkingModal", workingHistoryId)
                  )
                }
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  dispatch(
                    openModalAction("deleteWorkingModal", workingHistoryId)
                  )
                }
                className={`text-red-500`}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className={`line-clamp-3 text-sm text-neutral-600`}>{description}</p>
      </div>
    </>
  );
}

export default WorkingHistoryItem;
