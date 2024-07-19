"use client";
import authService from "./auth";
import { TUseMutationOption } from "../types";
import { useMutation } from "react-query";

const useAuth = () => {
  const useSignIn = (options?: TUseMutationOption) =>
    useMutation("signIn", authService.signIn, options);

  return {
    useSignIn
  };
};

export default useAuth;
