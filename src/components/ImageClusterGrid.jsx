import React from "react";
// import { Responsive, WidthProvider } from "react-grid-layout";
import { Responsive, useContainerWidth } from "react-grid-layout";

// const ResponsiveGridLayout = WidthProvider(Responsive);

export const ImageClusterGrid = (props) => {
  const { dataPics, layouts, rowHeight } = props;

  const { width, containerRef, mounted } = useContainerWidth();
  return (
    <div ref={containerRef}>
      {mounted && (
        <Responsive
          layouts={layouts}
          breakpoints={{ lg: 992, md: 768, sm: 576, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 12, sm: 6, xs: 6, xxs: 6 }}
          width={width}
          rowHeight={rowHeight}
        >
          {dataPics.map((photo) => {
            return (
              <div key={photo.id} className={"card--img"}>
                <img src={photo.url} alt={`${photo.description}`} />
              </div>
            );
          })}
        </Responsive>
      )}
    </div>
  );
};
