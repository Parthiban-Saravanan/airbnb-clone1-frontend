import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput"; 
import Button from "./Button"; 
import { UserSignUp } from "../api"; 
import { useDispatch } from "react-redux"; 
import { loginSuccess } from "../redux/reducers/userSlice";

const Container = styled.div`
  width: 100%;
  max-width : 500px;
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

const Signup = ({ setOpenAuth }) => {
  const dispatch = useDispatch();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 

  const validateInputs = () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    setButtonLoading(true);
    setButtonDisabled(true);

    if (validateInputs()) {
      try {
        const res = await UserSignUp({ name, email, password });
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
        <Title>Create an Account</Title>
        <Span>Please fill in the details to create an account</Span>
      </div>
      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          handleChange={(e) => setName(e.target.value)} // Pass handleChange correctly
        />
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
      <Button
        text="Sign Up"
        isLoading={buttonLoading}
        isDisabled={buttonDisabled}
        onClick={handleSignUp}
      />
    </Container>
  );
};

export default Signup;