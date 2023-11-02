import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {

  return (
    <div className="flex justify-between mx-[40px] mt-2 h-[66px] ">
      <h1 className="text-black font-bold">
        N<span className=" font-[500] text-indigo-600 ">EST</span>
      </h1>
      <ul className="flex gap-4">
        <li>
          <NavLink
            to={"/"}
            style={({ isActive }) => {
              return {
                color: isActive ? "blue" : "black",
              };
            }}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/article"}
            style={({ isActive }) => {
              return {
                color: isActive ? "blue" : "black",
              };
            }}
          >
            Article
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/about"}
            style={({ isActive }) => {
              return {
                color: isActive ? "blue" : "black",
              };
            }}
          >
            About
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to={""}
            style={({ isActive }) => {
              return {
                color: isActive ? "blue" : "black",
              };
            }}
          >
            Extra
          </NavLink>
        </li> */}
      </ul>
    </div>
  );
};

export default Header;
