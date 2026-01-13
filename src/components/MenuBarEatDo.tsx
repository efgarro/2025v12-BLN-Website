import React from "react";
import { useNavSettings } from "./context/NavigationContext";

const MenuBarEatDo = () => {
  const { navSettingsStore, dispatchNavSettingsStore } = useNavSettings();
  return (
    <div className="core_flexRow justify-center">
      <ul className="menu menu-vertical gap-1 lg:menu-horizontal md:px-1 md:gap-2">
        <li className="flex-1 justify-center bg-[#FFF440]">
          <a
            className="flex h-13 w-40 justify-center font-semibold text-[#3A3E40]"
            href="/restaurants"
          >
            Restaurants
          </a>
        </li>
        <li className="flex-1 justify-center bg-[#F000D0] ">
          <a
            className="flex h-13 w-40 justify-center font-semibold text-white"
            href="/hiking"
          >
            Hiking
          </a>
        </li>
        {/* <li className="flex-1 justify-center bg-[#A8E200]">
          <a className="flex h-13 w-40 justify-center font-semibold text-[#3A3E40]" href="/grounds/ranch">
            Fogata Night
          </a>
        </li> */}
        {/* <li className="flex-1 justify-center bg-[#4C76B7]">
          <a
            className="flex h-13 w-40 justify-center text-center font-semibold text-white"
            href="/grounds/ranch"
          >
            Hike to Bijagual Waterfall
          </a>
        </li> */}
      </ul>
    </div>
  );
};

export default MenuBarEatDo;
