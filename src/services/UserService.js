import axios from "axios";

const REST_API_BASE_URL =  'http://localhost:8081/api'

const REST_API_URL = `${REST_API_BASE_URL}/user`

export const getUserInfo = (id) => {
    const token = localStorage.getItem("jwtToken");
    return axios.get(REST_API_URL + '/' + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
      },
    });
};

export const getUserId = (userName) => {
  const token = localStorage.getItem("jwtToken");
  return axios.get(REST_API_URL + '/nameToId/' + userName, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
  });
};

export const getPhotos = (id) => {
  const token = localStorage.getItem("jwtToken");
  return axios.get(REST_API_URL + '/' + id + '/photos', {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
  });
};

export const getFollower = (id) => {
  const token = localStorage.getItem("jwtToken");
  return axios.get(REST_API_URL + '/' + id + '/follower', {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
  });
};

export const getFollowing = (id) => {
  const token = localStorage.getItem("jwtToken");
  return axios.get(REST_API_URL + '/' + id + '/following', {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
  });
};

export const getFollowerNum = (id) => {
  const token = localStorage.getItem("jwtToken");
  return axios.get(REST_API_URL + '/' + id + '/follower_num', {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
  });
};

export const getFollowingNum = (id) => {
  const token = localStorage.getItem("jwtToken");
  return axios.get(REST_API_URL + '/' + id + '/following_num', {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
  });
};

export const updateProfile = (id, formData) => {
  const token = localStorage.getItem("jwtToken");
  return axios.patch(REST_API_URL + '/' + id, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
    },
  });
};
