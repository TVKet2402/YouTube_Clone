// NotificationsBell.js

import React from "react";
import { FaRegBell } from "react-icons/fa";

const NotificationsBell = ({ location }) => {
  return location.pathname !== "/YoutubeStudio" ? (
    <div className="max-791:hidden  hover:bg-yt-light-black rounded-full cursor-pointer">
      <FaRegBell
        title="Notifications"
        size={20}
        className="text-yt-white text-center"
      />
    </div>
  ) : null;
};

export default NotificationsBell;