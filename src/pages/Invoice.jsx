import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getBookedProperty } from "../api";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const PropertyDetails = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
`;

const Invoice = () => {
  const [bookedProperties, setBookedProperties] = useState([]);
  const { currentUser  } = useSelector((state) => state.user);
  const location = useLocation();
  const property = location.state?.property; // Get property from location state

  useEffect(() => {
    const fetchBookedProperties = async () => {
      try {
        const response = await getBookedProperty(currentUser.token);
        setBookedProperties(response.data);
      } catch (error) {
        console.error("Failed to fetch booked properties:", error);
      }
    };
    fetchBookedProperties();
  }, [currentUser ]);

  return (
    <Container>
      <Title>Invoice</Title>
      {property ? (
        <PropertyDetails>
          <h1>Invoice Page</h1>
          <p>Booked Property Details:</p>
          <div>
            <img src={property.image} alt={property.title} />
            <h2>{property.title}</h2>
            <p>{property.description}</p>
            <p>Price: ${property.price.org}</p>
          </div>
        </PropertyDetails>
      ) : (
        <>
          {bookedProperties.length > 0 ? (
            bookedProperties.map((property) => (
              <PropertyDetails key={property._id}>
                <h2>{property.title}</h2>
                <p>Price: ${property.price.org}</p>
                <p>Discount: {property.price.off}%</p>
              </PropertyDetails>
            ))
          ) : (
            <p>No properties booked.</p>
          )}
        </>
      )}
    </Container>
  );
};

export default Invoice;
