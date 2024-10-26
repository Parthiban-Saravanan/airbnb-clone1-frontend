/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import { FavoriteBorder, MenuRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import LogoImg from "../utils/Images/Logo.png";
import { logout } from "../redux/reducers/userSlice";
import Contact from '../pages/Contact'; // Import the Contact page
import Blog from '../pages/Blog'; // Import the Blog page

const Nav = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;

const NavLogo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 6px;
  font-weight: 500;
  font-size: 18px;
  text-decoration: none;
  gap: 12px;
`;

const Logo = styled.img`
  height: 40px;
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Navlink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.white};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease-in;
  text-decoration: none;

  &:hover {
    border-bottom: 1.8px solid ${({ theme }) => theme.primary};
  }

  &.active {
    color: ${({ theme }) => theme.white};
    border-bottom: 1.8px solid ${({ theme }) => theme.white};
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 28px;
  align-items: center;
  padding: 0 6px;
  color: ${({ theme }) => theme.text_primary};

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MobileIcon = styled.div`
  color: ${({ theme }) => theme.text_primary};
 display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const MobileMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  padding: 0 6px;
  list-style: none;
  width: 80%;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) => theme.card_light};
  position: absolute;
  top: 80px;
  right: 0;
  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-100%)")};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
  color: #D5006D; /* Dark pink color */
`;

const MobileIcons = styled.div`
  color: ${({ theme }) => theme.white};
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }
`;

const TextButton = styled.div`
  text-align: end;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Navbar = ({ setOpenAuth, openAuth, currentUser }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav>
      <NavbarContainer>
        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded style={{ color: "inherit" }} />
        </MobileIcon>

        <NavLogo>
          <Logo src={LogoImg} />
        </NavLogo>

        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <Navlink to="/" onClick={() => setIsOpen(!isOpen)}>
              Home
            </Navlink>
            <Navlink to="/properties" onClick={() => setIsOpen(!isOpen)}>
              Places to stay
            </Navlink>
            <Navlink to="/contact" onClick={() => setIsOpen(!isOpen)}>
              Contact
            </Navlink>
            <Navlink to="/blog" onClick={() => setIsOpen(!isOpen)}>
              Blogs
            </Navlink>
            {currentUser ? (
              <Button text="Logout" small onClick={handleLogout} />
            ) : (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  gap: "12px",
                }}
              >
                <Button type="secondary" text="SignUp" small onClick={() => setOpenAuth(!openAuth)} />
                <Button text="SignIn" small onClick={() => setOpenAuth(!openAuth)} />
              </div>
            )}
          </MobileMenu>
        )}
        <NavItems>
          <Navlink to="/">Home</Navlink>
          <Navlink to="/properties">Place to stay</Navlink>
          <Navlink to="/contact">Contact</Navlink>
          <Navlink to="/blog">Blog</Navlink>
        </NavItems>

        <MobileIcons>
          {currentUser && (
            <>
              <NavLink to="/favorite">
                <FavoriteBorder sx={{ color: "inherit", fontSize: "28px" }} />
              </NavLink>
              <Avatar
                src={currentUser?.img}
                sx={{
                  color: "inherit",
                  fontSize: "28px",
                }}
              >
                {currentUser?.name[0]}
              </Avatar>
            </>
          )}
        </MobileIcons>

        <ButtonContainer>
          {currentUser ? (
            <>
              <NavLink to="/favorite">
                <FavoriteBorder sx={{ color: "inherit", fontSize: "28px" }} />
              </NavLink>
              <Avatar
                src={currentUser?.img}
                sx={{
                  color: "inherit",
                  fontSize: "28px",
                }}
              >
                {currentUser?.name[0]}
              </Avatar>
              <TextButton onClick={handleLogout}>Logout</TextButton>
            </>
          ) : (
            <Button type="secondary" text="SignIn" small onClick={() => setOpenAuth(!openAuth)} />
          )}
        </ButtonContainer>
      </NavbarContainer>
    </nav>
  );
};

export default Navbar;