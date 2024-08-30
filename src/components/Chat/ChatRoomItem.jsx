import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getProfileImg } from '@/services/UserService';

const ChatRoomItem = ({ room, onClick }) => {
    const [profileImageUrl, setProfileImageUrl] = useState('/profileImages/defaultProfile.png');

    useEffect(() => {
        const fetchProfileImage = async () => {
            if (room.userId) {
                try {
                    const response = await getProfileImg(room.userId);
                    if (response.data.byteLength === 0) {
                        setProfileImageUrl('/profileImages/defaultProfile.png');
                    } else {
                        const blob = new Blob([response.data], { type: 'image/jpeg' });
                        const imageUrl = URL.createObjectURL(blob);
                        setProfileImageUrl(imageUrl);
                    }
                } catch (error) {
                    console.error(`Failed to fetch profile image for user ${room.userId}:`, error);
                }
            }
        };

        fetchProfileImage();
    }, [room.userId]);

    return (
        <div className="chat-room-item" onClick={onClick}>
            <img src={profileImageUrl} alt="Profile" className="chat-room-profile-image" />
            <div className="chat-room-info">
                <strong className="chat-room-name">{room.roomName || `Room ${room.id}`}</strong>
            </div>
        </div>
    );
};

ChatRoomItem.propTypes = {
    room: PropTypes.shape({
        id: PropTypes.number.isRequired,
        roomName: PropTypes.string,
        userId: PropTypes.number.isRequired, // 사용자 ID
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ChatRoomItem;
