import PropTypes from 'prop-types';
import '@/styles/ConfirmModal.css'; // 필요한 스타일을 정의
const ConfirmModal = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="modal-backdrop2" onClick={onClose}>
            <div className="modal-content2" onClick={(e) => e.stopPropagation()}>
                <h2>정말 삭제하시겠습니까?</h2>
                <div className="modal-buttons2">
                    <button onClick={onConfirm}>예</button>
                    <button onClick={onClose}>아니오</button>
                </div>
            </div>
        </div>
    );
};

ConfirmModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default ConfirmModal;