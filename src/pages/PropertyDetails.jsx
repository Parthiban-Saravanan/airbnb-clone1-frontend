import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import styled, { keyframes, css } from "styled-components";
import { getPropertyDetails, bookProperty } from "../api";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/reducers/snackbarSlice"; // Import snackbar action

// Keyframes for the shake animation
const shakeAnimation = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  padding: 20px;
  height: 95vh;
  margin: 0 20px;
  background: ${({ theme }) => theme.bg};
  border-radius: 12px;
  overflow-y: auto;
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

const BookButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ isBooked }) => (isBooked ? "green" : "blue")};
  animation: ${({ isShaking }) =>
    isShaking
      ? css`
          ${shakeAnimation} 0.3s ease forwards;
        `
      : "none"};
  animation-iteration-count: ${({ isShaking }) => (isShaking ? 2 : 0)};

  &:hover {
    opacity: 0.8;
  }
`;

const PropertyDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBooked, setIsBooked] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const getPropertyDetailsByID = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getPropertyDetails(id);
      setProperty(response.data);
    } catch (error) {
      console.error("Failed to fetch property details:", error);
      dispatch(openSnackbar({ message: "Failed to fetch property details.", severity: "error" }));
    } finally {
      setLoading(false);
    }
  }, [id, dispatch]);

  useEffect(() => {
    getPropertyDetailsByID();
  }, [getPropertyDetailsByID]);

  const handleBookNow = async () => {
    try {
      if (!isBooked) {
        await bookProperty({ propertyId: id });
        setIsBooked(true);
        setIsShaking(true);
        dispatch(openSnackbar({ message: "Property booked successfully!", severity: "success" }));
        
        setTimeout(() => {
          setIsShaking(false);
        }, 600); // Duration of the shake animation
      } else {
        // If already booked, reset to "Book Now"
        setIsBooked(false);
      }
    } catch (error) {
      console.error("Failed to book property:", error);
      dispatch(openSnackbar({ message: "Failed to book the property. Please try again.", severity: " error" }));
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!property) {
    return <div>No property found.</div>;
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
        <BookButton isBooked={isBooked} isShaking={isShaking} onClick={handleBookNow}>
          {isBooked ? "Booked" : "Book Now"}
        </BookButton>
      </Right>
    </Container>
  );
};

export default PropertyDetails;
