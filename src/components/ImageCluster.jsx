import { useEffect, useState } from "react";
import { ImageClusterGrid } from "./ImageClusterGrid";
import { useScreenWidth } from "../hooks/useScreenWidth";
import { useGetImageMix } from "../apiFns/apiFns";

export const ImageCluster = ({ image_mix_name }) => {
  const [dataPics, setDataPics] = useState([]);
  const [layouts, setLayouts] = useState({});
  const { rowHeight } = useScreenWidth();
  const { data } = useGetImageMix(image_mix_name);
  
  useEffect(() => {
    setDataPics(data);
  }, [image_mix_name]); //endof useEffect to fetchData

  useEffect(() => {
    const generateLayoutLg = () => {
      return dataPics.map((item, index) => {
        return {
          x: ((index + 3) % 3) * 4,
          y: 0,
          w: 4,
          h: item.orientation === "lan" ? 3 : 5,
          i: item.id,
        };
      });
    }; // endof generateLayoutLg

    const generateLayoutMd = () => {
      return dataPics.map((item, index) => {
        return {
          x: ((index + 3) % 3) * 4,
          y: 0,
          w: 4,
          h: item.orientation === "lan" ? 3 : 5,
          i: item.id,
        };
      });
    }; // endof generateLayoutMd

    const generateLayoutSm = () => {
      return dataPics.map((item, index) => {
        return {
          // x: 4,
          x: ((index + 2) % 2) * 3,
          y: 0,
          w: 3,
          h: item.orientation === "lan" ? 3 : 5,
          i: item.id,
        };
      });
    }; // endof generateLayoutSm

    const generateLayoutXs = () => {
      return dataPics.map((item, index) => {
        return {
          x: ((index + 2) % 2) * 3,
          y: 0,
          w: 3,
          h: item.orientation === "lan" ? 3 : 5,
          i: item.id,
        };
      });
    }; // endof generateLayoutXs

    const generateLayoutXxs = () => {
      return dataPics.map((item, index) => {
        return {
          x: ((index + 2) % 2) * 3,
          y: 0,
          w: 3,
          h: item.orientation === "lan" ? 3 : 5,
          i: item.id,
        };
      });
    }; // endof generateLayoutXs

    setLayouts({
      xxs: generateLayoutXxs(),
      xs: generateLayoutXs(),
      sm: generateLayoutSm(),
      md: generateLayoutMd(),
      lg: generateLayoutLg(),
    });
  }, [dataPics]);

  return (
    <>
      <ImageClusterGrid
        dataPics={dataPics}
        layouts={layouts}
        rowHeight={rowHeight}
      />
    </>
  );
}; // endof FetchPics
