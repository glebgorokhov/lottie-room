import { Icon } from "@iconify/react";
import { Animation } from "@lottiefiles/lottie-types";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";

import useAPI from "../hooks/useAPI.ts";
import { FeaturedAnimation } from "../types";
import { getFullName } from "../utils/fullName.ts";
import LottiePreviewByUrl from "./LottiePreviewByUrl.tsx";
import Skeleton from "./Skeleton.tsx";
import SkeletonText from "./SkeletonText.tsx";

type AnimationCardProps = {
  animation: FeaturedAnimation | null;
};

export default function AnimationCard({ animation }: AnimationCardProps) {
  const navigate = useNavigate();
  const { openPlaygroundForData } = useAPI();

  const { mutateAsync: openPlayground, isPending: playgroundIsOpening } =
    useMutation({
      mutationFn: async () => {
        if (!animation) {
          return;
        }

        const response = await fetch(animation.jsonUrl);
        const animationJSON = (await response.json()) as Animation;
        const playgroundUrl = await openPlaygroundForData(animationJSON);

        navigate(`/${playgroundUrl}`);
      },
    });

  const style = {
    card: "text-t-text-light rounded-2xl group transition-opacity",
    imageWrapper:
      "block pb-[100%] w-full relative h-0 border border-t-border rounded-[0.875rem] overflow-hidden theme-neutral-light bg-t-bg transition-[border-color] group-hover:border-t-text",
    image: "absolute inset-px",
    noImage: "w-10 h-10 m-auto inset-0 absolute opacity-50",
    content: "mt-2.5",
    name: "block text-sm lg:text-base group-hover:text-t-text transition-colors flex-1",
    author:
      "flex items-center gap-2 text-xs lg:text-sm mt-1.5 flex-1 overflow-hidden transition-colors hover:text-t-text",
    avatar: "w-4 h-4 rounded-full shrink-0",
    authorName: "truncate",
    likes: "flex text-sm items-center gap-1",
    likesIcon: "w-3 lg:w-4 h-3 lg:h-4",
    loaderIcon:
      "text-t-bg absolute inset-0 m-auto w-10 h-10 z-[1] theme-brand-tint animate-spin",
  };

  return (
    <div
      className={clsx(style.card, {
        "opacity-50 pointer-events-none": playgroundIsOpening,
        "pointer-events-none": !animation,
      })}
    >
      {/* Preview */}
      <button
        type="button"
        className={style.imageWrapper}
        onClick={() => openPlayground()}
      >
        {!animation ? (
          <Skeleton fill />
        ) : animation.jsonUrl ? (
          <LottiePreviewByUrl url={animation.jsonUrl} className={style.image} />
        ) : (
          <Icon icon="carbon:no-image" className={style.noImage} />
        )}

        {playgroundIsOpening && (
          <Icon icon="ri:loader-4-line" className={style.loaderIcon} />
        )}
      </button>

      <div className={style.content}>
        <div className="flex items-start justify-between gap-4">
          {/* Animation name */}
          <Link to={`/lottie/${animation?.id}`} className={style.name}>
            {animation ? (
              animation.name
            ) : (
              <div className="w-full">
                <SkeletonText lines={2} />
              </div>
            )}
          </Link>

          {/* Likes */}
          <div className={style.likes}>
            <Icon icon="ri:heart-line" className={style.likesIcon} />
            <span>
              {animation ? (
                animation.likesCount
              ) : (
                <span className="w-5 block">
                  <SkeletonText fullWidth />
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Author */}
        <a
          href={`https://lottiefiles.com${animation?.createdBy?.username}`}
          target="_blank"
          rel="noreferrer"
          className={style.author}
        >
          {animation ? (
            <img
              src={animation.createdBy.avatarUrl}
              alt={animation.createdBy.username}
              className={style.avatar}
            />
          ) : (
            <Skeleton className={style.avatar} />
          )}
          <div className={style.authorName}>
            {animation ? (
              getFullName(
                animation.createdBy.firstName,
                animation.createdBy.lastName
              )
            ) : (
              <span className="w-28 block">
                <SkeletonText fullWidth />{" "}
              </span>
            )}
          </div>
        </a>
      </div>
    </div>
  );
}
