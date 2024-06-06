import { AxiosResponse } from "axios";

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    COMPANY = "COMPANY",
  }

export interface LoginRequest {
  emailId: string;
  role: Role;
  password: string;
}

export interface LoginResponse  extends AxiosResponse{
  token: string;
}

export  interface UserDetails {
    name: string;
    email: string;
    password: string;
    deactivated: boolean;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  }
