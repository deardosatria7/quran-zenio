import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Play,
  BookOpen,
  Heart,
  MessageCircle,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-gray-200/50 dark:from-gray-800/20 dark:to-gray-700/20" />
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-gray-200 dark:border-gray-700">
                <BookOpen className="w-4 h-4" />
                AI-Powered Islamic Guidance
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Chat with{" "}
                <span className="bg-gradient-to-r from-gray-600 to-black dark:from-gray-300 dark:to-white bg-clip-text text-transparent">
                  Quran
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Share your worries and get answers from the Quran. Find peace,
                guidance, and wisdom through AI-powered Islamic teachings.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black px-8 py-3 text-lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Here
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-3 text-lg"
                >
                  Learn More
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900 p-1 rounded-2xl shadow-2xl">
                  <Image
                    src="/placeholder.svg?height=400&width=300"
                    alt="Holy Quran"
                    width={300}
                    height={400}
                    className="rounded-xl object-cover grayscale"
                  />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gray-200/50 dark:bg-gray-700/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gray-300/50 dark:bg-gray-600/20 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-transparent">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Feeling{" "}
                <span className="text-gray-600 dark:text-gray-400">
                  stressed?
                </span>
                <br />
                Having{" "}
                <span className="text-gray-700 dark:text-gray-300">
                  problems?
                </span>
              </h2>

              <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                Don't worry, tell us all about it here. This platform will
                provide answers taken from the Quran.
              </p>

              <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6 shadow-sm">
                <h3 className="text-gray-900 dark:text-gray-200 font-semibold mb-3">
                  How it works:
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Powered by AI, the answers given are from the Quran from the
                  translations of Dr Mustafa Khattab (English translations).
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-500 dark:from-gray-600 dark:to-gray-800 rounded-full border-2 border-white dark:border-gray-900"
                    />
                  ))}
                </div>
                <span className="text-gray-500 dark:text-gray-400">
                  Join 10,000+ users finding peace
                </span>
              </div>
            </div>

            <div className="relative">
              <Card className="bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center relative">
                    <Button
                      size="lg"
                      className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black rounded-full w-16 h-16"
                    >
                      <Play className="w-6 h-6 ml-1" />
                    </Button>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-gray-900 dark:text-white text-sm font-medium">
                        Video about this app tutorial
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contributing Section */}
      <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-gray-300 dark:border-gray-600">
              <Heart className="w-4 h-4" />
              Support Our Mission
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Contributing with us
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
              This service is free, you could donate if you want to keep this
              service running. Top sponsors will be featured on our platform.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-gray-600 dark:text-gray-400 mx-auto mb-3" />
                  <h3 className="text-gray-900 dark:text-white font-semibold mb-2">
                    Community
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Join our growing community of believers
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 text-gray-600 dark:text-gray-400 mx-auto mb-3" />
                  <h3 className="text-gray-900 dark:text-white font-semibold mb-2">
                    Donate
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Support the development and maintenance
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <Star className="w-8 h-8 text-gray-600 dark:text-gray-400 mx-auto mb-3" />
                  <h3 className="text-gray-900 dark:text-white font-semibold mb-2">
                    Sponsor
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Become a featured sponsor
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black px-8"
              >
                <Heart className="w-5 h-5 mr-2" />
                Make a Donation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8"
              >
                Learn About Sponsorship
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-900 dark:text-white font-semibold">
                Chat with Quran
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
              © 2024 Chat with Quran. Made with ❤️ for the Ummah.
            </p>
          </div>
        </div>
      </footer>
      <div className="w-fit flex justify-end items-end fixed bottom-5 right-5 sm:right-5 z-20">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
