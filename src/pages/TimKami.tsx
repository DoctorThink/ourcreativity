
import { motion } from "framer-motion";
import PageLayout from "@/components/layouts/PageLayout";
import TeamMember from "@/components/TeamMember";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Team data structure
const teamData = [
  {
    title: "Video",
    members: [
      { name: "Kevin/Zyu", instagram: "Zyu.", role: "Video Editor" },
      { name: "Aljaan", instagram: "@snhrrr", role: "Video Editor" }
    ]
  },
  {
    title: "Design",
    members: [
      { name: "Ashtrozz", instagram: "damz.snyther", role: "Designer" },
      { name: "nexx4sure", instagram: "@mhmmdmhb_", role: "Designer" },
      { name: "Arriesh", instagram: "@esh33", role: "Designer" },
      { name: "Rappal", instagram: "raffal_arz", role: "Designer" },
      { name: "Ardellio", instagram: "ardel.yo", role: "Designer" }
    ]
  },
  {
    title: "Karya Tulis",
    members: [
      { name: "Kevin", instagram: "kv.ein_", role: "Writer" },
      { name: "Senku", instagram: "Senkuphotograph", role: "Writer" },
      { name: "Saviora", instagram: "saviorasa", role: "Writer" }
    ]
  },
  {
    title: "Meme",
    members: [
      { name: "Daffa/deploid", instagram: "", role: "Meme Creator" },
      { name: "Kevin/Zyu", instagram: "Zyu.", role: "Meme Creator" }
    ]
  },
  {
    title: "Bot",
    members: [
      { name: "Rappal", instagram: "raffal_arz", role: "Bot Developer" },
      { name: "Flores", instagram: "flores.gold", role: "Bot Developer" }
    ]
  },
  {
    title: "Admin Discord",
    members: [
      { name: "Aljaan", instagram: "@snhrrr", role: "Discord Admin" }
    ]
  }
];

const TimKami = () => {
  return (
    <PageLayout
      title="Tim Kami"
      subtitle="Kenali lebih dekat para kreator dan admin di balik OUR CREATIVITY"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="space-y-12"
      >
        {teamData.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * sectionIndex, duration: 0.6 }}
          >
            <Card className="backdrop-blur-xl bg-foreground/5 border border-foreground/10 overflow-hidden">
              <CardHeader className="relative pb-2">
                <CardTitle className="text-xl font-serif">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                    {section.title}
                  </span>
                </CardTitle>
                {/* Decorative element */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
              </CardHeader>
              
              <Separator className="bg-foreground/10" />
              
              <CardContent className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.members.map((member, index) => (
                    <TeamMember 
                      key={`${section.title}-${member.name}`}
                      name={member.name}
                      instagram={member.instagram}
                      role={member.role}
                      index={index}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Team photo section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-serif mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70">
              Bersama-sama Kita Kreatif
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="aspect-video rounded-xl overflow-hidden border border-foreground/10"
            >
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80" 
                alt="Team collaboration" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="aspect-video rounded-xl overflow-hidden border border-foreground/10"
            >
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80" 
                alt="Team working together" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="aspect-video rounded-xl overflow-hidden border border-foreground/10 md:col-span-2 lg:col-span-1"
            >
              <img 
                src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&q=80" 
                alt="Creative innovation" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default TimKami;
