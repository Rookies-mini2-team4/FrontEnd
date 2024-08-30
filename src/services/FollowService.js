import axios from "axios";
const REST_API_BASE_URL = import.meta.env.VITE_API_URL;

const REST_API_URL = `${REST_API_BASE_URL}/follow`;

export const followUser = (follow) => {
  const token = localStorage.getItem("jwtToken");
  return axios.post(REST_API_URL, follow, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
  });
};

export const unfollowUser = (unfollow) => {
  const token = localStorage.getItem("jwtToken");
  return axios.delete(REST_API_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
    data: unfollow,
  });
};
