import { useEffect } from "react";
import { useRouter } from "next/router";
import { AuthHandler } from "@/utils/auth.utils";

function AuthorizeUser(
  token: string | null,
  pagePermission: "jobhunter" | "company",
  owned?: string,
) {
  const router = useRouter();
  const authHandler = new AuthHandler();

  async function handleAuthrorize(token: string | null) {
    // Check the user have token or not when it access the page
    if (!token) {
      router.push("/");
      return;
    }

    // Change any to a valid user response interface
    const response: any = await authHandler.validateUserToken(token);
    const user = response[0];

    if (response.length === 0) {
      router.push("/");
      return;
    }
    if (user.role_type !== pagePermission) {
      router.push("/");
      return;
    }

    if (owned) {
      if (user.id !== owned) {
        router.push("/");
        return;
      }
    }

    console.log(user);
  }
  useEffect(() => {
    handleAuthrorize(token);
  }, [router]);
}

export default AuthorizeUser;
