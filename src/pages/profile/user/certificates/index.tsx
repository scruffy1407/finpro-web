import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/NavigationBar/Navbar";
import { PDFViewer } from "@react-pdf/renderer";
import axios from "axios";
import CertificatePDF from "@/components/GenerateCertificate/CertificatePDF";
import CertificateCard from "@/components/GenerateCertificate/CertificateCard";
import { AuthHandler } from "@/utils/auth.utils";
import Cookies from "js-cookie";
import VerifyBanner from "@/components/VerifyBanner";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface Certificate {
  certificate_id: string;
  certificate_name: string;
  certificate_issuer: string;
  certificate_date: string;
  certificate_unique_id: string;
  id: string;
  name: string;
  issuer: string;
  score: number;
  skillName: string;
  date: string;
  uniqueId: string;
  profileName: string;
  logo: string;
}

interface SkillAssessment {
  certificate: Certificate[];
  completion_score: string;
  skillAssessment: {
    skill_assessment_name: string;
    skill_badge: string;
  };
}

const CertificatePage = () => {
  const authHandler = new AuthHandler();
  const pagePermission = "jobhunter";
  authHandler.authorizeUser(pagePermission);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const { isVerified, isLoggedIn } = useSelector(
    (state: RootState) => state.auth,
  );
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPDF, setShowPDF] = useState(false);

  // Fetch certificates from the API
  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("accessToken");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/certificate/certificate`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const certificatedata = response.data?.certificatedata;
        const jobHunterData = certificatedata?.jobHunter?.[0];

        if (jobHunterData) {
          const profileName = jobHunterData.name;
          const skillAssessments =
            jobHunterData?.skillAssessmentCompletion || [];
          const fetchedCertificates = skillAssessments.flatMap(
            (assessment: SkillAssessment) =>
              assessment.certificate.map((cert: Certificate) => ({
                id: cert.certificate_id,
                name: assessment.skillAssessment.skill_assessment_name,
                issuer: cert.certificate_issuer,
                score: assessment.completion_score,
                skillName: assessment.skillAssessment.skill_assessment_name,
                date: cert.certificate_date,
                uniqueId: cert.certificate_unique_id,
                profileName: profileName,
                logo: assessment.skillAssessment.skill_badge,
              })),
          );
          setCertificates(fetchedCertificates);
          setError(null);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to fetch certificates. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  // Show PDF of selected certificate
  const handleShowCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setShowPDF(true);
  };

  return (
    <>
      <main className="px-4">
        <Navbar pageRole={"jobhunter"} />
        {isLoggedIn && !isVerified && <VerifyBanner />}

        <section className="w-full mt-10">
          <div className="w-full mx-auto text-center rounded-2xl bg-cover object-center">
            <div className="flex flex-col gap-4 items-center max-w-[560px] mx-auto">
              <h1 className="text-xl md:text-3xl font-bold text-neutral-950">
                Certificates List
              </h1>
              <p className="text-sm text-neutral-600">
                Showcase your expertise with our professionally recognized skill
                assessments and earn certificates that highlight your
                achievements to potential employers.
              </p>
            </div>
          </div>
        </section>
        <section className="max-w-screen-md mx-auto mt-10 flex flex-col gap-4 items-center">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : certificates.length > 0 ? (
            certificates.map((certificate) => (
              <CertificateCard
                key={certificate.id}
                certificate_name={certificate.name}
                certificate_issuer={certificate.issuer}
                completion_score={certificate.score}
                logo={certificate.logo}
                showCertificate={() => handleShowCertificate(certificate)}
              />
            ))
          ) : (
            <p>No certificates available.</p>
          )}
        </section>
        {showPDF && selectedCertificate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[90%] h-[90%]">
              <PDFViewer width="100%" height="100%">
                <CertificatePDF
                  profile={{ name: selectedCertificate.profileName }}
                  certificates={[selectedCertificate]}
                />
              </PDFViewer>
              <button
                onClick={() => setShowPDF(false)}
                className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default CertificatePage;
