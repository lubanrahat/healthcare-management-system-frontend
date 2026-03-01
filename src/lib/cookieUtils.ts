import { cookies } from "next/headers";

class CookieUtils {
  static async set(name: string, value: string, maxAgeInSeconds: number) {
    const cookieStore = await cookies();
    cookieStore.set(name, value, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: maxAgeInSeconds,
    });
  }

  static async get(name: string) {
    const cookieStore = await cookies();
    return cookieStore.get(name)?.value;
  }

  static async delete(name: string) {
    const cookieStore = await cookies();
    cookieStore.delete(name);
  }
}

export default CookieUtils;
