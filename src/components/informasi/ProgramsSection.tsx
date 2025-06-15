
import React from "react";
import { Star, Users, Award, MessageSquare, GalleryHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  return (
    <section className="py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Program & Fasilitas
          </h2>
          <p className="text-lg text-foreground/70 font-sans">
            Keuntungan Bergabung dengan Komunitas Kami
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${benefit.iconColor}`}>
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="font-serif text-xl">{benefit.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 font-sans leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
