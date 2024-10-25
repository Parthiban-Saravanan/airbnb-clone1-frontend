import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api/",
});

// User signup and signin functions
export const UserSignUp = async (data) => await API.post("/user/signup", data);
export const UserSignIn = async (data) => await API.post("/user/signin", data);

// Get all properties with a filter
export const getAllProperty = async (filter) =>
    await API.get(`/property/get?${filter}`); // Fixed string interpolation

// Get property details by ID
export const getPropertyDetails = async (id) =>
    await API.get(`/property/${id}`);

// Get user's favorite properties
export const getFavourite = async (token) =>
    await API.get('/user/getFavorites/', {
        headers: { Authorization: `Bearer ${token}` }, // Fixed string interpolation
    });

// Add a property to favorites
export const addToFavourite = async (token, data) =>
    await API.post('/user/addToFavorites/', data, {
        headers: { Authorization: `Bearer ${token}` }, // Fixed string interpolation
    });

// Remove a property from favorites
export const deleteFromFavourite = async (token, data) =>
    await API.post('/user/removeFavorite', data, {
        headers: { Authorization: `Bearer ${token}` }, // Fixed string interpolation
    });

// Book a property
export const bookProperty = async (token, data) =>
    await API.post('/user/booking/', data, {
        headers: { Authorization: `Bearer ${token}` }, // Fixed string interpolation
    });

// Get booked properties
export const getBookedProperty = async (token) =>
    await API.get('/user/getBooking/', {
        headers: { Authorization: `Bearer ${token}` }, // Fixed string interpolation
    });