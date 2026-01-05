"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";
// import { signUpEmailAction } from "@/actions/sign-up-email.action";

export const LoginForm = () => {
  // const [isPending, setIsPending] = useState(false);
  // const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    // setIsPending(true);

    const formData = new FormData(evt.currentTarget);

    const email = String(formData.get("email"));
    if (!email) return toast.error("Email is required");

    const password = String(formData.get("password"));
    if (!password) return toast.error("password is required");

    await signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: () => {},
        onResponse: () => {},
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {},
      }
    );

    // const { error } = await signUpEmailAction(formData);

    // if (error) {
    //   toast.error(error);
    //   setIsPending(false);
    // } else {
    //   toast.success("Registration complete. You're all set.");
    //   router.push("/auth/register/success");
    // }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" name="password" />
      </div>

      <Button type="submit" className="w-full" disabled={false}>
        Login
      </Button>
    </form>
  );
};
