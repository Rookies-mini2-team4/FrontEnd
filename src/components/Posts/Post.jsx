import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getImage } from '../../services/PhotoService';
import '@/styles/Post.css'; // Post 컴포넌트의 스타일을 정의한 CSS 파일


const Post = ({ post }) => {
    const navigate = useNavigate();
    const [imageUrls, setImageUrls] = useState([]);
    const profileImageUrl = '/profileImages/defaultProfile.png';
    
    useEffect(() => {
        if (Array.isArray(post.photos) && post.photos.length > 0) {
            const fetchImages = async () => {
                const urls = await Promise.all(
                    post.photos.map(async (photo) => {
                        try {
                    
                            const response = await getImage(photo.imageUrl);
                            console.log(photo.imageUrl);
                            const url = URL.createObjectURL(response.data);
                            console.log('Generated Image URL:', url);
                            return url;
                        } catch (error) {
                            console.error(`Failed to fetch image: ${photo.imageUrl}`, error);
                            return '/default-image-path.png'; // 실패 시 기본 이미지를 표시할 수 있음
                        }
                    })
                );
                setImageUrls(urls);
            };

            fetchImages();
        }
    }, [post.photos]);
    

    const handleClick = () => {
        navigate(`/api/main/${post.id}`); // 글 ID를 기반으로 상세 조회 페이지로 이동
    };

    return (
        <div className="post" onClick={handleClick}>
            <div className="post-header">
                <img src={profileImageUrl} alt="User profile" className="post-profile-image" /> {/* 프로필 사진 */}
                <span className="post-user">{post.userId}</span> {/* 글 작성자 아이디 */}
                <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span> {/* 작성 날짜 */}
            </div>
            {imageUrls.length > 0 && (
                <div className="post-photos">
                    {imageUrls.map((url, index) => (
                        <img key={index} src={url} alt={post.photos[index]|| 'Uploaded image'} />
                    ))}
                </div>
            )}
            <h3 className="post-content">{post.contents}</h3> {/* 게시글의 내용 */}
            {post.text && post.text.length > 0 && (
                <div className="post-comments">
                    <p>댓글 더 보기</p>
                </div>
            )}
        </div>
    );
};


Post.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number.isRequired, // id는 필수 항목
        userId: PropTypes.string.isRequired, // userId는 필수 항목
        //userName: PropTypes.string.isRequired, // userName은 필수 항목
        contents: PropTypes.string.isRequired, // contents는 필수 항목
        text: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string
        })), // 댓글 배열
        photos: PropTypes.arrayOf(PropTypes.shape({
            imageUrl: PropTypes.string.isRequired, // 각 사진의 URL을 나타내는 필드
        })), // 사진 배열로 수정
        likes: PropTypes.number.isRequired, // 좋아요 수
        createdAt: PropTypes.string.isRequired, // 작성 날짜
    }).isRequired,
};

export default Post;