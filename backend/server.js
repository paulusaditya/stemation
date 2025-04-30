require("dotenv").config();     
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());            // izinkan request dari domain React Anda
app.use(express.json());    // parse JSON body

/* Supabase client */
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

/* ───────── ROUTES ───────── */

/**
 * POST /results
 * body: { nama: string, absen: number, score: number }
 */
app.post("/results", async (req, res) => {
  const { nama, absen, score } = req.body;

  /* validasi sederhana */
  if (!nama || absen === undefined || score === undefined) {
    return res.status(400).json({ error: "Data tidak lengkap" });
  }

  const { data, error } = await supabase
    .from("submissions")          // ganti dengan nama tabel Anda
    .insert([{ nama, absen, score }])
    .select()                     // agar respons berisi row yang baru
    .single();

  if (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ message: "Berhasil tersimpan", data });
});

/* default 404 */
app.use((req, res) => res.status(404).json({ error: "Not found" }));

/* ───────── START SERVER ───────── */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🟢 API ready on http://localhost:${PORT}`));
