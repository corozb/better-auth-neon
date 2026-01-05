"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function signUpEmailAction(formData: FormData) {
  const name = String(formData.get("name"));
  if (!name) return { error: "name is required" };

  const email = String(formData.get("email"));
  if (!email) return { error: "Email is required" };

  const password = String(formData.get("password"));
  if (!password) return { error: "password is required" };

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
    return { error: null };
  } catch (err) {
    if (err instanceof Error) {
      return { error: "Oops! Something went wrong while registering" };
    }

    return { error: "Internal Server Error" };
  }
}

export async function signInEmailAction(formData: FormData) {
  const email = String(formData.get("email"));
  if (!email) return { error: "Email is required" };

  const password = String(formData.get("password"));
  if (!password) return { error: "password is required" };

  try {
    await auth.api.signInEmail({
      headers: await headers(), // for userAgent
      body: {
        email,
        password,
      },
      // asResponse: true, // use nextCookies() plugin instead
    });

    // use nextCookies() plugin instead of:
    // const setCookieHeader = res.headers.get("set-cookie");
    // if (setCookieHeader) {
    //   const cookie = parseSetCookieHeader(setCookieHeader);
    //   const cookieStore = await cookies();

    //   const [key, cookieAttibutes] = [...cookie.entries()][0];
    //   const value = cookieAttibutes.value;
    //   const maxAge = cookieAttibutes["max-age"];
    //   const path = cookieAttibutes.path;
    //   const httpOnly = cookieAttibutes.httponly;
    //   const sameSite = cookieAttibutes.samesite;

    //   cookieStore.set(key, decodeURIComponent(value), {
    //     maxAge,
    //     path,
    //     httpOnly,
    //     sameSite,
    //   });
    // }
    return { error: null };
  } catch (err) {
    if (err instanceof Error) {
      return { error: "Oops! Something went wrong while logging in" };
    }

    return { error: "Internal Server Error" };
  }
}
