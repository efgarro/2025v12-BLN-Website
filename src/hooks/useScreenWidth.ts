import React from "react";

export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = React.useState(() => window.innerWidth);

  React.useLayoutEffect(() => {
    const handleChange = () => {
      setTimeout(() => {
        setScreenWidth(window.innerWidth);
      }, 250);
    };

    window.addEventListener("resize", handleChange);

    return () => {
      window.removeEventListener("resize", handleChange);
    };
  }, []);

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
