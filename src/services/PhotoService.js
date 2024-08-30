import axios from "axios";
const REST_API_BASE_URL = import.meta.env.VITE_API_URL;

const REST_API_URL = `${REST_API_BASE_URL}/photos`;

export const uploadPhoto = (file, mainId, userId, caption) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("mainId", mainId);
  formData.append("userId", userId);
  formData.append("caption", caption);

  const token = localStorage.getItem("jwtToken");

  return axios.post(`${REST_API_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
  });
};

export const getImage = (filename) => {
  const token = localStorage.getItem("jwtToken");

  return axios.get(`${REST_API_URL}/${filename}`, {
    responseType: "blob", // 이미지 데이터를 binary 형식으로 받아오기 위해 responseType을 blob으로 설정
    headers: {
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
  });
};

// Define the getProfileImg function
export const getProfileImg = (id) => {
  const token = localStorage.getItem("jwtToken");
  return axios.get(`${REST_API_URL}/user/profileImg/${id}`, {
    responseType: "arraybuffer", // This indicates that the response is expected to be binary data
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT token added to the header
    },
  });
};
