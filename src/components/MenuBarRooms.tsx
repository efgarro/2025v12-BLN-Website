import React from "react";

const MenuBarViewRooms = () => {
  return (
    <div className="core_flexRow justify-center">
      <ul className="menu menu-vertical md:menu-horizontal px-1">
        <li className="flex-1 bg-blue-400">
          <a className="flex w-36 justify-center text-white" href="/rooms/guarumo">
            Guarumo Room
          </a>
        </li>
        <li className="flex-1">
          <a className="flex w-36 justify-center" href="/rooms/sunrise">
            Sunrise Room
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MenuBarViewRooms;
