import React, { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { ProfileHandler } from "@/utils/profile.utils";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { closeModalAction } from "@/store/slices/ModalSlice";
import { updatePhoto } from "@/store/slices/authSlice";
import LoadingLoader from "@/components/LoadingLoader";
import { AxiosResponse } from "axios";

interface Props {
  image: File;
}

function UploadImage({ image }: Props) {
  const profileHandler = new ProfileHandler();
  const [selectedImage, setSelectedImage] = useState<File>(image);
  const [isLoading, setIsLoading] = useState(false);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const { innerId, user_role } = useSelector((state: RootState) => state.auth);
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

    setIsLoading(true);
    try {
      const response = (await profileHandler.updateProfileImage(
        accessToken as string,
        data,
        user_role as string,
      )) as AxiosResponse;
      if (response.status === 200) {
        toast.success("Image uploaded successfully.");
        dispatch(updatePhoto(response.data.data));
        dispatch(closeModalAction());
      } else {
        toast.error(
          "Failed to update image, make sure its JPG or PNG and Max Size is 2 MB",
        );
      }
    } catch (error: any) {
      toast.error(
        "Failed to update image, make sure its JPG or PNG and Max Size is 2 MB",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <Image
        width={128}
        height={128}
        alt="preview profile image"
        src={URL.createObjectURL(selectedImage as File)}
        className="rounded-full w-[128px] h-[128px] border border-neutral-100 object-cover"
      />
      <label className="inline-block" htmlFor="fileUpload">
        <span className="cursor-pointer underline">Change Image</span>
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
        className="w-full sm:w-fit"
        variant="primary"
      >
        {isLoading ? LoadingLoader() : "Upload & Save"}
      </Button>
    </div>
  );
}

export default UploadImage;
