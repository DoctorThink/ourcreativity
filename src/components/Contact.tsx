
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Contact = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-serif mb-8 animate-glow">Join Our Community</h2>
          <p className="text-base md:text-lg text-gray-300 mb-12 leading-relaxed">
            Ready to be part of something extraordinary? Connect with fellow creators and start your journey with us.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              className="bg-lavender text-primary-foreground hover:bg-lavender/90 text-lg px-8 py-6 rounded-ios transition-all duration-300 shadow-lg hover:shadow-xl group"
              onClick={() => window.location.href = "/informasi"}
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
