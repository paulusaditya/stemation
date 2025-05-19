require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/results", async (req, res) => {
  const { nama, absen, score } = req.body;
  if (!nama || absen === undefined || score === undefined) {
    return res.status(400).json({ error: "Data tidak lengkap" });
  }

  const { data, error } = await supabase
    .from("submissions")
    .insert([{ nama, absen, score }])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ message: "Berhasil tersimpan", data });
});

module.exports = app;
