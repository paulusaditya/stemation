"use client";

import { useState } from "react";

export default function Home() {
  /* ───── state utama ───── */
  const [isHovered, setIsHovered] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [absentNumber, setAbsentNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ name: "", absentNumber: "" });

  /* ───── handler tombol MULAI (munculkan form) ───── */
  const handleStartClick = () => setShowForm(true);

  /* ───── validasi sederhana ───── */
  const validateForm = () => {
    const newErrors = { name: "", absentNumber: "" };
    let ok = true;

    if (!name.trim()) {
      newErrors.name = "Nama harus diisi";
      ok = false;
    }

    if (!absentNumber.trim()) {
      newErrors.absentNumber = "Nomor absen harus diisi";
      ok = false;
    } else if (!/^\d+$/.test(absentNumber)) {
      newErrors.absentNumber = "Nomor absen harus berupa angka";
      ok = false;
    }

    setErrors(newErrors);
    return ok;
  };

  /* ───── submit form ───── */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      localStorage.setItem("userName", name);
      localStorage.setItem("userAbsentNumber", absentNumber);

      // redirect ke halaman quiz
      window.location.href = "/quiz";
    }, 800);
  };

  /* ───── UI ───── */
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* background */}
      <img
        src="./public/2.svg"
        alt="Educational forest background with children"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* konten */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-between p-6">
        {/* judul */}
        <header className="pt-8 text-center">
          <h1
            className="text-5xl font-bold text-green-900 drop-shadow-lg md:text-6xl lg:text-7xl"
            style={{ textShadow: "2px 2px 4px rgba(255,255,255,.7)" }}
          >
            STEMation
          </h1>
        </header>

        <div className="flex-grow" />

        {/* form atau tombol */}
        {showForm ? (
          <div className="mb-24 w-full max-w-md rounded-lg bg-white/90 p-6 shadow-xl backdrop-blur-sm">
            <h2 className="mb-4 text-center text-2xl text-green-800">Masukkan Identitas</h2>

            <form onSubmit={handleSubmit}>
              {/* nama */}
              <div className="mb-4">
                <span className="block text-lg font-medium">Nama</span>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  className={`w-full rounded-md border p-3 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>

              {/* nomor absen */}
              <div className="mb-6">
                <span className="block text-lg font-medium">Nomor Absen</span>
                <input
                  id="absentNumber"
                  value={absentNumber}
                  onChange={(e) => setAbsentNumber(e.target.value)}
                  placeholder="Masukkan nomor absen"
                  className={`w-full rounded-md border p-3 ${
                    errors.absentNumber ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.absentNumber && (
                  <p className="mt-1 text-sm text-red-500">{errors.absentNumber}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Memproses…" : "Mulai Quiz"}
              </button>
            </form>
          </div>
        ) : (
          /* tombol awal */
          <div
            className="mb-24 transform transition-transform duration-300"
            style={{ transform: isHovered ? "translateY(-5px)" : "translateY(0)" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button
              onClick={handleStartClick}
              className="h-16 w-48 rounded-xl border-2 border-amber-400 bg-amber-300 text-xl font-bold text-green-900 shadow-lg transition-all duration-200 hover:scale-105 hover:bg-amber-400"
            >
              MULAI
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
