import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { getUserInfo, getUserId, getPhotos, getFollower, getFollowing, getFollowerNum, getFollowingNum, getProfileImg } from '@/services/UserService'
import { followUser, unfollowUser } from '@/services/FollowService'
//import IdFromToken from '../services/IdFromToken.jsx';
import ExtractIdFromToken from '../services/ExtractIdFromToken';
import '@/styles/Profile.css'

const Profile = () => {
    const token = localStorage.getItem('jwtToken');
    // 로그인 방법 바뀌고 나서 수정해야됨!!
    const [currentId, setCurrentId] = useState(null);
    const currentUserId = ExtractIdFromToken(token);

    useEffect(() => {
        getUserId(currentUserId)
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
    const [thumbnails, setThumbnails] = useState([]);
    const [mainId, setMainId] = useState([]);
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
            
            if (response.data=='') {
                setMainId([]);
                setThumbnails([]);
            } else {
                setMainId(response.data.mainId);

                const photoUrls = response.data.imageBytes.map((imageByte) => {

                    const base64ToUint8Array = (base64) => {
                        const binaryString = window.atob(base64);
                        const len = binaryString.length;
                        const bytes = new Uint8Array(len);
                        for (let i = 0; i < len; i++) {
                            bytes[i] = binaryString.charCodeAt(i);
                        }
                        return bytes;
                    };

                    const uint8Array = base64ToUint8Array(imageByte);
                    console.log(uint8Array);
                    const blob = new Blob([uint8Array], { type: 'image/jpeg' });

                    return URL.createObjectURL(blob);
                });
                setThumbnails(photoUrls);
            }
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
                    <Link className='update' to={`/api/updateProfile`}>update profile</Link>
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

    const [imageSrc, setImageSrc] = useState(null);
    useEffect(() => {
        let imageUrl;
            if (id!=null){
            getProfileImg(id).then((response) => {
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
    }, [id]);

    return (
        <div className="profile-page">
            <div className="profile-header">
                <img className="profile-image" src={imageSrc} />
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
                            {followers.length > 0 ? (
                                followers.map(follower => (
                                    <Link to={`/api/profile/${follower.followerId}`} key={follower.id}>
                                    {follower.followerUserId}
                                    </Link>
                                ))
                            ) : (<p>No follower</p>)}
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn"> 
                            folloing <strong>{followingNum}</strong>
                        </button>
                        <div className="dropdown-content">
                            {followings.length > 0 ? (
                            followings.map(following => (
                                <Link to={`/api/profile/${following.followingId}`} key={following.id}>
                                {following.followingUserId}
                                </Link>
                            ))
                        ) : (<p>No following</p>)}
                        </div>
                    </div>
                    <p className="profile-name">{user.userName}</p>
                    {/* <div className='post'>
                        <img src={'/Post.png'}/> Post
                    </div> */}
                </div>
                
            </div>
            
            <div className="profile-photos">
                
                {thumbnails.length > 0 ? (
                    
                    thumbnails.map((thumbnail,index) => (
                        <Link to={`/api/main/${mainId[index]}`} key={mainId[index]} className='photo-container'>
                            <img src={thumbnail} alt="User Photo" />
                        </Link>

                    ))
            ) : (<div className='no-post'>No post</div>) }
            </div>
        </div>
    );
};

export default Profile;