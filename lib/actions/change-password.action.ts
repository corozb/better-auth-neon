"use server";

import { APIError } from "better-auth";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function changePasswordAction(formData: FormData) {
  const currentPassword = formData.get("currentPassword") as string;
  if (!currentPassword) return { error: "Please enter your current password" };

  const newPassword = formData.get("newPassword") as string;
  if (!newPassword) return { error: "Please enter your new password" };

  try {
    await auth.api.changePassword({
      headers: await headers(),
      body: {
        currentPassword,
        newPassword,
      },
    });
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }

    return { error: "Internal Server Error" };
  }
}
