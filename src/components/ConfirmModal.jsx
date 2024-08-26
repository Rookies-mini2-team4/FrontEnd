import PropTypes from 'prop-types';
import './ConfirmModal.css'; // 필요한 스타일을 정의합니다.

const ConfirmModal = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>정말 삭제하시겠습니까?</h2>
                <div className="modal-buttons">
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
