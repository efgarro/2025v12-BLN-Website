import { useEffect, useState } from "react";
import { ImageClusterGrid } from "./ImageClusterGrid";
import { useScreenWidth } from "../hooks/useScreenWidth";
import { useGetImageStack } from "../apiFns/apiFns";

export const ImageCluster = () => {
  const [dataPics, setDataPics] = useState([]);
  const [layouts, setLayouts] = useState({});
  const { screenWidth, rowHeight } = useScreenWidth();
  const { data } = useGetImageStack();

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(
    //       `https://api.unsplash.com/search/photos?query=${searchTerm}&page=1&client_id=${client_Id}`,
    //       {
    //         accept: "application/json",
    //       }
    //     );
    //     const data = await response.json();

    //     const arrPics = data.results.reduce((reducedArr, pic, index) => {
    //       if (index < 9) {
    //         let picObj = {
    //           id: pic.id,
    //           width: pic.width,
    //           height: pic.height,
    //           url: pic.urls.small,
    //         };
    //         pic.width < pic.height
    //           ? (picObj = {
    //               ...picObj,
    //               orientation: "por",
    //             })
    //           : (picObj = {
    //               ...picObj,
    //               orientation: "lan",
    //             });
    //         reducedArr.push(picObj);
    //       }
    //       return reducedArr;
    //     }, []);

    //     setDataPics(arrPics);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }; //endof fetchData
    // fetchData();
    setDataPics(data);
  }, [data]); //endof useEffect to fetchData

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
      {console.log(screenWidth)}
      {console.log(rowHeight)}
      <ImageClusterGrid
        dataPics={dataPics}
        layouts={layouts}
        rowHeight={rowHeight}
      />
    </>
  );
}; // endof FetchPics
