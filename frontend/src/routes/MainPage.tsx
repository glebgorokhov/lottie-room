import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment } from "react";

import AnimationCard from "../components/AnimationCard.tsx";
import Button from "../components/Button.tsx";
import Container from "../components/Container.tsx";
import Footer from "../components/Footer.tsx";
import Header from "../components/Header.tsx";
import UploadSection from "../components/UploadSection.tsx";
import useAPI from "../hooks/useAPI.ts";

export default function MainPage() {
  const { getFeaturedAnimations } = useAPI();

  const { data, fetchNextPage, isFetchingNextPage, isFetched } =
    useInfiniteQuery({
      queryKey: ["featuredAnimations"],
      queryFn: getFeaturedAnimations,
      initialPageParam: "",
      getNextPageParam: (lastPage) => lastPage.nextCursor,
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
          {!isFetched &&
            Array(12)
              .fill(null)
              .map((_n, i) => <AnimationCard animation={null} key={i} />)}
          {data?.pages.map((page, index) => (
            <Fragment key={index}>
              {page.animations.map((animation) => (
                <AnimationCard key={animation.id} animation={animation} />
              ))}
            </Fragment>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button
            title="Show more"
            themeClass="theme-brand-tint hover:theme-brand"
            preIcon="ri:refresh-line"
            roundedClass="rounded-xl"
            onClick={fetchNextPage}
            loading={isFetchingNextPage}
            type="button"
          />
        </div>
      </Container>
      <Footer />
    </>
  );
}
