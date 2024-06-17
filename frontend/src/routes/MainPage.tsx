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
    container: "pt-6 lg:pt-10 pb-16 lg:pb-24",
    title: "heading text-2xl lg:text-4xl font-bold text-t-text",
    featured: "mt-10 lg:mt-16",
    grid: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6 mt-4 lg:mt-6",
    sorry:
      "rounded-2xl col-span-2 md:col-span-3 lg:col-span-4 p-6 text-center text-base border border-t-border",
    buttonWrapper: "flex justify-center mt-8 lg:mt-12",
  };

  return (
    <>
      <Header />
      <Container className={style.container}>
        <UploadSection />

        <div className={style.featured}>
          <h1 className={style.title}>Featured animations</h1>

          <div className={style.grid}>
            {/* Loading */}
            {!isFetched &&
              Array(12)
                .fill(null)
                .map((_n, i) => <AnimationCard animation={null} key={i} />)}

            {/* Loading finished */}
            {isFetched &&
              (data ? (
                data?.pages.map((page, index) => (
                  <Fragment key={index}>
                    {page.animations.map((animation) => (
                      <AnimationCard key={animation.id} animation={animation} />
                    ))}
                  </Fragment>
                ))
              ) : (
                <div className={style.sorry}>
                  Sorry, we couldn&apos;t fetch featured animations.
                </div>
              ))}
          </div>

          {/* Show more */}
          {!!data && (
            <div className={style.buttonWrapper}>
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
          )}
        </div>
      </Container>
      <Footer />
    </>
  );
}
