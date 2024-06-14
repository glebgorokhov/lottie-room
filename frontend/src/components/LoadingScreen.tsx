import Lottie from "lottie-react";

import loadingJSON from "../assets/ui-animations/loading.json";

export default function LoadingScreen() {
  const style = {
    wrapper: "min-h-screen flex items-center justify-center text-center",
    animation: "max-w-[20rem] lg:max-w-[30rem] mx-auto",
    content: "m-auto",
  };

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <Lottie animationData={loadingJSON} className={style.animation} />
      </div>
    </div>
  );
}
