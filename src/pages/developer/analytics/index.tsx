import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { AuthHandler } from "@/utils/auth.utils";
import { Navbar } from "@/components/NavigationBar/Navbar";
import LoadingLoader from "@/components/LoadingLoader";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

interface GenderData {
  gender: string | null;
  _count: {
    _all: number;
  };
}

interface LocationProvinceData {
  location_province: string | null;
  _count: {
    _all: number;
  };
}

interface SalaryTrendsData {
  category: string;
  salaryMin: string;
  salaryMax: string;
}

interface CategoryData {
  categoryName: string;
  jobPostCount: number;
}

interface AdditionalData {
  totalUsers: number;
  totalJobs: number;
  activeSubscriptions: number;
}

function AnalyticsDashboard() {
  const authHandler = new AuthHandler();
  const pagePermission = "developer";
  authHandler.authorizeUser(pagePermission);

  const [genderData, setGenderData] = useState<GenderData[] | null>(null);
  const [locationProvinceData, setLocationProvinceData] = useState<
    LocationProvinceData[] | null
  >(null);
  const [ageGroupData, setAgeGroupData] = useState<Record<
    string,
    number
  > | null>(null);
  const [salaryTrendsData, setSalaryTrendsData] = useState<
    SalaryTrendsData[] | null
  >(null);
  const [categoryData, setCategoryData] = useState<CategoryData[] | null>(null);
  const [additionalData, setAdditionalData] = useState<AdditionalData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalyticsData = async () => {
    const token = Cookies.get("accessToken");
    try {
      setIsLoading(true);
      const [
        genderResponse,
        locationProvinceResponse,
        ageGroupResponse,
        salaryTrendsResponse,
        categoryResponse,
        additionalResponse,
      ] = await Promise.all([
        axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dev/analytics/gender`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        ),
        axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dev/analytics/locationprovince`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        ),
        axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dev/analytics/agegroups`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        ),
        axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dev/analytics/salarytrends`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        ),
        axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dev/analytics/category`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        ),
        axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dev/analytics/additionaldata`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        ),
      ]);

      setGenderData(genderResponse.data.data);
      setLocationProvinceData(locationProvinceResponse.data.data);
      setAgeGroupData(ageGroupResponse.data.data);
      setSalaryTrendsData(salaryTrendsResponse.data.data);
      setCategoryData(categoryResponse.data.data);
      setAdditionalData(additionalResponse.data.data);
    } catch (err) {
      setError("Failed to fetch analytics data.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  if (error) return <p>{error}</p>;
  return (
    <>
      <Navbar pageRole={"developer"} />

      {isLoading ? (
        <div
          className={
            "h-[500px] max-w-screen-sm mx-auto flex justify-center items-center"
          }
        >
          <LoadingLoader />
        </div>
      ) : (
        <main className="max-w-screen-xl mx-auto px-4 mt-10">
          <div className="space-y-6 mx-auto">
            <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

            {/* Additional Data */}
            {additionalData && (
              <div className="w-full mx-auto text-center">
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <li className="font-semibold p-4 bg-white rounded-2xl">
                    Total Users: {additionalData.totalUsers}
                  </li>
                  <li className="font-semibold p-4 bg-white rounded-2xl">
                    Total Jobs: {additionalData.totalJobs}
                  </li>
                  <li className="font-semibold p-4 bg-white rounded-2xl">
                    Active Subscriptions: {additionalData.activeSubscriptions}
                  </li>
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1  gap-8 p-4 bg-white rounded-2xl lg:grid-cols-2 lg:p-10">
              {/* Gender Chart */}
              {genderData && (
                <div className="w-full lg:w-4/5 mx-auto text-center">
                  <h2 className="text-xl font-semibold py-4">
                    Gender Distribution
                  </h2>
                  <div className="relative w-full max-w-xs mx-auto">
                    <Doughnut
                      data={{
                        labels: [
                          "male",
                          "female",
                          "other",
                          "Data Not Provided",
                        ],
                        datasets: [
                          {
                            data: [
                              genderData.find((item) => item.gender === "male")
                                ?._count._all || 0,
                              genderData.find(
                                (item) => item.gender === "female",
                              )?._count._all || 0,
                              genderData.find((item) => item.gender === "other")
                                ?._count._all || 0,
                              genderData.find((item) => !item.gender)?._count
                                ._all || 0,
                            ],
                            backgroundColor: [
                              "#36A2EB",
                              "#FF6384",
                              "#FFCE56",
                              "#B3B3B3",
                            ],
                          },
                        ],
                      }}
                    />
                  </div>
                  <p className="mt-2 text-sm text-neutral-500">
                    * &quot;Data Not Provided&quot; = users who haven&apos;t
                    provided their gender information.
                  </p>
                </div>
              )}

              {/* Age Groups Chart */}
              {ageGroupData && (
                <div className="w-full mx-auto text-center">
                  <h2 className="text-xl font-semibold py-4">Age Groups</h2>
                  <div className="flex justify-center items-center">
                    <Bar
                      data={{
                        labels: Object.keys(ageGroupData),
                        datasets: [
                          {
                            label: "Users",
                            data: Object.values(ageGroupData),
                            backgroundColor: "#FFCE56",
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: { display: false },
                        },
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Location Province Chart */}
            {locationProvinceData && (
              <div className="w-full h-full lg:w-full mx-auto text-center lg:p-10 bg-white rounded-2xl">
                <h2 className="text-xl font-semibold py-4">
                  Location (Province)
                </h2>
                <Bar
                  data={{
                    labels: locationProvinceData.map(
                      (item) => item.location_province || "Data Not Provided",
                    ),
                    datasets: [
                      {
                        label: "Users",
                        data: locationProvinceData.map(
                          (item) => item._count._all,
                        ),
                        backgroundColor: "#36A2EB",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: false },
                    },
                  }}
                />
                <p className="mt-4 text-sm text-gray-500">
                  * &quot;Data Not Provided&quot; = users who haven&apos;t
                  provided their location.
                </p>
              </div>
            )}

            {/* Popular Categories Chart */}
            {categoryData && (
              <div className="w-full h-full mx-auto text-center p-4 bg-white rounded-2xl lg:p-10 ">
                <h2 className="text-xl font-semibold py-4">
                  Popular Categories
                </h2>
                <div className="w-full">
                  <Bar
                    data={{
                      labels: categoryData.map((item) => item.categoryName),
                      datasets: [
                        {
                          label: "Job Post Counts",
                          data: categoryData.map((item) => item.jobPostCount),
                          backgroundColor: categoryData.map(
                            (_, index) =>
                              [
                                "#FF6384", // Red
                                "#36A2EB", // Blue
                                "#FFCE56", // Yellow
                                "#4BC0C0", // Teal
                                "#9966FF", // Purple
                                "#FFA07A", // Light Salmon
                                "#8A2BE2", // Blue Violet
                              ][index % 7], // Cycle through colors
                          ),
                        },
                      ],
                    }}
                    options={{
                      indexAxis: "y", // Horizontal bar chart
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "top",
                        },
                      },
                      scales: {
                        x: {
                          beginAtZero: true,
                        },
                      },
                    }}
                    height={450} // Adjust height for better responsiveness
                  />
                </div>
              </div>
            )}

            {/* Salary Trends Chart */}
            {salaryTrendsData && (
              <div className="w-full h-full mx-auto text-center p-4 lg:p-10 bg-white rounded-2xl ">
                <h2 className="text-2xl font-semibold py-4">Salary Trends</h2>
                <div className="w-full">
                  <Bar
                    data={{
                      labels: salaryTrendsData.map((item) => item.category),
                      datasets: [
                        {
                          label: "Min Salary",
                          data: salaryTrendsData.map((item) =>
                            parseFloat(item.salaryMin),
                          ),
                          backgroundColor: "#FF6384",
                        },
                        {
                          label: "Max Salary",
                          data: salaryTrendsData.map((item) =>
                            parseFloat(item.salaryMax),
                          ),
                          backgroundColor: "#36A2EB",
                        },
                      ],
                    }}
                    options={{
                      indexAxis: "y", // Horizontal bar chart
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "top",
                        },
                      },
                      scales: {
                        x: {
                          beginAtZero: true,
                        },
                      },
                    }}
                    height={450} // Adjust height for better responsiveness
                  />
                </div>
              </div>
            )}
          </div>
        </main>
      )}
    </>
  );
}

export default AnalyticsDashboard;
