export interface Option {
  id: string
  text: string
}

export interface Question {
  id: number
  question: string
  options: Option[]
  correct: string
}

export const questions: Question[] = [
  {
    id: 4,
    question: "Siapakah penemu teori relativitas?",
    options: [
      { id: "a", text: "Isaac Newton" },
      { id: "b", text: "Albert Einstein" },
      { id: "c", text: "Nikola Tesla" },
      { id: "d", text: "Stephen Hawking" },
    ],
    correct: "b",
  },
  {
    id: 5,
    question: "Apa nama ibu kota Australia?",
    options: [
      { id: "a", text: "Sydney" },
      { id: "b", text: "Melbourne" },
      { id: "c", text: "Canberra" },
      { id: "d", text: "Perth" },
    ],
    correct: "c",
  },
  {
    id: 6,
    question: "Siapa yang menulis naskah proklamasi kemerdekaan Indonesia?",
    options: [
      { id: "a", text: "Soekarno" },
      { id: "b", text: "Moh. Hatta" },
      { id: "c", text: "Sayuti Melik" },
      { id: "d", text: "Ahmad Subardjo" },
    ],
    correct: "a",
  },
  {
    id: 7,
    question: "Manakah bilangan prima dari pilihan berikut?",
    options: [
      { id: "a", text: "51" },
      { id: "b", text: "37" },
      { id: "c", text: "49" },
      { id: "d", text: "27" },
    ],
    correct: "b",
  },
  {
    id: 8,
    question: "Apa rumus kimia dari asam sulfat?",
    options: [
      { id: "a", text: "HCl" },
      { id: "b", text: "H2SO4" },
      { id: "c", text: "HNO3" },
      { id: "d", text: "CH3COOH" },
    ],
    correct: "b",
  },
  {
    id: 9,
    question: "Bahasa pemrograman manakah yang berjalan di atas JVM?",
    options: [
      { id: "a", text: "Python" },
      { id: "b", text: "C++" },
      { id: "c", text: "Java" },
      { id: "d", text: "Go" },
    ],
    correct: "c",
  },
  {
    id: 10,
    question: "Apa hasil dari integral ∫ x dx?",
    options: [
      { id: "a", text: "x^2 / 2 + C" },
      { id: "b", text: "ln(x) + C" },
      { id: "c", text: "1/x + C" },
      { id: "d", text: "x + C" },
    ],
    correct: "a",
  },
  {
    id: 11,
    question: "Berapa volume bola dengan jari-jari 7 cm? (Gunakan π = 22/7)",
    options: [
      { id: "a", text: "1436 cm³" },
      { id: "b", text: "1440 cm³" },
      { id: "c", text: "1437 cm³" },
      { id: "d", text: "1435 cm³" },
    ],
    correct: "a",
  },
  {
    id: 12,
    question: "Dalam ilmu ekonomi, hukum permintaan menyatakan bahwa...",
    options: [
      { id: "a", text: "Harga naik, permintaan naik" },
      { id: "b", text: "Harga turun, permintaan turun" },
      { id: "c", text: "Harga naik, permintaan turun" },
      { id: "d", text: "Harga tetap, permintaan turun" },
    ],
    correct: "c",
  },
  {
    id: 13,
    question: "Apa nama satelit alami milik planet Mars?",
    options: [
      { id: "a", text: "Europa dan Titan" },
      { id: "b", text: "Phobos dan Deimos" },
      { id: "c", text: "Io dan Callisto" },
      { id: "d", text: "Charon dan Hydra" },
    ],
    correct: "b",
  },
];
