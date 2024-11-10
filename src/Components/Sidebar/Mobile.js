import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Mobile = () => {
  return (
    <div className=" px-3 py-4 bg-primary-color w-full flex flex-col items-center justify-center md:hidden">
      <div className="w-full flex items-center justify-between">
        <div className="text-white">
          <GiHamburgerMenu style={{ fontSize: "2rem" }} />
        </div>
        <div className="text-white font-extrabold text-2xl">
          Finance Tracker
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Mobile;
