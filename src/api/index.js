import axios from "axios";

// Set up an Axios instance with a base URL for the API
const API = axios.create({
    baseURL: "https://airbnb-clone1-backend.onrender.com/api/",
});

// User signup function
export const UserSignUp = async (data) => {
    try {
        const response = await API.post("/signup", data);
        return response.data;
    } catch (error) {
        console.error("Error during signup:", error);
        throw error;
    }
};

// User signin function
export const UserSignIn = async (data) => {
    try {
        const response = await API.post("/signin", data);
        return response.data;
    } catch (error) {
        console.error("Error during signin:", error);
        throw error;
    }
};

// Retrieve user's favorite properties
export const getFavorites = async (token) => {
    try {
        const response = await API.get('/getFavorites', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching favorite properties:", error);
        throw error;
    }
};

// Add a property to user's favorites
export const addToFavorites = async (token, data) => {
    try {
        const response = await API.post('/addToFavorites', data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding to favorites:", error);
        throw error;
    }
};

// Remove a property from user's favorites
export const removeFromFavorites = async (token, data) => {
    try {
        const response = await API.post('/removeFavorite', data, {
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
        const response = await API.post('/booking', data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error booking property:", error);
        throw error;
    }
};

// Get booked properties for the user
export const getBookedProperties = async (token) => {
    try {
        const response = await API.get('/getBookedProperties', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching booked properties:", error);
        throw error;
    }
};

// Get details of a specific booking
export const getBookingProperty = async (token) => {
    try {
        const response = await API.get('/getBookingProperty', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching booking details:", error);
        throw error;
    }
};
