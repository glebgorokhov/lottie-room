import clsx from "clsx";
import { useMemo } from "react";

interface SkeletonProps {
  roundedClass?: string;
  fill?: boolean;
  className?: string;
}

export default function Skeleton({
  roundedClass = "rounded-lg",
  fill,
  className,
}: SkeletonProps) {
  const classList = useMemo(
    () =>
      clsx(
        "bg-t-text/10 overflow-hidden",
        'after:content-[""] after:block after:w-full after:h-full after:bg-gradient-to-r after:from-transparent after:via-t-text/5 after:to-transparent after:animate-skeleton',
        {
          "absolute left-0 top-0 right-0 bottom-0": fill,
        },
        roundedClass,
        className
      ),
    [roundedClass, className]
  );

  return <div className={classList} />;
}
