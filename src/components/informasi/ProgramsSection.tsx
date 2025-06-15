
import React from "react";
import { Star, Users, BookCopy, PenSquare } from "lucide-react";
import { GlowarAccordion } from "./GlowarAccordion";

export const ProgramsSection: React.FC = () => {
  const programs = [
    {
      id: "workshop",
      icon: Star,
      title: "Workshop Bulanan",
      content: "Setiap bulan, kami menyelenggarakan workshop yang dipimpin oleh praktisi berpengalaman di berbagai bidang kreatif. Workshop ini mencakup desain grafis, penulisan kreatif, fotografi, video editing, dan banyak lagi. Peserta akan mendapatkan hands-on experience dan feedback langsung dari mentor.",
      iconColor: "bg-mint text-white"
    },
    {
      id: "showcase",
      icon: BookCopy,
      title: "Showcase Triwulan",
      content: "Setiap tiga bulan, kami mengadakan pameran digital dan fisik untuk menampilkan karya-karya terbaik dari anggota komunitas. Ini adalah kesempatan bagi kreator untuk mendapatkan eksposur, feedback dari audiens yang lebih luas, dan networking dengan sesama kreator serta industri kreatif.",
      iconColor: "bg-turquoise text-background"
    },
    {
      id: "mentoring",
      icon: Users,
      title: "Program Mentoring",
      content: "Sistem mentoring one-on-one yang menghubungkan anggota baru dengan kreator berpengalaman dalam komunitas. Mentor akan memberikan guidance personal, review portfolio, dan membantu mengembangkan jalur karir kreatif yang sesuai dengan minat dan bakat masing-masing.",
      iconColor: "bg-coral text-background"
    },
    {
      id: "collaboration",
      icon: PenSquare,
      title: "Proyek Kolaboratif",
      content: "Kami memfasilitasi pembentukan tim untuk mengerjakan proyek-proyek kreatif bersama. Mulai dari kampanye sosial, pembuatan konten untuk brand, hingga proyek seni eksperimental. Ini adalah cara terbaik untuk belajar bekerja dalam tim dan menghasilkan karya yang impactful.",
      iconColor: "bg-amethyst text-background"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Program & Fasilitas
          </h2>
          <p className="text-lg text-foreground/70 font-sans">
            Apa yang akan Anda dapatkan sebagai bagian dari komunitas kami
          </p>
        </div>

        <GlowarAccordion items={programs} />
      </div>
    </section>
  );
};
