import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import { getPropertyDetails, bookProperty } from "../api";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/reducers/snackbarSlice";

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
  background-color: blue;

  &:hover {
    opacity: 0.8;
  }
`;

const PropertyDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPropertyDetailsByID = useCallback(async () => {
    setLoading(true);
    try {
      const propertyData = await getPropertyDetails(id);
      setProperty(propertyData);
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
      const token = localStorage.getItem("token"); // Ensure the token is set correctly
      await bookProperty(token, { propertyId: id });
      dispatch(openSnackbar({ message: "Property booked successfully!", severity: "success" }));
      
      navigate("/invoice", { state: { property } });
    } catch (error) {
      console.error("Failed to book property:", error);
      dispatch(openSnackbar({ message: "Failed to book the property. Please try again.", severity: "error" }));
    }
  };

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        property ? (
          <>
            <Image src={property.image} alt={property.title} />
            <Right>
              <Title>{property.title}</Title>
              <Desc>{property.description}</Desc>
              <Price>
                ${property.price.org}{" "}
                {property.price.mrp && <Span>${property.price.mrp}</Span>}
                {property.price.off && <Percent>+{property.price.off}% off</Percent>}
              </Price>
              <BookButton onClick={handleBookNow}>Book Now</BookButton>

              {/* Additional details for better visibility */}
              {property.address && <Desc><strong>Address:</strong> {property.address}</Desc>}
              {property.amenities && property.amenities.length > 0 && (
                <Desc>
                  <strong>Amenities:</strong> {property.amenities.join(", ")}
                </Desc>
              )}
              {property.checkIn && property.checkOut && (
                <Desc>
                  <strong>Check-In:</strong> {property.checkIn} <br />
                  <strong>Check-Out:</strong> {property.checkOut}
                </Desc>
              )}
            </Right>
          </>
        ) : (
          <Desc>No property details found.</Desc>
        )
      )}
    </Container>
  );
};

export default PropertyDetails;
