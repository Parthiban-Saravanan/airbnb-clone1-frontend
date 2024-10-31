import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import { getPropertyDetails, bookProperty } from "../api";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/reducers/snackbarSlice";

const Container = styled.div`...`; // Existing styles
const Image = styled.img`...`;
const Right = styled.div`...`;
const Title = styled.h1`...`;
const Desc = styled.p`...`;
const Price = styled.div`...`;
const Span = styled.span`...`;
const Percent = styled.span`...`;
const BookButton = styled.button`...`;

const PropertyDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
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

        // Navigate to Invoice page after booking
        navigate("/invoice");

        setTimeout(() => {
          setIsShaking(false);
        }, 600);
      } else {
        setIsBooked(false);
      }
    } catch (error) {
      console.error("Failed to book property:", error);
      dispatch(openSnackbar({ message: "Failed to book the property. Please try again.", severity: "error" }));
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
          <Span>${property.price.mrp}</ Span>
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
