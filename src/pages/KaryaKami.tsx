
import React from "react";
import { motion } from "framer-motion";
import { KaryaGallery } from "../components/karya/KaryaGallery";
import PageLayout from "../components/layouts/PageLayout";
import { SpotlightSection } from "../components/karya/SpotlightSection";

const KaryaKami: React.FC = () => {
  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto px-4 py-8"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">Karya Kami</h1>
        
        <SpotlightSection />
        
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Gallery Karya</h2>
          <KaryaGallery />
        </section>
      </motion.div>
    </PageLayout>
  );
};

export default KaryaKami;
