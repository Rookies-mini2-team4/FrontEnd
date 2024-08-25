import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPostById, deletePost } from '../services/MainService';
import { getCommentById, createComment, updateComment, deleteComment } from '../services/CommentService';
import ConfirmModal from './ConfirmModal';

const PostDetail = () => {
    const { id } = useParams(); // URL에서 글 ID를 가져옵니다
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]); // 댓글 상태 추가
    const [newCommentText, setNewCommentText] = useState(""); // 새로운 댓글 입력 상태
    

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // 게시글 및 댓글 데이터를 가져오는 함수
    const fetchPostAndComments = async () => {
        try {
            const postResponse = await getPostById(id);
            setPost(postResponse.data);

            const commentResponse = await getCommentById(id);
            setComments(commentResponse.data || []); // 응답 데이터가 배열인지 확인 후 설정
        } catch (error) {
            console.error("Failed to fetch post or comments:", error);
        }
    };

    useEffect(() => {
        fetchPostAndComments(); // 페이지가 로드될 때 게시글 및 댓글 데이터를 가져옵니다
    }, [id]); // id가 변경될 때마다 실행

    const handleDeletePost = async () => {
        await deletePost(id);
        navigate(`/api/main`); // 삭제 후 메인화면으로 이동
    };

    const handleUpdatePost = () => {
        navigate(`/api/main/update/${post.id}`); // 수정 페이지로 이동
    };

    // const handleAddComment = async () => {
    //     try {
    //         const newComment = {
    //             text: newCommentText, // 사용자가 입력한 댓글 내용
    //             main: id, // 현재 게시글의 ID
    //             photoId: null // 사진 ID가 필요 없으면 null로 설정
    //         };
    //         console.log("Sending comment data:", newComment);
    //         await createComment(newComment);
    //         setNewCommentText(""); // 입력 필드 초기화
    //         // 댓글 목록을 다시 불러옵니다
    //         const commentResponse = await getCommentById(id);
    //         console.log("Fetched comments after adding:", commentResponse.data);
    //         setComments(commentResponse.data.comments || []);
    //     } catch (error) {
    //         console.error("댓글 추가 중 오류 발생:", error);
    //     }
    // };
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

    return (
        <div className="post-detail">
            <h2>{post.contents}</h2>
            <p>좋아요: {post.likes}</p>
            <p>{new Date(post.createdAt).toLocaleDateString()}</p>
            {post.photos && <img src={post.photos} alt="Post" />}
            
            <div className="post-comments">
                <h4>댓글:</h4>
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.id}>
                            {comment.text}
                            <button onClick={() => handleEditComment(comment.id)}>수정</button>
                            <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
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
            
            <button onClick={handleUpdatePost}>수정</button>
            <button onClick={() => setShowConfirmModal(true)}>삭제</button>

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
