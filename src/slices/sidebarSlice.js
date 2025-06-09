import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: true,
  isStudioSidebarOpen: true,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    toggleStudioSidebar: (state) => {
      state.isStudioSidebarOpen = !state.isStudioSidebarOpen;
    },
  },
});

export const { toggleSidebar, toggleStudioSidebar } = sidebarSlice.actions;

export const selectSidebarState = (state) => state.sidebar;

export default sidebarSlice.reducer;