import axios from "axios";
const REST_API_BASE_URL = import.meta.env.VITE_API_URL;

const VITE_API_URL = `${REST_API_BASE_URL}/user`;

export const getUserInfo = (id) => {
  const token = localStorage.getItem("jwtToken");
  return axios.get(VITE_API_URL + "/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
  });
};

export const getUserId = (userId) => {
  const token = localStorage.getItem("jwtToken");
  return axios.get(VITE_API_URL + "/nameToId/" + userId, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
  });
};

export const getFollower = (id) => {
  const token = localStorage.getItem("jwtToken");
  return axios.get(VITE_API_URL + "/" + id + "/follower", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
  });
};

export const getFollowing = (id) => {
  const token = localStorage.getItem("jwtToken");
  return axios.get(VITE_API_URL + "/" + id + "/following", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
  });
};

export const getFollowerNum = (id) => {
  const token = localStorage.getItem("jwtToken");
  return axios.get(VITE_API_URL + "/" + id + "/follower_num", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
  });
};

export const getFollowingNum = (id) => {
  const token = localStorage.getItem("jwtToken");
  return axios.get(VITE_API_URL + "/" + id + "/following_num", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
  });
};

export const updateProfile = (id, formData) => {
  const token = localStorage.getItem("jwtToken");
  return axios.patch(VITE_API_URL + "/" + id, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
  });
};

export const getProfileImg = (id) => {
  const token = localStorage.getItem("jwtToken");
  return axios.get(VITE_API_URL + "/profileImg/" + id, {
    responseType: "arraybuffer",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const searchUser = (search) => {
  const token = localStorage.getItem("jwtToken");
  return axios.get(VITE_API_URL + "/search/" + search, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPhotos = (id) => {
  const token = localStorage.getItem("jwtToken");
  return axios.get(VITE_API_URL + "/photos/" + id, {
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
