import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from './Modal';// 모달 컴포넌트를 가져옵니다.
import CreatePostForm from './CreatePostForm'; 
import './SideBar.css'; 
const Sidebar = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMoreModal, setShowMoreModal] = useState(false);

  return (
    <div className="sidebar">
      <div className="logo">
        <h1>RookieStagram</h1>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/api/main">홈</NavLink>
          </li>
          <li>
            <NavLink to="/api/messages">메시지</NavLink>
          </li>
          <li>
            <button onClick={() => setShowCreateModal(true)}>만들기</button>
          </li>
          <li>
          <NavLink to="/api/profile">프로필</NavLink>
          </li>
          <li>
            <button onClick={() => setShowMoreModal(true)}>더 보기</button>
          </li>
        </ul>
      </nav>

      {/* 만들기 모달 */}
      <Modal show={showCreateModal} onClose={() => setShowCreateModal(false)}>
        <h2>만들기</h2>
        {/* 만들기 폼을 여기에 추가 */}
        <CreatePostForm onClose={() => setShowCreateModal(false)} />
      </Modal>

      {/* 더 보기 모달 */}
      <Modal show={showMoreModal} onClose={() => setShowMoreModal(false)}>
        <h2>더 보기</h2>
        {/* 더 보기 관련 내용을 여기에 추가 */}
        <p>여기에 더 보기 관련 내용을 넣으세요.</p>
      </Modal>
    </div>
  );
};

export default Sidebar;
