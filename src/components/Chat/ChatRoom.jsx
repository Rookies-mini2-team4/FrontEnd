import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const ChatRoom = ({ chatRoomId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const stompClientRef = useRef(null);

    useEffect(() => {
        // WebSocket 연결 설정
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(socket);
        stompClientRef.current = stompClient;

        stompClient.connect({}, () => {
            console.log('Web Socket Opened...');
            // 특정 채팅방의 메시지 구독
            stompClient.subscribe(`/topic/messages/${chatRoomId}`, (message) => {
                setMessages(prevMessages => [...prevMessages, JSON.parse(message.body)]);
            });
        });

        return () => {
            if (stompClientRef.current && stompClientRef.current.connected) {
                stompClientRef.current.disconnect(() => {
                    console.log('Web Socket Closed...');
                });
            }
        };
    }, [chatRoomId]);

    const sendMessage = () => {
        if (stompClientRef.current && stompClientRef.current.connected && newMessage.trim() !== '') {
            const message = {
                chatRoomId: chatRoomId,
                senderId: 1, // 실제 사용자 ID로 대체
                content: newMessage,
                timestamp: new Date(),
            };
            stompClientRef.current.send(`/app/chat.sendMessage`, {}, JSON.stringify(message));
            setNewMessage('');
        } else {
            console.error("WebSocket is not connected or message is empty.");
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.senderId}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <input 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="메시지 입력..."
                autoFocus
            />
            <button onClick={sendMessage}>전송</button>
        </div>
    );
};

export default ChatRoom;
