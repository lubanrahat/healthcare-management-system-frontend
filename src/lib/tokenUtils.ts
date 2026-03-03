"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import CookieUtils from "./cookieUtils";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_TOKEN_KEY;

export const getTokenSecondsRemaining = async (token: string) => {
  try {
    if (!JWT_ACCESS_SECRET) return 0;

    const tokenPayload = JWT_ACCESS_SECRET
      ? (jwt.verify(token, JWT_ACCESS_SECRET) as JwtPayload)
      : (jwt.decode(token) as JwtPayload);

    if (tokenPayload && !tokenPayload.exp) {
      return 0;
    }

    const remainingSeconds =
      (tokenPayload.exp as number) - Math.floor(Date.now() / 1000);

    return remainingSeconds > 0 ? remainingSeconds : 0;
  } catch (error) {
    console.error(
      "Error decoding token:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return 0;
  }
};

export const setTokenInCookie = async (name: string, token: string) => {
  const maxAgeInSeconds = await getTokenSecondsRemaining(token);
  await CookieUtils.set(name, token, maxAgeInSeconds);
};
