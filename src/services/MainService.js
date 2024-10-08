import axios from "axios";

const REST_API_BASE_URL = import.meta.env.VITE_API_URL;
const REST_API_URL = `${REST_API_BASE_URL}/main`;
console.log(REST_API_BASE_URL);
export const getAllPosts = () => {
  const token = localStorage.getItem("jwtToken");
  return axios.get(REST_API_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
  });
};

//export const getPostById = (id) => axios.get(`${REST_API_URL}/${id}`);
export const getPostById = (id) => {
  const token = localStorage.getItem("jwtToken");
  return axios.get(`${REST_API_URL}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
  });
};

//export const createPost = (post) => axios.post(`${REST_API_URL}/write`, post);
export const createPost = (formData) => {
  const token = localStorage.getItem("jwtToken");
  return axios.post(`${REST_API_URL}/write`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
  });
};

// export const updatePost = (id, post) =>
//   axios.put(`${REST_API_URL}/update/${id}`, post, {
//     headers: {
//       "Content-Type": "application/json", // JSON 형식으로 데이터를 전송할 때 필요한 헤더
//     },
//   });
export const updatePost = (id, post) => {
  const token = localStorage.getItem("jwtToken");
  return axios.put(`${REST_API_URL}/update/${id}`, post, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
  });
};

//export const deletePost = (id) => axios.delete(`${REST_API_URL}/${id}`);
export const deletePost = (id) => {
  const token = localStorage.getItem("jwtToken");
  return axios.delete(`${REST_API_URL}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
  });
};
