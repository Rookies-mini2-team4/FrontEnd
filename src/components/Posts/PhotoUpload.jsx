import { useState } from 'react';
import axios from 'axios';

const PhotoUpload = ({ postId, onUploadComplete }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`http://localhost:8081/api/upload/${postId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            onUploadComplete(response.data.url); // 업로드 완료 후 URL 반환
        } catch (error) {
            console.error('Photo upload failed:', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Photo</button>
        </div>
    );
};

export default PhotoUpload;
