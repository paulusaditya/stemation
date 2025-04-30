export async function submitQuiz(
    nama: string,
    absen: string,
    answers: string[]
  ) {
    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, absen, answers }),
      }
    );
    if (!res.ok) throw new Error(await res.text());
    return res.json(); 
  }
  