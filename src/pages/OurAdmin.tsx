
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnnouncementEditor from '@/components/admin/AnnouncementEditor';
import ContentEditor from '@/components/admin/ContentEditor';
import TeamEditor from '@/components/admin/TeamEditor';
import KaryaModeration from '@/components/admin/KaryaModeration';

const OurAdmin = () => {
  const [activeTab, setActiveTab] = useState('announcements');

  return (
    <div className="container py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 font-serif">Admin Dashboard</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="announcements">Pengumuman</TabsTrigger>
          <TabsTrigger value="content">Konten</TabsTrigger>
          <TabsTrigger value="team">Tim</TabsTrigger>
          <TabsTrigger value="karya">Karya Moderation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="announcements">
          <AnnouncementEditor />
        </TabsContent>
        
        <TabsContent value="content">
          <ContentEditor />
        </TabsContent>
        
        <TabsContent value="team">
          <TeamEditor />
        </TabsContent>
        
        <TabsContent value="karya">
          <KaryaModeration />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OurAdmin;
