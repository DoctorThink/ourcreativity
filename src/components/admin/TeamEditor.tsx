
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Trash2, Save, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

// Initial mock data - in a real app, this would come from a database
const INITIAL_TEAM_DATA = [
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
  }
];

interface TeamMember {
  name: string;
  instagram: string;
  role: string;
  imageUrl?: string;
}

interface TeamGroup {
  title: string;
  members: TeamMember[];
}

const TeamEditor = () => {
  const [teamData, setTeamData] = useState<TeamGroup[]>(INITIAL_TEAM_DATA);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState<number>(0);
  const [newGroupTitle, setNewGroupTitle] = useState("");
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const { toast } = useToast();

  // Selected group for editing
  const selectedGroup = teamData[selectedGroupIndex];

  const handleAddGroup = () => {
    if (newGroupTitle.trim()) {
      setTeamData([...teamData, { title: newGroupTitle, members: [] }]);
      setNewGroupTitle("");
      setIsAddingGroup(false);
      setSelectedGroupIndex(teamData.length);
      toast({ title: "Group added", description: `${newGroupTitle} group has been added` });
    }
  };

  const handleDeleteGroup = (index: number) => {
    const newTeamData = teamData.filter((_, i) => i !== index);
    setTeamData(newTeamData);
    setSelectedGroupIndex(0);
    toast({ title: "Group deleted" });
  };

  const handleAddMember = () => {
    const newTeamData = [...teamData];
    newTeamData[selectedGroupIndex].members.push({
      name: "New Member",
      instagram: "",
      role: "Team Member"
    });
    setTeamData(newTeamData);
  };

  const handleUpdateMember = (memberIndex: number, field: keyof TeamMember, value: string) => {
    const newTeamData = [...teamData];
    newTeamData[selectedGroupIndex].members[memberIndex][field] = value;
    setTeamData(newTeamData);
  };

  const handleDeleteMember = (memberIndex: number) => {
    const newTeamData = [...teamData];
    newTeamData[selectedGroupIndex].members.splice(memberIndex, 1);
    setTeamData(newTeamData);
  };

  const handleSaveChanges = () => {
    // In a real app, this would save to a database
    toast({ 
      title: "Changes saved", 
      description: "Team information has been updated successfully"
    });
  };

  return (
    <Card className="backdrop-blur-xl bg-foreground/5 border border-foreground/10">
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          {/* Groups sidebar */}
          <div className="w-full md:w-1/3">
            <Card className="bg-foreground/5 border-foreground/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Groups</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <ScrollArea className="h-[300px]">
                  <div className="space-y-1">
                    {teamData.map((group, index) => (
                      <div 
                        key={index}
                        className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                          selectedGroupIndex === index ? 'bg-foreground/10' : 'hover:bg-foreground/5'
                        }`}
                        onClick={() => setSelectedGroupIndex(index)}
                      >
                        <span>{group.title}</span>
                        {teamData.length > 1 && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteGroup(index);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                {isAddingGroup ? (
                  <div className="flex items-center mt-4">
                    <Input 
                      value={newGroupTitle} 
                      onChange={(e) => setNewGroupTitle(e.target.value)}
                      placeholder="Group name"
                      className="bg-foreground/5 border-foreground/10"
                    />
                    <Button 
                      variant="ghost" 
                      onClick={handleAddGroup}
                      disabled={!newGroupTitle.trim()}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 bg-foreground/5 border-foreground/10"
                    onClick={() => setIsAddingGroup(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Group
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Members editing */}
          <div className="w-full md:w-2/3">
            <Card className="bg-foreground/5 border-foreground/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">
                  Edit {selectedGroup?.title} Members
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddMember}
                  className="bg-foreground/5 border-foreground/10"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Member
                </Button>
              </CardHeader>
              <CardContent className="py-0">
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    {selectedGroup?.members.map((member, index) => (
                      <div key={index} className="bg-foreground/5 rounded-md p-4 border border-foreground/10">
                        <div className="flex items-center space-x-4 mb-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{member.name}</div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="ml-auto" 
                            onClick={() => handleDeleteMember(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="grid gap-3">
                          <div className="grid grid-cols-4 gap-2 items-center">
                            <label className="text-sm">Name</label>
                            <Input
                              className="col-span-3 bg-foreground/5 border-foreground/10"
                              value={member.name}
                              onChange={(e) => handleUpdateMember(index, 'name', e.target.value)}
                            />
                          </div>
                          
                          <div className="grid grid-cols-4 gap-2 items-center">
                            <label className="text-sm">Instagram</label>
                            <Input
                              className="col-span-3 bg-foreground/5 border-foreground/10"
                              value={member.instagram}
                              onChange={(e) => handleUpdateMember(index, 'instagram', e.target.value)}
                            />
                          </div>
                          
                          <div className="grid grid-cols-4 gap-2 items-center">
                            <label className="text-sm">Role</label>
                            <Input
                              className="col-span-3 bg-foreground/5 border-foreground/10"
                              value={member.role}
                              onChange={(e) => handleUpdateMember(index, 'role', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {selectedGroup?.members.length === 0 && (
                      <div className="text-center py-8 text-foreground/50">
                        No members in this group. Add your first member.
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>

        <Button 
          onClick={handleSaveChanges}
          className="w-full bg-foreground text-background hover:bg-foreground/90"
        >
          Save All Changes
        </Button>
      </CardContent>
    </Card>
  );
};

export default TeamEditor;
