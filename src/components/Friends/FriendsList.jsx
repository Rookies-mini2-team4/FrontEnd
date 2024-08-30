import { useState, useEffect } from 'react';

const FriendsList = ({ userId , setFriends}) => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        fetch(`/user/${userId}/friends`)
            .then(response => response.json())
            .then(data => setFriends(data));
    }, [userId]);

    return (
        <div>
            <h3>Friends List</h3>
            <ul>
                {friends.map(friend => (
                    <li key={friend.id}>
                        <img src={friend.profileImage} alt={`${friend.userName}'s profile`} />
                        <span>{friend.userName}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendsList;
