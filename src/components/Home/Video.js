import React from "react";
import { MdVerified } from "react-icons/md";

const Video = ({
  thumbnail,
  duration,
  name,
  channel,
  views,
  uploadTime,
  logo,
}) => {
  return (
    <div className="flex flex-col cursor-pointer max-w-full sm:max-w-[360px]">
      <div className="relative w-full pb-[56.25%]">
        {" "}
        {/* 16:9 Aspect Ratio */}
        <img
          src={thumbnail}
          alt=""
          className="absolute inset-0 h-full w-full object-cover overflow-hidden rounded-[10px]"
        />
        <p className="absolute right-2 bottom-2 px-1 text-xs bg-[#000000e6] text-[#fff] rounded">
          {duration}
        </p>
      </div>
      <div className="flex mt-3">
        <img
          title={channel}
          src={logo}
          alt=""
          className="h-9 w-9 rounded-full"
        />
        <div className="ml-2">
          <h2 className="font-medium text-[#fff] text-sm mt-0 mb-0 items-center">
            {name.length <= 50 ? name : `${name.substr(0, 85)}...`}
          </h2>
          <h3 className="text-[#909090] text-xs mt-1 flex items-center">
            {channel}
            <span className="p-1">
              <MdVerified />
            </span>
          </h3>
          <p className="text-[#909090] m-0 font-medium text-xs">
            {views} Views • {uploadTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Video;