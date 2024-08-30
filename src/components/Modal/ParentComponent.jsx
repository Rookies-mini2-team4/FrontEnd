import { useState } from 'react';
import UploadModal from './UploadModal';
import ImageGalleryModal from './ImageGalleryModal';

const ParentComponent = () => {
    const [showUploadModal, setShowUploadModal] = useState(true);
    const [showGalleryModal, setShowGalleryModal] = useState(false);
    const [images, setImages] = useState([]);

    const handleImageUpload = (imageUrls) => {
        setImages(imageUrls);
        setShowUploadModal(false);
        setShowGalleryModal(true);
    };

    const handleShare = () => {
        console.log('게시글이 성공적으로 작성되었습니다!');
        setShowGalleryModal(false);
        // 추가적인 게시글 작성 로직을 여기에 작성
    };

    return (
        <div>
            <UploadModal
                show={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                onUpload={handleImageUpload}
            />
            <ImageGalleryModal
                show={showGalleryModal}
                onClose={() => setShowGalleryModal(false)}
                images={images}
                onShare={handleShare}
            />
        </div>
    );
};

export default ParentComponent;
