import axios from "axios";

// Set up an Axios instance with a base URL for the API
const API = axios.create({
    baseURL: "https://airbnb-clone1-backend.onrender.com/api/",
});

// User signup function
export const UserSignUp = async (data) => {
    try {
        const response = await API.post("/user/signup", data);
        return response.data;
    } catch (error) {
        console.error("Error during signup:", error);
        throw error;
    }
};

// User signin function
export const UserSignIn = async (data) => {
    try {
        const response = await API.post("/user/signin", data);
        return response.data;
    } catch (error) {
        console.error("Error during signin:", error);
        throw error;
    }
};

// Fetch all properties with filter options
export const getAllProperty = async (filter) => {
    try {
        const response = await API.get(`/property/get?${filter}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

// Get details of a specific property by ID
export const getPropertyDetails = async (id) => {
    try {
        const response = await API.get(`/property/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching property details:", error);
        throw error;
    }
};

// Retrieve user's favorite properties
export const getFavourite = async (token) => {
    try {
        const response = await API.get('/user/getFavorites/', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching favorite properties:", error);
        throw error;
    }
};

// Add a property to user's favorites
export const addToFavourite = async (token, data) => {
    try {
        const response = await API.post('/user/addToFavorites/', data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding to favorites:", error);
        throw error;
    }
};

// Remove a property from user's favorites
export const deleteFromFavourite = async (token, data) => {
    try {
        const response = await API.post('/user/removeFavorite', data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error removing from favorites:", error);
        throw error;
    }
};

// Book a property
export const bookProperty = async (token, data) => {
    try {
        const response = await API.post('/user/booking/', data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error booking property:", error);
        throw error;
    }
};

// Get booked properties for the user
export const getBookedProperty = async (token) => {
    try {
        const response = await API.get('/user/getBooking/', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching booked properties:", error);
        throw error;
    }
};
