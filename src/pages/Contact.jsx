import React from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  padding: 20px;
  color: ${({ theme }) => theme.text_secondary}; /* Lighter font color */
  background-color: rgba(240, 240, 240, 0.8); /* Light background for contrast */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
`;

const Title = styled.h1`
  font-size: 28px; /* Slightly larger title */
  margin-bottom: 20px;
  color: ${({ theme }) => theme.primary}; /* Darker color for the title */
`;

const ContactInfo = styled.div`
  margin-bottom: 20px;
  p {
    line-height: 1.6; /* Improved readability */
  }
`;

const SocialMediaLinks = styled.div`
  margin-top: 20px;
  a {
    margin-right: 15px;
    color: ${({ theme }) => theme.primary}; /* Primary color for links */
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const AdditionalInfo = styled.div`
  margin-top: 20px;
  p {
    line-height: 1.6; /* Improved readability */
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
    </Container>
  );
};

export default Contact;