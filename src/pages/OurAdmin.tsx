
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnnouncementEditor from '@/components/admin/AnnouncementEditor';
import ContentEditor from '@/components/admin/ContentEditor';
import TeamEditor from '@/components/admin/TeamEditor';
import KaryaModeration from '@/components/admin/KaryaModeration';

const OurAdmin = () => {
  const [activeTab, setActiveTab] = useState('announcements');

  return (
    <div className="container py-8 min-h-screen dark-mode grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <h1 className="text-3xl font-bold mb-8 font-serif col-span-full">Admin Dashboard</h1>

      <div className="col-span-1 md:col-span-2 lg:col-span-3">
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

      <div className="col-span-1 md:col-span-2 lg:col-span-1">
        {/* Placeholder for additional content */}
        <div className="bg-gray-200 rounded-md p-4">
          Additional Content
        </div>
      </div>
    </div>
  );
};

export default OurAdmin;
