import React from "react";
// import { Responsive, WidthProvider } from "react-grid-layout";
import { Responsive, useContainerWidth } from "react-grid-layout";
import { CustomModal } from "./ImageModalV2";
// const ResponsiveGridLayout = WidthProvider(Responsive);

export const ImageClusterGrid = (props) => {
  const { dataPics, layouts, rowHeight, screenWidth } = props;
  const [selectedImg, setSelectedImg] = React.useState(null);

  const { width, containerRef, mounted } = useContainerWidth();

  const closeModal = () => {
    setSelectedImg(null);
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
          {dataPics.map((image) => {
            return (
              <div
                key={image.id}
                className={"card--img"}
                onClick={() => {
                  setSelectedImg(image);
                  console.log(image);
                }}
              >
                <img src={image.url} alt={`${image.description}`} />
              </div>
            );
          })}
          {/* Modal */}
        </Responsive>
      )}
      {selectedImg && (
        <CustomModal
          isOpen={!!selectedImg}
          onClose={closeModal}
          screenWidth={screenWidth}
          orientation={selectedImg.orientation}
          footer={
            selectedImg?.description ? (
              <div className="px-4">{selectedImg.description}</div>
            ) : null
          }
        >
          {selectedImg && (
            // <p>Hellow</p>
            <div className="flex items-center justify-center w-full">
              <img
                src={selectedImg.url}
                alt={selectedImg.description || ""}
                className="w-auto h-auto object-contain shadow-lg"
                // className="max-w-[95vw] max-h-[calc(var(--vh,1vh)*100-140px)] w-auto h-auto object-contain rounded shadow-lg"
              />
            </div>
          )}
        </CustomModal>
      )}
    </div>
  );
};
