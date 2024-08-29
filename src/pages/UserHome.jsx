// src/pages/UserHome.js
import { useEffect, useState } from 'react';
import { getAllPosts } from '../services/MainService';
import Post from '../components/Posts/Post';
import '../styles/MainHome.css';

const UserHome = () => {
    const [posts, setPosts] = useState([]); // 초기값을 빈 배열로 설정

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await getAllPosts(); // API 호출
                const data = response.data; // API 응답에서 데이터를 가져옴

                // 응답이 배열인지 확인하고, 그렇지 않다면 빈 배열로 설정
                if (Array.isArray(data)) {
                    setPosts(data);
                } else {
                    console.error('Unexpected response format:', data);
                    setPosts([]); // 비정상적인 응답일 경우 빈 배열로 설정
                }
            } catch (error) {
                console.error('Failed to fetch posts:', error);
                setPosts([]); // 에러 발생 시 빈 배열로 설정
            }
        }
        fetchPosts();
    }, []);
    return (
        <div>
            
            {posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
            {/* 더 많은 로그인된 사용자를 위한 컨텐츠를 추가 */}
        </div>
    );
};

export default UserHome;