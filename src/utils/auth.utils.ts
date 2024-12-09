import { LoginAuth, RegisterAuth } from "@/models/auth.model";
import { dummyUser } from "@/models/dummyData";
import api from "@/pages/api/api";

import AuthorizeUser from "@/utils/authorizePage";
import { AxiosResponse } from "axios";

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

  // Fungsi untuk mengirim data login ke server
  // async handleSubmitData(formData: LoginAuth, scope: "user" | "admin") {
  //   try {
  //     const response = await axios.post(
  //       scope == "user" ? "/api/auth/login-user" : "/api/auth-admin/login",
  //       {
  //         email: formData.email, // Mengirim email dari form
  //         password: formData.password, // Mengirim password dari form
  //       },
  //     );
  //     const data = response.data; // Menyimpan respons data
  //
  //     // Jika respons status adalah 200, set cookies untuk access_token dan refresh_token
  //     if (response.status === 200) {
  //       const in60Minutes = 60 / (24 * 60); // Mengatur masa kedaluwarsa access_token (60 menit)
  //       const uniqueCode =
  //         scope === "user" ? UniqueCode.USER : UniqueCode.ADMIN;
  //
  //       Cookies.set(`access${uniqueCode}_token`, data.data.access_token, {
  //         expires: in60Minutes, // Cookie access_token kedaluwarsa dalam 1 jam
  //       });
  //       Cookies.set(
  //         `refresh${uniqueCode}_token`,
  //         data.data.user.refresh_token,
  //         {
  //           expires: 7,
  //         },
  //       );
  //       return data;
  //     } else {
  //       return data;
  //     }
  //   } catch (error) {
  //     return error;
  //   }
  // }

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
      // const response = await axios.get("/api/auth/validate-token", {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      // SIMULATE HIT API --> it will replace with actual validate token API that return user data
      console.log(token);
      const response = dummyUser.filter((user) => {
        if (user.token === token) {
          return user;
        }
      });
      console.log("result", response);
      // Set the data from the respose to userState --> later will also replace this with actual response
      if (response.length > 0) {
        return response; // If the token we pass its true, it will validate the data
      } else {
        return null;
      }
    } catch (error) {
      return error;
    }
  }

  // async refreshUserAcessToken(refreshToken: string) {
  //   try {
  //     // Get new access token
  //     const response = await axios.get("/api/auth/update-token", {
  //       headers: {
  //         Authorization: `Bearer ${refreshToken}`,
  //       },
  //     });
  //
  //     if (response.data.data.code === "GUT") {
  //       // Get New Access Token
  //       const newAccessToken = response.data.data.accessToken;
  //       const in60Minutes = 60 / (24 * 60);
  //
  //       const uniqueCode =
  //         response.data.data.user_role === "user"
  //           ? UniqueCode.USER
  //           : UniqueCode.ADMIN;
  //
  //       // Check if return access token
  //       if (!newAccessToken) {
  //         return undefined;
  //       }
  //
  //       // Update access token in cookies
  //       Cookies.set(`access${uniqueCode}_token`, newAccessToken, {
  //         expires: in60Minutes,
  //       });
  //
  //       // Validate access token after refreshing it
  //       try {
  //         const validateResponse = await this.validateUserToken(newAccessToken);
  //         if (validateResponse) {
  //           return validateResponse;
  //         } else {
  //           return null;
  //         }
  //       } catch (error) {
  //         return error;
  //       }
  //     }
  //   } catch (error) {
  //     Cookies.remove(`access${UniqueCode.USER}_token`);
  //     Cookies.remove(`refresh${UniqueCode.USER}_token`);
  //     Cookies.remove(`access${UniqueCode.ADMIN}_token`);
  //     Cookies.remove(`refresh${UniqueCode.ADMIN}_token`);
  //     return error;
  //   }
  // }

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
        console.log(response.status);
        return response.status;
      } else {
        return response.status;
      }
    } catch (e) {
      return e;
      console.log(e);
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
      console.log(e);
      return e;
    }
  }

  async sendResetEmail(email: string) {
    console.log(email);
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

  authorizeUser(
    token: string | null,
    roleType: "company" | "jobhunter",
    compare?: string,
  ) {
    AuthorizeUser(token, roleType, compare);
  }
}
