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
      color: "bg-white/10",
      members: 256,
      status: "Aktif"
    },
    {
      id: 2,
      name: "O.C Edisi Video Editing",
      description: "Komunitas Editing Video",
      icon: <Video className="w-6 h-6" />,
      color: "bg-white/10",
      members: 189,
      status: "Aktif"
    },
    {
      id: 3,
      name: "O.C Edisi Ngegame",
      description: "Komunitas Gaming",
      icon: <Gamepad2 className="w-6 h-6" />,
      color: "bg-white/10",
      members: 324,
      status: "Aktif"
    },
    {
      id: 4,
      name: "O.C BOT",
      description: "Pengembangan Bot",
      icon: <Bot className="w-6 h-6" />,
      color: "bg-white/10",
      members: 145,
      status: "Aktif"
    },
    {
      id: 5,
      name: "O.C BOT V.2 [FOR DESIGN]",
      description: "Otomatisasi Desain",
      icon: <Bot className="w-6 h-6" />,
      color: "bg-white/10",
      members: 111,
      status: "Aktif"
    },
    {
      id: 6,
      name: "HØPECØRE INDONESIA",
      description: "Komunitas Kreatif Indonesia",
      icon: <Users className="w-6 h-6" />,
      color: "bg-white/10",
      members: 278,
      status: "Aktif"
    },
    {
      id: 7,
      name: "Para Ademin",
      description: "Grup Admin",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "bg-white/10",
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
      {/* Header with Logo */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg mb-6 pb-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-foreground/60 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </button>
          
          {/* Logo Container */}
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-8 h-8 rounded-full bg-white/5 p-1 flex items-center justify-center backdrop-blur-md border border-white/10"
            >
              <img
                src="/lovable-uploads/c861a7c0-5ec9-4bac-83ea-319c40fcb001.png"
                alt="Logo"
                className="w-6 h-6 object-contain"
              />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-8 h-8 rounded-full bg-white/5 p-1 flex items-center justify-center backdrop-blur-md border border-white/10"
            >
              <img
                src="/lovable-uploads/0bec5fdf-43d7-47af-b1cd-ba7fd2b949ec.png"
                alt="Text Logo"
                className="w-6 h-6 object-contain"
              />
            </motion.div>
          </div>
        </div>
        
        <div className="mt-4">
          <h1 className="text-2xl font-bold font-serif glow-text">OUR CREATIVITY</h1>
          <p className="text-foreground/60">8 Grup Kreatif</p>
        </div>
      </div>

      {/* Groups Grid */}
      <ScrollArea className="h-[calc(100vh-280px)]">
        <div className="grid grid-cols-1 gap-4 pb-6">
          {groups.map((group) => (
            <motion.div
              key={group.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative glass rounded-2xl p-4 transition-all duration-200 hover:bg-white/10"
            >
              <div className="flex items-start space-x-4">
                <div className={`${group.color} p-3 rounded-full backdrop-blur-md border border-white/10`}>
                  {group.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-semibold">{group.name}</h3>
                    <Badge variant="outline" className="ml-2 rounded-full">
                      {group.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground/60 mt-1 font-serif">
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
              <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-white/10 p-4">
        <div className="max-w-screen-xl mx-auto grid grid-cols-4 gap-2">
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 h-auto py-2 rounded-full hover:bg-white/10"
          >
            <Rocket className="w-5 h-5" />
            <span className="text-xs font-serif">Jelajahi</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 h-auto py-2 rounded-full hover:bg-white/10"
          >
            <Users className="w-5 h-5" />
            <span className="text-xs font-serif">Mulai</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 h-auto py-2 rounded-full hover:bg-white/10"
          >
            <Info className="w-5 h-5" />
            <span className="text-xs font-serif">Informasi</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 h-auto py-2 rounded-full hover:bg-white/10"
          >
            <Bell className="w-5 h-5" />
            <span className="text-xs font-serif">Pengumuman</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Groups;