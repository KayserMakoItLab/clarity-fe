import ApiService from "../api";
import { LoginTypes } from "./types";

class AuthService extends ApiService {
  signIn = (body: LoginTypes) => {
    return this.post("/login", {
      email: body.email,
      password: body.password,
    });
  };
}

const authService = new AuthService();

export default authService;
