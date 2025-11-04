import { e as React, j as jsxRuntimeExports, r as reactExports } from "./worker-entry-C05JoE1H.js";
import { r as reactGridLayoutExports } from "./index-O9wa0ajj.js";
import "node:events";
import "node:stream";
import "node:async_hooks";
import "node:stream/web";
const footer_box = `_footer_box_004bcbb`;
const styles = { footer_box };
const ResponsiveGridLayout = reactGridLayoutExports.WidthProvider(reactGridLayoutExports.Responsive);
class AmbientPics extends React.Component {
  render() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "core_wrapper", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      ResponsiveGridLayout,
      {
        className: "layout",
        layouts: this.props.layouts,
        rowHeight: this.props.rowHeight,
        breakpoints: { lg: 992, md: 768, sm: 576, xs: 480, xxs: 0 },
        cols: { lg: 12, md: 12, sm: 6, xs: 6, xxs: 6 },
        isResizable: false,
        margin: [15, 15],
        useCSSTransforms: false,
        compactType: "vertical",
        children: [
          console.log(this.props.breakpoints),
          this.props.dataPics.map((photo) => {
            return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card--img", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: photo.url, alt: "Pic" }) }, photo.id);
          })
        ]
      }
    ) });
  }
}
const useScreenWidth = () => {
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
  const rowHeight = (screenWidth2) => {
    if (screenWidth2 <= 480) {
      return 30;
    } else {
      return 63;
    }
  };
  return {
    screenWidth,
    rowHeight: rowHeight(screenWidth)
  };
};
const FetchPics = ({ searchTerm }) => {
  const [dataPics, setDataPics] = reactExports.useState([]);
  const [layouts, setLayouts] = reactExports.useState({});
  const { screenWidth, rowHeight } = useScreenWidth();
  reactExports.useEffect(() => {
    const fetchData = async () => {
      const client_Id = "tjz5KRnEe72zmhz3LUh1FRHZtn8rPcV2gyxP6vW8S1U";
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${searchTerm}&page=1&client_id=${client_Id}`,
          {
            accept: "application/json"
          }
        );
        const data = await response.json();
        const arrPics = data.results.reduce((reducedArr, pic, index) => {
          if (index < 9) {
            let picObj = {
              id: pic.id,
              width: pic.width,
              height: pic.height,
              url: pic.urls.small
            };
            pic.width < pic.height ? picObj = {
              ...picObj,
              orientation: "por"
            } : picObj = {
              ...picObj,
              orientation: "lan"
            };
            reducedArr.push(picObj);
          }
          return reducedArr;
        }, []);
        setDataPics(arrPics);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [searchTerm]);
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
      AmbientPics,
      {
        dataPics,
        layouts,
        rowHeight
      }
    )
  ] });
};
function Home() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FetchPics, { searchTerm: "costa rica" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: `${styles.footer_box}`, children: "Footer" })
  ] });
}
export {
  Home as component
};
