
import React from "react";
import { Star, Users, Award, MessageSquare, GalleryHorizontal } from "lucide-react";
import GlassBentoCard from "@/components/ui/GlassBentoCard";

export const ProgramsSection: React.FC = () => {
  const benefits = [
    {
      icon: GalleryHorizontal,
      title: "Panggung Digital",
      description: "Pamerkan karyamu di galeri digital \"Karya Kami\". Jadikan ini panggung untuk membangun portofolio profesional dan dapatkan apresiasi yang layak.",
      iconColor: "bg-mint text-white"
    },
    {
      icon: Award,
      title: "Workshop Eksklusif",
      description: "Akses workshop dan sesi belajar eksklusif dari para praktisi untuk mengasah dan meningkatkan keterampilan kreatifmu ke level berikutnya.",
      iconColor: "bg-turquoise text-background"
    },
    {
      icon: Users,
      title: "Ruang Diskusi & Kolaborasi",
      description: "Terhubung dalam ruang diskusi aktif untuk bertukar ide, menemukan partner untuk proyek kolaborasi, dan mendapatkan inspirasi dari sesama kreator.",
      iconColor: "bg-coral text-background"
    },
    {
      icon: MessageSquare,
      title: "Feedback & Mentoring",
      description: "Jangan berkarya sendirian. Dapatkan feedback konstruktif dan mentoring dari tim kurator kami untuk membantu menyempurnakan karyamu.",
      iconColor: "bg-amethyst text-background"
    },
    {
      icon: Star,
      title: "Sorotan Komunitas",
      description: "Raih kesempatan untuk tampil di \"Sorotan Unggulan\". Karya terbaik akan kami promosikan di website dan media sosial untuk memberimu pengakuan dan eksposur yang lebih luas.",
      iconColor: "bg-yellow-500 text-white"
    }
  ];

  const colorMap: { [key: string]: string } = {
    'bg-mint': 'rgba(152, 245, 225, 0.2)',
    'bg-turquoise': 'rgba(64, 224, 208, 0.2)',
    'bg-coral': 'rgba(255, 127, 80, 0.2)',
    'bg-amethyst': 'rgba(155, 109, 255, 0.2)',
    'bg-yellow-500': 'rgba(234, 179, 8, 0.2)',
  };

  const getAccentColor = (iconColor: string) => {
    return colorMap[iconColor.split(' ')[0]] || 'rgba(155, 109, 255, 0.2)';
  };

  return (
    <section className="py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 animated-gradient-text">
            Program & Fasilitas
          </h2>
          <p className="text-lg text-foreground/70 font-sans">
            Keuntungan Bergabung dengan Komunitas Kami
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <GlassBentoCard 
              key={index} 
              accentColor={getAccentColor(benefit.iconColor)}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-full ${benefit.iconColor}`}>
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl text-white font-semibold">{benefit.title}</h3>
                </div>
                <p className="text-foreground/80 font-sans leading-relaxed flex-grow">{benefit.description}</p>
              </div>
            </GlassBentoCard>
          ))}
        </div>
      </div>
    </section>
  );
};
