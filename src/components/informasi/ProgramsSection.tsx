
import React from "react";
import { Star, Users, BookCopy, PenSquare, Calendar, Award, Coffee, Lightbulb } from "lucide-react";
import { GlowarAccordion } from "./GlowarAccordion";

export const ProgramsSection: React.FC = () => {
  const programs = [
    {
      id: "workshop",
      icon: Star,
      title: "Workshop Bulanan",
      content: "Setiap bulan, kami menyelenggarakan workshop yang dipimpin oleh praktisi berpengalaman di berbagai bidang kreatif. Workshop ini mencakup:\n\n• **Desain Grafis**: Adobe Photoshop, Illustrator, Canva Pro, dan teknik branding\n• **Penulisan Kreatif**: Copywriting, storytelling, content creation untuk media sosial\n• **Fotografi & Videografi**: Teknik pengambilan gambar, editing video, dan cinematography\n• **Digital Marketing**: Social media strategy, content planning, dan analytics\n• **UI/UX Design**: Figma, prototyping, dan user research\n\nPeserta akan mendapatkan hands-on experience, sertifikat kehadiran, dan feedback langsung dari mentor berpengalaman.",
      iconColor: "bg-mint text-white"
    },
    {
      id: "showcase",
      icon: BookCopy,
      title: "Showcase Triwulan",
      content: "Setiap tiga bulan, kami mengadakan pameran digital dan fisik untuk menampilkan karya-karya terbaik dari anggota komunitas:\n\n• **Pameran Digital**: Galeri online di website dan media sosial resmi\n• **Exhibition Offline**: Event showcase di venue menarik dengan undangan terbuka\n• **Portfolio Review**: Sesi review portfolio dengan profesional industri\n• **Networking Session**: Kesempatan bertemu dengan sesama kreator dan industri kreatif\n• **Media Coverage**: Dokumentasi dan publikasi di berbagai platform\n\nIni adalah kesempatan emas untuk mendapatkan eksposur, feedback konstruktif, dan membangun jaringan profesional.",
      iconColor: "bg-turquoise text-background"
    },
    {
      id: "mentoring",
      icon: Users,
      title: "Program Mentoring",
      content: "Sistem mentoring one-on-one yang menghubungkan anggota baru dengan kreator berpengalaman dalam komunitas:\n\n• **Personal Guidance**: Bimbingan karir dan pengembangan skill secara personal\n• **Portfolio Development**: Bantuan membangun dan mengoptimalkan portfolio\n• **Industry Insights**: Sharing pengalaman dan tips dari mentor yang sudah berkecimpung di industri\n• **Goal Setting**: Penetapan target dan roadmap pengembangan karir kreatif\n• **Regular Check-ins**: Sesi evaluasi berkala untuk memantau progress\n• **Networking Support**: Pengenalan ke jaringan profesional mentor\n\nProgram ini gratis dan berlangsung selama 3-6 bulan dengan komitmen pertemuan rutin.",
      iconColor: "bg-coral text-background"
    },
    {
      id: "collaboration",
      icon: PenSquare,
      title: "Proyek Kolaboratif",
      content: "Kami memfasilitasi pembentukan tim untuk mengerjakan proyek-proyek kreatif bersama:\n\n• **Kampanye Sosial**: Project awareness untuk isu-isu sosial dan lingkungan\n• **Brand Collaboration**: Kerjasama dengan brand untuk pembuatan konten kreatif\n• **Creative Challenge**: Kompetisi dan challenge bulanan dengan hadiah menarik\n• **Community Project**: Proyek internal seperti merchandise, event, dan publikasi\n• **Client Work**: Kesempatan mengerjakan project berbayar untuk klien eksternal\n\nSemua project dilakukan secara professional dengan pembagian profit yang adil dan portfolio credit untuk semua kontributor.",
      iconColor: "bg-amethyst text-background"
    },
    {
      id: "events",
      icon: Calendar,
      title: "Event & Gathering",
      content: "Berbagai acara reguler dan spesial untuk mempererat ikatan komunitas:\n\n• **Monthly Meetup**: Pertemuan bulanan dengan tema dan aktivitas berbeda\n• **Creative Talk**: Diskusi dengan pembicara inspiratif dari industri kreatif\n• **Skill Sharing Session**: Sesi berbagi knowledge antar anggota komunitas\n• **Creative Retreat**: Liburan kreatif bersama untuk refreshing dan networking\n• **Anniversary Celebration**: Perayaan milestones komunitas dengan acara besar\n• **Online Hangout**: Virtual gathering untuk anggota yang tidak bisa hadir offline\n\nSemua event dirancang untuk membangun koneksi yang bermakna antar anggota.",
      iconColor: "bg-softPink text-background"
    },
    {
      id: "resources",
      icon: Lightbulb,
      title: "Akses Eksklusif & Resources",
      content: "Benefit eksklusif yang hanya bisa didapatkan sebagai anggota komunitas:\n\n• **Resource Library**: Akses ke template, mockup, font premium, dan aset desain\n• **Exclusive Content**: Tutorial, case study, dan panduan yang tidak tersedia publik\n• **Tool Discounts**: Diskon untuk software dan tools kreatif dari partner kami\n• **Job Board**: Akses prioritas ke lowongan pekerjaan dan project freelance\n• **Expert AMA**: Sesi tanya jawab eksklusif dengan praktisi senior\n• **Beta Access**: Kesempatan pertama mencoba fitur baru website dan tools komunitas\n\nSemua resources ini di-update secara berkala dan tersedia 24/7 untuk anggota aktif.",
      iconColor: "bg-peach text-background"
    },
    {
      id: "recognition",
      icon: Award,
      title: "Pengakuan & Achievement",
      content: "Sistem apresiasi dan pengembangan untuk mendorong growth anggota:\n\n• **Monthly Creator Award**: Penghargaan untuk kreator terbaik setiap bulan\n• **Skill Badges**: Digital badge untuk berbagai pencapaian dan keahlian\n• **Community Ranking**: Sistem poin dan level berdasarkan kontribusi\n• **Testimonial Program**: Kesempatan mendapat rekomendasi dari mentor dan sesama anggota\n• **Feature Spotlight**: Highlight khusus di media sosial dan website komunitas\n• **Ambassador Program**: Kesempatan menjadi duta komunitas dengan benefit tambahan\n\nSemua pencapaian tercatat dalam profile digital yang bisa digunakan untuk portfolio profesional.",
      iconColor: "bg-emerald-500 text-background"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Program & Fasilitas
          </h2>
          <p className="text-lg text-foreground/70 font-sans max-w-2xl mx-auto">
            Sebagai bagian dari komunitas OurCreativity, Anda akan mendapatkan akses penuh ke berbagai program, fasilitas, dan benefit eksklusif yang dirancang untuk mengembangkan potensi kreatif Anda secara maksimal.
          </p>
        </div>

        <GlowarAccordion items={programs} />

        {/* Additional Info Section */}
        <div className="mt-16 p-6 rounded-2xl bg-gradient-to-r from-amethyst/10 to-turquoise/10 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <Coffee className="w-6 h-6 text-mint" />
            <h3 className="text-xl font-serif font-bold text-foreground">
              Benefit Tambahan
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-foreground/80 font-sans">
            <div>
              <p className="mb-2">• <strong>Free Consultation</strong>: Konsultasi gratis untuk project personal</p>
              <p className="mb-2">• <strong>Lifetime Access</strong>: Akses seumur hidup ke komunitas dan resources</p>
              <p className="mb-2">• <strong>Priority Support</strong>: Dukungan prioritas untuk masalah teknis</p>
            </div>
            <div>
              <p className="mb-2">• <strong>Alumni Network</strong>: Koneksi dengan ribuan alumni di berbagai industri</p>
              <p className="mb-2">• <strong>International Exchange</strong>: Peluang kolaborasi dengan komunitas global</p>
              <p className="mb-2">• <strong>Certification Program</strong>: Sertifikat resmi untuk berbagai achievement</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
