import React from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  padding: 40px;
  color: ${({ theme }) => theme.text_secondary}; /* Lighter font color */
  background-color: rgba(240, 240, 240, 0.9); /* Light background for contrast */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15); /* Enhanced shadow */
  max-width: 800px; /* Max width for better readability */
  margin: 20px auto; /* Center the container */
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-3px); /* Lift effect on hover */
  }
`;

const Title = styled.h1`
  font-size: 32px; /* Larger title */
  margin-bottom: 20px;
  color: ${({ theme }) => theme.primary}; /* Darker color for the title */
  text-align: center; /* Center the title */
`;

const ContactInfo = styled.div`
  margin-bottom: 30px;
  text-align: center; /* Center the text */
  
  p {
    line-height: 1.6; /* Improved readability */
    font-size: 16px; /* Slightly larger font size */
  }
`;

const SocialMediaLinks = styled.div`
  margin-top: 20px;
  text-align: center; /* Center the links */
  
  a {
    margin: 0 15px;
    color: ${({ theme }) => theme.primary}; /* Primary color for links */
    text-decoration: none;
    font-weight: bold; /* Bold links */
    transition: color 0.3s; /* Transition for hover effect */
    
    &:hover {
      color: ${({ theme }) => theme.secondary}; /* Change color on hover */
      text-decoration: underline;
    }
  }
`;

const AdditionalInfo = styled.div`
  margin-top: 30px;
  text-align: center; /* Center the text */
  
  h2 {
    font-size: 24px; /* Larger subtitle */
    color: ${({ theme }) => theme.primary}; /* Darker color for the subtitle */
    margin-bottom: 10px;
  }

  p {
    line-height: 1.6; /* Improved readability */
    font-size: 16px; /* Slightly larger font size */
    color: ${({ theme }) => theme.text_secondary}; /* Lighter font color */
  }
`;

const ServiceInfo = styled.div`
  margin-top: 30px;
  text-align: center; /* Center the text */
  
  h2 {
    font-size: 24px; /* Larger subtitle */
    color: ${({ theme }) => theme.primary}; /* Darker color for the subtitle */
    margin-bottom: 10px;
  }

  p {
    line-height: 1.6; /* Improved readability */
    font-size: 16px; /* Slightly larger font size */
    color: ${({ theme }) => theme.text_secondary}; /* Lighter font color */
  }
`;

const Contact = () => {
  return (
    <Container>
      <Title>Contact Us</Title>
      <ContactInfo>
        <p>If you have any questions, feel free to reach out to us at:</p>
        <p>Email: <a href="mailto:support@airbnb.com">support@airbnb.com</a></p>
        <p>Phone: <a href="tel:+18001234567">+1 (800) 123-4567</a></p>
      </ContactInfo>
      <SocialMediaLinks>
        <p>Follow us on:</p>
        <a href="https://www.facebook.com/Airbnb" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://twitter.com/Airbnb" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://www.instagram.com/airbnb/" target="_blank" rel="noopener noreferrer">Instagram</a>
      </SocialMediaLinks>
      <AdditionalInfo>
        <h2>Office Hours</h2>
        <p>Monday to Friday: 9 AM - 5 PM</p>
        <p>Saturday: 10 AM - 4 PM</p>
        <p>Sunday: Closed</p>
      </AdditionalInfo>
      <ServiceInfo>
        <h2>Customer Service</h2>
        <p>Our dedicated customer service team is here to help you with:</p>
        <ul>
          <li>Booking assistance and inquiries</li>
          <li>Payment and refund support</li>
          <li>Listing and hosting guidance</li>
          <li>Resolving any issues or concerns</li>
        </ul>
      </ServiceInfo>
    </Container>
  );
};

export default Contact;
