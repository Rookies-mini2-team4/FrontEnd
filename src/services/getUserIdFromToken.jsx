import jwtDecode from 'jwt-decode'; // ES 모듈로 'jwt-decode' 가져오기

// JWT 디코딩 함수
const decodeToken = (token) => {
    try {
        return jwtDecode(token); // 토큰 디코딩
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
};

// JWT에서 사용자 ID 추출 함수
const getUserIdFromToken = (token) => {
    const decodedToken = decodeToken(token);
    return decodedToken ? decodedToken.sub : null; // 'sub' 클레임에서 사용자 ID 추출
};

export { getUserIdFromToken };
