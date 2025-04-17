
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock content data - in a real app, this would come from a database or API
const INITIAL_CONTENT = {
  "home": {
    "subtitle": "Dimana imajinasi bertemu dengan inovasi. Bergabunglah dengan komunitas kreatif kami.",
    "footer": "© 2024 OUR CREATIVITY • Designed by Ardellio S. A."
  },
  "brand-story": {
    "title": "Brand Story",
    "content": "The story of Our Creativity..."
  },
  "informasi": {
    "about": "Komunitas kreatif yang didirikan pada tahun 2024 dengan tujuan memberikan manfaat bagi banyak orang.",
    "mission": "Mengembangkan jiwa kreatif anak muda Indonesia."
  },
  "terms": {
    "membership": "Keanggotaan terbuka untuk semua yang tertarik berkarya di bidang kreatif",
    "content_rules": "Semua karya yang dibagikan harus merupakan karya asli atau memiliki izin"
  }
};

const ContentEditor = () => {
  const [selectedPage, setSelectedPage] = useState("home");
  const [selectedSection, setSelectedSection] = useState("");
  const [sections, setSections] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const [allContent, setAllContent] = useState(INITIAL_CONTENT);
  const { toast } = useToast();

  // When page selection changes, update the available sections
  const handlePageChange = (page: string) => {
    setSelectedPage(page);
    const sectionKeys = Object.keys(allContent[page as keyof typeof allContent] || {});
    setSections(sectionKeys);
    setSelectedSection(sectionKeys.length > 0 ? sectionKeys[0] : "");
    
    if (sectionKeys.length > 0) {
      // @ts-ignore - We know this exists based on the condition
      setContent(allContent[page][sectionKeys[0]]);
    } else {
      setContent("");
    }
  };

  // When section selection changes, update the content
  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
    // @ts-ignore - Dynamic access
    setContent(allContent[selectedPage][section] || "");
  };

  // Save the edited content
  const handleSaveContent = () => {
    setAllContent(prev => ({
      ...prev,
      [selectedPage]: {
        ...prev[selectedPage as keyof typeof prev],
        [selectedSection]: content
      }
    }));

    toast({
      title: "Content updated",
      description: `Updated ${selectedSection} in ${selectedPage} page`
    });
  };

  return (
    <Card className="backdrop-blur-xl bg-foreground/5 border border-foreground/10">
      <CardHeader>
        <CardTitle>Page Content Editor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="select" className="space-y-4">
          <TabsList className="grid grid-cols-2 bg-foreground/5 backdrop-blur-xl">
            <TabsTrigger value="select">Select Content</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="select" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-foreground/70 mb-2 block">
                  Select Page
                </label>
                <Select onValueChange={handlePageChange} value={selectedPage}>
                  <SelectTrigger className="bg-foreground/5 border-foreground/10">
                    <SelectValue placeholder="Select page" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Homepage</SelectItem>
                    <SelectItem value="brand-story">Brand Story</SelectItem>
                    <SelectItem value="informasi">Information</SelectItem>
                    <SelectItem value="terms">Terms & Conditions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground/70 mb-2 block">
                  Select Section
                </label>
                <Select 
                  onValueChange={handleSectionChange} 
                  value={selectedSection}
                  disabled={sections.length === 0}
                >
                  <SelectTrigger className="bg-foreground/5 border-foreground/10">
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    {sections.map(section => (
                      <SelectItem key={section} value={section}>
                        {section.replace('_', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/70 mb-2 block">
                Edit Content
              </label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px] bg-foreground/5 border-foreground/10"
                disabled={!selectedSection}
              />
            </div>

            <Button 
              onClick={handleSaveContent}
              className="w-full bg-foreground text-background hover:bg-foreground/90"
              disabled={!selectedSection}
            >
              Save Changes
            </Button>
          </TabsContent>
          
          <TabsContent value="preview" className="space-y-4">
            <div className="border border-foreground/10 rounded-lg p-4 bg-foreground/5 min-h-[200px]">
              <h3 className="font-medium mb-2">Preview of: {selectedSection} in {selectedPage}</h3>
              <div className="whitespace-pre-wrap text-foreground/80">
                {content || "No content selected"}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ContentEditor;
