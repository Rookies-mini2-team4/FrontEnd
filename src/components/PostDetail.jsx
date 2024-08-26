import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPostById, deletePost } from '../services/MainService';
//import { getCommentById, createComment, updateComment, deleteComment } from '../services/CommentService';
import ConfirmModal from './ConfirmModal';

const PostDetail = () => {
    const { id } = useParams(); // URL에서 글 ID를 가져옵니다
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    // const [comments, setComments] = useState([]);
    // const [newComment, setNewComment] = useState("");
    // const [commentToEdit, setCommentToEdit] = useState(null); // 수정할 댓글
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await getPostById(id);
            setPost(response.data);
        };
        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        await deletePost(id);
        navigate(`/api/main`); // 삭제 후 메인화면으로 이동
    };

    const handleUpdate = () => {
        navigate(`/api/main/update/${post.id}`); // 수정 페이지로 이동
    };

    if (!post) return <p>Loading...</p>;

    return (
        <div className="post-detail">
            <h2>{post.contents}</h2>
            <p>좋아요: {post.likes}</p>
            <p>{new Date(post.createdAt).toLocaleDateString()}</p>
            {post.photos && <img src={post.photos} alt="Post" />}
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
            <button onClick={handleUpdate}>수정</button>
            <button onClick={() => setShowConfirmModal(true)}>삭제</button>

            {/* 삭제 확인 모달 */}
            <ConfirmModal
                show={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={handleDelete}
            />
        </div>
    );
};

export default PostDetail;
