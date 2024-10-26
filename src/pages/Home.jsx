/* eslint-disable no-undef */
import { SearchRounded } from "@mui/icons-material";
import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { useNavigate } from "react-router-dom";

// Main container for the home page
const Container = styled.div`
  padding: 50px 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  @media (max-width: 768px) {
    padding: 20px 12px;
  }
`;

// Search container styles
const SearchContainer = styled.div`
  border-radius: 33px;
  cursor: pointer;
  background-color: #fff;
  display: flex;
  align-items: center;
  max-width: 900px;
  gap: 20px;
  font-size: 14px;
  padding: 14px;
  @media (max-width: 991px) {
    flex-wrap: wrap;
  }
`;

// Location wrapper styles
const LocationWrapper = styled.div`
  margin-left: 20px;
  border-radius: 33px;
  display: flex;
  flex-direction: column;
  align-items: start;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

// Title styles
const Title = styled.div`
  color: #000;
  font-weight: 500;
  width: fit-content;
`;

// Input styles
const Desc = styled.input`
  color: rgba(0, 0, 0, 0.7);
  font-weight: 400;
  margin-top: 14px;
  font-size: 16px;
  border: none;
  outline: none;
`;

// Check-in and Check-out wrapper styles
const CheckInWrapper = styled.div`
  border-radius: 33px;
  display: flex;
  flex-direction: column;
  align-items: start;
  flex: 1;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const CheckOutWrapper = styled.div`
  margin-right: 20px;
  border-radius: 33px;
  display: flex;
  flex-direction: column;
  align-items: start;
  flex: 1;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

// Search button styles
const SearchWrapper = styled.div`
  border-radius: 33px;
  display: flex;
  gap: 1px;
`;

const SearchButton = styled.div`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  font-weight: 400;
  padding: 20px 22px;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

// Advantages container styles
const AdvantagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 40px; /* Space between search and advantages */
`;

// Individual advantage post styles
const AdvantagePost = styled.div`
  background-color: rgba(255, 255, 255, 0.8); /* Transparent background */
  border-radius: 10px;
  padding: 20px;
  width: 300px; /* Fixed width for posts */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s; /* Animation for hover */
  
  &:hover {
    transform: translateY(-5px); /* Move up on hover */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); /* Increase shadow on hover */
  }
`;

// Title and description styles for advantages
const AdvantageTitle = styled.h3`
  color: ${({ theme }) => theme.primary};
  margin-bottom: 10px;
`;

const AdvantageDesc = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.5;
`;

// Animation for quotes
const moveAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`;

// Quotes container styles
const QuotesContainer = styled.div`
  margin-top: 20px;
  text-align: center;
  font-style: italic;
  color: ${({ theme }) => theme.text_secondary};
  background-color: rgba(255, 255, 255, 0.7); /* Light transparent background */
  border-radius: 10px;
  padding: 20px;

  ${props => props.animate && css`
    animation: ${moveAnimation} 5s linear infinite;
  `}
`;

const Home = () => {
  const [location, setLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/properties", {
      state: { location, checkInDate, checkOutDate },
    });
  };

  return (
    <Container>
      <SearchContainer>
        <LocationWrapper>
          <Title>Location</Title>
          <Desc placeholder="Where are you going?" 
          type="text" 
          value={location}
          onChange={(e) => setLocation(e.target.value)} />
        </LocationWrapper>

        <CheckInWrapper>
          <Title>Check-in Date</Title>
          <Desc placeholder="Start Date" type="date" value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)} />
        </CheckInWrapper>

        <CheckOutWrapper>
          <Title>Check-out Date</Title>
          <Desc placeholder="End Date" type="date" value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)} />
        </CheckOutWrapper>

        <SearchWrapper>
          <SearchButton onClick={handleSearchClick}>
            <SearchRounded sx={{ color: "inherit", fontSize: "30px" }} />
          </SearchButton>
        </SearchWrapper>
      </SearchContainer>

      {/* Advantages Section */}
      <AdvantagesContainer>
        <AdvantagePost>
          <AdvantageTitle>Unique Experiences</AdvantageTitle>
          <AdvantageDesc>Stay in a castle, a treehouse, or a cozy cottage. Airbnb offers unique accommodations that you won’t find anywhere else.</AdvantageDesc>
        </AdvantagePost>

        <AdvantagePost>
          <AdvantageTitle>Local Hosts</AdvantageTitle>
          <AdvantageDesc>Connect with local hosts who can provide insider tips and recommendations, making your stay even more enjoyable.</AdvantageDesc>
        </AdvantagePost>

        <AdvantagePost>
          <AdvantageTitle>Flexibility</AdvantageTitle>
          <AdvantageDesc>Choose from a wide range of dates, prices, and amenities to find the perfect fit for your travel needs.</AdvantageDesc>
        </AdvantagePost>
      </AdvantagesContainer>

      {/* Quotes Section */}
      <QuotesContainer animate>
        <p>“The world is a book, and those who do not travel read only one page.” - Saint Augustine</p>
        <p>“Travel is the only thing you can buy that makes you richer.” - Unknown</p>
      </QuotesContainer>
    </Container>
  );
};

export default Home;
