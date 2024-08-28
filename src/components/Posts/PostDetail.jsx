import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPostById, deletePost } from '../../services/MainService';
import { getCommentById, createComment, updateComment, deleteComment } from '../../services/CommentService';
import { getImage } from '../../services/PhotoService';
import ConfirmModal from '../Modal/ConfirmModal';
import '@/styles/PostDetail.css';

const PostDetail = () => {
    const { id } = useParams(); // URL에서 글 ID를 가져오기
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]); // 댓글 상태 추가
    const [newCommentText, setNewCommentText] = useState(""); // 새로운 댓글 입력 상태
    const [imageUrls, setImageUrls] = useState([]);

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const profileImageUrl = '/profileImages/defaultProfile.png';
    // 게시글 및 댓글 데이터를 가져오는 함수
    const fetchPostAndComments = async () => {
        try {
            const postResponse = await getPostById(id);
            setPost(postResponse.data);

            const commentResponse = await getCommentById(id);
            const fetchedComments = commentResponse.data.comments || [];
            setComments(Array.isArray(fetchedComments) ? fetchedComments : []);
        } catch (error) {
            console.error("Failed to fetch post or comments:", error);
            setComments([]);
        }
    };
    // 이미지 데이터를 비동기적으로 가져오는 함수
    const fetchImages = async (photos) => {
        const urls = await Promise.all(
            photos.map(async (photo) => {
                try {
                    const response = await getImage(photo.imageUrl);
                    const url = URL.createObjectURL(response.data);
                    return url;
                } catch (error) {
                    console.error(`Failed to fetch image: ${photo.imageUrl}`, error);
                    return '/default-image-path.png'; // 실패 시 기본 이미지를 표시할 수 있음
                }
            })
        );
        setImageUrls(urls);
    };

    useEffect(() => {
        fetchPostAndComments(); // 페이지가 로드될 때 게시글 및 댓글 데이터를 가져옵니다
    }, [id]); // id가 변경될 때마다 실행

    useEffect(() => {
        if (post && Array.isArray(post.photos) && post.photos.length > 0) {
            fetchImages(post.photos);
        }
    }, [post]);

    const handleDeletePost = async () => {
        await deletePost(id);
        navigate(`/api/main`); // 삭제 후 메인화면으로 이동
    };

    const handleUpdatePost = () => {
        navigate(`/api/main/update/${post.id}`); // 수정 페이지로 이동
    };

    
    const handleAddComment = async () => {
        try {
            const newComment = {
                text: newCommentText,
                main: id,
                photoId: null
            };
            const addedCommentResponse = await createComment(newComment);
            setNewCommentText(""); // 입력 필드 초기화

            // 추가된 댓글을 comments 상태에 추가
            setComments((prevComments) => [...prevComments, addedCommentResponse.data]);
        } catch (error) {
            console.error("댓글 추가 중 오류 발생:", error);
        }
    };

    const handleEditComment = async (commentId) => {
        const updatedComment = prompt("댓글을 수정하세요:", comments.find(c => c.id === commentId)?.text);
        if (updatedComment) {
            await updateComment(commentId, { text: updatedComment });
            fetchPostAndComments(); // 수정 후 댓글 목록 다시 가져오기
        }
    };

    const handleDeleteComment = async (commentId) => {
        await deleteComment(commentId);
        fetchPostAndComments(); // 삭제 후 댓글 목록 다시 가져오기
    };

    if (!post) return <p>Loading...</p>;

//     return (
//         <div className="post-detail">
//             <h2>{post.contents}</h2>
//             <p>좋아요: {post.likes}</p>
//             <p>{new Date(post.createdAt).toLocaleDateString()}</p>
//             {imageUrls.length > 0 && (
//                 <div className="post-photos">
//                     {imageUrls.map((url, index) => (
//                         <img key={index} src={url} alt={post.photos[index].caption || 'Post'} />
//                     ))}
//                 </div>
//             )}
//             <div className="post-comments">
//                 <h4>댓글: </h4>
//                 <ul>
//                     {post.text.map((comment, index) => (
//                         <li key={index}>
//                             {comment.text}
//                             <button onClick={() => handleEditComment(comment.id)}>수정</button>
//                             <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
//                         </li>
//                     ))}
//                 </ul>
//                 <div className="add-comment">
//                     <textarea 
//                         value={newCommentText}
//                         onChange={(e) => setNewCommentText(e.target.value)}
//                         placeholder="댓글을 입력하세요..."
//                     />
//                     <button onClick={handleAddComment}>댓글 달기</button>
//                 </div>
//             </div>
            
//             <button onClick={handleUpdatePost}>수정</button>
//             <button onClick={() => setShowConfirmModal(true)}>삭제</button>

//             {/* 삭제 확인 모달 */}
//             <ConfirmModal
//                 show={showConfirmModal}
//                 onClose={() => setShowConfirmModal(false)}
//                 onConfirm={handleDeletePost}
//             />
//         </div>
//     );
// };

// export default PostDetail;
return (
    <div className="post-detail">
        <div className="post-header">
            <img src={profileImageUrl} alt="User profile" className="post-profile-image" /> {/* 기본 프로필 사진 */}
            <span className="post-user">{post.userId}</span> {/* 글 작성자 아이디 */}
            <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span> {/* 작성 날짜 */}
        </div>
        {imageUrls.length > 0 && (
            <div className="post-photos">
                {imageUrls.map((url, index) => (
                    <img key={index} src={url} alt={post.photos[index].caption || 'Post'} />
                ))}
            </div>
        )}
         <h3 className="post-content">{post.contents}</h3> {/* 게시글의 내용 */}
        <div className="post-comments">
                 <h4>댓글</h4>
                 <ul>
                     {post.text.map((comment, index) => (
                         <li key={index}>
                             {comment.text}
                             <div className="comment-buttons">
                                <button onClick={() => handleEditComment(comment.id)}>수정</button>
                                <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
                             </div>
                         </li>
                     ))}
                 </ul>
            <div className="add-comment">
                <textarea 
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="댓글을 입력하세요..."
                />
                <button onClick={handleAddComment}>댓글 달기</button>
            </div>
        </div>
        <div className="post-footer">
            <button onClick={handleUpdatePost}>수정</button>
            <button onClick={() => setShowConfirmModal(true)}>삭제</button>
        </div>

        {/* 삭제 확인 모달 */}
        <ConfirmModal
            show={showConfirmModal}
            onClose={() => setShowConfirmModal(false)}
            onConfirm={handleDeletePost}
        />
    </div>
);
};

export default PostDetail;