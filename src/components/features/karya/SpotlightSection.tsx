
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { Database } from "@/integrations/supabase/types";

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface SpotlightSectionProps {
  spotlightItems: KaryaType[];
}

export const SpotlightSection: React.FC<SpotlightSectionProps> = ({ spotlightItems }) => {
  if (!spotlightItems || spotlightItems.length === 0) {
    return null;
  }

  // Use the first spotlight item as the featured item
  const featuredItem = spotlightItems[0];

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
              {featuredItem.image_url ? (
                <img 
                  src={featuredItem.image_url} 
                  alt={featuredItem.title} 
                  className="w-full h-full object-cover min-h-[300px]" 
                />
              ) : (
                <div className="w-full h-full min-h-[300px] bg-secondary/50 flex items-center justify-center">
                  <span className="text-foreground/50">No image available</span>
                </div>
              )}
            </CardHeader>
            
            <CardContent className="flex flex-col justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-4">{featuredItem.title}</h3>
                <p className="mb-6 text-muted-foreground">
                  {featuredItem.description || "Featured creative work from our community"}
                </p>
                
                <CardFooter className="px-0 py-2 flex justify-between text-sm">
                  <span className="font-medium">{featuredItem.creator_name}</span>
                  <span className="text-muted-foreground">
                    {new Date(featuredItem.created_at).toLocaleDateString()}
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
