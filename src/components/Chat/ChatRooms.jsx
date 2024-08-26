// src/components/ChatRooms.jsx
import  { useEffect, useState } from 'react';
import { fetchChatRooms } from '../../ChatServices';

const ChatRooms = ({ onSelectRoom }) => {
    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        async function loadChatRooms() {
            const rooms = await fetchChatRooms();
            setChatRooms(rooms);
        }

        loadChatRooms();
    }, []);

    return (
        <div className="chat-rooms">
            <h3>Chat Rooms</h3>
            <ul>
                {chatRooms.map(room => (
                    <li key={room.id} onClick={() => onSelectRoom(room.id)}>
                        {room.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatRooms;
