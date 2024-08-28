import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ExtractIdFromToken from '@/services/ExtractIdFromToken'; // 토큰에서 사용자 ID를 추출하는 유틸리티
import { getUserId } from '@/services/UserService'; // 현재 사용자의 인덱스를 받아오는 서비스 함수

const CreateChatRoom = () => {
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('jwtToken');
    const extractedUserId = ExtractIdFromToken(token);

    useEffect(() => {
        if (token && extractedUserId) {
            // ExtractIdFromToken으로 추출한 userId로 실제 인덱스 받아오기
            getUserId(extractedUserId)
                .then(response => {
                    const currentUserId = response.data; // 실제 인덱스 값
                    return axios.get(`http://localhost:8081/api/user/${currentUserId}/following`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}` // 올바른 형식의 Authorization 헤더 추가
                        }
                    });
                })
                .then(response => {
                    setFriends(response.data);
                })
                .catch(error => {
                    console.error('Error fetching following list:', error);
                    setFriends([]);
                });
        } else {
            console.error("No token or invalid user ID");
        }
    }, [token, extractedUserId]);

    const handleCreateRoom = () => {
        if (selectedFriend) {
            getUserId(extractedUserId)
                .then(response => {
                    const currentUserId = response.data; // 현재 사용자의 실제 인덱스 값
                    console.log('Making a POST request to /api/chat/rooms');
                    return axios.post('/api/chat/rooms', 
                        { users: [currentUserId, selectedFriend] }, 
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                })
                .then(response => navigate(`/chat/${response.data.id}`))
                .catch(error => {
                    console.error('Error creating chat room:', error);
                });
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
