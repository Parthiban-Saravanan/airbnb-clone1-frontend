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
  text-align: center; /* Center the title */
`;

const BlogPost = styled.div`
  flex: 1 1 250px; /* Flex-grow, flex-shrink, flex-basis */
  padding: 15px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.9); /* Slightly more opaque white */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15); /* Enhanced shadow for depth */
  display: flex;
  flex-direction: column; /* Stack content vertically */
  transition: transform 0.3s, box-shadow 0.3s; /* Transition for hover effects */

  &:hover {
    transform: translateY(-5px); /* Lift effect on hover */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); /* Deeper shadow on hover */
  }

  h2 {
    font-size: 20px;
    color: ${({ theme }) => theme.primary}; /* Attractive color for the title */
    margin-bottom: 10px;
  }

  img {
    width: 100%; /* Full width of the blog post */
    border-radius: 8px;
    border: 2px solid ${({ theme }) => theme.primary}; /* Stylish border */
    margin-bottom: 10px;
    height: auto; /* Maintain aspect ratio */
    transition: transform 0.3s; /* Transition for image hover effect */

    &:hover {
      transform: scale(1.05); /* Slight zoom effect on hover */
    }
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
    },
    {
      title: "Cultural Insights from Tokyo",
      img: "https://www.expat.com/upload/guide/1551272648-culture-in-tokyo-news_item_slider-t1551272648.jpg",
      content: "Tokyo is a city that beautifully blends tradition and modernity. From ancient temples to bustling streets, every corner has a story to tell."
    },
    {
      title: "Adventure in the Swiss Alps",
      img: "https://www.swissmountainguide.com/content/files/uploads/2017/02/IMG_4159.jpg",
      content: "The Swiss Alps offer breathtaking views and exhilarating activities. Hiking and skiing here are experiences of a lifetime!"
    },
    {
      title: "Exploring the Markets of Marrakech",
      img: "https://th.bing.com/th/id/R.88d78e5910261261704cb06dba97cc70?rik=iYRqS380MW3y7g&riu=http%3a%2f%2fhookedoneverything.com%2fwp-content%2fuploads%2f2015%2f10%2f47.jpg&ehk=H4QjrwhEHI%2f1p%2bAsYExQX6n9MtygwVAY9DM7ZLlkfZI%3d&risl=&pid=ImgRaw&r=0",
      content: "Marrakech is a feast for the senses. The vibrant markets, delicious food, and rich culture are truly captivating."
    },
    {
      title: "A Culinary Journey through Italy",
      img: "https://2.bp.blogspot.com/-Lu4-i0R1QUU/W99cXbAMGLI/AAAAAAAAQZQ/7m3X9vrXynkZy0TRMT2wcdXu-ItqFGQuQCLcBGAs/w1200-h630-p-k-no-nu/ngogeobktsti_f2c40805-51af-4ac6-bc57-877d32cec241_1024x1024.jpg",
      content: "Italy is known for its incredible cuisine. From pasta to pizza, every dish tells a story of tradition and passion."
    }
  ];

  return (
    <Container >
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
