import { useEffect, useState } from "react";

export type Orientation = "lan" | "por";

/**
 * Calculates modal width based on screen width and orientation.
 * - landscape ("lan" or "landscape"): uses full sizes
 * - portrait  ("por" or "portrait") : uses sizes divided by 1.5
 */
function computeImageModalWidth(
  screenWidth: number,
  orientation: Orientation,
): number {
  const isPortrait = orientation === "por";

  if (isPortrait) {
    if (screenWidth <= 575) return Math.round(340);
    if (screenWidth <= 767) return Math.round(440 / 1.5);
    return Math.round(600 / 1.5);
  } else {
    // treat everything else as landscape
    if (screenWidth <= 575) return Math.round(340);
    if (screenWidth <= 767) return Math.round(600);
    return 600;
  }
}

/**
 * Hook: returns the calculated image modal width.
 * @param screenWidth - current screen width in pixels
 * @param orientation - "lan"|"por" or "landscape"|"portrait"
 * @returns number - computed modal width in pixels
 */
export function useImageModalWidth(
  screenWidth: number,
  orientation: Orientation,
): number {
  const [imageModalWidth, setImageModalWidth] = useState<number>(() =>
    computeImageModalWidth(screenWidth, orientation),
  );

  useEffect(() => {
    setImageModalWidth(computeImageModalWidth(screenWidth, orientation));
  }, [screenWidth, orientation]);

  return imageModalWidth;
}
