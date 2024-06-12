import { Icon } from "@iconify/react";
import clsx from "clsx";
import React, { useMemo } from "react";
import { Link, To } from "react-router-dom";

type ButtonSize = 6 | 8 | 10 | 12 | 14 | 15;

export type ButtonProps = {
  title?: string;
  themeClass?: string;
  roundedClass?: string;
  outline?: boolean;
  size?: ButtonSize;
  preIcon?: string | React.FC;
  postIcon?: string | React.FC;
  to?: To;
  children?: JSX.Element | JSX.Element[];
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
  themeClass = "theme-neutral dark:theme-neutral-light",
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
  const buttonClassBySize = useMemo(
    () => ({
      6: clsx("h-6 text-d-xs-h font-bold", {
        "w-6 px-1": square,
        "px-1.5": !square,
      }),
      8: clsx("h-8 text-d-sm-h font-bold", {
        "w-8 px-2": square,
        "px-2.5": !square,
      }),
      10: clsx("h-10 text-d-sm-h font-bold", {
        "w-10 px-3": square,
        "px-4": !square,
      }),
      12: clsx("h-12 text-d-base-h font-semibold", {
        "w-12 px-3.5": square,
        "px-5": !square,
      }),
      14: clsx("h-14 text-d-base-h font-semibold", {
        "w-14 px-5": square,
        "px-6": !square,
      }),
      15: clsx("h-15 text-d-xl-h font-semibold", {
        "w-15 px-4": square,
        "px-7": !square,
      }),
    }),
    [square]
  );

  const iconStyleBySize: Record<ButtonSize, string> = {
    6: "w-4 h-4",
    8: "w-4 h-4",
    10: "w-4 h-4",
    12: "w-5 h-5",
    14: "w-6 h-6",
    15: "w-7 h-7",
  };

  const innerStyleBySize: Record<ButtonSize, string> = {
    6: "gap-1.5",
    8: "gap-2",
    10: "gap-2",
    12: "gap-2",
    14: "gap-3",
    15: "gap-3",
  };

  const ButtonTag = useMemo(() => (to ? Link : "button"), [to]);

  const style = useMemo(
    () => ({
      wrapper: [
        themeClass,
        roundedClass,
        "block heading relative overflow-hidden transition-[color,background,border,opacity,filter] disabled:opacity-50 disabled:grayscale border-2",
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
      loader: [
        "absolute left-0 top-0 right-0 bottom-0 flex items-center justify-center pointer-events-none transition-[opacity,transform]",
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
              {/* @ts-ignore */}
              <PreIcon
                className={clsx(
                  iconStyleBySize[size],
                  style.icon,
                  preIconClassName
                )}
              />
            </>
          )}
          {!!title && <span className="font-fix">{title}</span>}
          {children}
          {!!postIcon && (
            <>
              {/* @ts-ignore */}
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
          <Icon icon="ri:loader-4-line" className={iconStyleBySize[size]} />
        </div>
      </ButtonTag>
    </>
  );
}
