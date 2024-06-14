import Lottie from "lottie-react";
import { useRouteError } from "react-router-dom";

import notFoundJSON from "./assets/ui-animations/not_found.json";
import Button from "./components/Button.tsx";

export default function ErrorPage() {
  const error = useRouteError() as {
    statusText: string;
    message: string;
  };

  const style = {
    wrapper: "min-h-screen flex items-center justify-center text-center p-5",
    animation: "max-w-[10rem] lg:max-w-[20rem] mx-auto",
    content: "m-auto pb-20",
    title: "text-3xl lg:text-5xl heading text-t-text -mt-3 lg:-mt-5",
    text: "text-lg lg:text-xl mt-1.5 lg:mt-3.5 leading-normal",
    message:
      "border border-t-border font-mono text-xs text-t-text rounded-lg px-3 leading-relaxed py-1 mt-3",
    button: "mx-auto",
    buttonWrapper: "flex justify-center mt-4 lg:mt-6",
  };

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <Lottie animationData={notFoundJSON} className={style.animation} />
        <h1 className={style.title}>Oops!</h1>
        <p className={style.text}>Sorry, an unexpected error has occurred.</p>
        <p className={style.message}>{error.statusText || error.message}</p>
        <div className={style.buttonWrapper}>
          <Button
            to="/"
            title="Back to Home"
            className={style.button}
            themeClass="theme-brand-tint hover:theme-brand"
            preIcon="tabler:arrow-left"
          />
        </div>
      </div>
    </div>
  );
}
