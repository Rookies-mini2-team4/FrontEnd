// import { useState } from 'react';
// import axios from 'axios';  
// import { useNavigate } from 'react-router-dom';
// import 'src/css/Join.css';

// export default function Join() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [passwordConfirm, setPasswordConfirm] = useState('');
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [errors, setErrors] = useState({});
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         const validationErrors = validateForm();
//         if (Object.keys(validationErrors).length > 0) {
//             setErrors(validationErrors);
//             return;
//         }

//         if (password !== passwordConfirm) {
//             alert("패스워드가 일치하지 않습니다!");
//             return;
//         }

//         try {
//             const response = await axios.post('http://localhost:8080/api/join/register', {
//                 userId: username, // assuming userId is same as username
//                 userName: name,
//                 password: password,
//                 passwordConfirm: passwordConfirm,
//                 email: email,
//                 profileImage: "" // If there's no profile image, you can send an empty string or null
//             });
            
            
//             if (response.status === 200) {
//                 alert("회원가입이 성공했습니다!");
//                 navigate('/login');
//             }
//         } catch (error) {
//             console.error('회원가입 에러:', error);
//             alert("회원가입에 실패했습니다.");
//         }
//     };

//     const validateForm = () => {
//         const errors = {};
        
//         if (!username.trim()) errors.username = '아이디를 입력하세요.';
//         if (!password.trim()) errors.password = '패스워드를 입력하세요.';
//         if (password !== passwordConfirm) errors.passwordConfirm = '패스워드가 일치하지 않습니다.';
//         if (!name.trim()) errors.name = '이름을 입력하세요.';
//         if (!email.trim()) errors.email = '이메일을 입력하세요.';

//         return errors;
//     };

//     const handleHomeClick = () => {
//         navigate('/home');
//     };

//     const handleloginClick = () => {
//         navigate('/login');
//     };

//     return (
//         <div className="join-container">
//             <h2>회원가입 페이지입니다.</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <input
//                         type="text"
//                         name="username"
//                         placeholder="ID를 입력하세요."
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                     {errors.username && <span className="error-message">{errors.username}</span>}
//                 </div>

//                 <div className="form-group">
//                     <input
//                         type="password"
//                         name="password"
//                         placeholder="패스워드를 입력하세요."
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     {errors.password && <span className="error-message">{errors.password}</span>}
//                 </div>

//                 <div className="form-group">
//                     <input
//                         type="password"
//                         name="passwordConfirm"
//                         placeholder="패스워드를 다시 입력하세요."
//                         value={passwordConfirm}
//                         onChange={(e) => setPasswordConfirm(e.target.value)}
//                     />
//                     {errors.passwordConfirm && <span className="error-message">{errors.passwordConfirm}</span>}
//                 </div>

//                 <div className="form-group">
//                     <input
//                         type="text"
//                         name="name"
//                         placeholder="이름을 입력하세요."
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                     />
//                     {errors.name && <span className="error-message">{errors.name}</span>}
//                 </div>

//                 <div className="form-group">
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="이메일을 입력하세요."
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                     {errors.email && <span className="error-message">{errors.email}</span>}
//                 </div>

//                 <button type="submit" className="join-button">Sign Up</button>
//                 <button type="button" className="home-button" onClick={handleHomeClick}>Home</button>
                
//                 <div className="login-container">
//                 <span>이미 회원이신가요?</span>
//                 <button 
//                 type="button" 
//                 className="login-button" 
//                 onClick={handleloginClick}
//                 >
//                 Sign In
//                 </button>
//              </div>
//             </form>
//         </div>
//     );
// }

import { useState } from 'react';
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';
import 'src/styles/Join.css';

export default function Join() {
    const [userid, setuserId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

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
            const response = await axios.post('http://localhost:8080/api/join/register', {
                userId: userid, // assuming userId is same as username
                userName: name,
                password: password,
                passwordConfirm: passwordConfirm,
                email: email,
                profileImage: "" // If there's no profile image, you can send an empty string or null
            });

            // 리디렉션 처리
            if (response.status === 302) {
                // 서버가 /login으로 리디렉션하려고 하면, 프론트엔드에서 직접 처리
                navigate('/api/login');
            } else if (response.status === 200) {
                alert("회원가입이 성공했습니다!");
                navigate('/api/login');
            }
        } catch (error) {
            console.error('회원가입 에러:', error);
            alert("회원가입에 실패했습니다.");
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
        navigate('/api/main');
    };

    const handleloginClick = () => {
        navigate('/api/login');
    };

    return (
        <div className="join-container">
            <h2>회원가입 페이지입니다.</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        name="userid"
                        placeholder="ID를 입력하세요."
                        value={userid}
                        onChange={(e) => setuserId(e.target.value)}
                    />
                    {errors.userid && <span className="error-message">{errors.userid}</span>}
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="패스워드를 입력하세요."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        name="passwordConfirm"
                        placeholder="패스워드를 다시 입력하세요."
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                    {errors.passwordConfirm && <span className="error-message">{errors.passwordConfirm}</span>}
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="name"
                        placeholder="이름을 입력하세요."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="이메일을 입력하세요."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <button type="submit" className="join-button">Sign Up</button>
                <button type="button" className="home-button" onClick={handleHomeClick}>Home</button>
                
                <div className="login-container">
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
