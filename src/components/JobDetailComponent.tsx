import React from "react";
import Image from "next/image";
import ButtonComponent from "./ButtonComponent";

interface JobDetailProps {
  onApplyJob: () => void;
}

export default function JobDetailComponent({ onApplyJob }: JobDetailProps) {
  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col justify-between max-w-screen-xl mx-auto bg-white mt-5 rounded-xl px-4 md:flex-row md:px-0">
        <div className="flex flex-col md:pl-8 py-6 gap-6 md:gap-2 w-[100%] md:w-[60%]">
          {/* Breadcrumb */}
          <div className="text-sm text-neutral-600 gap-2 items-center hidden md:flex">
            <span className="cursor-pointer hover:underline">Home</span>
            <span>/</span>
            <span className="cursor-pointer hover:underline">Find Jobs</span>
            <span>/</span>
            <span className="cursor-pointer hover:underline">Tokopedia</span>
            <span>/</span>
            <span className="text-neutral-900 font-semibold">
              Senior React Developer
            </span>
          </div>
          {/* Company Info */}
          <div className="flex gap-2 mt-4 justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                src="/companies/Tokopedia.svg"
                alt="Tokopedia Icon"
                width={30}
                height={30}
              />
              <h2 className="text-lg">Tokopedia</h2>
            </div>
            <div className="flex justify-center items-center md:hidden">
              <ButtonComponent type="ButtonBookmark" container="Bookmarks" />
            </div>
          </div>
          <h2 className="font-bold text-2xl mt-4">Senior React Developer</h2>
        </div>
        {/* DIV OUTER KANAN */}
        <div className="flex flex-col justify-center px-6 gap-2 mt-5 mb-5 items-start md:items-end">
          <div className="flex gap-6">
            <div className="items-center justify-center hidden md:flex">
              <ButtonComponent type="ButtonBookmark" container="Bookmarks" />
            </div>
            {/* DUMMY CICK ONAPPLYJOB TO SHOW THE FE!! */}
            <ButtonComponent type="ButtonFilled" container="Apply Now" onClick={onApplyJob}/>
          </div>
          <p className="w-full text-center">
            Job expire in: <span className="text-red-500">20 Jun 2024</span>
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-10 gap-4 mt-5">
        {/* Left Section: Job Overview & Description */}
        <div className="sm:col-span-7">
          {/* Job Overview */}
          <div className="bg-white rounded-xl px-4 md:px-8 py-8 mb-4">
            {/* Title */}
            <h3 className="font-bold text-xl mb-6">Job Overview</h3>

            {/* Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-4 gap-2">
              {/* Job Type */}
              <div className="flex items-center md:flex-col md:items-start">
                <Image
                  src="/jobAsset/Briefcase.svg"
                  alt="Job Type Icon"
                  width={32}
                  height={32}
                  className="w-8 h-8 mb-0 md:mb-2 md:mr-0 mr-4"
                />
                <div>
                  <p className="text-neutral-400 hidden md:block">Job Type</p>
                  <p className="font-bold text-neutral-900">Full Time</p>
                </div>
              </div>

              {/* Experience */}
              <div className="flex items-center md:flex-col md:items-start">
                <Image
                  src="/jobAsset/Notebook.svg"
                  alt="Experience Icon"
                  width={32}
                  height={32}
                  className="w-8 h-8 mb-0 md:mb-2 md:mr-0 mr-4"
                />
                <div>
                  <p className="text-neutral-400 hidden md:block">Experience</p>
                  <p className="font-bold text-neutral-900">1 - 3 Years</p>
                </div>
              </div>

              {/* Salary */}
              <div className="flex items-center md:flex-col md:items-start">
                <Image
                  src="/jobAsset/Wallet.svg"
                  alt="Salary Icon"
                  width={32}
                  height={32}
                  className="w-8 h-8 mb-0 md:mb-2 md:mr-0 mr-4"
                />
                <div>
                  <p className="text-neutral-400 hidden md:block">Salary</p>
                  <p className="font-bold text-neutral-900">8.5 Jt - 10 Jt</p>
                </div>
              </div>

              {/* Work Location */}
              <div className="flex items-center md:flex-col md:items-start">
                <Image
                  src="/jobAsset/MapPin.svg"
                  alt="Work Location Icon"
                  width={32}
                  height={32}
                  className="w-8 h-8 mb-0 md:mb-2 md:mr-0 mr-4"
                />
                <div>
                  <p className="text-neutral-400 hidden md:block">
                    Work Location
                  </p>
                  <p className="font-bold text-neutral-900">Remote Working</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Responsibilities */}
          <div className="bg-white rounded-xl px-4 md:px-8 py-8">
            <div className="mb-8">
              <h3 className="font-bold text-neutral-900 text-xl mb-4">
                Job Description
              </h3>
              <p className="text-neutral-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                ratione voluptates sunt dolore. Non ducimus quae quia nostrum
                vel debitis earum quo veniam, rem aspernatur ipsam cum facere.
                Quam, delectus!. Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Voluptatem at ipsum eos repellat facilis
                temporibus vero ut fuga autem voluptas, illo magni totam neque
                quo provident! Pariatur ipsum dolorum dolores?. Lorem ipsum
                dolor sit amet consectetur, adipisicing elit. Deserunt iusto
                ipsam veniam exercitationem nostrum eveniet aperiam inventore
                qui consequuntur? Vitae laborum eos, veniam optio cumque culpa
                dignissimos iusto ut facilis. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Aut saepe cum expedita eligendi.
                Suscipit blanditiis officiis minima atque cumque est velit
                excepturi odio ut. Hic voluptatum soluta magni totam ullam.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-xl mb-4">
                Responsibilities
              </h3>
              <p className="text-neutral-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                ratione voluptates sunt dolore. Non ducimus quae quia nostrum
                vel debitis earum quo veniam, rem aspernatur ipsam cum facere.
                Quam, delectus!. Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Voluptatem at ipsum eos repellat facilis
                temporibus vero ut fuga autem voluptas, illo magni totam neque
                quo provident! Pariatur ipsum dolorum dolores?. Lorem ipsum
                dolor sit amet consectetur, adipisicing elit. Deserunt iusto
                ipsam veniam exercitationem nostrum eveniet aperiam inventore
                qui consequuntur? Vitae laborum eos, veniam optio cumque culpa
                dignissimos iusto ut facilis. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Aut saepe cum expedita eligendi.
                Suscipit blanditiis officiis minima atque cumque est velit
                excepturi odio ut. Hic voluptatum soluta magni totam ullam.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: Company Information */}
        <div className="md:h-1/2 md:col-span-3 sm:col-span-7 text-neutral-900 bg-white rounded-xl px-4 md:px-8 py-6 flex flex-col justify-between">
          <h2 className="font-bold text-xl">Company Information</h2>

          <div className="flex flex-col">
            <Image
              src="/companies/Tokopedia.svg"
              alt="Company Logo"
              width={40}
              height={64}
              className="w-10 h-16 mr-4"
            />
            <h2 className="text-lg">Tokopedia</h2>
          </div>

          <h3 className="text-md font-medium text-neutral-600">
            Retail, Logistic & Consumer Goods
          </h3>

          <div className="flex items-center my-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5 text-yellow-400 mr-2"
            >
              <path d="M12 .587l3.668 7.431 8.215 1.179-5.918 5.775 1.395 8.128L12 18.896l-7.36 3.883 1.395-8.128L.117 9.197l8.215-1.179L12 .587z" />
            </svg>
            <h3 className="text-md font-medium">
              4.5 <></>
              <span className="text-neutral-600 underline">(150 reviews)</span>
            </h3>
          </div>

          <p className="text-sm text-neutral-600 py-2 flex justify-between">
            <span>Company Size:</span>
            <span className="text-neutral-900 text-right">1000+ Employers</span>
          </p>

          <p className="text-sm text-neutral-600 flex justify-between">
            <span>Website:</span>
            <a
              href="https://example.com"
              className="text-neutral-900 underline hover:text-blue-500"
            >
              Link Website
            </a>
          </p>

          <h2 className="font-bold text-lg mt-6 text-center">Detail Company</h2>
        </div>
      </div>
      {/* Share Section */}
      <div className="max-w-screen-xl mx-auto mt-5 rounded-xl px-4 md:px-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="text-lg whitespace-nowrap items-center sm:items-center">
            Share this job:
          </p>
          <ButtonComponent
            type="ButtonSocial"
            container="Facebook"
            icon={"/companies/Facebook.svg"}
          />
          <ButtonComponent
            type="ButtonSocial"
            container="Twitter"
            icon={"https://skillicons.dev/icons?i=twitter"}
          />
        </div>
      </div>
    </div>
  );
}
