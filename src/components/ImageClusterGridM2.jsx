import React from "react";
// import { Responsive, WidthProvider } from "react-grid-layout";
import { Responsive, useContainerWidth } from "react-grid-layout";
import { CustomModal } from "./ImageModalV2";
// const ResponsiveGridLayout = WidthProvider(Responsive);

export const ImageClusterGrid = (props) => {
  const { dataPics, layouts, rowHeight } = props;
  const [selected, setSelected] = React.useState(null);

  const { width, containerRef, mounted } = useContainerWidth();

  const closeModal = () => {
    setSelected(null);
  };

  return (
    <div ref={containerRef}>
      {mounted && (
        <Responsive
          layouts={layouts}
          breakpoints={{ lg: 992, md: 768, sm: 576, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 12, sm: 6, xs: 6, xxs: 6 }}
          width={width}
          rowHeight={rowHeight}
          dragConfig={{
            enabled: false,
          }}
        >
          {dataPics.map((photo) => {
            return (
              <div
                key={photo.id}
                className={"card--img"}
                onClick={() => {
                  setSelected(photo);
                  console.log("onClick M2");
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
        <CustomModal
          isOpen={!!selected}
          onClose={closeModal}
          title={undefined}
          footer={
            selected?.description ? (
              <div className="px-4">{selected.description}</div>
            ) : null
          }
        >
          {selected && (
            <div className="flex items-center justify-center w-full">
              <img
                src={selected.url}
                alt={selected.description || ""}
                className="max-w-[95vw] max-h-[calc(var(--vh,1vh)*100-140px)] w-auto h-auto object-contain rounded shadow-lg"
              />
            </div>
          )}
        </CustomModal>
      )}
    </div>
  );
};
