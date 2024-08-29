// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import Sidebar from './components/SideBar';
// // import MainHome from './components/MainHome'; // MainHome 컴포넌트를 불러옵니다.
// // import './App.css'; // App의 전반적인 레이아웃을 위한 CSS 파일
// // import PostDetail from './components/PostDetail';
// // import EditPost from './components/EditPost';
// // import Login from './login';
// // import MessagePage from './components/MessagePage';

// // function App() {
// //     return (
// //         <Router>
// //             <div className="app">
// //                 <Sidebar />
// //                 <div className="content">
// //                     <Routes>
// //                         <Route path="/api/main" element={<MainHome />} />
// //                         <Route path="/api/main/:id" element={<PostDetail />} />
// //                         <Route path="/api/main/update/:id" element={<EditPost />} />
// //                         <Route path="/api/login" element={<Login />} />
// //                         <Route path="/api/messages" element={<MessagePage />} />

// //                     </Routes>
// //                 </div>
// //             </div>
// //         </Router>
// //     );
// // }

// export default App;
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/SideBar';
import MainHome from '@/pages/MainHome'; // 로그인하지 않은 사용자를 위한 홈 컴포넌트
import UserHome from '@/pages/UserHome'; // 로그인한 사용자를 위한 홈 컴포넌트
import './styles/App.css'; // App의 전반적인 레이아웃을 위한 CSS 파일
import PostDetail from './components/Posts/PostDetail';
import EditPost from './components/Posts/EditPost';
import Login from '@/pages/Login';
import Join from '@/pages/Join';
import CreatePostForm from './components/Posts/CreatePostForm'; // 글 작성 폼 추가
import ProtectedRoute from './routes/ProtectedRoute'; // ProtectedRoute 가져오기
import Profile from "@/pages/Profile";
import UpdateProfile from "@/pages/UpdateProfile";
import Logout from '@/pages/Logout'; // 로그아웃 페이지
import Search from "@/pages/Search"
import ChatRooms from './components/Chat/ChatRooms';
import ChatRoom from './components/Chat/ChatRoom';  // 개별 채팅방 컴포넌트
import CreateChatRoom from './components/Chat/CreateChatRoom';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // 페이지 로드 시 JWT 토큰을 확인하여 로그인 상태를 설정
        const token = localStorage.getItem('jwtToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };
    const ChatRoomPage = () => {
        const { chatRoomId } = useParams();
        return <ChatRoom chatRoomId={chatRoomId} />;
    };

    return (
        <Router>
            <div className="app">
                <Sidebar isLoggedIn={isLoggedIn} />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Navigate to="/api/main" />} />
                        <Route path="/api/main" element={isLoggedIn ? <UserHome /> : <MainHome />} />
                        <Route path="/api/main/:id" element={<PostDetail />} />
                        <Route path="/api/main/update/:id" element={<EditPost />} />
                        <Route path="/api/login" element={<Login onLogin={handleLogin} />} />
                        <Route path="/join/register" element={<Join />} />

                        <Route path="api/chat/rooms" element={<ChatRooms />} />  {/* 채팅방 목록 페이지 */}
                        <Route path="/chat/:chatRoomId" element={<ChatRoomPage />} />


                        <Route path="api/chat/room" element={<CreateChatRoom />} />

                        <Route 
                            path="/api/create-post" 
                            element={
                                <ProtectedRoute element={() => <CreatePostForm />} />
                            } 
                        />
                        
                        <Route path="/api/myprofile" element={<Profile />} />
                        <Route path="/api/profile/:id" element={<Profile />} />
                        <Route path="/api/updateProfile" element={<UpdateProfile />} />
                        <Route path="/api/logout" element={<Logout />} /> {/* 로그아웃 페이지 추가 */}
                        <Route path="/api/search" element={<Search />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;