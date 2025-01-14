import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import BadgeSkeleton from "../Skeleton/BadgeCardSkeleton";

interface SkillBadge {
  skill_assessment_name: string;
  skill_badge: string;
}

function BadgeSection() {
  const [badges, setBadges] = useState<SkillBadge[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBadges = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("accessToken");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/certificate/certificate`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const certificatedata = response.data?.certificatedata;
        const jobHunterData = certificatedata?.jobHunter?.[0];

        if (jobHunterData) {
          const skillAssessments =
            jobHunterData?.skillAssessmentCompletion || [];
          const fetchedBadges = skillAssessments.map(
            (assessment: { skillAssessment: SkillBadge }) => ({
              skill_assessment_name:
                assessment.skillAssessment.skill_assessment_name,
              skill_badge: assessment.skillAssessment.skill_badge,
            })
          );
          setBadges(fetchedBadges);
          setError(null);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to fetch badges. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, []);

  return (
    <section className="p-4 rounded-2xl bg-white flex flex-col gap-6 md:p-6">
      <h2 className="text-xl font-bold text-neutral-950">Skill Badges</h2>
      {loading ? (
        <BadgeSkeleton />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : badges.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 rounded-2xl border border-neutral-200"
            >
              <Image
                src={badge.skill_badge}
                alt={badge.skill_assessment_name}
                width={64}
                height={64}
                className="mb-2"
                priority={true}
              />
              <p className="text-sm font-medium text-center">
                {badge.skill_assessment_name}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No skill badges available.</p>
      )}
    </section>
  );
}

export default BadgeSection;
