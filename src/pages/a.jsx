import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ExtractIdFromToken from '@/services/ExtractIdFromToken'; // 토큰에서 사용자 ID를 추출하는 유틸리티

const CreateChatRoom = () => {
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('jwtToken');
    const currentUserId = ExtractIdFromToken(token);

    useEffect(() => {
        if (token && currentUserId) {
            axios.get(`http://localhost:8081/api/user/${currentUserId}/following`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` // 올바른 형식의 Authorization 헤더 추가
                }
            })
            .then((response) => {
                setFriends(response.data);
            })
            .catch((error) => {
                console.error('Error fetching following list:', error);
                setFriends([]);
            });
        } else {
            console.error("No token or invalid user ID");
        }
    }, [currentUserId, token]);

    const handleCreateRoom = () => {
        if (selectedFriend) {
            axios.post('/api/chat/room', { users: [selectedFriend] }, {
                headers: {
                    Authorization: `Bearer ${token}` // 토큰을 추가해 인증 문제를 방지
                }
            })
            .then(response => navigate(`/chat/${response.data.id}`))
            .catch(error => console.error('Error creating chat room:', error));
        }
    };

    return (
        <div>
            <h2>Create Chat Room</h2>
            <select onChange={(e) => setSelectedFriend(e.target.value)}>
                <option value="">Select a friend</option>
                {friends.map(friend => (
                    <option key={friend.followingId} value={friend.followingId}>
                        {friend.followingUserName}
                    </option>
                ))}
            </select>
            <button onClick={handleCreateRoom} disabled={!selectedFriend}>
                Create Room
            </button>
        </div>
    );
};

export default CreateChatRoom;
