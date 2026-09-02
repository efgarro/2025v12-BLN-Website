import React from "react";
// import { Responsive, WidthProvider } from "react-grid-layout";
import { Responsive, useContainerWidth } from "react-grid-layout";

// const ResponsiveGridLayout = WidthProvider(Responsive);

export const ImageClusterGrid = (props) => {
  const { dataPics, layouts, rowHeight } = props;
  const [selected, setSelected] = React.useState(null);

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
          // dragConfig={{
          //   enabled: false,
          // }}
        >
          {dataPics.map((photo) => {
            return (
              <div
                key={photo.id}
                className={"card--img"}
                onClick={() => {
                  setSelected(photo);
                }}
              >
                <img src={photo.url} alt={`${photo.description}`} />
              </div>
            );
          })}
          {/* Modal */}
        </Responsive>
      )}
      {<p>{`${selected}`}</p>}
      {selected && (
        <dialog className="modal modal-open">
          <img src={selected.url} className="max-h-screen" />
          <button onClick={() => setSelected(null)}>Close</button>
        </dialog>
      )}
    </div>
  );
};
