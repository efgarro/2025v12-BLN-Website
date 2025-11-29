import { r as reactExports, j as jsxRuntimeExports } from "./worker-entry-BUtatavz.js";
import { u as useScreenWidth, I as ImageClusterGrid } from "./useScreenWidth-Hyokc4xi.js";
import { b as useGetImageStack } from "./router-BQRv1Uho.js";
const ImageCluster = (image_cluster_id) => {
  const [dataPics, setDataPics] = reactExports.useState([]);
  const [layouts, setLayouts] = reactExports.useState({});
  const { screenWidth, rowHeight } = useScreenWidth();
  const { data } = useGetImageStack();
  reactExports.useEffect(() => {
    setDataPics(data);
  }, [data]);
  reactExports.useEffect(() => {
    const generateLayoutLg = () => {
      return dataPics.map((item, index) => {
        return {
          x: (index + 3) % 3 * 4,
          y: 0,
          w: 4,
          h: item.orientation === "lan" ? 3 : 5,
          i: item.id
        };
      });
    };
    const generateLayoutMd = () => {
      return dataPics.map((item, index) => {
        return {
          x: (index + 3) % 3 * 4,
          y: 0,
          w: 4,
          h: item.orientation === "lan" ? 3 : 5,
          i: item.id
        };
      });
    };
    const generateLayoutSm = () => {
      return dataPics.map((item, index) => {
        return {
          // x: 4,
          x: (index + 2) % 2 * 3,
          y: 0,
          w: 3,
          h: item.orientation === "lan" ? 3 : 5,
          i: item.id
        };
      });
    };
    const generateLayoutXs = () => {
      return dataPics.map((item, index) => {
        return {
          x: (index + 2) % 2 * 3,
          y: 0,
          w: 3,
          h: item.orientation === "lan" ? 3 : 5,
          i: item.id
        };
      });
    };
    const generateLayoutXxs = () => {
      return dataPics.map((item, index) => {
        return {
          x: (index + 2) % 2 * 3,
          y: 0,
          w: 3,
          h: item.orientation === "lan" ? 3 : 5,
          i: item.id
        };
      });
    };
    setLayouts({
      xxs: generateLayoutXxs(),
      xs: generateLayoutXs(),
      sm: generateLayoutSm(),
      md: generateLayoutMd(),
      lg: generateLayoutLg()
    });
  }, [dataPics]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    console.log(screenWidth),
    console.log(rowHeight),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ImageClusterGrid,
      {
        dataPics,
        layouts,
        rowHeight
      }
    )
  ] });
};
export {
  ImageCluster as I
};
