
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Calendar, Bell } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

// Mock data - in a real app, this would come from a database
const INITIAL_ANNOUNCEMENTS = [
  {
    id: "1",
    title: "Community Meetup",
    content: "Join us for our monthly community meetup next Friday at 7PM.",
    date: new Date().toISOString(),
    published: true
  },
  {
    id: "2",
    title: "New Design Challenge",
    content: "We're launching a new design challenge with prizes for the top submissions.",
    date: new Date().toISOString(),
    published: true
  }
];

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  published: boolean;
}

const AnnouncementEditor = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const resetForm = () => {
    setEditingAnnouncement(null);
    setIsEditing(false);
  };

  const handleCreateOrUpdate = () => {
    if (!editingAnnouncement?.title || !editingAnnouncement?.content) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }

    if (isEditing) {
      // Update existing announcement
      setAnnouncements(announcements.map(a => 
        a.id === editingAnnouncement.id ? editingAnnouncement : a
      ));
      toast({ title: "Announcement updated" });
    } else {
      // Create new announcement
      const newAnnouncement = {
        ...editingAnnouncement,
        id: String(Date.now()),
        date: new Date().toISOString(),
        published: true
      };
      setAnnouncements([newAnnouncement, ...announcements]);
      toast({ title: "Announcement created" });
    }
    
    resetForm();
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
    toast({ title: "Announcement deleted" });
  };

  const handleTogglePublish = (id: string) => {
    setAnnouncements(announcements.map(a => 
      a.id === id ? { ...a, published: !a.published } : a
    ));
  };

  return (
    <Card className="backdrop-blur-xl bg-foreground/5 border border-foreground/10 rounded-md">
      <CardHeader>
        <CardTitle>Manage Announcements</CardTitle>
        <CardDescription>Create, edit, or delete announcements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          {/* Form */}
          <div className="w-full md:w-1/2">
            <Card className="bg-foreground/5 border-foreground/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  {isEditing ? "Edit Announcement" : "Create New Announcement"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Announcement title"
                      value={editingAnnouncement?.title || ""}
                      onChange={(e) => setEditingAnnouncement(prev => ({
                        ...prev as Announcement,
                        title: e.target.value
                      }))}
                      className="bg-foreground/5 border-foreground/10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Announcement details"
                      value={editingAnnouncement?.content || ""}
                      onChange={(e) => setEditingAnnouncement(prev => ({
                        ...prev as Announcement,
                        content: e.target.value
                      }))}
                      className="min-h-[120px] bg-foreground/5 border-foreground/10"
                    />
                  </div>

                  {isEditing && (
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={editingAnnouncement?.published || false}
                        onCheckedChange={(checked) => setEditingAnnouncement(prev => ({
                          ...prev as Announcement,
                          published: checked
                        }))}
                      />
                      <Label htmlFor="published">Published</Label>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button
                      onClick={handleCreateOrUpdate}
                      className="flex-1 bg-foreground text-background hover:bg-foreground/90"
                    >
                      {isEditing ? "Update" : "Create"}
                    </Button>
                    {isEditing && (
                      <Button
                        variant="outline"
                        onClick={resetForm}
                        className="bg-foreground/5 border-foreground/10"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* List of announcements */}
          <div className="w-full md:w-1/2">
            <Card className="bg-foreground/5 border-foreground/10">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Announcements</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      if (!isEditing) {
                        setEditingAnnouncement({
                          id: "",
                          title: "",
                          content: "",
                          date: new Date().toISOString(),
                          published: true
                        });
                      }
                    }}
                    disabled={isEditing}
                    className="bg-foreground/5 border-foreground/10"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    New
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  {announcements.length === 0 ? (
                    <div className="text-center py-8 text-foreground/50">
                      No announcements yet. Create your first one.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {announcements.map((announcement) => (
                        <div 
                          key={announcement.id}
                          className="bg-foreground/5 rounded-md p-3 border border-foreground/10"
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center">
                                <Bell className={`h-4 w-4 mr-2 ${announcement.published ? 'text-foreground' : 'text-foreground/40'}`} />
                                <h3 className={`font-medium ${announcement.published ? '' : 'text-foreground/40'}`}>
                                  {announcement.title}
                                </h3>
                              </div>
                              <div className="flex items-center text-xs text-foreground/50">
                                <Calendar className="h-3 w-3 mr-1" />
                                {format(new Date(announcement.date), "MMM d, yyyy")}
                              </div>
                            </div>
                            
                            <div className="flex space-x-1">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleTogglePublish(announcement.id)}
                              >
                                <Switch
                                  checked={announcement.published}
                                  onCheckedChange={() => {}}
                                />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleEdit(announcement)}
                              >
                                Edit
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDelete(announcement.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <p className={`text-sm mt-2 line-clamp-2 ${announcement.published ? 'text-foreground/70' : 'text-foreground/40'}`}>
                            {announcement.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnnouncementEditor;
