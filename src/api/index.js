import axios from "axios";

// Set up an Axios instance with a base URL for the API
const API = axios.create({
    baseURL: "https://airbnb-clone1-backend.onrender.com/api/",
});

// Utility function for handling API requests
const handleRequest = async (method, url, data = null, token = null) => {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    try {
        const response = await API[method](url, data, config);
        return response.data;
    } catch (error) {
        console.error(`Error during ${method.toUpperCase()} request to ${url}:`, error);
        throw new Error(`Could not complete the request. Please try again later.`);
    }
};

// User signup function
export const userSignUp = async (data) => {
    return handleRequest("post", "/signup", data);
};

// User signin function
export const userSignIn = async (data) => {
    return handleRequest("post", "/signin", data);
};

// Retrieve user's favorite properties
export const getFavorites = async (token) => {
    return handleRequest("get", "/getFavorites", null, token);
};

// Add a property to user's favorites
export const addToFavorites = async (token, data) => {
    return handleRequest("post", "/addToFavorites", data, token);
};

// Remove a property from user's favorites
export const removeFromFavorites = async (token, data) => {
    return handleRequest("post", "/removeFavorite", data, token);
};

// Book a property
export const bookProperty = async (token, data) => {
    return handleRequest("post", "/booking", data, token);
};

// Get booked properties for the user
export const getBookedProperties = async (token) => {
    return handleRequest("get", "/getBookedProperties", null, token);
};

// Get details of a specific booking
export const getBookingProperty = async (token) => {
    return handleRequest("get", "/getBookingProperty", null, token);
};

// Fetch all properties with filter options
export const getAllProperties = async (filter) => {
    return handleRequest("get", `/property/get?${filter}`);
};

// Get details of a specific property by ID
export const getPropertyDetails = async (id) => {
    return handleRequest("get", `/property/${id}`);
};

// Export all functions to ensure they're available for import elsewhere
// This is done as a separate object, ensuring uniqueness
const apiFunctions = {
    userSignUp,
    userSignIn,
    getFavorites,
    addToFavorites,
    removeFromFavorites,
    bookProperty,
    getBookedProperties,
    getBookingProperty,
    getAllProperties,
    getPropertyDetails,
};

export default apiFunctions;
