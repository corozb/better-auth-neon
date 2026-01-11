"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { changePasswordAction } from "@/lib/actions/change-password.action";

export const ChangePasswordForm = () => {
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);

    setIsPending(true);

    const result = await changePasswordAction(formData);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Password changed successfully");
      (evt.target as HTMLFormElement).reset();
    }

    setIsPending(false);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="currentPassword">Current Password</Label>
        <Input type="password" id="currentPassword" name="currentPassword" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="newPassword">New Password</Label>
        <Input type="password" id="newPassword" name="newPassword" />
      </div>

      <Button type="submit" disabled={isPending}>
        Change Password
      </Button>
    </form>
  );
};
