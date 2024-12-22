import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Image, 
  Video, 
  Gamepad2, 
  Bot, 
  Users, 
  MessageSquare,
  ArrowLeft
} from "lucide-react";

const Groups = () => {
  const navigate = useNavigate();

  const groups = [
    {
      id: 1,
      name: "O.C Edisi Desain Grafis",
      description: "Graphic Design Community",
      icon: <Image className="w-6 h-6" />,
      color: "bg-purple-500",
      members: 256,
      status: "Active"
    },
    {
      id: 2,
      name: "O.C Edisi Video Editing",
      description: "Video Editing Enthusiasts",
      icon: <Video className="w-6 h-6" />,
      color: "bg-red-500",
      members: 189,
      status: "Active"
    },
    {
      id: 3,
      name: "O.C Edisi Ngegame",
      description: "Gaming Community",
      icon: <Gamepad2 className="w-6 h-6" />,
      color: "bg-cyan-500",
      members: 324,
      status: "Active"
    },
    {
      id: 4,
      name: "O.C BOT",
      description: "Bot Development",
      icon: <Bot className="w-6 h-6" />,
      color: "bg-orange-500",
      members: 145,
      status: "Active"
    },
    {
      id: 5,
      name: "O.C BOT V.2 [FOR DESIGN]",
      description: "Design Automation",
      icon: <Bot className="w-6 h-6" />,
      color: "bg-pink-500",
      members: 111,
      status: "Active"
    },
    {
      id: 6,
      name: "HØPECØRE INDONESIA",
      description: "Indonesian Creative Community",
      icon: <Users className="w-6 h-6" />,
      color: "bg-gray-500",
      members: 278,
      status: "Active"
    },
    {
      id: 7,
      name: "Para Ademin",
      description: "Admin Group",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "bg-gray-600",
      members: 12,
      status: "Private"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background text-foreground p-4"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg mb-6 pb-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-foreground/60 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div className="mt-4 flex items-center space-x-4">
          <img 
            src="/lovable-uploads/1bc77d08-6f95-4b60-96cc-b027d8f3be4d.png" 
            alt="OC Logo" 
            className="w-12 h-12 rounded-2xl"
          />
          <div>
            <h1 className="text-2xl font-bold">OUR CREATIVITY COMMUNITY</h1>
            <p className="text-foreground/60">8 Creative Groups</p>
          </div>
        </div>
      </div>

      {/* Groups Grid */}
      <ScrollArea className="h-[calc(100vh-180px)]">
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
                      {group.members} members
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </motion.div>
  );
};

export default Groups;