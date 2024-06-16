import { useEffect, useState } from "react";

export default function useShift() {
  const [shiftHeld, setShiftHeld] = useState(false);

  function downHandler({ key }: KeyboardEvent) {
    if (key === "Shift") {
      setShiftHeld(true);
    }
  }

  function upHandler({ key }: KeyboardEvent) {
    if (key === "Shift") {
      setShiftHeld(false);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);

  return shiftHeld;
}
