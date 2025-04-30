import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "../database/questions";

interface Option {
  id: string;
  text: string;
}

interface Question {
  question: string;
  options: Option[];
  correct: string;
}

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function QuizPage() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState<number>(0);
  const [selected, setSelected] = useState<string>("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [absent, setAbsent] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(1200); // 20 menit
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const n = localStorage.getItem("userName");
    const a = localStorage.getItem("userAbsentNumber");
    if (!n || !a) {
      navigate("/");
      return;
    }
    setName(n);
    setAbsent(a);

    // Acak soal dan opsi
    const randomized = shuffleArray(questions).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setShuffledQuestions(randomized);
  }, [navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number): string => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const submitQuizResult = async (finalScore: number): Promise<void> => {
    try {
      const res = await fetch("http://localhost:5000/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: name,
          absen: Number(absent),
          score: finalScore,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal submit");
      console.log("✅ Tersimpan:", data.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        alert("Gagal menyimpan hasil. Coba lagi nanti.");
      }
    }
  };

  const handleFinish = (): void => {
    const correctAnswers = Object.entries(answers).filter(
      ([index, answer]) => answer === shuffledQuestions[Number(index)].correct
    );
    const finalScore = correctAnswers.length;
    const percentage = Math.round((finalScore / shuffledQuestions.length) * 100);
    setScore(finalScore);
    setShowResult(true);
    submitQuizResult(percentage);
  };

  const next = (): void => {
    if (current < shuffledQuestions.length - 1) {
      setCurrent(current + 1);
    } else {
      handleFinish();
    }
  };

  const previous = (): void => {
    if (current > 0) setCurrent(current - 1);
  };

  const selectAnswer = (value: string): void => {
    setSelected(value);
    setAnswers({ ...answers, [current]: value });
  };

  const restart = (): void => {
    setCurrent(0);
    setSelected("");
    setAnswers({});
    setScore(0);
    setShowResult(false);
    setTimeLeft(1200);
    const reshuffled = shuffleArray(questions).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setShuffledQuestions(reshuffled);
  };

  useEffect(() => {
    setSelected(answers[current] || "");
  }, [current, answers]);

  if (!name || !absent || shuffledQuestions.length === 0)
    return (
      <div className="flex h-screen items-center justify-center">Loading…</div>
    );

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <img
        src="/1.svg"
        alt="Forest background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <header className="relative z-20 mt-13 text-center">
        <h1 className="text-3xl font-extrabold text-green-900">STEMation Quiz</h1>
        <p className="mt-1 font-medium text-white drop-shadow">
          Nama: {name} | Nomor Absen: {absent}
        </p>
        <p className="text-red-600 font-bold mt-1">Waktu Tersisa: {formatTime(timeLeft)}</p>
      </header>

      <div className="relative z-20 mx-auto mt-4 w-[900px] max-w-[90%]">
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {shuffledQuestions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-8 h-8 rounded-full font-bold text-sm ${
                answers[index]
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-700"
              } ${index === current ? "ring-2 ring-yellow-400" : ""}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <div className="h-[550px] w-full bg-transparent px-6 py-8">
            <div className="flex h-full w-full flex-col items-center justify-start">
              {showResult ? (
                <div className="w-full h-[550px] rounded-lg bg-transparent p-8 flex flex-col items-center justify-center">
                  <h2 className="mb-1 text-center text-2xl font-semibold text-white">
                    Hasil Quiz
                  </h2>
                  <p className="mb-6 text-center text-white">
                    Anda telah menyelesaikan quiz!
                  </p>
                  <p className="mb-2 text-center text-4xl font-bold text-white">
                    {score} / {shuffledQuestions.length}
                  </p>
                  <p className="mb-6 text-center text-white">
                    Nilai: {Math.round((score / shuffledQuestions.length) * 100)}%
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={restart}
                      className="rounded-md border border-white px-6 py-2 font-semibold text-white hover:bg-white/10"
                    >
                      Ulangi Quiz
                    </button>
                    <button
                      onClick={() => navigate("/")}
                      className="rounded-md bg-emerald-500 px-6 py-2 font-semibold text-white hover:bg-emerald-600"
                    >
                      Beranda
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-2 w-full h-[550px] max-w-[900px] rounded-lg bg-transparent p-8">
                  <h2 className="mb-2 text-2xl font-medium text-white">
                    Pertanyaan {current + 1} / {shuffledQuestions.length}
                  </h2>

                  <p className='mb-6 text-center text-white text-2xl font-["Coming Soon",cursive] drop-shadow-[0_0_4px_rgba(0,0,0,0.7)]'>
                    {shuffledQuestions[current].question}
                  </p>

                  <form className="space-y-3">
                    {shuffledQuestions[current].options.map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex cursor-pointer items-center rounded-lg border p-3 transition-colors ${
                          selected === opt.id
                            ? "border-green-300 bg-white/10"
                            : "border-white/40 hover:bg-white/5"
                        }`}
                      >
                        <input
                          type="radio"
                          name="answer"
                          value={opt.id}
                          checked={selected === opt.id}
                          onChange={(e) => selectAnswer(e.target.value)}
                          className="mr-3 h-4 w-4 accent-emerald-400"
                        />
                        <span className="text-white">{opt.text}</span>
                      </label>
                    ))}
                  </form>

                  <div className="mt-6 flex gap-4">
                    <button
                      onClick={previous}
                      disabled={current === 0}
                      className="w-full rounded-md bg-gray-300 py-3 font-semibold text-gray-700 hover:bg-gray-400 disabled:opacity-50"
                    >
                      Sebelumnya
                    </button>
                    <button
                      onClick={next}
                      disabled={!selected}
                      className="w-full rounded-md bg-emerald-500 py-3 font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {current === shuffledQuestions.length - 1 ? "Selesai" : "Selanjutnya"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
