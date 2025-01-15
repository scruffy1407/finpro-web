import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/NavigationBar/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AuthHandler } from "@/utils/auth.utils";
import api from "@/pages/api/api";
import LoadingLoader from "@/components/LoadingLoader";
import { toast } from "sonner";
import Header from "@/components/Header";

interface CertificateDate {
  name: string;
  issueDate: string;
  testName: string;
}

function Index() {
  const authHandler = new AuthHandler();
  authHandler.authorizeUser();

  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [certificate, setCertificate] = useState<CertificateDate>({
    issueDate: "",
    testName: "",
    name: "",
  });

  async function handleCheckCertificate(inputValue: string) {
    try {
      setIsShow(false);
      setIsLoading(true);
      setIsDisable(true);
      const response = await api.get(
        `/api/user//verify-certificate/${inputValue}`,
      );
      if (response.status === 200) {
        if (response.data.code === "NO_EXIST") {
          setIsShow(false);
          toast.error(
            "Certificate not found. Please double-check the certificate number and try again.",
          );
          setIsLoading(false);
        }
        if (response.data.code === "OK") {
          setIsShow(true);
          setCertificate({
            name: response.data.data.name,
            testName: response.data.data.testName,
            issueDate: response.data.data.issueDate,
          });
          setIsLoading(false);
        }
        // ADD DATA TO CERTIFICATE
      }
    } catch (e) {}
  }
  useEffect(() => {
    setIsDisable(inputValue === "");
  }, [inputValue]);

  return (
    <>
      <Header>
        <title>Verify Pathway Certificate</title>
        <meta
          name="description"
          content={`Quickly and easily confirm the authenticity of your Pathway Certificate.`}
        />
      </Header>
      <main className={"py-4"}>
        <Navbar pageRole={"jobhunter"} />
        <section className={"mt-10"}>
          <div
            className={
              "max-w-screen-sm mx-auto  p-6 rounded-2xl text-center flex flex-col gap-10 items-center"
            }
          >
            <Image
              src={"/searchCertificate.svg"}
              width={256}
              height={256}
              alt={"Search Certificate"}
              className={"w-48 "}
            />
            <div>
              <h1 className={"text-neutral-950 text-3xl font-bold mb-4"}>
                Verify Pathway Certificate
              </h1>
              <p className={"text-sm text-neutral-600 mb-6"}>
                Verify any certificate issued by Pathway. Enter the certificate
                number below.
              </p>
              <Input
                className={"rounded-xl text-center mb-6"}
                type={"text"}
                placeholder={"Enter Certificate Number"}
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputValue(e.target.value)
                }
              />
              <Button
                disabled={isDisable}
                onClick={() => handleCheckCertificate(inputValue)}
                variant={"primary"}
                className={"w-full"}
              >
                {isLoading ? LoadingLoader() : "Verify Certificate"}
              </Button>
            </div>
          </div>
        </section>

        {/* CHIPS */}

        <section
          className={`m-5 md:mt-10 px-4 ${isShow ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
        >
          <div
            className={
              "max-w-screen-sm mx-auto p-6 bg-green-50 border-2 border-green-500 rounded-2xl shadow-2xl flex flex-col gap-4 md:flex-row md:justify-between md:items-center"
            }
          >
            <div>
              <h2
                className={
                  "text-lg font-bold mb-1 text-neutral-950 text-center md:text-left"
                }
              >
                {certificate.name}
              </h2>
              <p
                className={"text-sm text-neutral-600 text-center md:text-left"}
              >
                Success completing {certificate.testName}
              </p>
            </div>

            <div className={"px-4 py-2 rounded-full bg-green-600"}>
              <p
                className={
                  "text-sm font-bold text-white text-center md:text-left"
                }
              >
                Issue at {certificate.issueDate}
              </p>
            </div>
          </div>
        </section>

        {/*/!* CHIPS *!/*/}
        {/*{isShow && (*/}
        {/*  <section className={"m-5 md:mt-10 px-4"}>*/}
        {/*    <div*/}
        {/*      className={*/}
        {/*        "max-w-screen-sm mx-auto p-6 bg-green-50 border-2 border-green-500 rounded-2xl shadow-2xl flex flex-col gap-4 md:flex-row md:justify-between md:items-center opacity-0 transition-opacity duration-300"*/}
        {/*      }*/}
        {/*    >*/}
        {/*      <div>*/}
        {/*        <h2*/}
        {/*          className={*/}
        {/*            "text-lg font-bold mb-1 text-neutral-950 text-center md:text-left"*/}
        {/*          }*/}
        {/*        >*/}
        {/*          {certificate.name}*/}
        {/*        </h2>*/}
        {/*        <p*/}
        {/*          className={"text-sm text-neutral-600 text-center md:text-left"}*/}
        {/*        >*/}
        {/*          Success completing {certificate.testName}*/}
        {/*        </p>*/}
        {/*      </div>*/}

        {/*      <div className={"px-4 py-2 rounded-full bg-green-600"}>*/}
        {/*        <p*/}
        {/*          className={*/}
        {/*            "text-sm font-bold text-white text-center md:text-left"*/}
        {/*          }*/}
        {/*        >*/}
        {/*          Issue at {certificate.issueDate}*/}
        {/*        </p>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </section>*/}
        {/*)}*/}
      </main>
    </>
  );
}

export default Index;
