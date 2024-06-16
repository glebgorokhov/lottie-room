import { AnimatedProperty } from "@lottiefiles/lottie-types";

const colorKeys = ["c"]; // Define the keys that contain color values

// Function to recursively extract color values from the JSON object
export const extractColorsFromLayer = (
  layer: Record<string, any>,
  path: string = ""
): Record<string, any> => {
  let colors: Record<string, AnimatedProperty.Color> = {};

  for (const key in layer) {
    const currentPath = path ? `${path}.${key}` : key;
    if (
      colorKeys.includes(key) &&
      layer[key] !== true &&
      typeof layer[key]?.k?.[0] === "number"
    ) {
      colors[currentPath] = layer[key] as AnimatedProperty.Color;
    } else if (typeof layer[key] === "object" && layer[key] !== null) {
      colors = {
        ...colors,
        ...extractColorsFromLayer(layer[key], currentPath),
      };
    }
  }

  return colors;
};
