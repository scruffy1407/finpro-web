import React, { useState } from "react";
import ButtonComponent from "./ButtonComponent";

type UserProfile = {
  name: string;
  gender: string;
  dob: Date | null;
  location_city: string;
  location_province: string;
};

interface CompleteProfilePopupProps {
  currentProfile: UserProfile;
  onSubmit: (updatedProfile: UserProfile) => void;
  onClose: () => void;
}

export const CompleteProfilePopup = ({
  currentProfile,
  onSubmit,
  onClose,
}: CompleteProfilePopupProps) => {
  const [profile, setProfile] = useState<UserProfile>(currentProfile);
  const [loading, setLoading] = useState(false);

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    const dateObject = dateValue ? new Date(dateValue) : null;
    setProfile({ ...profile, dob: dateObject });
  };

  const handleInputChange = <K extends keyof UserProfile>(
    key: K,
    value: UserProfile[K],
  ) => {
    setProfile({ ...profile, [key]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(profile);
    } catch (error) {
      console.error("Error submitting profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="flex flex-col bg-white rounded-2xl shadow-lg w-11/12 md:w-5/12 p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-8 font-bold text-lg text-neutral-900 hover:text-gray-600"
        >
          ✕
        </button>
        {/* Main Title & paragraph */}
        <h2 className="text-lg font-semibold mb-4 break-words text-neutral-900">
          Before You Continue, Let&apos;s Complete Your Profile
        </h2>
        <p className="flex flex-col mb-4 break-words text-neutral-600">
          Having a complete profile makes it easier for recruiters to find the
          perfect candidate for the job!
        </p>

        {/* Name */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-1 text-neutral-900">
              Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full border border-neutral-400 rounded-xl px-3 py-2"
            />
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="block font-medium mb-4 text-neutral-900">
              Gender
            </label>
            <div className="flex gap-6 flex-wrap">
              {["Male", "Female", "Others"].map((option) => (
                <label key={option} className="flex ml-2 items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={profile.gender === option}
                    onChange={() => handleInputChange("gender", option)}
                    className="w-4 h-4"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* DOB */}
          <div className="mb-4 w-full">
            <label className="block font-medium mb-1 text-neutral-900">
              Date of Birth
            </label>
            <div className="flex flex-col w-full">
              <input
                type="date"
                value={
                  profile.dob ? profile.dob.toISOString().split("T")[0] : ""
                }
                onChange={handleDobChange}
                className="w-full border border-neutral-400 rounded-xl px-3 py-2 text-neutral-900"
              />
            </div>
          </div>

          {/* Province & city */}
          <div className="mb-6">
            <label className="block font-medium mb-1 text-neutral-900">
              Where do you currently live?
            </label>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <select
                  value={profile.location_province}
                  onChange={(e) =>
                    handleInputChange("location_province", e.target.value)
                  }
                  className="w-full border border-neutral-400 text-neutral-900 rounded-xl px-3 py-3"
                >
                  <option value="">Select Province</option>
                  <option value="province1">Province 1</option>
                  <option value="province2">Province 2</option>
                </select>
              </div>
              <div className="w-full md:w-1/2 text-neutral-400">
                <select
                  value={profile.location_city}
                  onChange={(e) =>
                    handleInputChange("location_city", e.target.value)
                  }
                  className="w-full border border-neutral-400 text-neutral-900 rounded-xl px-3 py-3"
                >
                  <option value="">Select City</option>
                  <option value="city1">City 1</option>
                  <option value="city2">City 2</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save & Continue Button */}
          <div className="flex justify-start">
            <ButtonComponent
              type="ButtonFilled"
              container={loading ? "Saving..." : "Save & Continue"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfilePopup;
