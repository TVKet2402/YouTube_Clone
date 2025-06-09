// SearchBar.js

import React from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { MdMic } from "react-icons/md";

const SearchBar = ({ searchQuery, handleSearch }) => {
  return (
    <div className="h-10 flex flex-row items-center w-2/4">
      <div className="w-full h-[2.2rem] bg-yt-black flex border border-yt-light-black items-center rounded-3xl">
        <input
          name="Search videos"
          type="text"
          placeholder="Search"
          className="w-full bg-yt-black h-6 ml-6 text-yt-white text-start focus:outline-none"
          value={searchQuery}
          onChange={handleSearch}
        />
        <button
          title="Search"
          className="w-16 h-[2.2rem] bg-yt-light-black px-2 py-0.5 rounded-r-3xl border-1-2 border-yt-light-black"
        >
          <HiMagnifyingGlass
            size={22}
            className="text-yt-white inline-block text-center font-thin"
          />
        </button>
      </div>
      <div className="max-791:hidden text-yt-white bg-yt-light w-10 h-[2.2rem] items-center flex justify-center rounded-full ml-4 hover:bg-yt-light-black cursor-pointer">
        <MdMic title="Microphone" className="text-center" size={23} />
      </div>
    </div>
  );
};

export default SearchBar;