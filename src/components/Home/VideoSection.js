import React from "react";
import { Link } from "react-router-dom";
import Video from "../Home/Video";
import { TailSpin } from "react-loader-spinner";

const VideoSection = ({ status, videos, error, errorMsg }) => {
  return (
    <div className="pt-8 px-5 pb-12 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {videos?.length === 0 && <div></div>}
      {videos?.length === 0 ? (
        <div className="h-[86vh] flex items-center justify-center">
          {status !== "loading" && (
            <p className="p-3 text-[#fff] absolute top-[24rem]">{errorMsg}</p>
          )}
          {status === "loading" && (
             <span className="mt-[-9rem]">
              <TailSpin
                visible={true}
                height="40"
                width="40"
                color="#fff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </span>
          )}
          {status === "failed" && <p className="text-[#ff0000]">{error}</p>}
        </div>
      ) : (
        videos.map((video) => (
          <Link to={`/video/${video.id}`} key={video.id}>
            <Video {...video} />
          </Link>
        ))
      )}
      {videos?.length === 0 && <div></div>}
    </div>
  );
};

export default VideoSection;