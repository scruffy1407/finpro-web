import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import ModalContainer from "@/components/Modal/ModalContainer";
import FormEditEducation from "@/components/Form/FormEditEducation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { closeModalAction, openModalAction } from "@/store/slices/ModalSlice";
import {
  EducationDegreeResult,
  EducationDegreeType,
} from "@/models/educationDegree";
import Cookies from "js-cookie";
import ConfirmDelete from "@/components/Modal/ConfirmDelete";
import { deleteEducation } from "@/store/slices/EducationSlice";

interface EducationProps {
  educationId: number;
  educationDegree: EducationDegreeType;
  educationName: string;
  description: string;
  educationDate: string | Date;
  jobHunterId: number;
  gpa: number;
  onDelete?: () => void;
  onEdit?: () => void;
}

function EducationItem({
  description,
  gpa,
  educationDegree,
  educationId,
  educationName,
  educationDate,
  jobHunterId,
}: EducationProps) {
  const accessToken = Cookies.get("accessToken");
  const dispatch = useDispatch<AppDispatch>();
  const { pendingState } = useSelector((state: RootState) => state.education);
  const { currentModalId, editId } = useSelector(
    (state: RootState) => state.modalController,
  );
  const handleCloseModal = () => {
    dispatch(closeModalAction());
  };

  return (
    <>
      <ModalContainer
        isOpen={
          currentModalId === "editEducationModal" && editId === educationId
        }
        onClose={handleCloseModal}
        title={`Edit Working Experience`}
      >
        <FormEditEducation
          educationId={educationId}
          educationName={educationName}
          education_degree={educationDegree}
          cumulativeGpa={gpa}
          educationDescription={description}
          educationDate={educationDate}
          jobHunterId={jobHunterId}
        />
      </ModalContainer>

      <ModalContainer
        isOpen={
          currentModalId === "deleteEducationModal" && editId === educationId
        }
        onClose={handleCloseModal}
      >
        <ConfirmDelete
          disableState={pendingState.actionDisable}
          loadingState={pendingState.actionLoading}
          onDelete={() => {
            dispatch(
              deleteEducation({
                token: accessToken as string,
                education_id: educationId as number,
              }),
            );
          }}
        />
      </ModalContainer>
      <div
        className={`border border-neutral-200 rounded-xl p-4 flex flex-col gap-4`}
      >
        <div className={`flex gap-2 item-center justify-between`}>
          <div className={`flex flex-col gap-1`}>
            <h3 className={`text-sm font-bold text-neutral-950`}>
              {educationName}
            </h3>
            <div className={`flex gap-3 item-center`}>
              <p className={`text-xs text-neutral-600`}>
                {EducationDegreeResult[educationDegree]}
              </p>
              <div className={`w-[1px] h-full border border-neutral-200`}></div>
              <p className={`text-xs text-neutral-600`}>GPA:{gpa}</p>
            </div>
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
                  dispatch(openModalAction("editEducationModal", educationId))
                }
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  dispatch(
                    openModalAction("deleteEducationModal", educationId),
                  );
                }}
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

export default EducationItem;
