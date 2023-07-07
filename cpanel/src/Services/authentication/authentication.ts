import server from "../../Config/axios/axios";
import { IAuthentication } from "./authentication.interface";
import { typeCode, typeRegister, typeSign } from "./authentication.type";

export class AuthenticationService implements IAuthentication {
  private static instance: AuthenticationService;
  private constructor() {}

  public static getInstance(): AuthenticationService {
    if (!AuthenticationService.instance) {
      AuthenticationService.instance = new AuthenticationService();
    }

    return AuthenticationService.instance;
  }

  public async signIn(user: typeSign) {
    try {
      const request = await server.post("authentication/signIn-local", user);
      return request.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  public async register(user: typeRegister): Promise<any> {
    try {
      const request = await server.post("authentication/register-local", user);
      const result = await request.data;

      if (result.status !== 200) return;

      return result.data;
    } catch (error) {
      console.error(error);
    }
  }

  public async sendVerifiedCodeOTP(type: "Phone" | "Mail", username: string) {
    if (type === "Phone") {
      const request = await server.post(
        `verified/phone/verify?username=${username}`
      );
      return request.data;
    } else {
      const request = await server.post(
        `verified/mail/verify?username=${username}`
      );
      return request.data;
    }
  }

  public async verifiedCodeOTP(query: typeCode) {
    try {
      const request = await server.post(`verified/phone/verify/check`, query);
      const result = await request.data;
      if (result.data.status) {
        localStorage.setItem(
          "access_token",
          JSON.stringify({
            token: result.data.access_token,
          })
        );
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            token: result.data.userInfo,
          })
        );
      }
      return result.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  public getAccessToken(): string {
    const access_token = JSON.parse(
      localStorage.getItem("access_token") ?? "{}"
    );
    return access_token["token"];
  }
}
