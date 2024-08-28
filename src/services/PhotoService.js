import axios from 'axios';

const BASE_URL = "http://localhost:8081/api/photos";

export const uploadPhoto = (file, mainId, userId, caption) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('mainId', mainId);
  formData.append('userId', userId);
  formData.append('caption', caption);

  const token = localStorage.getItem('jwtToken');

  return axios.post(`${BASE_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
  });
};

export const getImage = (filename) => {
  const token = localStorage.getItem('jwtToken');

  return axios.get(`${BASE_URL}/${filename}`, {
    responseType: 'blob', // 이미지 데이터를 binary 형식으로 받아오기 위해 responseType을 blob으로 설정
    headers: {
        
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
    
  });
};
