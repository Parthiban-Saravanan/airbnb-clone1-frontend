import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import GPayIcon from "./gpay.png";
import PhonePeIcon from "./phonepe.png";
import PaytmIcon from "./paytm.png";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

const PaymentButton = styled.button`
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
`;

const PaymentIcons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
`;

const PaymentIcon = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 6px;
`;

const Invoice = () => {
  const location = useLocation();
  const property = location.state?.property;

  return (
    <Container>
      <Title>Invoice</Title>
      {property ? (
        <PropertyDetails>
          <h2>Booked Property Details</h2>
          <img
            src={property.img}
            alt={property.title}
            style={{
              width: "100%",
              borderRadius: "6px",
              marginBottom: "10px",
            }}
          />
          <h3>{property.title}</h3>
          <p>{property.desc}</p>
          <p>Price: ${property.price.org}</p>
        </PropertyDetails>
      ) : (
        <p>No property details available.</p>
      )}
      <PaymentButton>Make Payment</PaymentButton>
      <PaymentIcons>
        <PaymentIcon src={GPayIcon} alt="GPay" />
        <PaymentIcon src={PhonePeIcon} alt="PhonePe" />
        <PaymentIcon src={PaytmIcon} alt="Paytm" />
      </PaymentIcons>
    </Container>
  );
};

export default Invoice;
