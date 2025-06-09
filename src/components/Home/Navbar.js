//Navbar.js

import React, { useState, useEffect } from "react";
import { BiVideoPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import logo from "../../assets/YouTube-Logo.png";
import studioLogo from "../../assets/yt_studio_logo_white.svg";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser, getUser, logout } from "../../slices/userSlice";
import {
  setSearchQuery,
  filterVideosByName,
  setVideos,
  fetchVideos,
  setUserUploadedVideos,
  filterUserUploadedVideosByName,
} from "../../slices/videoSlice";
import { useLocation, useNavigate } from "react-router-dom";
import AddVideo from "../youtubeStudio/AddVideo";
import { toggleSidebar, toggleStudioSidebar } from "../../slices/sidebarSlice";
import MenuButton from "./NavComponents/MenuButton";
import SearchBar from "./NavComponents/SearchBar";
import CreateVideoButton from "./NavComponents/CreateVideoButton";
import NotificationsBell from "./NavComponents/NotificationsBell";
import ProfileImage from "./NavComponents/ProfileImage";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const user = useSelector(getUser);
  const { searchQuery, filteredVideos, allVideos, userUploadedVideos } =
    useSelector((state) => state.videos);

  useEffect(() => {
    dispatch(fetchVideos());
     }, [dispatch]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
    });
     }, [dispatch]);

  useEffect(() => {
    let _userUploadedVideos = [];
    if (user) {
      _userUploadedVideos = allVideos.filter(
        (video) => video.uploadedBy === user?.email
      );
    }
    dispatch(setUserUploadedVideos(_userUploadedVideos));
    }, [allVideos, user, dispatch]);

  const handleToggleSidebar = () => {
    if (location.pathname === "/YoutubeStudio") {
      dispatch(toggleStudioSidebar());
    } else {
      dispatch(toggleSidebar());
    }
  };

  const handleClick = async (e) => {
    if (location.pathname === "/YoutubeStudio") {
      if (user) {
        setShowPopup(true);
      } else {
        alert("please sign to create");
        await handleLogin(e);
        setShowPopup(true);
      }
    } else {
      navigate("/YoutubeStudio");
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await signInWithPopup(auth, provider);
    dispatch(setUser(response.user));
    dispatch(
      setUserUploadedVideos(
        allVideos.filter((video) => video.uploadedBy === response.user?.email)
      )
    );
  };

  const handleLogout = async () => {
    dispatch(logout());
    dispatch(setUserUploadedVideos([]));
    await signOut(auth);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    dispatch(setSearchQuery(query));
    if (location.pathname !== "/YoutubeStudio") {
      if (query.trim() !== "") {
        dispatch(filterVideosByName(filteredVideos));
      } else if (searchQuery.trim() !== "") {
        dispatch(setVideos(filteredVideos));
      }
    } else {
      if (query.trim() !== "") {
        dispatch(filterUserUploadedVideosByName(userUploadedVideos));
      } else if (searchQuery.trim() !== "") {
        dispatch(
          setUserUploadedVideos(
            allVideos.filter((video) => video.uploadedBy === user?.email)
          )
        );
      }
    }
  };

  return (
    <div
      className={`z-20 ${
        location.pathname !== "/YoutubeStudio"
          ? "bg-yt-black "
          : "bg-[#282828] navbar"
      }  h-14 flex items-center pr-[30px] pl-[20px]
      max-1054:pr-[10px] max-1054:pl-[6px]  justify-between fixed w-full z-10`}
    >
      {/* left section */}
      <div className="flex justify-start items-center w-1/4">
         <MenuButton
          handleToggleSidebar={handleToggleSidebar}
          location={location}
        />
        <div className="pl-2 w-24 sm:w-28 lg:w-32">
          <Link to="/">
            <img
              title="Youtube Clone"
              src={location.pathname === "/YoutubeStudio" ? studioLogo : logo}
              alt=""
              className="object-contain w-full"
            />
          </Link>
        </div>
      </div>
      {/* middle section */}
      {location.pathname !== "/YoutubeStudio" ? (
         <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
      ) : (
        <div className="flex flex-row items-center w-2/4">
          <div className="w-full flex text-[#576772] border border-[#606060] items-center rounded-[5px] h-10">
            <input
              name="Search"
              type="text"
              placeholder="Search"
              className="w-full  bg-[#282828] h-6 ml-6 text-yt-white text-start focus:outline-none "
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
      )}
      {/* right section */}
      <div className="flex items-center justify-end w-1/5">
        <div className="flex flex-row gap-[1rem] items-center">
          {location.pathname === "/YoutubeStudio" ? (
            <CreateVideoButton handleClick={handleClick} />
          ) : (
            <div className="hover:bg-yt-light-black rounded-full cursor-pointer">
              <Link to={`/YoutubeStudio`}>
                <BiVideoPlus
                  title="Create video"
                  to="/VideoForm"
                  size={25}
                  className="text-yt-white text-center"
                />
              </Link>
            </div>
          )}
          {/* Popup Window */}
           {showPopup && <AddVideo togglePopup={togglePopup} isNew={true} />}
          <NotificationsBell location={location} />
          <ProfileImage
            user={user}
            handleLogout={handleLogout}
            handleLogin={handleLogin}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
