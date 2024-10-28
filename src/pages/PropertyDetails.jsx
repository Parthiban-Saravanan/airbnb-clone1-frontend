/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import { getPropertyDetails, bookProperty } from "../api"; // Ensure this API function is correctly defined
import Button from "../componnents/Button"; // Import the Button component
import { useSelector } from "react-redux"; // Import useSelector to access the current user

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  padding: 20px;
  height: 95vh;
  margin: 0 20px;
  background: ${({ theme }) => theme.bg};
  border-radius: 12px 12px 0 0;
  overflow-y: scroll;
`;

const Image = styled.img`
  width: 50%;
  border-radius: 6px;
  object-fit: cover;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
`;

const Price = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Span = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  text-decoration: line-through;
  margin-left: 8px;
`;

const Percent = styled.span`
  font-size: 16px;
  color: green;
  margin-left: 8px;
`;

const PropertyDetails = () => {
  const { id } = useParams(); // Get the property ID from the URL parameters
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [property, setProperty] = useState(null); // State to hold property details
  const [loading, setLoading] = useState(true); // Loading state
  const [isBooked, setIsBooked] = useState(false); // State to track booking status

  // Access the current user's token from the Redux store
  const currentUser  = useSelector((state) => state.user.currentUser );
  const token = currentUser  ? currentUser.token : null; // Assuming the token is stored in the user object

  const getPropertyDetailsByID = async () => {
    try {
      const response = await getPropertyDetails(id); // Fetch property details using the API
      setProperty(response.data); // Set property details in state
    } catch (error) {
      console.error("Failed to fetch property details:", error); // Log any errors
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    getPropertyDetailsByID(); // Fetch property details when component mounts
  }, [id]); // Dependency array includes id to refetch if it changes

  const handleBookNow = async () => {
    if (!token) {
      alert("You need to be logged in to book a property."); // Alert if user is not logged in
      return;
    }

    try {
      await bookProperty(token, { propertyId: id }); // Call the bookProperty API with the property ID
      setIsBooked(true); // Update booking status
      alert("Property booked successfully!"); // Notify the user
    } catch (error) {
      console.error("Failed to book property:", error); // Log any errors
      alert("Failed to book the property. Please try again."); // Notify the user of the error
    }
  };

  if (loading) {
    return <CircularProgress />; // Show loading indicator while fetching
  }

  if (!property) {
    return <div>No property found.</div>; // Handle case where property is not found
  }

  return (
    <Container>
      <Image src={property.img} alt={property.title} />
      <Right>
        <Title>{property.title}</Title>
        <Desc>{property.desc}</Desc>
        <Price>
          ${property.price.org}
          <Span>${property.price.mrp}</Span>
          <Percent>{property.price.off}% Off</Percent>
        </Price>
        <Button
          text={isBooked ? "Booked" : "Book Now"}
          onClick={handleBookNow}
          disabled={isBooked}
        />
      </Right>
    </Container>
  );
};

export default PropertyDetails;
