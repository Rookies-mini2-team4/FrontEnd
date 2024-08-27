


// JWT 디코딩 함수
// const decodeToken = (token) => {
//     try {
//         const { default: jwtDecode } = import('jwt-decode');
//         return jwtDecode(token); // 토큰 디코딩
//     } catch (error) {
//         console.error("Invalid token", error);
//         return null;
//     }
// };

// // JWT에서 사용자 ID 추출 함수
// const IdFromToken = (token) => {
//     const decodedToken = decodeToken(token);
//     return decodedToken ? decodedToken.sub : null; // 'sub' 클레임에서 사용자 ID 추출
// };

// export default IdFromToken;


// const IdFromToken = ( token ) => {
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const decodeToken = async () => {
//       try {
//         console.log(token);
//         const { default: jwtDecode } = await import('jwt-decode');
//         const decodedToken = jwtDecode(token);
//         setUserId(decodedToken.sub); // Assuming `id` is the key you want
//         console.log(decodedToken);
//       } catch (error) {
//         console.error("Invalid token", error);
//       }
//     };

//     if (token) {
//       decodeToken();
//     }
//   }, [token]);

//   return (
//     userId
//   );
// };
// export default IdFromToken;

// import React, { useEffect, useState } from 'react';
// import jwtDecode from 'jwt-decode'; // Vite와 호환되는 방식으로 import

// const IdFromToken = ({ token }) => {
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const decodeToken = () => {
//       if (token) {
//         try {
//           const decodedToken = jwtDecode(token);
//           setUserId(decodedToken.sub); // 'sub' 클레임에서 사용자 ID 추출
//         } catch (error) {
//           console.error("Invalid token", error);
//         }
//       }
//     };

//     decodeToken(); // 컴포넌트가 렌더링될 때마다 토큰 디코딩
//   }, [token]);

//   return (
//     <div>
//       {userId ? <p>User ID: {userId}</p> : <p>Loading...</p>}
//     </div>
//   );
// };

// export default IdFromToken;

import { useEffect, useState } from 'react';

const IdFromToken = ({ token }) => {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const fetchJwtDecode = async () => {
      try {
        const module = await import('jwt-decode');
        const jwtDecode = module.default || module; // Ensure compatibility
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.subject); // Assuming 'sub' is the key you want
        console.log(0);
      } catch (error) {
        console.error("Invalid token", error);
      }
    };

    if (token) {
      fetchJwtDecode();
    }
  });

  return (
    userId
  );
};

export default IdFromToken;
