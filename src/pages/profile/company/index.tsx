import React, { useRef, useState } from "react";
import { AuthHandler } from "@/utils/auth.utils";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyTab from "@/components/Tabs/ProfileCompany/CompanyTab"
// import SecurityTab from "@/components/Tabs/ProfileUser/SecurityTab";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import ModalContainer from "@/components/Modal/ModalContainer";
import { closeModalAction, openModalAction } from "@/store/slices/ModalSlice";
import UploadImage from "@/components/Form/UploadImage";
import { Navbar } from "@/components/NavigationBar/Navbar";

function CompanyProfilePage() {
  const authHandler = new AuthHandler();
  const pagePermission = "company";
  authHandler.authorizeUser(pagePermission);

  const { name, email, photo, phone_number } = useSelector(
    (state: RootState) => state.auth
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const { currentModalId } = useSelector((state: RootState) => state.modalController);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      dispatch(openModalAction("uploadFileImage"));
    }
  };

  const handleCloseModal = () => {
    dispatch(closeModalAction());
  };

  return (
    <>
      <ModalContainer
        isOpen={currentModalId === "uploadFileImage"}
        onClose={handleCloseModal}
        title={"Change Image"}
      >
        <UploadImage image={selectedImage as File} />
      </ModalContainer>
      <Navbar
      pageRole="company" />
      <section className="p-4">
        <div className="w-full flex flex-col gap-4 md:flex-row md:gap-6 md:max-w-screen-xl md:mx-auto">
          <div className="flex flex-col gap-5">
            <div className="p-4 flex flex-col gap-5 bg-white rounded-2xl md:h-fit md:p-6 md:max-w-64">
              <div className="flex items-end gap-2">
                <Image
                  width={72}
                  height={72}
                  src={photo || "/dummyProfile.png"}
                  alt="Image Profile"
                  className="rounded-full w-[72px] h-[72px] object-cover object-center border border-neutral-200"
                />
                <label className="inline-block" htmlFor="fileUpload">
                  <span className="text-xs cursor-pointer underline">
                    Change Image
                  </span>
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
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="text-lg font-bold text-neutral-950">
                  {name || "Company Name not available"}
                </h1>
                <p className="text-sm text-neutral-600">
                  {email || "Email not available"}
                </p>
                <p className="text-sm text-neutral-600">
                  {phone_number || "Phone number not available"}
                </p>
              </div>
            </div>
          </div>

          <Tabs className="w-full flex flex-col gap-4" defaultValue="account">
            <TabsList className="w-full rounded-2xl bg-white py-4 px-4 h-fit justify-start gap-4">
              <TabsTrigger
                className="px-4 py-2 rounded-2xl border data-[state=active]:bg-sky-50 data-[state=active]:border-blue-600"
                value="account"
              >
                Account
              </TabsTrigger>
              {/* <TabsTrigger
                className="px-4 py-2 rounded-2xl border data-[state=active]:bg-sky-50 data-[state=active]:border-blue-600"
                value="security"
              >
                Security
              </TabsTrigger> */}
            </TabsList>
            <CompanyTab value={"account"} />
            {/* <SecurityTab value={"security"} /> */}
          </Tabs>
        </div>
      </section>
    </>
  );
}

export default CompanyProfilePage;
