import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap to the next line */
  gap: 20px; /* Space between blog posts */
`;

const Title = styled.h1`
  width: 100%; /* Full width for the title */
  font-size: 24px;
  margin-bottom: 20px;
`;

const BlogPost = styled.div`
  flex: 1 1 250px; /* Flex-grow, flex-shrink, flex-basis */
  padding: 15px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  display: flex;
  flex-direction: column; /* Stack content vertically */
  
  h2 {
    font-size: 20px;
    color: ${({ theme }) => theme.primary}; /* Attractive color for the title */
    margin-bottom: 10px;
  }

  img {
    width: 50%; /* Full width of the blog post */
    border-radius: 8px;
    margin-bottom: 10px;
    height: auto; /* Maintain aspect ratio */
  }

  p {
    color: ${({ theme }) => theme.text_secondary}; /* Complementary color for content */
    line-height: 1.5; /* Improved readability */
    font-size: 14px; /* Smaller font size for content */
  }
`;

const Blog = () => {
  const posts = [
    {
      title: "Exploring Paris with Airbnb",
      img: "https://i.ytimg.com/vi/-tUbPMhhGR4/maxresdefault.jpg",
      content: "I had a wonderful experience staying in a cozy apartment in the heart of Paris. The location was perfect, and I could easily walk to all the major attractions."
    },
    {
      title: "A Beach Getaway in Bali",
      img: "https://a0.muscache.com/im/pictures/64c7dfb4-1632-4f3f-a3d7-6c887844bcdc.jpg?aki_policy=large",
      content: "Bali was an unforgettable experience. The villa we rented had stunning views and was close to the beach. I highly recommend visiting!"
    }
  ];

  return (
    <Container>
      <Title>Our Blog</Title>
      {posts.map((post, index) => (
        <BlogPost key={index}>
          <h2>{post.title}</h2>
          <img src={post.img} alt={post.title} />
          <p>{post.content}</p>
        </BlogPost>
      ))}
    </Container>
  );
};

export default Blog;