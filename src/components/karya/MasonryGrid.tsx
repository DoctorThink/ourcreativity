
import React from "react";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

type KaryaItem = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt: string;
  creator: string;
};

type MasonryGridProps = {
  items: KaryaItem[];
};

export const MasonryGrid: React.FC<MasonryGridProps> = ({ items }) => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex w-auto -ml-4"
      columnClassName="pl-4 bg-background"
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-48 object-cover" 
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
            </CardContent>
            <CardFooter className="px-4 py-3 bg-secondary/20 flex justify-between text-xs">
              <span>{item.creator}</span>
              <span>{new Date(item.createdAt).toLocaleDateString()}</span>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </Masonry>
  );
};
