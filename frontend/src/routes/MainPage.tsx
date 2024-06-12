import { useQuery } from "@tanstack/react-query";

import AnimationCard from "../components/AnimationCard.tsx";
import Button from "../components/Button.tsx";
import Container from "../components/Container.tsx";
import Footer from "../components/Footer.tsx";
import Header from "../components/Header.tsx";
import UploadSection from "../components/UploadSection.tsx";
import useAPI from "../hooks/useAPI.ts";

export default function MainPage() {
  const { getFeaturedAnimations } = useAPI();

  const { data } = useQuery({
    queryKey: ["featuredAnimations"],
    queryFn: getFeaturedAnimations,
    initialData: {
      animations: [],
    },
  });

  const style = {
    grid: "grid grid-cols-4 gap-6 mt-6",
  };

  return (
    <>
      <Header />
      <Container className="pt-10 pb-24">
        <UploadSection />

        <div className="mt-16">
          <h1 className="heading text-4xl font-bold text-t-text">
            Featured animations
          </h1>
        </div>
        <div className={style.grid}>
          {data.animations.map((animation) => (
            <AnimationCard key={animation.id} animation={animation} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button
            title="Show more"
            themeClass="theme-brand-tint hover:theme-brand"
            preIcon="ri:refresh-line"
            roundedClass="rounded-xl"
          />
        </div>
      </Container>
      <Footer />
    </>
  );
}
