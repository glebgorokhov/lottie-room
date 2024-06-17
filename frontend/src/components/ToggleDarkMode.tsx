import { Icon } from "@iconify/react";
import clsx from "clsx";
import useDarkMode from "use-dark-mode";

import darkModeConfig from "../services/darkModeConfig.ts";

type ToggleDarkModeProps = {
  className?: string;
};

export default function ToggleDarkMode({ className }: ToggleDarkModeProps) {
  const darkMode = useDarkMode(false, darkModeConfig);

  return (
    <button
      type="button"
      onClick={darkMode.toggle}
      className={clsx("flex transition-colors hover:text-t-text", className)}
    >
      <Icon
        icon={darkMode.value ? "ri:moon-line" : "ri:sun-line"}
        className="w-full h-full"
      />
    </button>
  );
}
