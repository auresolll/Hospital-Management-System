import { typeRegister, typeSign } from "./authentication.type";

export interface IAuthentication {
  signIn(user: typeSign): void;
  register(user: typeRegister): void;
  getAccessToken(): string;
}
