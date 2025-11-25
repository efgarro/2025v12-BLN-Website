import React from "react";
import { useNavSettings } from "./context/NavigationContext";

const MenuBarGrounds = () => {
  const { navSettingsStore, dispatchNavSettingsStore } = useNavSettings();
  return (
    <div className="core_flexRow justify-center">
      <ul className="menu menu-vertical gap-1 md:menu-horizontal md:px-1 md:gap-2">
        <li className="flex-1 bg-[#FFF440]">
          <a className="flex h-13 w-36 justify-center font-semibold text-[#3A3E40]" href="/grounds/yard">
            The Yard
          </a>
        </li>
        <li className="flex-1 bg-[#F000D0]">
          <a className="flex h-13 w-36 justify-center font-semibold text-white" href="/grounds/ranch">
            Ranch Area
          </a>
        </li>
        <li className="flex-1 bg-[#A8E200]">
          <a className="flex h-13 w-36 justify-center font-semibold text-[#3A3E40]" href="/grounds/organic">
            Organic Practices
          </a>
        </li>
        {/* <li className="flex-1">
          <a className="flex w-36 justify-center">Rural Work</a>
        </li> */}
      </ul>
    </div>
  );
};

export default MenuBarGrounds;
