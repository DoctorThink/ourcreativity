import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { 
  Image, 
  Video, 
  Gamepad2, 
  Bot, 
  Users, 
  MessageSquare,
  ArrowLeft,
  Info,
  Bell,
  Rocket
} from "lucide-react";

const Groups = () => {
  const navigate = useNavigate();

  const groups = [
    {
      id: 1,
      name: "O.C Edisi Desain Grafis",
      description: "Komunitas Desain Grafis",
      icon: <Image className="w-6 h-6" />,
      color: "bg-purple-500",
      members: 256,
      status: "Aktif"
    },
    {
      id: 2,
      name: "O.C Edisi Video Editing",
      description: "Komunitas Editing Video",
      icon: <Video className="w-6 h-6" />,
      color: "bg-red-500",
      members: 189,
      status: "Aktif"
    },
    {
      id: 3,
      name: "O.C Edisi Ngegame",
      description: "Komunitas Gaming",
      icon: <Gamepad2 className="w-6 h-6" />,
      color: "bg-cyan-500",
      members: 324,
      status: "Aktif"
    },
    {
      id: 4,
      name: "O.C BOT",
      description: "Pengembangan Bot",
      icon: <Bot className="w-6 h-6" />,
      color: "bg-orange-500",
      members: 145,
      status: "Aktif"
    },
    {
      id: 5,
      name: "O.C BOT V.2 [FOR DESIGN]",
      description: "Otomatisasi Desain",
      icon: <Bot className="w-6 h-6" />,
      color: "bg-pink-500",
      members: 111,
      status: "Aktif"
    },
    {
      id: 6,
      name: "HØPECØRE INDONESIA",
      description: "Komunitas Kreatif Indonesia",
      icon: <Users className="w-6 h-6" />,
      color: "bg-gray-500",
      members: 278,
      status: "Aktif"
    },
    {
      id: 7,
      name: "Para Ademin",
      description: "Grup Admin",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "bg-gray-600",
      members: 12,
      status: "Privat"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background text-foreground p-4 pb-24"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg mb-6 pb-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-foreground/60 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali</span>
        </button>
        <div className="mt-4">
          <h1 className="text-2xl font-bold">KOMUNITAS KREATIF KITA</h1>
          <p className="text-foreground/60">8 Grup Kreatif</p>
        </div>
      </div>

      {/* Groups Grid */}
      <ScrollArea className="h-[calc(100vh-280px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
          {groups.map((group) => (
            <motion.div
              key={group.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-secondary rounded-ios p-4 transition-all duration-200 hover:bg-secondary/80"
            >
              <div className="flex items-start space-x-4">
                <div className={`${group.color} p-3 rounded-ios`}>
                  {group.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{group.name}</h3>
                    <Badge variant="outline" className="ml-2">
                      {group.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground/60 mt-1">
                    {group.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Users className="w-4 h-4 text-foreground/40" />
                    <span className="text-sm text-foreground/60">
                      {group.members} anggota
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-accent/10 p-4">
        <div className="max-w-screen-xl mx-auto grid grid-cols-4 gap-2">
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 h-auto py-2"
            onClick={() => navigate('/groups')}
          >
            <Rocket className="w-5 h-5" />
            <span className="text-xs">Jelajahi</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 h-auto py-2"
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">Mulai</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 h-auto py-2"
          >
            <Info className="w-5 h-5" />
            <span className="text-xs">Informasi</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 h-auto py-2"
          >
            <Bell className="w-5 h-5" />
            <span className="text-xs">Pengumuman</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Groups;