
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

// Featured karya item with spotlight treatment
const spotlightItem = {
  id: "spotlight-1",
  title: "Digital Art Masterpiece",
  description: "This month's featured creative work showcases innovative techniques and exceptional talent from one of our community members.",
  imageUrl: "/placeholder.svg",
  creator: "Maya Putri",
  createdAt: "2023-06-01"
};

export const SpotlightSection: React.FC = () => {
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
                src={spotlightItem.imageUrl} 
                alt={spotlightItem.title} 
                className="w-full h-full object-cover min-h-[300px]" 
              />
            </CardHeader>
            
            <CardContent className="flex flex-col justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-4">{spotlightItem.title}</h3>
                <p className="mb-6 text-muted-foreground">{spotlightItem.description}</p>
                
                <CardFooter className="px-0 py-2 flex justify-between text-sm">
                  <span className="font-medium">{spotlightItem.creator}</span>
                  <span className="text-muted-foreground">
                    {new Date(spotlightItem.createdAt).toLocaleDateString()}
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
