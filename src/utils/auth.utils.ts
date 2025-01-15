import { LoginAuth, RegisterAuth } from "@/models/auth.model";
import api from "@/pages/api/api";
import AuthorizeUser from "@/utils/authorizePage";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

export class AuthHandler {
  // Fungsi untuk validasi form login
  handleLoginValidation(formData: LoginAuth) {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g; // Pola regex untuk validasi email
    const checkEmail = emailPattern.test(formData.email); // Mengecek apakah email sesuai dengan pola

    // Mengembalikan true jika email atau password kosong atau email tidak valid
    if (formData.email === "" || formData.password === "" || !checkEmail) {
      return true;
    } else {
      return false; // Mengembalikan false jika semua validasi terpenuhi
    }
  }

  handleRegistrationValidation(formData: RegisterAuth) {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g; // Pola regex untuk validasi email
    const checkEmail = emailPattern.test(formData.email); // Mengecek apakah email sesuai dengan pola

    // Mengembalikan true jika salah satu kondisi tidak terpenuhi (email atau password kosong, password kurang dari 6 karakter, nama kosong, atau email tidak valid)
    if (
      formData.email === "" ||
      formData.password === "" ||
      formData.password.length < 6 ||
      formData.name === "" ||
      !checkEmail
    ) {
      return true;
    } else {
      return false; // Mengembalikan false jika semua validasi terpenuhi
    }
  }

  async handleUserLogout(token: string) {
    try {
      await api.put(
        "/api/auth/logout-user",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      return error;
    }
  }
  // Fungsi untuk mengirim data registrasi ke server
  async handleRegistrationUser(
    formData: RegisterAuth,
    formType: "jobhunter" | "company",
  ) {
    try {
      const response = await api.post("/api/auth/register-user", {
        name: formData.name, // Mengirim nama dari form
        email: formData.email, // Mengirim email dari form
        password: formData.password, // Mengirim password dari form
        role: formType, // Mengatur role user sebagai "user"
      });
      return response;
    } catch (error) {
      return {
        message: error,
        status: 500,
        data: [],
      };
    }
  }

  async validateUserToken(token: string) {
    try {
      const response = await api.get("/auth/validate-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Set the data from the respose to userState --> later will also replace this with actual response
      if (response.status === 200) {
        return response.data; // If the token we pass its true, it will validate the data
      } else {
        return null;
      }
    } catch (error) {
      return error;
    }
  }

  async refreshUserAcessToken(refreshToken: string) {
    try {
      // Get new access token
      const response = await api.post(
        "/api/user/auth/refresh-token",
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      );
      if (response.status === 200) {
        // Get New Access Token
        const newAccessToken = response.data.data;
        const in60Minutes = 60 / (24 * 60);

        // Check if return access token
        if (!newAccessToken) {
          return undefined;
        }

        // Update access token in cookies
        Cookies.set(`accessToken`, newAccessToken, {
          expires: in60Minutes,
        });
        return newAccessToken;
      }
    } catch (error) {
      Cookies.remove(`accessToken`);
      Cookies.remove(`refreshToken`);
      return error;
    }
  }

  async validateResetToken(token: string | undefined) {
    if (token === undefined) {
      return 400;
    }
    try {
      const response: AxiosResponse = await api.get(
        "/api/user/auth/verify-reset-token",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        return response.status;
      } else {
        return response.status;
      }
    } catch (e) {
      return e;
    }
  }

  async setNewPassword(newPassword: string, token: string) {
    try {
      const response: AxiosResponse = await api.put(
        "api/user/auth/reset-password",
        {
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        return response.status;
      } else {
        return response.status;
      }
    } catch (e) {
      return e;
    }
  }

  async sendResetEmail(email: string) {
    try {
      const response: AxiosResponse = await api.put("/auth/request-reset", {
        email: email,
      });
      if (response.status === 200) {
        return response.status;
      } else {
        return response.data.message;
      }
    } catch (e: any) {
      return e.response.data.message;
    }
  }

  async resendEmailVerification(email: string) {
    try {
      const response = await api.post(
        `/auth/resend-verification`,
        { email: email },
        {
          validateStatus: (status) => status < 500, // Treat only 500+ as errors
        },
      );

      if (response.status === 200) {
        toast.success(
          "Success! We've sent the verification email to your inbox.",
        );
        return { success: true };
      } else if (response.status === 400) {
        toast.error(response.data.message || "Invalid request.");
        return { success: false };
      } else {
        toast.error(
          "Oops! We couldn't resend the verification email. Please try again later.",
        );
        return { success: false };
      }
    } catch (error: any) {
      console.error("Error resending verification email:", error);
      toast.error(
        "Failed to resend verification email. Please try again later.",
      );
      return { success: false, message: error.message };
    }
  }

  authorizeUser(
    pagePermission?: "jobhunter" | "company" | "developer",
    compare?: string,
  ) {
    AuthorizeUser(pagePermission, compare);
  }
}
