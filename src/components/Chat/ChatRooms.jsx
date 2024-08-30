import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '@/styles/ChatRooms.css'; // CSS 파일 임포트
import ChatRoomItem from '@/components/Chat/ChatRoomItem.jsx'; // ChatRoomItem 컴포넌트 임포트

const ChatRooms = () => {
    const [chatRooms, setChatRooms] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('jwtToken');
    const REST_API_BASE_URL = import.meta.env.VITE_API_URL;
    const REST_API_URL = `${REST_API_BASE_URL}/chat`;

    useEffect(() => {
        if (token) {
            axios.get(`${REST_API_URL}/rooms`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setChatRooms(response.data);
            })
            .catch(error => {
                console.error('Error fetching chat rooms:', error);
            });
        }
    }, [token]);

    const handleChatRoomClick = (chatRoomId) => {
        navigate(`/chat/${chatRoomId}`);
    };

    const handleCreateRoom = () => {
        navigate('/chat/room');
    };

    return (
        <div className="chat-container">
            <div className="chat-room-list">
                <h2>Chat Rooms</h2>
                <button className="create-room-button" onClick={handleCreateRoom}>Create Chat Room</button>
                <ul>
                    {chatRooms && chatRooms.map(room => (
                        <li key={room.id}>
                            <ChatRoomItem room={room} onClick={() => handleChatRoomClick(room.id)} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ChatRooms;
