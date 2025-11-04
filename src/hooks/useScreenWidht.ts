import React from "react";

export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = React.useState(
    () => window.screen.width
  );

  React.useLayoutEffect(() => {
    const handleChange = () => {
      setScreenWidth(window.screen.width);
    };

    window.addEventListener("resize", handleChange);

    return () => {
      window.removeEventListener("resize", handleChange);
    };
  }, [screenWidth]);

  const rowHeight = (screenWidth: number) => {
    if (screenWidth <= 480) {
      return 30;
    } else {
      return 63;
    }
  };
 
  return {
    screenWidth: screenWidth,
    rowHeight: rowHeight(screenWidth),
  };
};
