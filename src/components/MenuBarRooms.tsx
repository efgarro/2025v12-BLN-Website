import React from "react";

const MenuBarViewRooms = () => {
  return (
    <div className="core_flexRow justify-center">
      <ul className="menu menu-vertical gap-1 md:menu-horizontal md:px-1 md:gap-2">
        <li className="flex-1 bg-[#A8E200]">
          <a
            className="flex h-13 w-36 justify-center font-semibold text-[#3A3E40]"
            href="/guarumo"
          >
            Guarumo Room
          </a>
        </li>
        <li className="flex-1 bg-[#ff9c46]">
          <a
            className="flex h-13 w-36 justify-center font-semibold text-[#3A3E40]"
            href="/sunrise"
          >
            Sunrise Room
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MenuBarViewRooms;
