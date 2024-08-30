import { useState } from 'react';
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';
import '@/styles/Join.css';

export default function Join() {
    const [userid, setuserId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');  // 서버 에러 메시지 상태 추가
    const navigate = useNavigate();
    const REST_API_BASE_URL = import.meta.env.VITE_API_URL;

    const REST_API_URL = `${REST_API_BASE_URL}/join/register`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (password !== passwordConfirm) {
            alert("패스워드가 일치하지 않습니다!");
            return;
        }

        try {
            const response = await axios.post(REST_API_URL, {
                userId: userid, // assuming userId is same as username
                userName: name,
                password: password,
                passwordConfirm: passwordConfirm,
                email: email,
                profileImage: ""
            });

            if (response.status === 200) {
                alert("회원가입이 성공했습니다!");
                navigate('/login');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setServerError(error.response.data.message);  // 서버 응답에서 메시지 부분만 저장
            } else {
                alert("회원가입에 실패했습니다.");
            }
        }
    };

    const validateForm = () => {
        const errors = {};
        
        if (!userid.trim()) errors.userid = '아이디를 입력하세요.';
        if (!password.trim()) errors.password = '패스워드를 입력하세요.';
        if (password !== passwordConfirm) errors.passwordConfirm = '패스워드가 일치하지 않습니다.';
        if (!name.trim()) errors.name = '이름을 입력하세요.';
        if (!email.trim()) errors.email = '이메일을 입력하세요.';

        return errors;
    };

    const handleHomeClick = () => {
        navigate('/main');
    };

    const handleloginClick = () => {
        navigate('/login');
    };

    return (
        <div className="join-container">
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group2">
                    <input
                        type="text"
                        name="userid"
                        placeholder="ID를 입력하세요."
                        value={userid}
                        onChange={(e) => setuserId(e.target.value)}
                    />
                    {errors.userid && <span className="error-message">{errors.userid}</span>}
                </div>

                <div className="form-group2">
                    <input
                        type="password"
                        name="password"
                        placeholder="패스워드를 입력하세요."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="form-group2">
                    <input
                        type="password"
                        name="passwordConfirm"
                        placeholder="패스워드를 다시 입력하세요."
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                    {errors.passwordConfirm && <span className="error-message">{errors.passwordConfirm}</span>}
                </div>

                <div className="form-group2">
                    <input
                        type="text"
                        name="name"
                        placeholder="이름을 입력하세요."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group2">
                    <input
                        type="email"
                        name="email"
                        placeholder="이메일을 입력하세요."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                {/* 서버에서 발생한 오류 메시지를 표시하는 부분 */}
                {serverError && <div className="server-error-message">{serverError}</div>}

                <button type="submit" className="join-button">Sign Up</button>
                <button type="button" className="home-button" onClick={handleHomeClick}>Home</button>
                
                <div className="login-container2">
                <span>이미 회원이신가요?</span>
                <button 
                type="button" 
                className="login-button" 
                onClick={handleloginClick}
                >
                Sign In
                </button>
             </div>
            </form>
        </div>
    );
}
