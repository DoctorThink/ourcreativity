
import React from "react";
import PageLayout from "../components/layouts/PageLayout";
import GSAPHero from "../components/animations/GSAPHero";
import GSAPBentoGrid from "../components/animations/GSAPBentoGrid";

const Index = () => {
  return (
    <PageLayout 
      title=""
      showBackButton={false}
    >
      <GSAPHero />
      <GSAPBentoGrid />
    </PageLayout>
  );
};

export default Index;
