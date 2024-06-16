import { AnimatedProperty } from "@lottiefiles/lottie-types";

export function rgbaToLottieColor(rgbaColor: {
  r: number;
  g: number;
  b: number;
  a: number;
}) {
  const { r, g, b, a } = rgbaColor;
  return [r / 255, g / 255, b / 255, a];
}

export function lottieColorToRgba(color: AnimatedProperty.Color) {
  return {
    r: Math.round(typeof color.k[0] === "number" ? color.k[0] * 255 : 0),
    g: Math.round(typeof color.k[1] === "number" ? color.k[1] * 255 : 0),
    b: Math.round(typeof color.k[2] === "number" ? color.k[2] * 255 : 0),
    a: Math.round(typeof color.k[3] === "number" ? color.k[3] : 1),
  };
}
