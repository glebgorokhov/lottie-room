import { Icon } from "@iconify/react";
import clsx from "clsx";
import { FC, ReactNode, useMemo } from "react";
import { Link, To } from "react-router-dom";

type ButtonSize = 10 | 12;

export type ButtonProps = {
  title?: string;
  themeClass?: string;
  roundedClass?: string;
  outline?: boolean;
  size?: ButtonSize;
  preIcon?: string | FC;
  postIcon?: string | FC;
  to?: To;
  children?: ReactNode;
  loading?: boolean;
  className?: string;
  customTheme?: boolean;
  type?: "button" | "submit" | "reset";
  block?: boolean;
  onClick?: (...args: any[]) => void;
  disabled?: boolean;
  square?: boolean;
  preIconClassName?: string;
  postIconClassName?: string;
  target?: string;
};

export default function Button({
  title,
  themeClass = "theme-neutral",
  roundedClass = "rounded-full",
  outline,
  size = 10,
  preIcon,
  postIcon,
  to,
  children,
  loading,
  className,
  customTheme,
  type,
  block,
  onClick,
  disabled,
  square,
  preIconClassName,
  postIconClassName,
  target,
}: ButtonProps) {
  const buttonClassBySize: Record<ButtonSize, any> = useMemo(
    () => ({
      10: clsx("h-10 text-d-sm-h font-bold", {
        "w-10 px-3": square,
        "px-4": !square,
      }),
      12: clsx("h-12 text-d-base-h font-bold", {
        "w-12 px-3.5": square,
        "px-5": !square,
      }),
    }),
    [square]
  );

  const iconStyleBySize: Record<ButtonSize, string> = {
    10: "w-4 h-4",
    12: "w-5 h-5",
  };

  const innerStyleBySize: Record<ButtonSize, string> = {
    10: "gap-2",
    12: "gap-2",
  };

  const ButtonTag = useMemo(() => (to ? Link : "button"), [to]);

  const style = useMemo(
    () => ({
      wrapper: [
        themeClass,
        roundedClass,
        "block shrink-0 heading relative overflow-hidden transition-[color,background,border,opacity,filter] disabled:opacity-50 disabled:grayscale border-2",
        !customTheme
          ? {
              "bg-t-bg text-t-text hover:bg-t-bg-hover": !outline,
              "border-current text-t-bg hover:text-t-bg-hover": outline,
            }
          : null,
        {
          "border-transparent": !outline,
          "bg-transparent": outline,
          "w-full": block,
        },
        className,
      ],
      inner: [
        "h-full flex items-center justify-center w-full transition-[opacity,transform]",
        innerStyleBySize[size],
        {
          "opacity-30 scale-80": loading,
        },
      ],
      icon: "shrink-0 first:-ml-1 last:-mr-1 transition-[color,transform]",
      loaderIcon: "w-6 h-6",
      loader: [
        "absolute left-0 top-0 right-0 bottom-0 flex items-center justify-center pointer-events-none transition-[opacity,transform] animate-spin",
        {
          "opacity-0 scale-80": !loading,
        },
      ],
    }),
    [themeClass, roundedClass, outline, size, loading, className, block]
  );

  const [PreIcon, PostIcon] = useMemo(
    () =>
      [preIcon, postIcon].map((icon) => {
        if (!icon) {
          return undefined;
        }
        return (props: any) =>
          typeof icon === "string" ? (
            <Icon icon={icon} {...props} />
          ) : (
            icon(props)
          );
      }),
    [preIcon, postIcon]
  );

  return (
    <>
      <ButtonTag
        to={to as To}
        className={clsx(buttonClassBySize[size], style.wrapper)}
        type={type}
        onClick={onClick}
        disabled={disabled}
        target={target}
      >
        <div className={clsx(style.inner)}>
          {!!PreIcon && (
            <>
              <PreIcon
                className={clsx(
                  iconStyleBySize[size],
                  style.icon,
                  preIconClassName
                )}
              />
            </>
          )}
          {!!title && <span>{title}</span>}
          {children}
          {!!postIcon && (
            <>
              {/* @ts-expect-error bad type there */}
              <PostIcon
                className={clsx(
                  iconStyleBySize[size],
                  style.icon,
                  postIconClassName
                )}
              />
            </>
          )}
        </div>
        <div className={clsx(style.loader)}>
          <Icon icon="ri:loader-4-line" className={style.loaderIcon} />
        </div>
      </ButtonTag>
    </>
  );
}
