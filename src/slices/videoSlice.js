import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export const fetchVideos = createAsyncThunk(
  "videos/fetchVideos",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading());
      const q = query(collection(db, "videos"));
      onSnapshot(q, (snapShot) => {
        const Videos = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch(setVideos(Videos));
        dispatch(setAllVideos(Videos));
      });
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
);

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    videos: [],
    allVideos: [],
    filteredVideos: [],
    userUploadedVideos: [],
    status: "idle",
    error: null,
    searchQuery: "",
    showModel: false,
    formData: [],
  },
  reducers: {
    setAllVideos: (state, action) => {
      state.allVideos = action.payload;
    },
    setUserUploadedVideos: (state, action) => {
      state.userUploadedVideos = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setVideos: (state, action) => {
      state.videos = action.payload;
      state.filteredVideos = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    setLoading: (state) => {
      state.status = "loading";
      state.error = null;
    },
    setError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    filterByCategory: (state, action) => {
      const category = action.payload;
      state.videos = state.allVideos.filter(
        (video) => video.category === category
      );
      state.filteredVideos = state.videos;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    filterVideosByName: (state) => {
      state.videos = state.filteredVideos.filter((video) =>
        video.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
    filterUserUploadedVideosByName: (state) => {
      state.userUploadedVideos = state.userUploadedVideos.filter((video) =>
        video.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
    // Action to toggle edit mode
    toggleShowModel: (state, action) => {
      state.showModel = action.payload;
    },
  },
});

export const {
  setVideos,
  setAllVideos,
  setLoading,
  setError,
  setSearchQuery,
  filterByCategory,
  filterVideosByName,
  toggleShowModel,
  setFormData,
  filterUserUploadedVideosByName,
  setUserUploadedVideos, // Export the toggleShowModel action
} = videoSlice.actions;

export default videoSlice.reducer;