import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    list: [], // Initialize an empty array for the favorites list
  },
  reducers: {
    addToFavorites: (state, action) => {
      const propertyId = action.payload.propertyId;
      if (!state.list.some((property) => property._id === propertyId)) {
        state.list.push({ _id: propertyId }); // Add to favorites if not already present
      }
    },
    removeFromFavorites: (state, action) => {
      const propertyId = action.payload.propertyId;
      state.list = state.list.filter((property) => property._id !== propertyId); // Remove from favorites
    },
    setFavorites: (state, action) => {
      state.list = action.payload; // Set favorites from an API response
    },
  },
});

// Export actions for usage in components
export const { addToFavorites, removeFromFavorites, setFavorites } = favoritesSlice.actions;

// Export the reducer to be included in the store
export default favoritesSlice.reducer;
