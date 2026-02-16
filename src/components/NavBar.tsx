import { Outlet } from "@tanstack/react-router";
import React from "react";

const NavBar = () => {
  return (
    <div className="core_wrapper">
      <div className="navbar p-1 justify-between bg-base-100 shadow-sm">
        <div className="navbar-start w-32">
          <a
            href="/"
            className="btn hover:bg-transparent hover:shadow-none hover:border-transparent btn-ghost core_flexCol"
          >
            <p className="text-(--color-error) text-xl">BijaLapa</p>
            <p className="w-1 pr-4 text-right">Natural</p>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex lg:content-between">
          <ul className="menu menu-horizontal gap-2 justify-between p-0">
            <li className="justify-center">
              <a className="w-27 xl:w-36 justify-center" href="/rooms">
                View Rooms
              </a>
            </li>
            <li className="justify-center">
              <a className="w-24 xl:w-36 justify-center" href="/grounds">
                The Grounds
              </a>
            </li>
            <li className="justify-center">
              <a
                className="w-36 xl:w-36 justify-center text-center"
                href="/habitat"
              >
                Scarlet Macaw Habitat Project
              </a>
            </li>
            <li className="justify-center">
              <a
                className="w-24 xl:w-36 justify-center text-center"
                href="/eatdo"
              >
                Where to Eat & What to Do
              </a>
            </li>

            {/* <li className="justify-center">
              <a className="w-24 xl:w-36 justify-center" href="/about">
                About Us
              </a>
            </li> */}
            <li className="justify-center">
              <a
                className="w-24 xl:w-36 justify-center font-bold bg-[#B9BAA3] text-white"
                href="/inquire"
              >
                Inquire
              </a>
            </li>
          </ul>
        </div>
        <div className="navbar-end w-20 lg:hidden">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                // xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0,0,256,256"
                width="27.5px"
                height="27.5px"
                fillRule="nonzero"
              >
                <g
                  fill="#e41e3c"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray=""
                  strokeDashoffset="0"
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                  // style="mix-blend-mode: normal"
                >
                  <g transform="scale(5.12,5.12)">
                    <path d="M5,8c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h40c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175zM5,23c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h40c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175zM5,38c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h40c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175z"></path>
                  </g>
                </g>
              </svg>
            </div>
            <ul
              // tabIndex="-1"
              className="menu menu-md flex-1 justify-between gap-2 dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a href="/rooms">View Rooms</a>
              </li>
              <li>
                <a href="/grounds">Grounds</a>
              </li>
              <li>
                <a href="/habitat">Scarlet Macaw Habitat Project</a>
              </li>
              <li>
                <a href="/eatdo">Where to Eat & What to Do</a>
              </li>
              {/* <li>
                <a href="/about">About Us</a>
              </li> */}
              <li>
                <a href="/inquire">Inquire</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
