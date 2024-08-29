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
import Modal from '../Modal/Modal'; // 모달 컴포넌트
import CreatePostForm from '../Posts/CreatePostForm'; 
import "@/styles/Sidebar.css";

const Sidebar = ({ isLoggedIn }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMoreModal, setShowMoreModal] = useState(false);
  
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 네비게이션 기능 추가

  // const handleLoginNavigate = () => {
  //   navigate('/api/login'); // 로그인 페이지로 이동
  // };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken'); // 토큰 삭제
    alert('로그아웃 되었습니다!');
    navigate('/api/login'); // 로그인 페이지로 이동
    window.location.reload(); // 페이지 리로드는 사용하지 않도록 수정
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/RookieStagram.png" alt="홈 아이콘" />
        
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/api/main">
              <img src="/Home.png" alt="홈 아이콘" />
              홈
            </NavLink>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <NavLink to="/api/search">
                  <img src="/Search.png" alt="검색 아이콘" />
                  검색
                </NavLink>
              </li>
              <li>
                <NavLink to="/api/chat/room">
                  <img src="/Chat Bubbles.png" alt="메시지 아이콘" />
                  메시지 새로 작성
                </NavLink>
              </li>
              <li>
                <NavLink to="/api/chat/rooms">
                  <img src="/Chat Bubbles.png" alt="메시지 아이콘" />
                  디엠 창 목록 확인
                </NavLink>
              </li>
              <li>
                <button onClick={() => setShowCreateModal(true)}>
                  <img src="/Image.png" alt="만들기 아이콘" />
                  만들기
                </button>
              </li>
              <li>
                <NavLink to="/api/myprofile">
                <img src="/User.png" alt="메시지 아이콘" />프로필</NavLink>
              </li>
              <li>
                <button onClick={handleLogout}>
                  <img src="/Sign Out.png" alt="로그아웃 아이콘" />
                  로그아웃
                </button>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li>
                <NavLink to="/api/login">로그인</NavLink>
              </li>
              <li>
                <NavLink to="/join/register">회원가입</NavLink>
              </li>
            </>
          )}
        
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
