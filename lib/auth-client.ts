import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields, adminClient, customSessionClient, magicLinkClient } from "better-auth/client/plugins";
import type { auth } from "@/lib/auth";
import { ac, roles } from "@/lib/permissions";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  plugins: [
    inferAdditionalFields<typeof auth>(),
    adminClient({ ac, roles }),
    customSessionClient<typeof auth>(),
    magicLinkClient(),
  ],
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  admin,
  sendVerificationEmail,
  requestPasswordReset,
  resetPassword,
  updateUser,
} = authClient;
