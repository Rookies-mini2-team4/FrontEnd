import { useState } from 'react';
import PropTypes from 'prop-types';
import '@/styles/Modal.css';
import { createPost } from '../../services/MainService';

const ImageGalleryModal = ({ show, onClose, images, onShare }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [postContent, setPostContent] = useState('');

  if (!show) return null;

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleShareClick = async () => {
    const formData = new FormData();
    formData.append('contents', postContent);

    for (let index = 0; index < images.length; index++) {
      const imageUrl = images[index];
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        formData.append('files', blob, `image-${Date.now()}-${index}.jpg`);
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        alert('이미지 업로드에 실패했습니다.');
        return;
      }
    }

    try {
      await createPost(formData); // 서버로 데이터 전송
      onShare(); // 게시물이 생성된 후 호출하여 상태를 업데이트
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      alert('게시글 작성에 실패했습니다.');
    }
  };

  return (
    <div className="modal-backdrop1" onClick={onClose}>
      <div className="modal-content1" onClick={(e) => e.stopPropagation()}>
        <div className="modal-left">
          <div className="selected-images">
            {images.length > 1 && (
              <button className="prev-btn" onClick={handlePrevImage}>‹</button>
            )}
            <img
              src={images[currentImageIndex]}
              alt={`선택된 이미지 ${currentImageIndex + 1}`}
              className="selected-image"
            />
            {images.length > 1 && (
              <button className="next-btn" onClick={handleNextImage}>›</button>
            )}
          </div>
        </div>
        <div className="modal-right">
          <textarea 
            placeholder="문구 입력..." 
            className="post-textarea"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          ></textarea>
          <div className="post-options">
            <button className="location-button">위치 추가</button>
            <button className="accessibility-button">접근성</button>
            <button className="settings-button">고급 설정</button>
          </div>
          <button className="share-button" onClick={handleShareClick}>공유</button>
        </div>
        <button className="close-button1" onClick={onClose}>X</button>
      </div>
    </div>
  );
};

ImageGalleryModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  onShare: PropTypes.func.isRequired,
};

export default ImageGalleryModal;
