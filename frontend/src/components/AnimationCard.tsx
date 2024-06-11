import { Icon } from "@iconify/react";
import clsx from "clsx";

import { FeaturedAnimation } from "../../../types/featuredAnimations.ts";
import { getFullName } from "../utils/fullName.ts";

type AnimationCardProps = {
  animation: FeaturedAnimation;
};

export default function AnimationCard({ animation }: AnimationCardProps) {
  const style = {
    card: "text-t-text-light rounded-2xl group",
    imageWrapper:
      "pb-[100%] relative h-0 border border-t-border rounded-[0.875rem] overflow-hidden theme-neutral-light bg-t-bg transition-[border-color] group-hover:border-t-text",
    image:
      "absolute inset-0 m-auto max-w-full max-h-full object-contain rounded-xl",
    noImage: "w-10 h-10 m-auto inset-0 absolute opacity-50",
    content: "mt-2.5",
    name: "text-base group-hover:text-t-text transition-colors",
    author: "flex items-center gap-2 text-sm mt-1.5 flex-1 overflow-hidden",
    avatar: "w-4 h-4 rounded-full shrink-0",
    authorName: "truncate",
  };

  return (
    <div className={clsx(style.card)}>
      <div className={style.imageWrapper}>
        {animation.gifUrl ? (
          <img
            src={animation.gifUrl}
            className={style.image}
            alt={animation.name}
          />
        ) : (
          <Icon icon="carbon:no-image" className={style.noImage} />
        )}
      </div>
      <div className={style.content}>
        <div className={style.name}>{animation.name}</div>
        <div className={style.author}>
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
        </div>
      </div>
    </div>
  );
}
