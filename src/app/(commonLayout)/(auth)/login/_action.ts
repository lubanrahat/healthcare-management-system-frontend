"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookie } from "@/lib/tokenUtils";
import { ApiErrorResponse } from "@/types/api.types";
import { ILoginResponse } from "@/types/auth.types";
import { ILoginPayload, loginSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export const loginAction = async (
  payload: ILoginPayload,
): Promise<ILoginResponse | ApiErrorResponse> => {
  const parsedPayload = loginSchema.safeParse(payload);
  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message;
    return {
      success: false,
      message: firstError,
    };
  }
  try {
    const response = await httpClient.post<ILoginResponse>(
      "/auth/login",
      parsedPayload.data,
    );
    if (!response.data) {
      throw new Error("Login failed: No data received from server");
    }

    const { token, accessToken, refreshToken } = response.data;

    await setTokenInCookie("better-auth.session_token", token);
    await setTokenInCookie("accessToken", accessToken);
    await setTokenInCookie("refreshToken", refreshToken);

    redirect("/dashboard");
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};
