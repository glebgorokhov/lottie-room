import { Animation } from "@lottiefiles/lottie-types";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import useAPI from "../hooks/useAPI.ts";
import { parseJsonFile } from "../utils/parseJsonFile.ts";
import Button from "./Button.tsx";

export default function UploadSection() {
  const navigate = useNavigate();
  const { openPlaygroundForData } = useAPI();
  const input = useRef<HTMLInputElement>(null);

  const {
    mutateAsync: openPlaygroundForFile,
    isPending: playgroundIsOpening,
    error,
  } = useMutation({
    mutationFn: async (variables: FileList | null) => {
      if (!variables) {
        return;
      }

      const json = (await parseJsonFile(variables[0])) as Animation;
      const playgroundUrl = await openPlaygroundForData(json);
      navigate(`/${playgroundUrl}`);
    },
  });

  const style = {
    title: "text-4xl lg:text-8xl font-semibold text-t-text",
    description: "text-base lg:text-xl mt-3 lg:mt-5",
    buttonWrapper: "flex flex-wrap items-center gap-4 lg:gap-6 mt-4 lg:mt-6",
    error:
      "text-sm theme-error text-t-text bg-t-bg px-3 leading-relaxed py-1 rounded-xl",
  };

  return (
    <div>
      <h1 className={style.title}>Free Playground for Your Animations</h1>
      <p className={style.description}>
        Upload your JSON file, play with settings and discuss the changes with
        the team
      </p>

      <div className={style.buttonWrapper}>
        <Button
          type="button"
          title="Upload the animation JSON"
          roundedClass="rounded-2xl"
          themeClass="theme-brand-tint hover:theme-brand"
          size={12}
          preIcon="ri:upload-line"
          loading={playgroundIsOpening}
          onClick={() => input.current?.click()}
        />

        <input
          type="file"
          className="hidden"
          onChange={(e) => openPlaygroundForFile(e.target.files)}
          ref={input}
          accept="application/json"
        />

        {!!error && (
          <div className={style.error}>
            We couldn&apos;t parse your JSON. Please try again
          </div>
        )}
      </div>
    </div>
  );
}
