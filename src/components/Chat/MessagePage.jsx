import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';

const MessagePage = () => {
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken'); // JWT 토큰을 로컬 스토리지에서 가져옴

    const stompClient = new Client({
      brokerURL: 'ws://localhost:3000/ws', // WebSocket URL
      connectHeaders: {
        Authorization: `Bearer ${token}`, // JWT 토큰을 Authorization 헤더에 추가
      },
      debug: function (str) {
        console.log('STOMP Debug:', str);
      },
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('Connected to WebSocket');
        stompClient.subscribe('/topic/messages', (message) => {
          console.log('Received Message:', message.body);
          setMessages((prevMessages) => [...prevMessages, JSON.parse(message.body)]);
        });
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame);
      },
      onWebSocketClose: () => {
        console.log('WebSocket connection closed');
      },
      onWebSocketError: (error) => {
        console.error('WebSocket error:', error);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      if (client && client.connected) {
        client.deactivate();
      }
    };
  }, [client]);

  const sendMessage = (message) => {
    if (client && client.connected) {
      client.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify({ content: message }),
      });
    }
  };

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.content}</li>
        ))}
      </ul>
      <button onClick={() => sendMessage('Hello!')}>Send Message</button>
    </div>
  );
};

export default MessagePage;
