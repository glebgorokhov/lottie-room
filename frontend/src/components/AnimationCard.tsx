import { Icon } from "@iconify/react";
import clsx from "clsx";
import { Link } from "react-router-dom";

import { FeaturedAnimation } from "../../../types/featuredAnimations.ts";
import { getFullName } from "../utils/fullName.ts";

type AnimationCardProps = {
  animation: FeaturedAnimation;
};

export default function AnimationCard({ animation }: AnimationCardProps) {
  const style = {
    card: "text-t-text-light rounded-2xl group",
    imageWrapper:
      "block pb-[100%] relative h-0 border border-t-border rounded-[0.875rem] overflow-hidden theme-neutral-light bg-t-bg transition-[border-color] group-hover:border-t-text",
    image:
      "absolute inset-0 m-auto max-w-full max-h-full object-contain rounded-xl",
    noImage: "w-10 h-10 m-auto inset-0 absolute opacity-50",
    content: "mt-2.5",
    name: "block text-base group-hover:text-t-text transition-colors",
    author:
      "flex items-center gap-2 text-sm mt-1.5 flex-1 overflow-hidden transition-colors hover:text-t-text",
    avatar: "w-4 h-4 rounded-full shrink-0",
    authorName: "truncate",
    likes: "flex items-center gap-1",
    likesIcon: "w-4 h-4",
  };

  return (
    <div className={clsx(style.card)}>
      <Link to={`/lottie/${animation.id}`} className={style.imageWrapper}>
        {animation.gifUrl ? (
          <img
            src={animation.gifUrl}
            className={style.image}
            alt={animation.name}
          />
        ) : (
          <Icon icon="carbon:no-image" className={style.noImage} />
        )}
      </Link>
      <div className={style.content}>
        <div className="flex items-start justify-between gap-4">
          <Link to={`/lottie/${animation.id}`} className={style.name}>
            {animation.name}
          </Link>
          <div className={style.likes}>
            <Icon icon="ri:heart-line" className={style.likesIcon} />
            <span>{animation.likesCount}</span>
          </div>
        </div>
        <a
          href={`https://lottiefiles.com${animation.createdBy.username}`}
          target="_blank"
          rel="noreferrer"
          className={style.author}
        >
          <img
            src={animation.createdBy.avatarUrl}
            alt={animation.createdBy.username}
            className={style.avatar}
          />
          <div className={style.authorName}>
            {getFullName(
              animation.createdBy.firstName,
              animation.createdBy.lastName
            )}
          </div>
        </a>
      </div>
    </div>
  );
}
