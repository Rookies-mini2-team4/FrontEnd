import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8081/api";

const COMMENT_REST_API_URL = `${REST_API_BASE_URL}/main/comments`;

//export const getCommentById = (id) => axios.get(`${COMMENT_REST_API_URL}/${id}`);
export const getCommentById = (id) => {
  const token = localStorage.getItem("jwtToken");
  return axios.get(`${COMMENT_REST_API_URL}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
  });
};


// export const createComment = (comment) => axios.post(`${COMMENT_REST_API_URL}`, comment, {
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });
export const createComment = (comment) => {
  const token = localStorage.getItem("jwtToken");
  return axios.post(`${COMMENT_REST_API_URL}`, comment, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
  });
};

// export const updateComment = (id, comment) => axios.put(`${COMMENT_REST_API_URL}/${id}`, comment, {
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });
export const updateComment = (id, comment) => {
  const token = localStorage.getItem("jwtToken");
  return axios.put(`${COMMENT_REST_API_URL}/${id}`, comment, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
  });
};

//export const deleteComment = (id) => axios.delete(`${COMMENT_REST_API_URL}/${id}`);
export const deleteComment = (id) => {
  const token = localStorage.getItem("jwtToken");
  return axios.delete(`${COMMENT_REST_API_URL}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
  });
};
