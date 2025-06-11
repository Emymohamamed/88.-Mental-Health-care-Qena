import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Chat.css';

function Chat() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! 👋 Let\'s start!' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // دالة لإرسال الرسالة إلى Flask API
  const sendMessageToAPI = async (userMessage) => {
    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error calling API:', error);
      return 'Sorry, I\'m having trouble connecting right now. Please try again later.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      const userMessage = input.trim();

      // إضافة رسالة المستخدم
      setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
      setInput('');
      setIsLoading(true);

      try {
        // الحصول على الرد من النموذج
        const botResponse = await sendMessageToAPI(userMessage);

        // إضافة رد البوت
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: botResponse },
        ]);
      } catch (error) {
        console.error('Error:', error);
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: 'Sorry, something went wrong. Please try again.' },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-page">
      <Navbar />
      <div className="container containar_chat">
        <div className="chatbot-container">
          <div className="header">
            <h1>Mental Health Chatbot</h1>
          </div>
          <div className="chatbot">
            <div className="conversation">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chatbot-message ${msg.sender === 'user' ? 'user-message' : ''}`}
                >
                  <p className="chatbot-text">{msg.text}</p>
                </div>
              ))}
              {isLoading && (
                <div className="chatbot-message">
                  <p className="chatbot-text">
                    <span className="typing-indicator">Typing...</span>
                  </p>
                </div>
              )}
            </div>
            <div className="input-form">
              <div className="message-container">
                <input
                  className="input-field"
                  type="text"
                  placeholder="Type your message here"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
                <button
                  className="chat-submit-button"
                  onClick={handleSubmit}
                  disabled={isLoading || !input.trim()}
                >
                  <img
                    className="send-icon"
                    src="/images/send-message.png"
                    alt="Send"
                    style={{ opacity: isLoading ? 0.5 : 1 }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="gif-container">
          <img src="/images/cvid.gif" alt="GIF Animation" className="gif-image" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Chat;