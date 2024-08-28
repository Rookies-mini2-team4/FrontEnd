import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateChatRoom = () => {
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('jwtToken');
    
    // 친구 목록을 가져오는 로직
    useEffect(() => {
        if (token) {
            axios.get('http://localhost:8081/api/user/following', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setFriends(response.data);
            })
            .catch(error => {
                console.error('Error fetching following list:', error);
            });
        }
    }, [token]);

    // 방 생성 요청
    const handleCreateRoom = () => {
        if (selectedFriend) {
            axios.post('http://localhost:8081/api/chat/room', 
                { users: [selectedFriend] },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then(response => {
                const roomId = response.data.id; // 생성된 방의 ID
                navigate(`/chat/${roomId}`); // 방으로 이동
            })
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
                    <option key={friend.id} value={friend.id}>
                        {friend.userName}
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

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ChatRooms = () => {
//     const [chatRooms, setChatRooms] = useState([]);
//     const navigate = useNavigate();
//     const token = localStorage.getItem('jwtToken');

//     useEffect(() => {
//         if (token) {
//             axios.get('http://localhost:8081/api/chat/rooms', {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`
//                 }
//             })
//             .then(response => {
//                 setChatRooms(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching chat rooms:', error);
//             });
//         }
//     }, [token]);

//     const handleCreateRoom = () => {
//         navigate('/create-room'); // 새로운 채팅방을 생성하는 페이지로 이동
//     };

//     return (
//         <div>
//             <h2>Chat Rooms</h2>
//             <button onClick={handleCreateRoom}>Create New Room</button>
//             <ul>
//                 {chatRooms.map(room => (
//                     <li key={room.id} onClick={() => navigate(`/chat/${room.id}`)}>
//                         {room.name || `Room ${room.id}`}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default ChatRooms;

// // import { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';

// // const ChatRooms = () => {
// //     const [chatRooms, setChatRooms] = useState([]);
// //     const navigate = useNavigate();
// //     const token = localStorage.getItem('jwtToken');

// //     useEffect(() => {
// //         if (token) {
// //             axios.get('http://localhost:8081/api/chat/rooms', {
// //                 headers: {
// //                     "Content-Type": "application/json",
// //                     Authorization: `Bearer ${token}`
// //                 }
// //             })
// //             .then(response => {
// //                 setChatRooms(response.data);
// //             })
// //             .catch(error => {
// //                 console.error('Error fetching chat rooms:', error);
// //             });
// //         }
// //     }, [token]);

// //     const handleCreateRoom = () => {
// //         navigate('/create-room'); // 새로운 채팅방을 생성하는 페이지로 이동
// //     };

// //     return (
// //         <div>
// //             <h2>Chat Rooms</h2>
// //             <button onClick={handleCreateRoom}>Create New Room</button>
// //             <ul>
// //                 {chatRooms.map(room => (
// //                     <li key={room.id} onClick={() => navigate(`/chat/${room.id}`)}>
// //                         {room.name || `Room ${room.id}`}
// //                     </li>
// //                 ))}
// //             </ul>
// //         </div>
// //     );
// // };

// // export default ChatRooms;
