import React from "react";
import { Button } from "@/components/ui/button";
import LoadingLoader from "@/components/LoadingLoader";

interface DeleteProp {
  disableState: boolean;
  loadingState: boolean;
  onDelete: () => void;
}

function ConfirmDelete({ onDelete, loadingState, disableState }: DeleteProp) {
  return (
    <div className={`flex flex-col items-center justify-center gap-5`}>
      <div className={"flex flex-col gap-2 justify-center items-center"}>
        <h3 className={"text-lg font-bold text-neutral-950"}>
          Are you sure want to delete this item?
        </h3>
        <p className={"text-sm text-neutral-600"}>
          You cannot undo this process
        </p>
      </div>

      <Button
        disabled={disableState}
        onClick={onDelete}
        variant={"destructive"}
      >
        {loadingState ? LoadingLoader() : "Confirm Delete"}
      </Button>
    </div>
  );
}

export default ConfirmDelete;
