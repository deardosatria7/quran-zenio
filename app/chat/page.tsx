import BackButton from "@/components/back-button";
import FormInput from "./components/form-input";
import { ThemeSwitcher } from "@/components/theme-switcher";
import HeaderAuth from "@/components/header-auth";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-emerald-950 dark:via-gray-900 dark:to-teal-950">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6 flex justify-between">
          <BackButton />
          <HeaderAuth />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Curhat dengan Al-Qur'an
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Temukan ketenangan dan hikmah melalui ayat-ayat suci
          </p>
        </div>

        <FormInput />
      </div>
    </div>
  );
}
