import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi there! Welcome to RentTheTrend. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/chatbot', { message: input });
      setMessages([...messages, { sender: 'user', text: input }, { sender: 'bot', text: response.data.response }]);
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  return (
    <div style={{
      position: 'fixed',
      bottom: '120px', // Raised the chatbot to avoid overlapping with the footer
      right: '20px',
      width: '300px',
      height: '400px',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 999,  // Ensure the chatbot stays above other elements
    }}>
      <div style={{
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px',
        textAlign: 'center',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px'
      }}>
        <h4 style={{ margin: 0 }}>RentTheTrend Assistant</h4>
      </div>
      <div style={{
        flexGrow: 1,
        padding: '10px',
        overflowY: 'auto',
      }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender === 'user' ? '#007bff' : '#f1f1f1',
              color: msg.sender === 'user' ? 'white' : 'black',
              padding: '8px 12px',
              borderRadius: '20px',
              marginBottom: '8px',
              maxWidth: '70%',
              wordBreak: 'break-word',
            }}>
            {msg.text}
          </div>
        ))}
      </div>
      <div style={{
        display: 'flex',
        padding: '10px',
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flexGrow: 1,
            padding: '8px',
            borderRadius: '20px',
            border: '1px solid #ccc',
            marginRight: '8px',
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '20px',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
