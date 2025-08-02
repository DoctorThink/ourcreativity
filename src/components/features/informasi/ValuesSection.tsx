
import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, Lightbulb } from "lucide-react";
import { ValueCard } from "./ValueCard";

export const ValuesSection: React.FC = () => {
  const values = [
    {
      icon: Users,
      title: "Kolaborasi & Sinergi",
      description: "Kami percaya kekuatan kolaborasi dapat menciptakan karya yang lebih bermakna dan berdampak.",
      color: "amethyst" as const
    },
    {
      icon: Lightbulb,
      title: "Kreativitas Tanpa Batas",
      description: "Ruang bebas untuk mengekspresikan ide-ide orisinal tanpa batasan konvensional.",
      color: "turquoise" as const
    },
    {
      icon: Heart,
      title: "Inklusivitas & Keberagaman",
      description: "Menghargai setiap perspektif unik dan menciptakan lingkungan yang ramah untuk semua.",
      color: "coral" as const
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Pilar Komunitas Kami
          </h2>
          <p className="text-lg text-foreground/70 font-sans">
            Nilai-nilai fundamental yang menjadi landasan setiap interaksi di OurCreativity
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <ValueCard
              key={value.title}
              icon={value.icon}
              title={value.title}
              description={value.description}
              color={value.color}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
