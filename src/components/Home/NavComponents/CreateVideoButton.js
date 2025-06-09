// CreateVideoButton.js

import React from "react";
import { BiVideoPlus } from "react-icons/bi";

const CreateVideoButton = ({ handleClick, location }) => {
  return (
    <button
      className="flex flex-row text-yt-white justify-center py-[0.4rem] max-791:border-[#fff0] px-[0.75rem] items-center gap-2 font-medium text-sm border border-yt-border rounded-[0.2rem] hover:bg-yt-light-blue"
      onClick={handleClick}
    >
      <BiVideoPlus
        title="Create video"
        className="text-[#ff4e45] cursor-pointer"
        size={25}
      />
      <span className="max-791:hidden">CREATE</span>
    </button>
  );
};

export default CreateVideoButton;