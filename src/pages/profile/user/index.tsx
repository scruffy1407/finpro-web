import React from "react";
import { AuthHandler } from "@/utils/auth.utils";

function Index() {
  //AuthorizeUser();
  const authHandler = new AuthHandler();
  const dummyToken: string | null = "123456";
  const dummyRole = "jobhunter";
  const compare = "3";

  authHandler.authorizeUser(dummyToken, dummyRole, compare);

  return (
    <div>
      <h1 className={`text-3xl`}>Lagi testing</h1>
    </div>
  );
}

export default Index;
