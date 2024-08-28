import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChatRooms = () => {
    const [chatRooms, setChatRooms] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('jwtToken');

    useEffect(() => {
        if (token) {
            axios.get('http://localhost:8081/api/chat/rooms', {
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

    const handleCreateRoom = () => {
        navigate('/create-room'); // 새로운 채팅방을 생성하는 페이지로 이동
    };

    return (
        <div>
            <h2>Chat Rooms</h2>
            <button onClick={handleCreateRoom}>Create New Room</button>
            <ul>
                {chatRooms.map(room => (
                    <li key={room.id} onClick={() => navigate(`/chat/${room.id}`)}>
                        {room.name || `Room ${room.id}`}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatRooms;
