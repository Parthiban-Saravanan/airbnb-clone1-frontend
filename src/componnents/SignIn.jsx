import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput"; 
import Button from "./Button"; 
import { UserSignIn } from "../api"; 
import { useDispatch } from "react-redux"; 
import { loginSuccess } from "../redux/reducers/userSlice";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.secondary};
`;

const Span = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.secondary + 90};
`;

const TextButton = styled.div`
  width: 100%;
  text-align: end;
  color: ${({ theme }) => theme.secondary + 90};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const SignIn = ({ setOpenAuth }) => {
  const dispatch = useDispatch();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 

  const validateInputs = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    setButtonLoading(true);
    setButtonDisabled(true);

    if (validateInputs()) {
      try {
        const res = await UserSignIn({ email, password });
        dispatch(loginSuccess(res.data));
        setOpenAuth(false);
      } catch (err) {
        alert(err.response?.data?.message || "An error occurred. Please try again.");
      } finally {
        setButtonLoading(false);
        setButtonDisabled(false);
      }
    } else {
      setButtonLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <Container>
      <div>
        <Title>Welcome to Airbnb</Title>
        <Span>Please Login to continue</Span>
      </div>
      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          handleChange={(e) => setEmail(e.target.value)} // Pass handleChange correctly
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={password}
          handleChange={(e) => setPassword(e.target.value)} // Pass handleChange correctly
        />
      </div>
      <TextButton>Forgot Password?</TextButton>
      <Button
        text="Sign In"
        isLoading={buttonLoading}
        isDisabled={buttonDisabled}
        onClick={handleSignIn}
      />
    </Container>
  );
};

export default SignIn;