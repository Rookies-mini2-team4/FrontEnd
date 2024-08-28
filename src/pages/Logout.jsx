import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                // 서버에 로그아웃 요청
                await axiosInstance.get('/logout');
                // 로컬 스토리지에서 토큰 제거
                localStorage.removeItem('token');
                // 로그아웃 알림
                window.alert('로그아웃 되었습니다!');
                // 로그인 페이지로 리디렉션
                navigate('/login');
            } catch (error) {
                console.error('Logout error:', error);
                window.alert('로그아웃 중 오류가 발생했습니다.');
                navigate('/login');
            }
        };

        handleLogout();
    }, [navigate]);

    return null;
}
