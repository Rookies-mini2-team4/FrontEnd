import { useState } from 'react';
import 'src/styles/Login.css'; // CSS 파일을 불러옵니다.
import { useNavigate } from 'react-router-dom'; // useNavigate 불러오기

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // useNavigate 훅 초기화
  // 로그인 폼 제출 처리 함수
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: username, password: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('jwtToken', data.token); // JWT 토큰을 로컬 스토리지에 저장
        console.log('Login successful!');
        console.log('JWT Token:', data.token); // 토큰 로그 출력
        console.log('Local Storage JWT Token:', localStorage.getItem('jwtToken')); // 로컬 스토리지에서 토큰 로그 출력

        setMessage('Login successful!');
        if (onLogin) {
          onLogin(); // 로그인 성공 후 콜백 호출
        }
        // 로그인 성공 후 사용자의 홈 화면으로 이동
        navigate('/api/main'); // 로그인된 사용자의 홈 화면으로 이동
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      console.error('Login failed:', error); // 에러 로그 출력
      setMessage(`Login failed: ${error.message}`);
    }
  };
  // Sign Up 버튼 클릭 시 호출될 함수
  const handleSignUpClick = () => {
    navigate('/join/register'); // /join 경로로 이동
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="ID를 입력하세요."
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="패스워드를 입력하세요."
          />
        </div>
        <button type="submit" className="login-button2">Sign In</button>
        {message && <p>{message}</p>}
      </form>
      <div className="footer-container">
        <span>회원이 아니신가요?</span>
        <button className="join-button2" onClick={handleSignUpClick}>Sign Up</button> {/* Sign Up 버튼에 onClick 핸들러 추가 */}
      </div>
    </div>
  );
}

export default Login;
