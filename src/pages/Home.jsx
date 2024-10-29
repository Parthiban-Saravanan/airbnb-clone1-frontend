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
  margin-top: 40px;
`;

// Individual advantage post styles
const AdvantagePost = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
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
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  padding: 20px;

  ${props => props.animate && css`
    animation: ${moveAnimation} 5s linear infinite;
  `}
`;

// Footer container styles
const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  padding: 40px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-top: 50px;
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

// Footer sections for individual columns
const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;
  margin: 10px;

  h4 {
    font-size: 18px;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.primary};
  }

  p {
    font-size: 14px;
    line-height: 1.6;
  }
`;

// Animation for footer links
const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const FooterLink = styled.a`
  display: block;
  color: white;
  font-size: 14px;
  margin: 5px 0;
  text-decoration: none;
  transition: color 0.3s;
  animation: ${fadeInAnimation} 1s ease-out;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

// Footer Component
const Footer = () => (
  <FooterContainer>
    <FooterSection>
      <h4>About Airbnb</h4>
      <p>Learn more about Airbnb's mission, values, and community commitment.</p>
      <FooterLink href="#">About Us</FooterLink>
      <FooterLink href="#">Careers</FooterLink>
      <FooterLink href="#">Press</FooterLink>
    </FooterSection>
    <FooterSection>
      <h4>Community</h4>
      <p>Join a community of travelers and hosts worldwide.</p>
      <FooterLink href="#">Diversity & Belonging</FooterLink>
      <FooterLink href="#">Accessibility</FooterLink>
      <FooterLink href="#">Invite Friends</FooterLink>
    </FooterSection>
    <FooterSection>
      <h4>Support</h4>
      <p>We're here to help you every step of the way.</p>
      <FooterLink href="#">Help Center</FooterLink>
      <FooterLink href="#">Safety</FooterLink>
      <FooterLink href="#">Cancellation Options</FooterLink>
    </FooterSection>
  </FooterContainer>
);

// Home Page Component
const Home = () => {
  const [location, setLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (!location || !checkInDate || !checkOutDate) {
      alert("Please fill in all fields before searching.");
      return;
    }

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
          <AdvantageDesc>Stay in a castle, a treehouse, or a cozy cottage. Airbnb offers unique accommodations that you won’t find elsewhere.</AdvantageDesc>
        </AdvantagePost>
        <AdvantagePost>
          <AdvantageTitle>Handpicked Hosts</AdvantageTitle>
          <AdvantageDesc>Every host goes through a strict vetting process to make your trip even more special.</AdvantageDesc>
        </AdvantagePost>
        <AdvantagePost>
          <AdvantageTitle>Secure Booking</AdvantageTitle>
          <AdvantageDesc>Book with confidence on a platform that prioritizes security and transparency at every stage.</AdvantageDesc>
        </AdvantagePost>
      </AdvantagesContainer>

      {/* Quotes Section */}
      <QuotesContainer animate={true}>
        "Travel far enough, you meet yourself." – David Mitchell
      </QuotesContainer>

      {/* Footer */}
      <Footer />
    </Container>
  );
};

export default Home;
