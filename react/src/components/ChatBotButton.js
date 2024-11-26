import React, { useState, useEffect } from 'react';
import ChatBot from './ChatBot';

const ChatBotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // Show alert when component mounts
  useEffect(() => {
    setShowAlert(true); // Show alert immediately
    const timer = setTimeout(() => {
      setShowAlert(false); // Hide alert after 5 seconds
    }, 5000); // Adjust duration as needed

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const toggleChatBot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* The alert bubble */}
      {showAlert && (
        <div style={{
          position: 'fixed',
          bottom: '90px', // Adjust position above the button
          right: '20px',
          backgroundColor: '#ffeb3b', // Yellow background for visibility
          padding: '10px',
          borderRadius: '5px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          zIndex: 1001, // Ensure it stays above other elements
        }}>
          Hey! It's me, RentTheTrend Assistant. How can I help you?
        </div>
      )}

      {/* The chatbot window itself */}
      {isOpen && <ChatBot />}

      {/* The button that toggles the chatbot */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          backgroundColor: '#007bff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          zIndex: 1000,
        }}
        onClick={toggleChatBot}
      >
        <i style={{ fontSize: '24px', color: 'white' }}>💬</i>
      </div>
    </>
  );
};

export default ChatBotButton;