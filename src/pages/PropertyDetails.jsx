/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import { getPropertyDetails, bookProperty } from "../api";
import Button from "../componnents/Button";
import { useSelector } from "react-redux";

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

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBooked, setIsBooked] = useState(false);

  // Check for user token from Redux
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = currentUser?.token;

  const getPropertyDetailsByID = async () => {
    setLoading(true);
    try {
      const response = await getPropertyDetails(id);
      setProperty(response.data);
    } catch (error) {
      console.error("Failed to fetch property details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPropertyDetailsByID();
  }, [id]);

  const handleBookNow = async () => {
    if (!token) {
      alert("You need to be logged in to book a property.");
      navigate("/login");
      return;
    }
    try {
      await bookProperty(token, { propertyId: id });
      setIsBooked(true);
      alert("Property booked successfully!");
    } catch (error) {
      console.error("Failed to book property:", error);
      alert("Failed to book the property. Please try again.");
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
