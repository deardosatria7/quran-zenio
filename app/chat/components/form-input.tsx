"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Send, BookOpen, Heart } from "lucide-react";

export default function FormInput() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) {
      return toast.info("Mohon masukkan curhatan terlebih dahulu.");
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post("/api/openai", { message });
      setResult(response.data);
    } catch (error) {
      console.error(error);
      const msg =
        error instanceof Error ? error.message : "Unknown error occurred!";
      toast.error("Gagal", { description: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
            <Heart className="h-5 w-5" />
            Bagikan Curhatanmu
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Ceritakan apa yang sedang kamu rasakan atau alami
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Textarea
              placeholder="Tulis curhatanmu di sini... (Tekan Enter untuk mengirim, Shift+Enter untuk baris baru)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="min-h-[140px] resize-none border-emerald-200 dark:border-emerald-800 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
              disabled={loading}
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {message.length}/1000
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading || !message.trim()}
            className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 transition-all duration-200 shadow-md hover:shadow-lg text-white"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mencari Hikmah...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Kirim Curhat
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <Card className="shadow-lg border-0 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-700">
          <CardContent className="py-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <BookOpen className="h-8 w-8 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-400 rounded-full animate-ping"></div>
              </div>
              <p className="text-emerald-700 dark:text-emerald-300 font-medium">
                Sedang mencari ayat dan hikmah yang tepat untuk Anda...
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Result Card */}
      {result && (
        <Card className="shadow-lg border-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-emerald-900/20 dark:via-gray-800/50 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-700 animate-in slide-in-from-bottom-4 duration-500">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
              <BookOpen className="h-5 w-5" />
              Hikmah dari Al-Qur'an
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-emerald dark:prose-invert max-w-none">
              <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-6 border border-emerald-100 dark:border-emerald-800">
                {result.translation && (
                  <div className="mb-4 text-sm italic text-gray-700 dark:text-gray-300">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-300">
                      Terjemahan curhat:
                    </span>{" "}
                    “{result.translation}”
                  </div>
                )}

                {result.results?.map((ayah: any, idx: any) => (
                  <div
                    key={ayah.id}
                    className="mb-6 p-4 rounded-md border border-emerald-100 dark:border-emerald-800 bg-white/60 dark:bg-gray-800/60"
                  >
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Surah {ayah.surah_name_english} • Ayat {ayah.aya_number}
                    </p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white leading-snug mb-2">
                      {ayah.arabic_clean}
                    </p>
                    <p className="text-base text-gray-800 dark:text-gray-200">
                      {ayah.english_translation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-emerald-100 dark:border-emerald-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMessage("")}
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-900/20"
              >
                Curhat Lagi
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  navigator.clipboard.writeText(JSON.stringify(result, null, 4))
                }
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-900/20"
              >
                Salin Jawaban
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips Card */}
      {!result && !loading && (
        <Card className="shadow-md border-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-blue-200 dark:border-blue-800">
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-sm text-blue-700 dark:text-blue-300 font-medium mb-1">
                  Tips untuk curhat yang lebih baik:
                </p>
                <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                  <li>• Ceritakan perasaan Anda dengan jujur dan terbuka</li>
                  <li>• Jelaskan situasi yang sedang Anda hadapi</li>
                  <li>• Sampaikan apa yang ingin Anda capai atau ubah</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
