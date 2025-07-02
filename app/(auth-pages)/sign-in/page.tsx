import { signInAction } from "../actions";
import { FormMessage, Message } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SubmitButton } from "@/components/submit-button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  //if there is user, redirect to home
  if (user) {
    return redirect("/dashboard");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black p-4">
      <div className="w-full max-w-md bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center mb-4 text-gray-900 dark:text-white">
          Sign in
        </h1>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6 px-4">
          Masuk ke ai.zenio.id atau{" "}
          <Link
            href="/sign-up"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            daftar akun.
          </Link>{" "}
        </p>

        <form className="space-y-5" action={signInAction}>
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="font-medium text-gray-800 dark:text-gray-200"
            >
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              required
              className="w-full text-sm"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label
                htmlFor="password"
                className="font-medium text-gray-800 dark:text-gray-200"
              >
                Password
              </Label>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Masukkan password"
              required
              className="w-full text-sm"
            />
          </div>

          <SubmitButton
            className="w-full py-2 hover:cursor-pointer"
            pendingText="Signing in..."
          >
            Sign In
          </SubmitButton>

          <FormMessage message={searchParams} />
        </form>
      </div>
    </div>
  );
}
