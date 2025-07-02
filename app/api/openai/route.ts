import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const body = await req.json();
  const message = body.message as string;

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1-nano",
      messages: [
        {
          role: "system",
          content:
            "Kamu adalah asisten yang akan membantu mencarikan ayat Al-Qur'an yang sesuai dengan curhatan atau masalah yang disampaikan pengguna. Beri jawaban selayaknya seorang sahabat yang memberikan penguatan kepada temannya.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
    }),
  });

  const result = await openaiRes.json();

  if (!openaiRes.ok) {
    return NextResponse.json({ error: result }, { status: 500 });
  }

  return NextResponse.json(
    {
      message: `Testing`,
      // reply: `Lorem ipsum dolor sit amet`,
      reply: result.choices[0].message.content,
    },
    { status: 200 }
  );
}
