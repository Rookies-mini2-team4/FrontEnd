import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '@/styles/Modal.css';

const UploadModal = ({ show, onClose, onUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  if (!show) return null;

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setSelectedFiles(imageUrls);
  };

  const handleUpload = () => {
    onUpload(selectedFiles); // 업로드된 파일 URL을 부모 컴포넌트로 전달
  };

  return (
    <div className="modal-backdrop1" onClick={onClose}>
      <div className="modal-content1" onClick={(e) => e.stopPropagation()}>
        <div className="image-upload-container">
          <label htmlFor="image-upload" className="image-upload-label">
            사진과 동영상을 여기에 끌어다 놓으세요
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*,video/*"
            multiple
            onChange={handleFileChange}
            className="image-upload-input"
            style={{ display: 'none' }}
          />
          <label htmlFor="image-upload" className="upload-button">
            컴퓨터에서 선택
          </label>
        </div>
        <button onClick={handleUpload}>업로드</button>
        <button onClick={onClose}>취소</button>
      </div>
    </div>
  );
};

UploadModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
};

export default UploadModal;
