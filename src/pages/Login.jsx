// import PropTypes from 'prop-types'; // prop-types를 import

// import { useState } from 'react';
// import '@/styles/Login.css'; // CSS 파일
// import { useNavigate } from 'react-router-dom'; // useNavigate 불러오기

// function Login({ onLogin }) {
//   const [userId, setUserId] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate(); // useNavigate 훅 초기화
//   // 로그인 폼 제출 처리 함수
//   const handleSubmit = async (event) => {
//     event.preventDefault();
  
//     try {
//       const response = await fetch('http://localhost:8081/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId: userId, password: password }),
//       });
  
//       if (!response.ok) {
//         const errorData = await response.json();
//         // 서버에서 반환한 에러 메시지에 따라 적절한 에러 문구를 설정
//           if (errorData.message === 'User not found with userId: ') {
//               throw new Error('일치하는 ID가 없습니다.');
//           } else if (errorData.message === '자격 증명에 실패하였습니다.') {
//               throw new Error('비밀번호가 일치하지 않습니다.');
//           } else {
//               throw new Error(errorData.message || 'Login failed');
//           }
//         };
  
//       const data = await response.json();
  
//       if (data.token) {
//         localStorage.setItem('jwtToken', data.token); // JWT 토큰을 로컬 스토리지에 저장
//         console.log('Login successful!');
//         console.log('JWT Token:', data.token); // 토큰 로그 출력
//         console.log('Local Storage JWT Token:', localStorage.getItem('jwtToken')); // 로컬 스토리지에서 토큰 로그 출력
  
//         if (onLogin) {
//           onLogin(userId); // 사용자 ID를 onLogin에 전달
//         }
//         alert('로그인 되었습니다!');
//         navigate('/api/main'); // 홈 화면으로 이동
//       } else {
//         throw new Error('No token received');
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//       setMessage(`${error.message}`);
//     }
//   };
  
//   // Sign Up 버튼 클릭 시 호출될 함수
//   const handleSignUpClick = () => {
//     navigate('/join/register'); // /join 경로로 이동
//   };

//   return (
//     <div className="login-container">
//       <h2>로그인</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group1">
//           <input
//             type="text"
//             value={userId}
//             onChange={(e) => setUserId(e.target.value)}
//             placeholder="ID를 입력하세요."
//           />
//         </div>
//         <div className="form-group1">
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="패스워드를 입력하세요."
//           />
//         </div>
//         <button type="submit" className="login-button2">Sign In</button>
//         {message && <p>{message}</p>}
//       </form>
//       <div className="footer-container">
//         <span>회원이 아니신가요?</span>
//         <button className="join-button2" onClick={handleSignUpClick}>Sign Up</button> {/* Sign Up 버튼에 onClick 핸들러 추가 */}
//       </div>
//     </div>
//   );
// }
// Login.propTypes = {
//   onLogin: PropTypes.func.isRequired, // onLogin prop이 함수 타입이며 필수임을 명시
// };
// export default Login;

import PropTypes from 'prop-types'; // prop-types를 import
import { useState } from 'react';
import '@/styles/Login.css'; // CSS 파일
import { useNavigate } from 'react-router-dom'; // useNavigate 불러오기

function Login({ onLogin }) {
  const [userId, setUserId] = useState('');
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
        body: JSON.stringify({ userId: userId, password: password }),
      });
  
      if (!response.ok) {
        const contentType = response.headers.get('Content-Type');
        let errorMessage = 'Login failed';

        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          if (errorData.message === 'User not found with userId: ') {
            errorMessage = '일치하는 ID가 없습니다.';
          } else if (errorData.message === '자격 증명에 실패하였습니다.') {
            errorMessage = '비밀번호가 일치하지 않습니다.';
          } else {
            errorMessage = errorData.message || 'Login failed';
          }
        } else {
          const text = await response.text();
          errorMessage = text || 'Login failed';
        }

        throw new Error(errorMessage);
      }
  
      const data = await response.json();
  
      if (data.token) {
        localStorage.setItem('jwtToken', data.token); // JWT 토큰을 로컬 스토리지에 저장
        console.log('Login successful!');
        console.log('JWT Token:', data.token); // 토큰 로그 출력
        console.log('Local Storage JWT Token:', localStorage.getItem('jwtToken')); // 로컬 스토리지에서 토큰 로그 출력
  
        if (onLogin) {
          onLogin(userId); // 사용자 ID를 onLogin에 전달
        }
        alert('로그인 되었습니다!');
        navigate('/api/main'); // 홈 화면으로 이동
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      setMessage(error.message);
    }
  };
  
  // Sign Up 버튼 클릭 시 호출될 함수
  const handleSignUpClick = () => {
    navigate('/join/register'); // /join 경로로 이동
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group1">
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="ID를 입력하세요."
          />
        </div>
        <div className="form-group1">
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

Login.propTypes = {
  onLogin: PropTypes.func.isRequired, // onLogin prop이 함수 타입이며 필수임을 명시
};

export default Login;
