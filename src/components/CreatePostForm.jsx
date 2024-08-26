import { useState } from 'react';
import PropTypes from 'prop-types';
import { createPost } from '../services/MainService'; // 글을 생성하는 API 호출 함수

const CreatePostForm = ({ onClose }) => {
    const [contents, setContents] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newPost = {
            contents,
        };

        try {
            await createPost(newPost); // 서버로 데이터 전송
            alert('글이 성공적으로 작성되었습니다.');
            onClose(); // 모달 닫기
        } catch (error) {
            console.error('글 작성에 실패했습니다.', error);
            alert('글 작성에 실패했습니다.');
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
            <button type="submit">작성하기</button>
        </form>
    );
};
CreatePostForm.propTypes = {
    onClose: PropTypes.func.isRequired, // onClose prop이 필수임을 명시합니다.
};
export default CreatePostForm;
