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

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.list); // Get the list of favorite properties from Redux store

  return (
    <FavoritesContainer>
      <FavoritesHeading>Your Favorites</FavoritesHeading>
      {favorites && favorites.length === 0 ? (
        <NoFavoritesMessage>You have no favorites yet!</NoFavoritesMessage>
      ) : (
        favorites.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))
      )}
    </FavoritesContainer>
  );
};

export default Favorites;
