import clsx from "clsx";

import Skeleton from "./Skeleton";

type SkeletonTextProps = {
  roundedClass?: string;
  lines?: number | [number, number];
  fullWidth?: boolean;
  className?: string;
};

export default function SkeletonText({
  roundedClass = "rounded-lg",
  lines = 1,
  fullWidth = false,
  className,
}: SkeletonTextProps) {
  function getRandomWidth() {
    return `${Math.floor(Math.random() * (100 - 60 + 1)) + 60}%`;
  }

  const linesCount = Array.isArray(lines) ? Math.max(...lines) : lines;

  const lineClasses = (lineNumber: number) => [
    "relative inline-block",
    Array.isArray(lines)
      ? {
          "hidden lg:inline-block":
            lines[0] > lines[1] && lineNumber <= lines[1],
          "lg:hidden": lines[1] > lines[0] && lineNumber > lines[0],
        }
      : null,
  ];

  return (
    <div className={className}>
      {Array(linesCount)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            style={{ width: fullWidth ? "100%" : getRandomWidth() }}
            className={clsx(lineClasses(i))}
          >
            <span>&nbsp;</span>
            <Skeleton
              roundedClass={roundedClass}
              className="absolute left-0 right-0 top-[20%] bottom-[20%]"
            />
          </div>
        ))}
    </div>
  );
}
