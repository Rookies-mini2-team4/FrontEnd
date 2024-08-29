// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import ExtractIdFromToken from '@/services/ExtractIdFromToken'; // 토큰에서 사용자 ID를 추출하는 유틸리티
// import { getUserId } from '@/services/UserService'; // 현재 사용자의 인덱스를 받아오는 서비스 함수

// const CreateChatRoom = () => {
//     const [friends, setFriends] = useState([]);
//     const [selectedFriend, setSelectedFriend] = useState(null);
//     const [userId, setUserId] = useState(null); // 사용자 id를 저장할 상태
//     const navigate = useNavigate();
//     const token = localStorage.getItem('jwtToken');
//     const extractedUserId = ExtractIdFromToken(token);

//     useEffect(() => {
//         if (token && extractedUserId) {
//             getUserId(extractedUserId)
//                 .then(response => {
//                     setUserId(response.data); // 실제 인덱스 값을 설정
//                     return axios.get(`http://localhost:8081/api/user/${response.data}/following`, {
//                         headers: {
//                             "Content-Type": "application/json",
//                             Authorization: `Bearer ${token}` // 올바른 형식의 Authorization 헤더 추가
//                         }
//                     });
//                 })
//                 .then(response => {
//                     setFriends(response.data);
//                 })
//                 .catch(error => {
//                     console.error('Error fetching following list:', error);
//                     setFriends([]);
//                 });
//         } else {
//             console.error("No token or invalid user ID");
//         }
//     }, [token, extractedUserId]);

//     const handleCreateRoom = () => {
//         if (selectedFriend && userId) {
//             const users = [userId, selectedFriend]; // 현재 사용자와 선택된 친구의 실제 ID를 함께 보냄
    
//             axios.post('http://localhost:8081/api/chat/room', 
//                 { 
//                     users: users // 선택한 사용자와 본인을 포함한 ID 배열을 서버로 전송
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             )
//             .then(response => {
//                 const roomId = response.data.id; // 생성된 방의 ID
//                 navigate(`/chat/${roomId}`); // 방으로 이동
//             })
//             .catch(error => {
//                 console.error('Error creating chat room:', error);
//             });
//         } else {
//             alert("Please select a friend to create a chat room.");
//         }
//     };

//     return (
//         <div>
//             <h2>Create Chat Room</h2>
//             <select onChange={(e) => setSelectedFriend(parseInt(e.target.value))}>
//                 <option value="">Select a friend</option>
//                 {friends.map(friend => (
//                     <option key={friend.id} value={friend.id}>
//                         {friend.followingUserName}
//                     </option>
//                 ))}
//             </select>
//             <button onClick={handleCreateRoom} disabled={!selectedFriend}>
//                 Create Room
//             </button>
//         </div>
//     );
// };

// export default CreateChatRoom;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ExtractIdFromToken from '@/services/ExtractIdFromToken'; // 토큰에서 사용자 ID를 추출하는 유틸리티
import { getUserId, getFollowing } from '@/services/UserService'; // 서비스 함수 경로 확인

const CreateChatRoom = () => {
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null); // 선택된 친구의 ID를 저장
    const [userId, setUserId] = useState(null); // 사용자 ID를 저장할 상태
    const navigate = useNavigate();
    const token = localStorage.getItem('jwtToken');
    const extractedUserId = ExtractIdFromToken(token);

    useEffect(() => {
        if (token && extractedUserId) {
            getUserId(extractedUserId)
                .then(response => {
                    const currentUserId = response.data; // 현재 사용자 ID
                    setUserId(currentUserId);
                    return getFollowing(currentUserId); // 사용자 ID를 사용하여 팔로잉 목록 가져오기
                })
                .then(response => {
                    console.log('Fetched friends:', response.data); // 데이터 확인
                    setFriends(response.data); // 친구 목록 설정
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
        console.log('Selected Friend ID:', selectedFriend); // 확인
        console.log('Current User ID:', userId); // 확인
        if (selectedFriend && userId) {
            const users = [userId, selectedFriend];

            axios.post('http://localhost:8081/api/chat/room', 
                { 
                    users: users
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then(response => {
                const roomId = response.data.id;
                navigate(`/chat/${roomId}`); // 새로 생성된 방으로 이동
            })
            .catch(error => {
                console.error('Error creating chat room:', error);
            });
        } else {
            alert("Please select a friend to create a chat room.");
        }
    };

    return (
        <div>
            <h2>Create Chat Room</h2>
            <select onChange={(e) => setSelectedFriend(Number(e.target.value))}>
                <option value="">Select a friend</option>
                {friends.map(friend => (
                    <option key={friend.id} value={friend.followingId}>
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
