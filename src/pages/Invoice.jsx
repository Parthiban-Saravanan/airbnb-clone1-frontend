import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getBookedProperty } from "../api";
import { useSelector } from "react-redux";

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

const Invoice = () => {
  const [bookedProperties, setBookedProperties] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

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
  }, [currentUser]);

  return (
    <Container>
      <Title>Invoice</Title>
      {bookedProperties.length > 0 ? (
        bookedProperties.map((property) => (
          <div key={property._id}>
            <h2>{property.title}</h2>
            <p>Price: ${property.price.org}</p>
            <p>Discount: {property.price.off}%</p>
          </div>
        ))
      ) : (
        <p>No properties booked.</p>
      )}
    </Container>
  );
};

export default Invoice;