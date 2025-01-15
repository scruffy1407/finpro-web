import React from "react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import PreSelectionTestCreateForm from "./PreSelectionTestCreateForm";
import axios from "axios";

function PreSelectionDashLeft() {
  const accessToken = Cookies.get("accessToken");
  const [showForm, setShowForm] = useState(false);
  const [setPreSelectionTests] = useState<any[]>([]);

  useEffect(() => {
    const fetchPreSelectionTests = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company/viewpretest`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const data = response.data;
        if (data.message === "Pre-selection tests fetched successfully") {
          setPreSelectionTests(data.data);
        }
      } catch (error) {
        console.error("Error fetching pre-selection tests:", error);
      }
    };
    fetchPreSelectionTests();
  }, [accessToken]);

  return (
    <div className="bg-white flex flex-col gap-6 w-full h-fit p-5 rounded-xl md:w-[250px] max-w-screen-xl">
      <div className={"flex flex-col gap-5 items-start"}>
        <div className={"flex flex-col gap-1"}>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className=" text-sm text-neutral-600 ">
            Manage all available Test here
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button variant="primary" onClick={() => setShowForm(true)}>
          Create Test
        </Button>

        <PreSelectionTestCreateForm
          showForm={showForm}
          setShowForm={setShowForm}
        />

        {/* <CreateJobForm showForm={showForm} setShowForm={setShowForm} /> */}
      </div>

      <div className="flex flex-col gap-3">
        <div className="border-t-[1px] border-gray-200 w-full"></div>
      </div>

      <div className={"flex gap-3 items-start"}>
        <div className={"flex flex-col gap-3 w-full"}>
          <h2 className="text-xl font-bold">PreSelection Test </h2>
        </div>
      </div>
    </div>
  );
}

export default PreSelectionDashLeft;
