import axios from "axios";

const REST_API_BASE_URL =  'http://localhost:8081/api'

const REST_API_URL = `${REST_API_BASE_URL}/follow`

export const followUser = (follow) => axios.post(REST_API_URL, follow);

export const unfollowUser = (unfollow) => axios.delete(REST_API_URL, unfollow);