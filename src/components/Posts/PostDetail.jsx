
// import { useParams, useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { getPostById, deletePost } from '../../services/MainService';
// import { getCommentById, createComment, updateComment, deleteComment } from '../../services/CommentService';
// import { getImage } from '../../services/PhotoService';
// import ExtractIdFromToken from '../../services/ExtractIdFromToken';
// import ConfirmModal from '../Modal/ConfirmModal';
// import '@/styles/PostDetail.css';

// const PostDetail = () => {
//     const { id } = useParams(); // URL에서 글 ID를 가져오기
//     const navigate = useNavigate();
//     const [post, setPost] = useState(null);
//     const [comments, setComments] = useState([]);
//     const [newCommentText, setNewCommentText] = useState("");
//     const [imageUrls, setImageUrls] = useState([]);
//     const [showConfirmModal, setShowConfirmModal] = useState(false);
//     const profileImageUrl = '/profileImages/defaultProfile.png';

//     const loggedInUserId = ExtractIdFromToken(localStorage.getItem('jwtToken')); // 현재 로그인된 사용자의 ID

//     const fetchPostAndComments = async () => {
//         try {
//             const postResponse = await getPostById(id);
//             setPost(postResponse.data);

//             const commentResponse = await getCommentById(id);
//             const fetchedComments = commentResponse.data.comments || [];
//             setComments(Array.isArray(fetchedComments) ? fetchedComments : []);
//         } catch (error) {
//             console.error("Failed to fetch post or comments:", error);
//             setComments([]);
//         }
//     };

//     const fetchImages = async (photos) => {
//         const urls = await Promise.all(
//             photos.map(async (photo) => {
//                 try {
//                     const response = await getImage(photo.imageUrl);
//                     const url = URL.createObjectURL(response.data);
//                     return url;
//                 } catch (error) {
//                     console.error(`Failed to fetch image: ${photo.imageUrl}`, error);
//                     return '/default-image-path.png';
//                 }
//             })
//         );
//         setImageUrls(urls);
//     };

//     useEffect(() => {
//         fetchPostAndComments();
//     }, [id]);

//     useEffect(() => {
//         if (post && Array.isArray(post.photos) && post.photos.length > 0) {
//             fetchImages(post.photos);
//         }
//     }, [post]);

//     const handleDeletePost = async () => {
//         await deletePost(id);
//         navigate(`/api/main`);
//     };

//     const handleUpdatePost = () => {
//         navigate(`/api/main/update/${post.id}`);
//     };

//     const handleAddComment = async () => {
//         try {
//             const newComment = {
//                 text: newCommentText,
//                 main: id,
//                 photoId: id,
//                 userId: loggedInUserId, // 현재 로그인된 사용자 ID 전송
//             };
//             const addedCommentResponse = await createComment(newComment);
//             setComments((prevComments) => [...prevComments, addedCommentResponse.data]);

//             setNewCommentText("");
//         } catch (error) {
//             console.error("댓글 추가 중 오류 발생:", error);
//         }
//     };

//     const handleEditComment = async (commentId) => {
//         const updatedCommentText = prompt("댓글을 수정하세요:", comments.find(c => c.id === commentId)?.text);
//         if (updatedCommentText) {
//             try {
//                 const updatedComment = await updateComment(commentId, { text: updatedCommentText });
//                 setComments(prevComments => 
//                     prevComments.map(comment => 
//                         comment.id === commentId ? { ...comment, text: updatedComment.data.text } : comment
//                     )
//                 );
//             } catch (error) {
//                 console.error("댓글 수정 중 오류 발생:", error);
//             }
//         }
//     };

//     const handleDeleteComment = async (commentId) => {
//         await deleteComment(commentId);
//         fetchPostAndComments(); // 댓글 삭제 후 다시 가져오기
//     };

//     if (!post) return <p>Loading...</p>;

//     return (
//         <div className="post-detail">
//             <div className="post-header">
//                 <img src={profileImageUrl} alt="User profile" className="post-profile-image" />
//                 <span className="post-user">{post.userId}</span>
//                 <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
//             </div>
//             {imageUrls.length > 0 && (
//                 <div className="post-photos">
//                     {imageUrls.map((url, index) => (
//                         <img key={index} src={url} alt={post.photos[index].caption || 'Post'} />
//                     ))}
//                 </div>
//             )}
//             <h3 className="post-content">{post.contents}</h3>
//             <div className="post-comments">
//                 <h4>댓글</h4>
//                 <ul>
//                     {comments.map((comment, index) => (
//                         <li key={index}>
//                             {comment.text}
//                             <div className="comment-buttons">
//                                 <button onClick={() => handleEditComment(comment.id)}>수정</button>
//                                 <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
//                             </div>
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
//             {/* 게시글 작성자와 현재 로그인된 사용자가 일치하는 경우에만 수정 및 삭제 버튼을 렌더링 */}
//             {post.userId === loggedInUserId && (
//                 <div className="post-footer">
//                     <button onClick={handleUpdatePost}>수정</button>
//                     <button onClick={() => setShowConfirmModal(true)}>삭제</button>
//                 </div>
//             )}

//             <ConfirmModal
//                 show={showConfirmModal}
//                 onClose={() => setShowConfirmModal(false)}
//                 onConfirm={handleDeletePost}
//             />
//         </div>
//     );
// };

// export default PostDetail;


import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPostById, deletePost } from '../../services/MainService';
import { getCommentById, createComment, updateComment, deleteComment } from '../../services/CommentService';
import { getImage } from '../../services/PhotoService';
import ConfirmModal from '../Modal/ConfirmModal';
import '@/styles/PostDetail.css';


const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]); // 댓글 상태
    const [newCommentText, setNewCommentText] = useState("");
    const [imageUrls, setImageUrls] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const profileImageUrl = '/profileImages/defaultProfile.png';

    const fetchPostAndComments = async () => {
        try {
            const postResponse = await getPostById(id);
            setPost(postResponse.data);

            const commentResponse = await getCommentById(id);
            const fetchedComments = commentResponse.data.comments || []; // 여기서 data를 comments로 변경하지 않습니다.
            setComments(Array.isArray(fetchedComments) ? fetchedComments : []);
        } catch (error) {
            console.error("게시글 또는 댓글을 불러오는 중 오류 발생:", error);
            setComments([]);
        }
    };

    const fetchImages = async (photos) => {
        const urls = await Promise.all(
            photos.map(async (photo) => {
                try {
                    const response = await getImage(photo.imageUrl);
                    const url = URL.createObjectURL(response.data);
                    return url;
                } catch (error) {
                    console.error(`이미지를 불러오는 중 오류 발생: ${photo.imageUrl}`, error);
                    return '/default-image-path.png';
                }
            })
        );
        setImageUrls(urls);
    };

    useEffect(() => {
        fetchPostAndComments();
    }, [id]);

    useEffect(() => {
        if (post && Array.isArray(post.photos) && post.photos.length > 0) {
            fetchImages(post.photos);
        }
    }, [post]);

    const handleDeletePost = async () => {
        await deletePost(id);
        navigate(`/main`);
    };

    const handleUpdatePost = () => {
        navigate(`/main/update/${post.id}`);
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
            fetchPostAndComments();
        }
    };

    const handleDeleteComment = async (commentId) => {
        await deleteComment(commentId);
        fetchPostAndComments();
    };

    if (!post) return <p>Loading...</p>;

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