
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Database } from "@/integrations/supabase/types";

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface SpotlightSectionProps {
  karyaItems: KaryaType[];
}

export const SpotlightSection: React.FC<SpotlightSectionProps> = ({ karyaItems }) => {
  const selectedSpotlightItem = 
    karyaItems?.find(item => item.is_spotlight === true) || karyaItems?.[0];

  if (!selectedSpotlightItem) {
    return (
      <section className="my-8 text-center">
        <h2 className="text-2xl font-semibold mb-6">Spotlight Karya</h2>
        <p className="text-foreground/70">No spotlight items available.</p>
      </section>
    );
  }

  const { 
    title, 
    description, 
    image_url, 
    media_urls, 
    creator_name, 
    created_at 
  } = selectedSpotlightItem;

  const displayImageUrl = image_url || (media_urls && media_urls.length > 0 ? media_urls[0] : "/placeholder.svg");

  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-6">Spotlight Karya</h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Card className="overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <div className="md:grid md:grid-cols-2 gap-6">
            <CardHeader className="p-0">
              <img 
                src={displayImageUrl} 
                alt={title} 
                className="w-full h-full object-cover min-h-[300px]" 
              />
            </CardHeader>
            
            <CardContent className="flex flex-col justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-4">{title}</h3>
                <p className="mb-6 text-muted-foreground">{description || "No description available."}</p>
                
                <CardFooter className="px-0 py-2 flex justify-between text-sm">
                  <span className="font-medium">{creator_name || "Unknown Creator"}</span>
                  <span className="text-muted-foreground">
                    {new Date(created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </CardFooter>
              </motion.div>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    </section>
  );
};
