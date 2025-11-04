import React from "react";

const MenuBarGrounds = () => {
  return (
    <div className="core_flexRow justify-center">
      <ul className="menu menu-vertical md:menu-horizontal px-1">
        <li className="flex-1">
          <a className="flex w-36 justify-center" href="/grounds/yard">
            The Yard
          </a>
        </li>
        <li className="flex-1">
          <a className="flex w-36 justify-center" href="/grounds/ranch">
            Ranch Area
          </a>
        </li>
        <li className="flex-1">
          <a className="flex w-36 justify-center">Meet Organic</a>
        </li>
        <li className="flex-1">
          <a className="flex w-36 justify-center">Rural Work</a>
        </li>
      </ul>
    </div>
  );
};

export default MenuBarGrounds;
