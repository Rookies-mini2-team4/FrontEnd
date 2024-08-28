import PropTypes from 'prop-types'; // PropTypes를 불러옵니다.
import '@/styles/Modal.css'; // 모달 스타일링을 위한 CSS 파일

const Modal = ({ show, onClose, children }) => {
    if (!show) {
      return null;
    }
  
    return (
      <div className="modal-backdrop1" onClick={onClose}>
        <div className="modal-content1" onClick={(e) => e.stopPropagation()}>
          <button className="close-button1" onClick={onClose}>
            X
          </button>
          <div className="modal-body1">
            {children}
          </div>
        </div>
      </div>
    );
  };
  
  // Props의 타입을 지정
  Modal.propTypes = {
    show: PropTypes.bool.isRequired, // show는 반드시 boolean 값이어야 하며 필수 항목
    onClose: PropTypes.func.isRequired, // onClose는 반드시 함수여야 하며 필수 항목
    children: PropTypes.node // children은 React 노드로, 필수 아님.
  };
  
  export default Modal;