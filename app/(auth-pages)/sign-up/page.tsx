import { signUpAction } from "../actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full h-screen flex items-center justify-center p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  //if there is user, redirect to home
  if (user) {
    return redirect("/chat");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted dark:bg-black px-4 py-2">
      <div className="w-full max-w-md bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-lg">
        <form className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold text-center text-foreground dark:text-white">
            Sign up
          </h1>
          <p className="text-sm text-center text-muted-foreground dark:text-gray-400">
            Daftarkan akun baru ke quran.zenio.id
          </p>

          <div className="flex flex-col gap-5 mt-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-gray-800 dark:text-gray-200"
              >
                Email
              </Label>
              <Input
                name="email"
                placeholder="contoh@gmail.com"
                required
                className="text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-gray-800 dark:text-gray-200"
              >
                Password
              </Label>
              <Input
                type="password"
                name="password"
                placeholder="Masukkan password"
                minLength={6}
                className="text-sm"
                required
              />
              <p className="text-sm italic text-gray-600 dark:text-gray-400">
                Password harus mengandung huruf besar, huruf kecil, dan angka.
              </p>
            </div>
            <div className="space-y-2 mt-4">
              <Label
                htmlFor="full_name"
                className="text-gray-800 dark:text-gray-200"
              >
                Nama Lengkap
              </Label>
              <Input
                type="text"
                name="full_name"
                placeholder="Fulan bin Fulan"
                minLength={6}
                className="text-sm"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-gray-800 dark:text-gray-200"
              >
                No Telepon
              </Label>
              <Input
                type="text"
                name="phone"
                className="text-sm"
                placeholder="081234567890"
                required
              />
            </div>
            <SubmitButton
              formAction={signUpAction}
              pendingText="Signing up..."
              className="w-full hover:cursor-pointer"
            >
              Sign up
            </SubmitButton>
            <FormMessage message={searchParams} />
          </div>
        </form>
      </div>
    </div>
  );
}
