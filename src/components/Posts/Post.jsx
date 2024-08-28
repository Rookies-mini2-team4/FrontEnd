import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getImage } from '../../services/PhotoService';
import '@/styles/Post.css'; // Post 컴포넌트의 스타일을 정의한 CSS 파일

const Post = ({ post }) => {
    const navigate = useNavigate();
    const [imageUrls, setImageUrls] = useState([]);

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
            <p className="post-content">{post.contents}</p> {/* 게시글의 내용 */}
            <div className="post-footer">
                {/* <span className="post-likes">좋아요: {post.likes}</span> 좋아요 개수 */}
                <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span> {/* 작성 날짜 */}
            </div>
            {imageUrls.length > 0 && (
                <div className="post-photos">
                    {imageUrls.map((url, index) => (
                        <img key={index} src={url} alt={post.photos[index].caption || 'Uploaded image'} />
                    ))}
                </div>
            )}
            {post.text && post.text.length > 0 && (
                <div className="post-comments">
                    <h4>댓글:</h4>
                    <ul>
                        {post.text.map((comment, index) => (
                            <li key={index}>{comment.text}</li> 
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

Post.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number.isRequired, // id는 필수 항목
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
