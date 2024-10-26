/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import { getPropertyDetails } from "../api"; // Ensure this API function is correctly defined

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

  if (loading) {
    return <CircularProgress />; // Show loading indicator while fetching
  }

  if (!property) {
    return <div>No property found.</div>; // Handle case where property is not found
  }

  return (
    <Container>
      <img src={property.img} alt={property.title} />
      <Right>
        <Title>{property.title}</Title>
        <Desc>{property.desc}</Desc>
        <Price>
          ${property.price.org}
          <Span>${property.price.mrp}</Span>
          <Percent>{property.price.off}% Off</Percent>
        </Price>
      </Right>
    </Container>
  );
};

export default PropertyDetails;