import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Post.css'; // Post 컴포넌트의 스타일을 정의한 CSS 파일

const Post = ({ post }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/api/main/${post.id}`); // 글 ID를 기반으로 상세 조회 페이지로 이동
    };

    return (
        <div className="post" onClick={handleClick}>
            <p className="post-content">{post.contents}</p> {/* 게시글의 내용 */}
            <div className="post-footer">
                <span className="post-likes">좋아요: {post.likes}</span> {/* 좋아요 개수 */}
                <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span> {/* 작성 날짜 */}
            </div>
            {post.photos && (
                <div className="post-photos">
                    <img src={post.photos} alt="Post" /> {/* 사진이 있으면 렌더링 */}
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
        photos: PropTypes.string, // 사진은 선택 항목
        likes: PropTypes.number.isRequired, // 좋아요 수
        createdAt: PropTypes.string.isRequired, // 작성 날짜
    }).isRequired,
};

export default Post;
