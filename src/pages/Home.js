// src/pages/Home.js
import React, { useEffect } from "react";
import Sidebar from "../components/Home/Sidebar";
import { CategoryItems } from "../static/Data";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/userSlice";
import { fetchVideos } from "../slices/videoSlice";
import { onAuthStateChanged } from "firebase/auth";
import VideoSection from "../components/Home/VideoSection";
import HorizontalBar from "../components/video/HorizontalBar";

const Home = () => {
  const dispatch = useDispatch();
  const { status, videos, error } = useSelector((state) => state.videos);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Sidebar />
      <div className="w-[83%]  h-[calc(100%-53px)] pt-[4.5rem] bg-yt-black left-60 relative max-1054:left-0 max-1054:w-full">
        <div className="flex flex-row px-3 overflow-x-scroll  relative scrollbar-hide">
          <HorizontalBar CategoryItems={CategoryItems} />
        </div>
        <VideoSection
          status={status}
          videos={videos}
          error={error}
          errorMsg={"No videos found in this category."}
        />
      </div>
    </>
  );
};

export default Home;