/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropertyCard from "../componnents/Cards/PropertyCard";
import { getAllProperty } from "../api";
import { CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  padding: 20px 0;
  height: 95vh;
  overflow-y: hidden;
  display: flex;
  align-items: center;
  gap: 30px;
  @media (max-width: 768px) {
    padding: 20px 12px;
    flex-direction: column;
    overflow-y: scroll;
  }
  background: ${({ theme }) => theme.bg};
  margin: 0 20px;
  border-radius: 12px 12px 0 0;
`;
const Property = styled.div`
  padding: 12px;
  overflow: hidden;
  height: fit-content;
  @media (min-width: 768px) {
    width: 100%;
    overflow-y: scroll;
    height: 100%;
  }
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  @media (max-width: 750px) {
    gap: 14px;
  }
`;

const PropertyListing = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const { location: loc, checkInDate, checkOutDate } = location.state;
  const filter = `location=${loc}`;

  const getproperties = async () => {
    setLoading(true);
    await getAllProperty(filter).then((res) => {
      setProperties(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getproperties();
  }, []);

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <Property>
          <CardWrapper>
            {properties.map((property) => (
              <PropertyCard property={property} />
            ))}
          </CardWrapper>
        </Property>
      )}
    </Container>
  );
};

export default PropertyListing;