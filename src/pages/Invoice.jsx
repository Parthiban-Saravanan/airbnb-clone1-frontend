import React from "react";
import styled from "styled-components";
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
  const location = useLocation();
  const property = location.state?.property; // Access property details from the state

  return (
    <Container>
      <Title>Invoice</Title>
      {property ? (
        <PropertyDetails>
          <h2>Booked Property Details</h2>
          <img src={property.image} alt={property.title} style={{ width: "100%", borderRadius: "6px", marginBottom: "10px" }} />
          <h3>{property.title}</h3>
          <p>{property.description}</p>
          <p>Price: ${property.price.org}</p>
        </PropertyDetails>
      ) : (
        <p>No property details available.</p>
      )}
    </Container>
  );
};

export default Invoice;
