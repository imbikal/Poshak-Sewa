import React from 'react';
import { SliderData } from './SliderData';
import ImageSlider from './ImageSlider';
import './slider.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import ChatBotButton from '../ChatBotButton';  // Import your ChatBotButton component

const Home = () => {
  return (
    <>
      {/* Image Slider Section */}
      <ImageSlider slides={SliderData} />

      {/* Main Hero Section with Text and Get Started Button */}
      <div className="slider-text">
        <h1>RENT THE TREND</h1>
        <h6>Clothes for all</h6>
        <Link to="/register" className="get-started-button">Get started →</Link>
      </div>

      {/* Footer Section */}
      <Footer />

      {/* Fixed Chatbot Button in Bottom-Right Corner */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,  // Ensures chatbot button is on top of other elements
        }}
      >
        <ChatBotButton />  {/* Your ChatBotButton component */}
      </div>
    </>
  );
}

export default Home;
