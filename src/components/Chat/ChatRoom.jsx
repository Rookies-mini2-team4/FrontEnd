import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import ExtractIdFromToken from '@/services/ExtractIdFromToken';
import axios from 'axios';
import '@/styles/ChatRoom.css'; // CSS 파일 임포트

const ChatRoom = ({ chatRoomId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [recipient, setRecipientId] = useState(null);
    const stompClientRef = useRef(null);
    const token = localStorage.getItem('jwtToken');
    const sender = ExtractIdFromToken(token); // 현재 사용자 ID

    useEffect(() => {
        const connectWebSocket = () => {
            const socket = new SockJS('http://localhost:8081/ws');
            const stompClient = Stomp.over(socket);
            stompClientRef.current = stompClient;

            stompClient.connect({}, () => {
                console.log('Web Socket Opened...');
                stompClient.subscribe(`/topic/messages/${chatRoomId}`, (message) => {
                    console.log('Message received:', message.body);
                    setMessages(prevMessages => [...prevMessages, JSON.parse(message.body)]);
                });
            }, (error) => {
                console.error('WebSocket connection error:', error);
            });
        };

        const fetchRecipientId = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/chat/${chatRoomId}/recipient`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                setRecipientId(response.data.recipientId);
            } catch (error) {
                console.error('Error fetching recipient ID:', error);
            }
        };

        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/chat/messages/${chatRoomId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        connectWebSocket();
        fetchRecipientId();
        fetchMessages();

        return () => {
            if (stompClientRef.current && stompClientRef.current.connected) {
                stompClientRef.current.disconnect(() => {
                    console.log('Web Socket Closed...');
                });
            }
        };
    }, [chatRoomId, token]);

    const sendMessage = () => {
        if (stompClientRef.current && stompClientRef.current.connected) {
            if (newMessage.trim() !== '' && recipient !== null) {
                const message = {
                    chatRoom: { id: Number(chatRoomId) },
                    sender: { id: Number(sender) },
                    recipient: { id: Number(recipient) },
                    content: newMessage,
                    timestamp: new Date(),
                };

                console.log("Sending message:", message);

                stompClientRef.current.send(`/app/chat.sendMessage`, {}, JSON.stringify(message));

                setMessages(prevMessages => [...prevMessages, message]);

                setNewMessage('');
            } else {
                if (newMessage.trim() === '') {
                    console.error("Message is empty.");
                }
                if (recipient === null) {
                    console.error("No recipient selected.");
                }
            }
        } else {
            console.error("WebSocket is not connected.");
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="chat-container">
            {messages.map((msg, index) => (
                <div 
                    key={index}
                    className={`message ${msg.sender.id === sender ? 'my-message' : 'other-message'}`}
                >
                    <div className="message-content">
                        <strong>{msg.sender.id}:</strong> {msg.content}
                    </div>
                </div>
            ))}
            <div className="input-container">
                <input 
                    className="text-input"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown} // onKeyPress를 onKeyDown으로 변경
                    placeholder="메시지 입력..."
                    autoFocus
                />
                <button className="send-button" onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

ChatRoom.propTypes = {
    chatRoomId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

export default ChatRoom;
