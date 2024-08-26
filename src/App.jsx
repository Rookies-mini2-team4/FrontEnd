import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/SideBar';
import MainHome from './components/MainHome'; // MainHome 컴포넌트를 불러옵니다.
import './App.css'; // App의 전반적인 레이아웃을 위한 CSS 파일
import PostDetail from './components/PostDetail';
import EditPost from './components/EditPost';

function App() {
    return (
        <Router>
            <div className="app">
                <Sidebar />
                <div className="content">
                    <Routes>
                        <Route path="/api/main" element={<MainHome />} />
                        <Route path="/api/main/:id" element={<PostDetail />} />
                        <Route path="/api/main/update/:id" element={<EditPost />} />
                        {/* 다른 경로들 추가 */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
