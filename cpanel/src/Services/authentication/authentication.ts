import server from "../../Config/axios/axios";
import { IAuthentication } from "./authentication.interface";
import { typeRegister, typeSign } from "./authentication.type";

export class AuthenticationService implements IAuthentication {
  private static instance: AuthenticationService;
  private constructor() {}

  public static getInstance(): AuthenticationService {
    if (!AuthenticationService.instance) {
      AuthenticationService.instance = new AuthenticationService();
    }

    return AuthenticationService.instance;
  }

  public async signIn(user: typeSign): Promise<void> {
    try {
      const request = await server.post("authentication/signIn-local", user);
      const result = await request.data;

      if (result.statusCode !== 200) return;

      localStorage.setItem(
        "access_token",
        JSON.stringify({
          token: result.data.access_token,
        })
      );
    } catch (error) {
      console.error(error);
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

  public getAccessToken(): string {
    const access_token = JSON.parse(
      localStorage.getItem("access_token") ?? "{}"
    );
    return access_token["token"];
  }
}
