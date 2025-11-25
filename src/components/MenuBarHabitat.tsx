import React from "react";
import { useNavSettings } from "./context/NavigationContext";

const MenuBarGrounds = () => {
  const { navSettingsStore, dispatchNavSettingsStore } = useNavSettings();
  return (
    <div className="core_flexRow justify-center">
      <ul className="menu menu-vertical gap-1 md:menu-horizontal md:px-1 md:gap-2">
        <li className="flex-1 justify-center bg-[#F000D0]">
          <a
            className="flex w-50 justify-center text-center font-semibold text-white"
            href="/habitat/trees"
          >
            One Hundred Trees per Year (...and counting)
          </a>
        </li>
        <li className="flex-1 justify-center bg-[#FFF440]">
          <a
            className="flex h-13 w-50 justify-center font-semibold text-[#3A3E40]"
            href="/habitat/wildlife"
          >
            Wildlife Journal
          </a>
        </li>
        {/* <li className="flex-1 bg-[#A8E200]">
          <a className="flex w-36 justify-center" href="/grounds/ranch">
            Meet Organic
          </a>
        </li> */}
        {/* <li className="flex-1">
          <a className="flex w-36 justify-center">Rural Work</a>
        </li> */}
      </ul>
    </div>
  );
};

export default MenuBarGrounds;
