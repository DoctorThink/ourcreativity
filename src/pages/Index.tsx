
import React from "react";
import PageLayout from "../components/layouts/PageLayout";
import { GSAPHero } from "../components/animations/GSAPHero";
import { GSAPBentoGrid } from "../components/animations/GSAPBentoGrid";

const Index = () => {
  return (
    <PageLayout 
      title=""
      showBackButton={false}
    >
      {/* GSAP Enhanced Hero Section */}
      <div className="mb-16">
        <GSAPHero />
      </div>

      {/* GSAP Enhanced Bento Grid */}
      <GSAPBentoGrid />
    </PageLayout>
  );
};

export default Index;
