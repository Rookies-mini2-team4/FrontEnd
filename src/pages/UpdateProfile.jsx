import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getUserInfo, getUserId,updateProfile,getProfileImg } from '@/services/UserService'
import ExtractIdFromToken from '../services/ExtractIdFromToken';
import '../styles/UpdateProfile.css';

const UpdateProfile = () => {
    
    const token = localStorage.getItem('jwtToken');
    // 로그인 방법 바뀌고 나서 수정해야됨!!
    const [currentId, setCurrentId] = useState(null);
    const currentUserName = ExtractIdFromToken(token);

    useEffect(() => {
        getUserId(currentUserName)
            .then((response) => {
                setCurrentId(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [currentUserName]);
    
    useEffect(() => {
        if (currentId !== null) {
            catchUserInfo();
        }
    }, [currentId]);

    const [user, setUser] = useState({});

    const [file, setFile] = useState(null);

    function catchUserInfo() {
        getUserInfo(currentId).then((response) => {
            setUser(response.data)
        }).catch(error => {
            console.error(error);
        })
    }

    const handleInputChange = (e) => {
        //console.log(value);
        setUser({ ...user, userName: e.target.value });
        //console.log(user);
    };

    const [imageSrc, setImageSrc] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        const fileUrl = URL.createObjectURL(e.target.files[0]);
        setImageSrc(fileUrl);
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('user', user.userName);
        if (file) { formData.append('file', file); }

        updateProfile(currentId, formData).then((response) => {
            setUser(response.data);
            navigate(`/myprofile`);
        }).catch(error => {
            console.error(error);
        });
    };

    useEffect(() => {
        let imageUrl;
        if (currentId!=null){
            getProfileImg(currentId).then((response) => {
                if (response.data.byteLength==0) setImageSrc('/profileImages/defaultProfile.png')
                else {
                    const blob = new Blob([response.data], { type: 'image/jpeg' })
                    imageUrl = URL.createObjectURL(blob);
                    setImageSrc(imageUrl);
                }
                
            }).catch(error => {
                console.error(error);
            });
        }
    }, [currentId]);


    return (
        <div className="update-profile">
            <h2>Update Profile</h2>
            <div className="profile-image">
                <img
                        src={imageSrc}
                        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                    />
                <label htmlFor="profileImage">change profile image</label>
                <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                
            </div>
                  
            <form onSubmit={handleSubmit}>
                <div className="user-id">
                    <label htmlFor="userName">ID</label>
                    {user.userId}
                </div>
                <div className="user-name">
                    <label htmlFor="userName">Username</label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        defaultValue={user.userName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="user-email">
                    <label htmlFor="userEmail">Email</label>
                    {user.userId}
                </div>               
                <button type="submit" className="update-button">Update Profile</button>
                
            </form>
            
        </div>
    );
};

export default UpdateProfile;

