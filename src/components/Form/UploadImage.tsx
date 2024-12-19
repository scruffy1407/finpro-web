import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UpdateImage } from "@/models/auth.model";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { ProfileHandler } from "@/utils/profile.utils";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { closeModalAction } from "@/store/slices/ModalSlice";
import { updatePhoto } from "@/store/slices/authSlice";
import LoadingLoader from "@/components/LoadingLoader";

interface Props {
  image: File;
}

function UploadImage({ image }: Props) {
  const profileHandler = new ProfileHandler();
  const [selectedImage, setSelectedImage] = useState<File>(image);
  const [isLoading, setIsLoading] = useState(false);
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const { innerId } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  async function handleUploadImage() {
    const accessToken = Cookies.get("accessToken");
    const data = new FormData();
    data.append("id", (innerId as number).toString());
    data.append("image", selectedImage);

    try {
      const response = await profileHandler.updateProfileImage(
        accessToken as string,
        data,
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Image uploaded successfully.");
        dispatch(updatePhoto(response.data.data));
        dispatch(closeModalAction());
      } else {
        toast.error("Maximal image size is only 1MB");
      }
    } catch (e) {
      toast.error("Failed to update image.");
    }
  }

  console.log(innerId);

  return (
    <div className={"flex flex-col justify-centers items-center gap-6"}>
      <Image
        width={128}
        height={128}
        alt={`preview profile image`}
        src={URL.createObjectURL(selectedImage as File)}
        className="rounded-full w-[128px] h-[128px] border border-neutral-100 object-cover "
      />
      <label className={`inline-block`} htmlFor="fileUpload">
        <span className=" cursor-pointer underline">Change Image</span>
      </label>
      <input
        type="file"
        id="fileUpload"
        name="myfile"
        accept="image/*"
        className="hidden"
        ref={hiddenFileInput}
        onChange={handleImageChange}
      />

      <Button
        onClick={handleUploadImage}
        className={`w-full sm:w-fit`}
        variant={"primary"}
      >
        {isLoading ? LoadingLoader() : "Upload & Save"}
      </Button>
    </div>
  );
}

export default UploadImage;
