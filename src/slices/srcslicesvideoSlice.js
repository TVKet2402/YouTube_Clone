import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
// Local variable to store received videos

// Thunk to subscribe to videos from Firestore
export const fetchVideos = createAsyncThunk(
  "videos/fetchVideos",
  async (_, { dispatch }) => {
    try {
      // Set loading state
      dispatch(setLoading());

      // Fetch data from Firestore
      const q = query(collection(db, "videos"));
      onSnapshot(q, (snapShot) => {
        const Videos = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch(setVideos(Videos));
        dispatch(setAllVideos(Videos)); // Dispatch success action and pass fetched data
      });
    } catch (error) {
      // Dispatch failure action and pass error message
      dispatch(setError(error.message));
    }
  }
);

// Slice for managing videos state
const videoSlice = createSlice({
  name: "videos",
  initialState: {
    videos: [],
    allVideos: [],
    filteredVideos: [],
    status: "idle",
    error: null,
    searchQuery: "",
  },
  reducers: {
    setAllVideos: (state, action) => {
      state.allVideos = action.payload;
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
} = videoSlice.actions;
export default videoSlice.reducer;