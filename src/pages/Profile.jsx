import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { getUserInfo, getUserId, getPhotos, getFollower, getFollowing, getFollowerNum, getFollowingNum } from 'src/services/UserService'
import { followUser, unfollowUser } from 'src/services/FollowService'
//import IdFromToken from '../services/IdFromToken.jsx';
import ExtractIdFromToken from '../services/ExtractIdFromToken';
import 'src/styles/Profile.css'

const Profile = () => {
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
    });
    

    let { id } = useParams();
    if (id===undefined) id = currentId;
    
    useEffect(() => {
        if (currentId !== null) {
            catchUserInfo();
        }
    }, [currentId,id]);

    const [user, setUser] = useState({});
    const [photos, setPhotos] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const [followerNum, setFollowerNum] = useState(0);
    const [followingNum, setFollowingNum] = useState(0);

    function catchUserInfo() {
        getUserInfo(id).then((response) => {
            setUser(response.data);
        }).catch(error => {
            console.error(error);
        })

        getPhotos(id).then((response) => {
            setPhotos(response.data);
        }).catch(error => {
            console.error(error);
        })
        getFollower(id).then((response) => {
            setFollowers(response.data);
        }).catch(error => {
            console.error(error);
        })
        getFollowing(id).then((response) => {
            setFollowings(response.data);
        }).catch(error => {
            console.error(error);
        })
        getFollowerNum(id).then((response) => {
            setFollowerNum(response.data);
        }).catch(error => {
            console.error(error);
        })
        getFollowingNum(id).then((response) => {
            setFollowingNum(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    const buttonType = () => {
        if(currentId==id){
            return <button className='update-button'>
                    <Link to={`/api/updateProfile`}>update profile</Link>
                    </button>
        }else if(followers.some(follower => follower.followerId == currentId)){
            return <button className='follow-button' onClick={handleUnfollow}>unfollow</button>
        }else{
            return <button className='follow-button' onClick={handleFollow}>follow</button>
        }
    }

    const handleFollow = () => {
        const follow = { followerId : currentId, followingId : id };
        followUser(follow).then(() => {
            getFollower(id).then((response) => {
                setFollowers(response.data);
            }).catch(error => {
                console.error(error);
            })
            getFollowerNum(id).then((response) => {
                setFollowerNum(response.data);
            }).catch(error => {
                console.error(error);
            })

        }).catch(error => {
            console.error(error);
        })
    };
    
    const handleUnfollow = () => {
        const unfollow = { followerId : currentId, followingId : id };
        unfollowUser(unfollow).then(() => {
            getFollower(id).then((response) => {
                setFollowers(response.data);
            }).catch(error => {
                console.error(error);
            })
            getFollowerNum(id).then((response) => {
                setFollowerNum(response.data);
            }).catch(error => {
                console.error(error);
            })
        }).catch(error => {
            console.error(error);
        })
    };

    return (
        <div className="profile-page">
            <div className="profile-header">
                <img className="profile-image" src={user.profileImage} />
                <div className="profile-info">
                    <div className="profile-header-row">
                        <h2>{user.userId}</h2>
                        { buttonType() }
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn"> 
                            followers <strong>{followerNum}</strong>
                        </button>
                        <div className="dropdown-content">
                            {followers.map(follower => (
                                <Link to={`/api/profile/${follower.followerId}`} key={follower.id}>
                                {follower.followerUserId}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn"> 
                            folloing <strong>{followingNum}</strong>
                        </button>
                        <div className="dropdown-content">
                            {followings.map(following => (
                                <Link to={`/api/profile/${following.followingId}`} key={following.id}>
                                {following.followingUserId}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <p className="profile-name">{user.userName}</p>
                </div>
            </div>
            <div className="profile-photos">
                {photos.map(photo => (
                    <div key={photo.id} className="photo-container">
                        <img src={photo.imageUrl} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;