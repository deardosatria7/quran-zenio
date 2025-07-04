import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const body = await req.json();
  const message = body.message as string;

  if (!message || message.trim().length === 0) {
    return NextResponse.json({ error: "Pesan kosong." }, { status: 400 });
  }

  // 1. Translate message ke Bahasa Inggris
  const translationRes = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
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
              "Terjemahkan kalimat berikut ke dalam bahasa Inggris dengan tetap mempertahankan makna emosionalnya.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.3,
      }),
    }
  );

  const translationResult = await translationRes.json();
  const translated = translationResult.choices?.[0]?.message?.content?.trim();

  if (!translated) {
    return NextResponse.json(
      { error: "Gagal menerjemahkan pesan." },
      { status: 500 }
    );
  }

  // 2. Buat embedding dari hasil terjemahan
  const embeddingRes = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: translated,
      model: "text-embedding-ada-002",
    }),
  });

  const embeddingJson = await embeddingRes.json();
  const userEmbedding = embeddingJson?.data?.[0]?.embedding;

  if (!userEmbedding) {
    return NextResponse.json(
      { error: "Gagal membuat embedding." },
      { status: 500 }
    );
  }

  // 3. Panggil Supabase RPC untuk pencocokan (pastikan embedding_vector bertipe vector(1536))
  const { data: matches, error: matchError } = await supabase.rpc(
    "match_quran_embedding",
    {
      user_embedding: userEmbedding,
      limit_count: 3,
    }
  );

  if (matchError) {
    console.error("Error dari Supabase RPC:", matchError);
    return NextResponse.json(
      { error: "Gagal mencocokkan embedding." },
      { status: 500 }
    );
  }

  // 4. Ambil detail ayat berdasarkan ID hasil match
  const matchIds = matches.map((m: any) => m.id);
  const { data: ayats, error: ayatError } = await supabase
    .from("db_quran")
    .select(
      "id, surah_name_english, aya_number, arabic_clean, english_translation"
    )
    .in("id", matchIds);

  if (ayatError) {
    return NextResponse.json(
      { error: "Gagal mengambil ayat." },
      { status: 500 }
    );
  }

  // Urutkan ayats sesuai urutan similarity dari matches
  const sortedAyats = matchIds.map((id: number) =>
    ayats.find((a: any) => a.id === id)
  );

  return NextResponse.json(
    {
      translation: translated,
      results: sortedAyats,
    },
    { status: 200 }
  );
}
