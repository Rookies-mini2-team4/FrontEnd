import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getUserInfo, getUserId,updateProfile } from 'src/services/UserService'
import ExtractIdFromToken from '../services/ExtractIdFromToken';

const UpdateProfile = () => {
    
    const token = localStorage.getItem('jwtToken'); // 로컬 스토리지에서 JWT 토큰 가져옴

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

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('user', JSON.stringify(user)); // JSON 데이터를 문자열로 추가
        if (file) {
           formData.append('file', file);     }
        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        // }
        updateProfile(currentId, formData).then((response) => {
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            setUser(response.data);
            response && response === 200 && navigate(`/api/myprofile`);
        }).catch(error => {
            console.error(error);
        });
    };

    const ImageSrc = () => {
        if(user.profileImage){
            return user.profileImage
        } else{
            return 'defaultProfile.png'
        }
    }

    return (
        <div className="update-profile">
            <h2>Update Profile</h2>
            <div className="user-id">
                <label htmlFor="userName">Userid : </label>
                {user.userId}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="userName">Username : </label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        defaultValue={user.userName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="profileImage">Profile Image</label>
                    <input
                        type="file"
                        id="profileImage"
                        name="profileImage"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <div>
                        <img
                            src={ImageSrc()}
                            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                        />
                    </div>
                </div>
                <button type="submit" className="update-button">Update Profile</button>
            </form>
        </div>
    );
};

export default UpdateProfile;