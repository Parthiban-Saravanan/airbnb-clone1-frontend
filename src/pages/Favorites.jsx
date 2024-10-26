import React from 'react';
import { useSelector } from 'react-redux';
import PropertyCard from '../componnents/Cards/PropertyCard';
import styled from 'styled-components';

const FavoritesContainer = styled.div`
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
`;

const FavoritesHeading = styled.h2`
  margin-bottom: 30px;
  text-align: center;
`;

const NoFavoritesMessage = styled.p`
  font-size: 18px;
  color: #999;
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

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.list);

  return (
    <FavoritesContainer>
      <FavoritesHeading>Your Favorites</FavoritesHeading>
      {favorites && favorites.length === 0 ? (
        <NoFavoritesMessage>You have no favorites yet!</NoFavoritesMessage>
      ) : (
        favorites.map((property) => (
          <PropertyCard key={property._id} property={property}>
          <Title>{property?.title}</Title>
          <Desc>{property?.desc}</Desc>
          <Location>{property?.location}</Location>
          <Price>
            ${property?.price?.org}
            <Strike>${property?.price?.mrp}</Strike>
            <Percent>{property?.price?.off}% Off</Percent>
          </Price>
          </PropertyCard>
        ))
      )}
    </FavoritesContainer>
  );
};

export default Favorites;
