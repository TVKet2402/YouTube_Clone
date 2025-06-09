// ProfileImage.js

import React from "react";
import { VscAccount } from "react-icons/vsc";
import SignInComponent from "../../helper/SignInComponent";

const ProfileImage = ({ user, handleLogout }) => {
  return (
    <div className="max-791:mx-0 items-center cursor-pointer text-yt-blue">
      {user ? (
        <img
          title={user.displayName}
          src={user.photoURL}
          alt={user.displayName}
          onClick={handleLogout}
          className="object-cover rounded-full cursor-pointer w-8 h-8"
        />
      ) : (
        <SignInComponent className="max-791:text-xs border border-yt-border max-1054:border-0 max-791:px-[0.5rem] flex flex-row  justify-center bg-yt-black py-[0.4rem] px-[0.75rem] items-center gap-2 font-medium text-sm rounded-3xl hover:bg-yt-light-blue">
          <VscAccount size={22} />
          <span className="max-1054:hidden">Sign In</span>
        </SignInComponent>
      )}
    </div>
  );
};

export default ProfileImage;