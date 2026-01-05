import { ReturnButton } from "@/components/return-button";
import { SignOutButton } from "@/components/sign-out-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return <p className="text-destructive">Unauthorized</p>;
  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-4">
      <div className="space-y-4">
        <ReturnButton href="/" label="Home" />

        <h1 className="text-3xl font-bold">Profile</h1>

        <div className="flex items-center gap-2">
          {/* {session.user.role === "ADMIN" && (
            <Button size="sm" asChild>
              <Link href="/admin/dashboard">Admin Dashboard</Link>
            </Button>
          )}*/}

          <SignOutButton />
        </div>
      </div>
      <pre className="text-sn overflow-clip">{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
