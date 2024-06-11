import clsx from "clsx";
import { ReactNode } from "react";

type ContainerProps = {
  className?: string;
  children?: ReactNode;
};

export default function Container({ className, children }: ContainerProps) {
  const styles = ["px-10 mx-auto max-w-7xl"];

  return <div className={clsx(styles, className)}>{children}</div>;
}
