import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgress, Button } from "@mui/material";
import styled from "styled-components";
import { getPropertyDetails } from "../api"; // Ensure this API function is correctly defined

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 0 auto;
  max-width: 1200px;
  background: ${({ theme }) => theme.bg};
  border-radius: 12px;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 30px;
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    width: 50%;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
`;

const Title = styled.h1`
  font-size: 1.8em;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
  padding-bottom: 5px;
  border-bottom: 2px solid ${({ theme }) => theme.text_secondary};
`;

const Desc = styled.p`
  font-size: 1em;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_primary};
  text-align: justify;
  margin: 0 10px;
`;

const Price = styled.div`
  font-size: 1.5em;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Span = styled.span`
  font-size: 0.9em;
  color: ${({ theme }) => theme.text_secondary};
  text-decoration: line-through;
  margin-left: 8px;
`;

const Percent = styled.span`
  font-size: 0.9em;
  color: green;
  font-weight: 500;
  margin-left: 8px;
`;

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPropertyDetailsByID = async () => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!property) {
    return <div>No property found.</div>;
  }

  const handleBookNow = () => {
    navigate("/invoice", { state: { property } });
  };

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
          variant="contained"
          color="primary"
          onClick={handleBookNow}
          style={{ alignSelf: "center", marginTop: "20px" }}
        >
          Book Now
        </Button>
      </Right>
    </Container>
  );
};

export default PropertyDetails;
