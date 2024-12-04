import React, { useEffect } from "react";
import { AuthHandler } from "@/utils/auth.utils";
import { useRouter } from "next/router";

function Index() {
  const router = useRouter();
  const authHandler = new AuthHandler();
  const dummyToken: string = "123456";
  const dummyRole = "company";
  async function getPaymentDetail() {
    // Use this method if we need to validate page based on the paramsId --> paymentId need to match with the userId

    const paymentAPI = new Promise((resolve: any, reject: any) => {
      setTimeout(() => {
        resolve("10");
        return "failed";
      }, 2000);
    });

    paymentAPI
      .then((res) => {
        authHandler.authorizeUser(dummyToken, dummyRole, res as string);
      })
      .catch((err) => {
        console.log(err);
        router.push("/");
      });

    // const response: AxiosResponse = await axios
    //   .get("/testing")
    //   .then((res: any) => {
    //     authHandler.authorizeUser(dummyToken, dummyRole, res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     router.push("/");
    //   });
  }

  useEffect(() => {
    getPaymentDetail();
  }, []);
  return (
    <div>
      <h1 className={`text-3xl`}>Lagi testing Company</h1>
    </div>
  );
}

export default Index;
