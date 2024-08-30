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
    const REST_API_BASE_URL = import.meta.env.VITE_API_URL;
    const REST_API_URL = `${REST_API_BASE_URL}/chat`;
    console.log("messages" , messages);
    const styles = {
        chatContainer: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            padding: '20px',
            border: '1px solid #ccc',
            backgroundColor: '#f9f9f9',
            overflowY: 'auto', // 내용이 많을 경우 스크롤 가능하게
        },
        message: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
            padding: '10px',
            borderRadius: '5px',
            maxWidth: '60%',
        },
        profileImage: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
        },
        myMessage: {
            backgroundColor: '#d1e7dd', // 현재 사용자 메시지 색상
            alignSelf: 'flex-end', // 오른쪽 정렬
            flexDirection: 'row-reverse', // 프로필 이미지와 메시지의 위치를 반대로
        },
        otherMessage: {
            backgroundColor: '#f8d7da', // 다른 사용자 메시지 색상
            alignSelf: 'flex-start', // 왼쪽 정렬
        },
        myMessageProfileImage: {
            marginLeft: '10px', // 오른쪽 메시지에서 이미지가 왼쪽으로 가도록 설정
        },
        otherMessageProfileImage: {
            marginRight: '10px', // 왼쪽 메시지에서 이미지가 오른쪽으로 가도록 설정
        },
        messageContent: {
            display: 'flex',
            flexDirection: 'column',
        },
        textInput: {
            width: 'calc(100% - 60px)',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
        },
        sendButton: {
            width: '50px',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer',
        },
        sendButtonHover: {
            backgroundColor: '#0056b3',
        },
    };

    useEffect(() => {
        const connectWebSocket = () => {
            if (stompClientRef.current && stompClientRef.current.connected) {
                // 이미 연결된 경우 중복 연결 방지
                console.log("WebSocket is already connected.");
                return;
            }

            const socket = new SockJS('http://localhost:8080/ws');
            const stompClient = Stomp.over(socket);
            stompClientRef.current = stompClient;

            stompClient.connect({}, () => {
                console.log('Web Socket Opened...');
                stompClient.subscribe(`http://localhost:8080/topic/messages/${chatRoomId}`, (message) => {
                    console.log('Message received:', message.body);
                    setMessages(prevMessages => [...prevMessages, JSON.parse(message.body)]);
                });
            }, (error) => {
                console.error('WebSocket connection error:', error);
            });
        };

        const fetchRecipientId = async () => {
            try {
                const response = await axios.get(`${REST_API_URL}/${chatRoomId}/recipient`, {
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
                const response = await axios.get(`${REST_API_URL}/messages/${chatRoomId}`, {
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
                    sender: { id: sender },
                    recipient: { id: recipient },
                    content: newMessage,
                    timestamp: new Date(),
                };

                console.log("Sending message:", message);

                stompClientRef.current.send(`app/chat.sendMessage`, {}, JSON.stringify(message));

                // 메시지를 즉시 상태에 반영하여 사용자 경험 개선
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

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div style={styles.chatContainer}>
            {messages.map((msg, index) => (
                <div
                    key={index}
                    style={{
                        ...styles.message,
                        ...(msg.sender.id === sender ? styles.myMessage : styles.otherMessage),
                    }}
                >
                    <img
                        src={msg.sender.profileImageUrl || 'default-profile.png'}
                        alt="Profile"
                        style={{
                            ...styles.profileImage,
                            ...(msg.sender.id === sender ? styles.myMessageProfileImage : styles.otherMessageProfileImage),
                        }}
                    />
                    <div style={styles.messageContent}>
                        <strong>{msg.sender.id}:</strong> {msg.content}
                    </div>
                </div>
            ))}
            <div style={styles.inputContainer}>
                <input
                    style={styles.textInput}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="메시지 입력..."
                    autoFocus
                />
                <button
                    style={styles.sendButton}
                    onMouseOver={(e) => (e.target.style.backgroundColor = styles.sendButtonHover.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = styles.sendButton.backgroundColor)}
                    onClick={sendMessage}
                >
                    Send
                </button>
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
