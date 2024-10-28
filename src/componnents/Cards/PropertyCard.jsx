import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Rating } from "@mui/material";
import styled from "styled-components";
import { FavoriteBorder, FavoriteRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../../redux/reducers/favoritesSlice"; 
import { openSnackbar } from "../../redux/reducers/snackbarSlice";

const CardContainer = styled.div`
  width: 100%;
  max-width: 320px;
  padding: 16px;
`;

const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s ease-out;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.border_color || "#e0e0e0"};
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 220px;
  border-radius: 6px;
  object-fit: cover;
  transition: all 0.3s ease-out;
`;

const Menu = styled.div`
  position: absolute;
  z-index: 10;
  color: ${({ theme }) => theme.text_primary};
  top: 14px;
  right: 14px;
  display: none;
  flex-direction: column;
  gap: 12px;
`;

const MenuItem = styled.div`
  border-radius: 50%;
  width: 28px;
  height: 28px;
  background: white;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Rate = styled.div`
  position: absolute;
  z-index: 10;
  color: ${({ theme }) => theme.text_primary};
  bottom: 8px;
  left: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  background: white;
  display: flex;
  align-items: center;
  opacity: 0.9;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 6px;
  transition: all 0.3s ease-out;

  &:hover {
    background-color: ${({ theme }) => theme.primary};
  }
  &:hover ${Image} {
    opacity: 0.9;
  }
  &:hover ${Menu} {
    display: flex;
  }
`;

const Details = styled.div`
  display: flex;
  gap: 6px;
  flex-direction: column;
  padding: 4px 10px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Location = styled.div`
  width: fit-content;
  font-size: 12px;
  font-weight: 500;
  padding: 2px 10px;
  border-radius: 20px;
  background: ${({ theme }) => theme.disabled + 50};
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Strike = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 60};
  text-decoration: line-through;
  text-decoration-color: ${({ theme }) => theme.text_secondary + 50};
`;

const Percent = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: green;
`;

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const favoriteList = useSelector((state) => state.favorites.list);
  const isFavorite = favoriteList.some((fav) => fav._id === property?._id);

  const toggleFavorite = async () => {
    setFavoriteLoading(true);
    try {
      if (isFavorite) {
        await removeFromFavorites({ propertyId: property?._id });
        dispatch(openSnackbar({ message: "Removed from favorites!", severity: "success" }));
      } else {
        await addToFavorites({ propertyId: property?._id });
        dispatch(openSnackbar({ message: "Added to favorites!", severity: "success" }));
      }
    } catch (error) {
      dispatch(openSnackbar({ message: "Error occurred!", severity: "error" }));
    } finally {
      setFavoriteLoading(false);
    }
  };

  if (!property) {
    return <CircularProgress />;
  }

  return (
    <CardContainer>
      <Card>
        <Top>
          <Image src={property?.img} alt={property?.title || "Property Image"} />
          <Menu>
            <MenuItem onClick={toggleFavorite}>
              {favoriteLoading ? (
                <CircularProgress size={20} />
              ) : isFavorite ? (
                <FavoriteRounded sx={{ fontSize: "20px", color: "red" }} />
              ) : (
                <FavoriteBorder sx={{ fontSize: "20px" }} />
              )}
            </MenuItem>
          </Menu>
          <Rate>
            <Rating value={property?.rating} precision={0.5} readOnly sx={{ fontSize: "14px" }} />
          </Rate>
        </Top>
        <Details onClick={() => navigate(`/properties/${property?._id}`)}>
          <Title>{property?.title}</Title>
          <Desc>{property?.desc}</Desc>
          <Location>{property?.location}</Location>
          <Price>
            ${property?.price?.org}
            <Strike>${property?.price?.mrp}</Strike>
            <Percent>{property?.price?.off}% Off</Percent>
          </Price>
        </Details>
      </Card>
    </CardContainer>
  );
};

export default PropertyCard;
