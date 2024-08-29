// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import { createPost } from '../../services/MainService'; // 글을 생성하는 API 호출 함수

// const CreatePostForm = ({ onClose }) => {
//     const [contents, setContents] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         const newPost = {
//             contents,
//         };

//         try {
//             await createPost(newPost); // 서버로 데이터 전송
//             alert('글이 성공적으로 작성되었습니다.');
//             onClose(); // 모달 닫기
//         } catch (error) {
//             console.error('글 작성에 실패했습니다.', error);
//             alert('글 작성에 실패했습니다.');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label>내용</label>
//                 <textarea
//                     value={contents}
//                     onChange={(e) => setContents(e.target.value)}
//                     required
//                     rows="4"
//                     style={{ width: '100%' }}
//                 />
//             </div>
//             <button type="submit">작성하기</button>
//         </form>
//     );
// };
// CreatePostForm.propTypes = {
//     onClose: PropTypes.func.isRequired, // onClose prop이 필수임을 명시합니다.
// };
// export default CreatePostForm;


import { useState } from 'react';
import PropTypes from 'prop-types';
import { createPost } from '../../services/MainService'; // 글을 생성하는 API 호출 함수

const CreatePostForm = ({ onClose }) => {
    const [contents, setContents] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]); // 파일을 관리하기 위한 상태 추가

    const handleFileChange = (e) => {
        console.log('Selected files:', e.target.files);
        setSelectedFiles(e.target.files); // 파일 선택 시 상태 업데이트
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedFiles.length === 0) {
            alert('사진을 선택해주세요.');
            return;
        }
        // 폼 데이터를 생성하여 파일과 함께 전송
        const formData = new FormData();
        formData.append('post', new Blob([JSON.stringify({ contents })], { type: 'application/json' }));

        // 선택된 파일들을 formData에 추가
        if (selectedFiles.length > 0) {
            Array.from(selectedFiles).forEach((file) => {
                formData.append('files', file);
            });
        } else {
            console.warn("No files selected for upload.");
        }

        try {
            await createPost(formData); // 서버로 데이터 전송
            alert('글이 성공적으로 작성되었습니다.');
            onClose(); // 모달 닫기
        } catch (error) {
            console.error('글 작성에 실패했습니다.', error);
            alert('글 작성에 실패했습니다.');
        }
    };

    return (
        <form className="form-createpost" onSubmit={handleSubmit}>
            <div>
                <label></label>
                <textarea
                    value={contents}
                    onChange={(e) => setContents(e.target.value)}
                />
            </div>
            <div>
                <label></label>
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                />
            </div>
            <button type="submit">작성하기</button>
        </form>
    );
};

CreatePostForm.propTypes = {
    onClose: PropTypes.func.isRequired, // onClose prop이 필수임을 명시
};

export default CreatePostForm;
