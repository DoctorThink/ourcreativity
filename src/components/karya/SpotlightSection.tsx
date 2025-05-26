
import React from "react";
import { motion } from "framer-motion";
import KaryaCard from "../KaryaCard"; // Assuming KaryaCard is in the parent directory
import { Database } from "@/integrations/supabase/types";

type KaryaType = Database['public']['Tables']['karya']['Row'];

interface SpotlightSectionProps {
  // To make this component dynamic, it should receive the spotlighted Karya item as a prop.
  // For now, we'll make it optional to avoid breaking existing usage if KaryaKami.tsx isn't updated yet.
  // Ideally, KaryaKami.tsx would fetch and pass down the spotlight item.
  spotlightKarya?: KaryaType | null; 
}

export const SpotlightSection: React.FC<SpotlightSectionProps> = ({ spotlightKarya }) => {
  if (!spotlightKarya) {
    // Optionally, render nothing or a placeholder if no spotlight item is provided
    // For this example, we'll render a message, but in production, you might fetch here or render nothing.
    return (
      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-6">Spotlight Karya</h2>
        <p className="text-center text-foreground/70">No spotlight item to display currently.</p>
        {/* 
          Alternatively, you could fetch data here:
          const { data, isLoading, error } = useQuery({ queryKey: ['spotlightKarya'], queryFn: fetchSpotlightKaryaFromSupabase });
          if (isLoading) return <p>Loading spotlight...</p>;
          if (error || !data) return <p>Could not load spotlight.</p>;
          // then use 'data' as spotlightKarya
        */}
      </section>
    );
  }

  // If using KaryaCard, the layout might need to be simpler, or KaryaCard itself might need variants.
  // For this example, we'll wrap KaryaCard in the motion.div and let KaryaCard handle its own presentation.
  // The original custom layout with side-by-side image and text is not directly replicated by just using KaryaCard.
  // If that exact layout is required, KaryaCard would need to be modified or custom rendering logic retained and adapted.
  
  // For simplicity, this example will just render the KaryaCard for the spotlight item.
  // A more complex implementation would integrate the spotlightKarya data into the original SpotlightSection's custom layout.
  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-6">Spotlight Karya</h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Render the spotlight item using KaryaCard for consistent display and media handling */}
        {/* Note: This changes the visual presentation from the original custom layout. */}
        <KaryaCard karya={spotlightKarya} onClick={() => { /* Define click behavior, e.g., open dialog */ }} />
        
        {/* 
          To keep the original detailed layout, you would NOT use KaryaCard here.
          Instead, you'd adapt the original JSX:
          
          <Card className="overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <div className="md:grid md:grid-cols-2 gap-6">
              <CardHeader className="p-0">
                <img 
                  // Use getTransformedUrl if it were made available here, or ensure direct URL is fine
                  src={spotlightKarya.image_url || '/placeholder.svg'} 
                  alt={spotlightKarya.title || 'Spotlight image'} 
                  className="w-full h-full object-cover min-h-[300px]" 
                />
              </CardHeader>
              <CardContent className="flex flex-col justify-center p-6">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
                  <h3 className="text-2xl font-bold mb-4">{spotlightKarya.title}</h3>
                  <p className="mb-6 text-muted-foreground">{spotlightKarya.description}</p>
                  <CardFooter className="px-0 py-2 flex justify-between text-sm">
                    <span className="font-medium">{spotlightKarya.creator_name}</span>
                    <span className="text-muted-foreground">
                      {new Date(spotlightKarya.created_at).toLocaleDateString()}
                    </span>
                  </CardFooter>
                </motion.div>
              </CardContent>
            </div>
          </Card>
          
          This custom rendering would need to handle video/carousel from media_urls if required,
          and ensure image_url is processed (e.g. via a shared getTransformedUrl) if needed.
        */}
      </motion.div>
    </section>
  );
};
