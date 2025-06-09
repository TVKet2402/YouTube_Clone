// MenuButton.js

import React from "react";
import { HiOutlineBars3 } from "react-icons/hi2";

const MenuButton = ({ handleToggleSidebar, location }) => {
  return (
    <div
      onClick={handleToggleSidebar}
      className={`${
        location.pathname !== "/YoutubeStudio"
          ? "hover:bg-yt-light-black"
          : "hover:bg-[#1f1f1f]"
      } text-yt-white p-2 w-10 text-2xl text-center rounded-full cursor-pointer`}
    >
      <HiOutlineBars3 title="Menu" />
    </div>
  );
};

export default MenuButton;