import React, { useEffect, useState } from "react";
import { Responsive, useContainerWidth } from "react-grid-layout";
import Modal from "./ImageModal";

export interface Photo {
  id: string | number;
  url: string;
  description?: string;
}

type Props = {
  dataPics: Photo[];
  layouts?: Record<string, any>;
  rowHeight?: number;
};

export const ImageClusterGrid: React.FC<Props> = ({
  dataPics,
  layouts = {},
  rowHeight = 150,
}) => {
  const { width, containerRef, mounted } = useContainerWidth();

  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= 576,
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 576);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const openImage = (photo: Photo) => {
    setSelectedImage(photo);
  };
  const closeModal = () => {
    setSelectedImage(null);
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
          // disable dragging/resizing on small devices so taps work reliably
          // isDraggable={!isMobile}
          // isResizable={!isMobile}
          // ensure the thumbnail button is never treated as a drag handle
          // draggableCancel=".card--img button"
        >
          {dataPics.map((photo) => (
            <div key={photo.id?.toString()} className={"card--img"}>
              <button
                type="button"
                // use pointer event so iOS, Android and mouse all work consistently
                onPointerUp={(e) => {
                  // prevent grid's drag start from stealing this pointerup in some browsers
                  e.preventDefault();
                  openImage(photo);
                }}
                onClick={() => openImage(photo)}
                className="w-full h-full p-0 m-0 bg-transparent border-0 text-left"
                aria-label={`Open image ${photo.description || photo.id}`}
              >
                <img
                  src={photo.url}
                  alt={photo.description || ""}
                  className="block w-full h-full object-cover"
                />
              </button>
            </div>
          ))}
        </Responsive>
      )}

      <Modal
        isOpen={!!selectedImage}
        onClose={closeModal}
        title={undefined}
        footer={
          selectedImage?.description ? (
            <div className="px-2">{selectedImage.description}</div>
          ) : null
        }
      >
        {selectedImage && (
          <div className="flex items-center justify-center w-full">
            <img
              src={selectedImage.url}
              alt={selectedImage.description || ""}
              className="max-w-[95vw] max-h-[calc(var(--vh,1vh)*100-140px)] w-auto h-auto object-contain rounded shadow-lg"
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ImageClusterGrid;
