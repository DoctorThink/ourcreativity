import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const Contact = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-8 glow-text">Join Our Community</h2>
          <p className="text-lg md:text-xl text-gray-300 mb-12">
            Ready to be part of something extraordinary? Connect with fellow creators and start your journey with us.
          </p>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6"
          >
            Get Started
          </Button>
        </motion.div>
      </div>
    </section>
  );
};