
import React, { useState } from "react";
import ContentComponent from "../components/youtubeStudio/ContentComponent";
import StudioSidebar from "../components/youtubeStudio/StudioSidebar";
import { useSelector } from "react-redux";
import { getUser } from "../slices/userSlice";
import SignInComponent from "../components/helper/SignInComponent";

const YoutubeStudio = () => {
  const [activeInStudioSidebar, setActiveInStudioSidebar] = useState("Content");
  const user = useSelector(getUser);
  const handleStudioSidebarClick = (category) => {
    setActiveInStudioSidebar(category);
  };
  return (
    <div className="font-semibold bg-[#282828] text-[#aaa] w-full flex h-[calc(100%-53px)] py-[4rem]">
      <StudioSidebar
        activeInStudioSidebar={activeInStudioSidebar}
        handleStudioSidebarClick={handleStudioSidebarClick}
      />{" "}
      <div className="mainBar w-[100%]">
        {/* TITLE */}
        <div className="h-[3rem] px-8 pt-8 pb-5 flex items-center">
          <span className="text-[1.5rem] text-yt-white">
            {activeInStudioSidebar === "Content"
              ? "Channel Content"
              : activeInStudioSidebar}
          </span>
        </div>
        {/* BODY */}
        {activeInStudioSidebar === "Content" ? (
          <ContentComponent />
        ) : (
          <div className="flex items-center justify-center mt-[-80px] h-full text-yt-white">
            {user ? (
              "Coming Soon..."
            ) : (
              <SignInComponent
                prefix={"Please"}
                postfix={`view ${activeInStudioSidebar}`}
              >
                sign in
              </SignInComponent>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default YoutubeStudio;
