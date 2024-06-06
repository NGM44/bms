import { LoginRequest, LoginResponse, UserDetails } from "@/types/login";
import api from "./api";

export async function doLogin(loginDto: LoginRequest): Promise<LoginResponse> {
    return api
      .post("v1/auth/login", loginDto)
      .then((res) => res as LoginResponse);
  }
export async function getUserDetails(): Promise<UserDetails> {
    return api.get("/v1/user").then((res) => res?.data?.data);
}

export async function doSignUp(signUpDto:LoginRequest) {
    return api
    .post("v1/auth/signup", signUpDto)
    .then((res) => res as LoginResponse);
}