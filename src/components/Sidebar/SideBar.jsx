// import { useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import Modal from './Modal'; // 모달 컴포넌트를 가져옵니다.
// import CreatePostForm from '../Posts/CreatePostForm'; 
// import 'src/css/SideBar.css';

// const Sidebar = () => {
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showMoreModal, setShowMoreModal] = useState(false);
  
//   const navigate = useNavigate(); // useNavigate 훅을 사용하여 네비게이션 기능 추가

//   const handleLoginNavigate = () => {
//     navigate('/api/login'); // 로그인 페이지로 이동
//   };

//   return (
//     <div className="sidebar">
//       <div className="logo">
//         <h1>RookieStagram</h1>
//       </div>
//       <nav>
//         <ul>
//           <li>
//             <NavLink to="/api/main">홈</NavLink>
//           </li>
//           <li>
//             <NavLink to="/api/messages">메시지(이거 들어가시면 엄청난 서버 오류가 있습니다.. 금지 !!</NavLink>
//           </li>
//           <li>
//             <button onClick={() => setShowCreateModal(true)}>만들기</button>
//           </li>
//           <li>
//             <NavLink to="/api/profile">프로필</NavLink>
//           </li>
//           <li>
//             <button onClick={handleLoginNavigate}>로그인</button> {/* 로그인 버튼 추가 */}
//           </li>
//           <li>
//             <button onClick={() => setShowMoreModal(true)}>더 보기</button>
//           </li>
//         </ul>
//       </nav>

//       {/* 만들기 모달 */}
//       <Modal show={showCreateModal} onClose={() => setShowCreateModal(false)}>
//         <h2>만들기</h2>
//         {/* 만들기 폼을 여기에 추가 */}
//         <CreatePostForm onClose={() => setShowCreateModal(false)} />
//       </Modal>

//       {/* 더 보기 모달 */}
//       <Modal show={showMoreModal} onClose={() => setShowMoreModal(false)}>
//         <h2>더 보기</h2>
//         {/* 더 보기 관련 내용을 여기에 추가 */}
//         <p>여기에 더 보기 관련 내용을 넣으세요.</p>
//       </Modal>
//     </div>
//   );
// };

// export default Sidebar;

import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal'; // 모달 컴포넌트를 가져옵니다.
import CreatePostForm from '../Posts/CreatePostForm'; 
import "@/styles/Sidebar.css";

const Sidebar = ({ isLoggedIn }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMoreModal, setShowMoreModal] = useState(false);
  
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 네비게이션 기능 추가

  const handleLoginNavigate = () => {
    navigate('/api/login'); // 로그인 페이지로 이동
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken'); // 토큰 삭제
    navigate('/api/main'); // 메인 페이지로 이동
    window.location.reload(); // 페이지 리로드하여 로그인 상태 갱신
  };

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
          {isLoggedIn ? (
            <>
              <li>
                <NavLink to="/api/messages">메시지 - 절대 절대로 클릭금지 서버 터짐</NavLink>
              </li>
              <li>
                <button onClick={() => setShowCreateModal(true)}>만들기</button>
              </li>
              <li>
                <NavLink to="/api/profile">프로필</NavLink>
              </li>
              <li>
                <button onClick={handleLogout}>로그아웃</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button onClick={handleLoginNavigate}>로그인</button>
              </li>
              <li>
                <NavLink to="/join/register">회원가입</NavLink>
              </li>
            </>
          )}
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
