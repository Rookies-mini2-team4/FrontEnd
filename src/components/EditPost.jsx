import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPostById, updatePost } from '../services/MainService';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contents, setContents] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            const response = await getPostById(id);
            setContents(response.data.contents);
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 데이터가 JSON 형식인지 확인
        const postData = {
            contents: contents
            // 필요한 경우 다른 필드들도 여기에 추가합니다.
        };
        
        try {
            await updatePost(id, postData); // 데이터 전송
            navigate(`/api/main`); // 수정 후 상세 페이지로 이동
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>내용</label>
                <textarea
                    value={contents}
                    onChange={(e) => setContents(e.target.value)}
                    required
                    rows="4"
                    style={{ width: '100%' }}
                />
            </div>
            <button type="submit">수정하기</button>
        </form>
    );
};

export default EditPost;
