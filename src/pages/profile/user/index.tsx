import React, { useRef, useState, useEffect } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import axios from "axios";
import CVPDF from "@/components/GenerateCV/CVPdf";
import Cookies from "js-cookie";
import { AuthHandler } from "@/utils/auth.utils";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountTab from "@/components/Tabs/ProfileUser/AccountTab";
import NavbarComponent from "@/components/NavbarComponent";
import SecurityTab from "@/components/Tabs/ProfileUser/SecurityTab";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import ModalContainer from "@/components/Modal/ModalContainer";
import { closeModalAction, openModalAction } from "@/store/slices/ModalSlice";
import UploadImage from "@/components/Form/UploadImage";
import ButtonComponent from "@/components/ButtonComponent";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
}

interface Education {
  institution: string;
  degree: string;
  graduationDate: string;
  description: string;
}

interface ProfileData {
  name: string;
  email: string;
  address: string;
  phone: string;
  summary: string;
  experience: Experience[];
  education: Education[];
}

function ProfilePage() {
  const authHandler = new AuthHandler();
  const pagePermission = "jobhunter";
  authHandler.authorizeUser(pagePermission);
  const { name, email, photo } = useSelector((state: RootState) => state.auth);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const { currentModalId } = useSelector(
    (state: RootState) => state.modalController
  );

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

  // CV Generation State and Logic
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPDF, setShowPDF] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [jobHunterSubscriptionId, setJobHunterSubscriptionId] = useState<
    number | null
  >(null);
  const [subscriptionActive, setSubscriptionActive] = useState<boolean>(false);

  // Fetch data for the CV
  const fetchData = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("accessToken");
      const response = await axios.get("http://localhost:8000/api/cv/cv", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const cvData = response.data.cvdata.jobHunter[0];
      const jobHunterSubscriptionId =
        cvData?.jobHunterSubscription?.subscriptionId || null;
      const subscriptionActive =
        cvData?.jobHunterSubscription?.subscription_active || false;
      setJobHunterSubscriptionId(jobHunterSubscriptionId);
      setSubscriptionActive(subscriptionActive);
      console.log("jobHunterSubscriptionId:", jobHunterSubscriptionId);
      console.log("subscriptionActive:", subscriptionActive);

      const transformedData: ProfileData = {
        name: cvData.name,
        email: cvData.email,
        address: `${cvData.location_city}, ${cvData.location_province}`,
        phone: cvData.phone_number || "N/A",
        summary: cvData.summary,
        experience: cvData.workExperience.map(
          (exp: {
            company_name: string;
            job_title: string;
            start_date: string;
            end_date: string;
            job_description: string;
          }) => ({
            company: exp.company_name,
            position: exp.job_title,
            startDate: new Date(exp.start_date).toLocaleDateString(),
            endDate: exp.end_date
              ? new Date(exp.end_date).toLocaleDateString()
              : "Present",
            description: exp.job_description,
          })
        ),
        education: cvData.education.map(
          (edu: {
            education_name: string;
            education_degree: string;
            graduation_date: string;
            education_description: string;
          }) => ({
            institution: edu.education_name,
            degree: edu.education_degree,
            graduationDate: new Date(edu.graduation_date).toLocaleDateString(),
            description: edu.education_description,
          })
        ),
      };
      setProfileData(transformedData);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Get Remaining CV Quota
  const [remainingGenerations, setRemainingGenerations] = useState<
    number | null
  >(null);
  const fetchGenerationQuota = async () => {
    try {
      const token = Cookies.get("accessToken");
      const response = await axios.get("http://localhost:8000/api/cv/cvquota", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRemainingGenerations(response.data.remaining);
    } catch (error) {
      console.error("Failed to fetch quota", error);
    }
  };
  useEffect(() => {
    fetchGenerationQuota();
  }, []);

  // Tracking CV Counter
  const handleGenerateCV = async () => {
    try {
      const token = Cookies.get("accessToken");
      const response = await axios.post(
        "http://localhost:8000/api/cv/cvgenerate",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setShowPDF(true);
        await fetchGenerationQuota();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to generate CV", error);
      toast.error("Error generating CV.");
    }
  };

  // Confirmation Modal Popup
  const handleClosePDF = () => {
    setShowPDF(false);
    fetchGenerationQuota();
  };
  const openConfirmationModal = () => {
    setShowConfirmationModal(true);
  };
  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
  };
  const confirmGenerateCV = () => {
    closeConfirmationModal();
    handleGenerateCV();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <ModalContainer
        isOpen={currentModalId === "uploadFileImage"}
        onClose={handleCloseModal}
        title={"Change Image"}
      >
        <UploadImage image={selectedImage as File} />
      </ModalContainer>
      <NavbarComponent
        findJobs={`a`}
        skillAssessment={`a`}
        exploreCompanies={`a`}
        loginJobHunter={`a`}
        loginCompanies={`a`}
      />
      <section className="p-4 ">
        <div
          className={`w-full flex flex-col gap-4 md:flex-row md:gap-6 md:max-w-screen-xl md:mx-auto`}
        >
          <div className="flex flex-col gap-5">
            <div
              className={`p-4 flex flex-col gap-5 bg-white rounded-2xl md:h-fit md:p-6 md:max-w-64`}
            >
              <div className={"flex items-end gap-2"}>
                <Image
                  width={72}
                  height={72}
                  src={photo || "/dummyProfile.png"}
                  alt={"Image Profile"}
                  className={`rounded-full w-[72px] h-[72px] object-cover object-center border border-neutral-200`}
                />
                <label className={`inline-block`} htmlFor="fileUpload">
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

              <div className={`flex flex-col gap-2 `}>
                <h1 className={`text-lg font-bold text-neutral-950`}>
                  {name || "Name not available"}
                </h1>
                <p className={`text-sm text-neutral-600`}>
                  {email || "Email not available"}
                </p>
              </div>
            </div>
            <div>
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => {
                  if (
                    jobHunterSubscriptionId === 1 ||
                    subscriptionActive === false
                  ) {
                    toast.error("Please subscribe to access this feature.");
                  } else {
                    fetchData();
                    openConfirmationModal();
                  }
                }}
                disabled={
                  !profileData ||
                  loading ||
                  jobHunterSubscriptionId === null ||
                  jobHunterSubscriptionId === 1 ||
                  subscriptionActive === false ||
                  remainingGenerations === 0
                }
              >
                {jobHunterSubscriptionId === 1 || subscriptionActive === false
                  ? "Generate CV 🔒 (Premium)"
                  : `Generate CV (PDF) ${
                      remainingGenerations !== null
                        ? `(${remainingGenerations} left)`
                        : ""
                    }`}
              </Button>

              {showConfirmationModal && (
                <ModalContainer
                  isOpen={showConfirmationModal}
                  onClose={closeConfirmationModal}
                  title="Confirm CV Generation"
                >
                  <p>
                    Are you sure you want to generate a CV? This will
                    consume&nbsp;
                    <b>1 Quota</b>
                  </p>
                  <p>
                    <b className="text-red-500">
                      Make Sure You Fill All Profile Information Before
                      Proceeding
                    </b>
                  </p>
                  <div className="flex gap-4 mt-4">
                    <ButtonComponent
                      type="ButtonFilled"
                      container="Yes, Generate"
                      onClick={confirmGenerateCV}
                    />
                    <ButtonComponent
                      type="ButtonText"
                      container="Cancel"
                      onClick={closeConfirmationModal}
                    />
                  </div>
                </ModalContainer>
              )}
              {showPDF && profileData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white rounded-lg overflow-hidden">
                    <button
                      onClick={handleClosePDF}
                      className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded-2xl shadow-lg hover:bg-red-600 transition duration-200"
                    >
                      Close
                    </button>

                    <PDFViewer style={{ width: "1000px", height: "600px" }}>
                      <CVPDF profile={profileData} />
                    </PDFViewer>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Tabs className={`w-full flex flex-col gap-4`} defaultValue="account">
            <TabsList
              className={`w-full rounded-2xl bg-white py-4 px-4 h-fit justify-start gap-4 `}
            >
              <TabsTrigger
                className={
                  "px-4 py-2 rounded-2xl border data-[state=active]:bg-sky-50 data-[state=active]:border-blue-600"
                }
                value="account"
              >
                Account
              </TabsTrigger>
              <TabsTrigger
                className={
                  "px-4 py-2 rounded-2xl border data-[state=active]:bg-sky-50 data-[state=active]:border-blue-600"
                }
                value="security"
              >
                Security
              </TabsTrigger>
            </TabsList>
            <AccountTab value={"account"} />
            <SecurityTab value={"security"} />
          </Tabs>
        </div>
      </section>
    </>
  );
}

export default ProfilePage;
