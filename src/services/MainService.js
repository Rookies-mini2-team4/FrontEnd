import axios from "axios";

const REST_API_BASE_URL =  'http://localhost:8080/api'

const REST_API_URL = `${REST_API_BASE_URL}/main`

export const getAllPosts = () => axios.get(REST_API_URL);

export const getPostById = (id) => axios.get(`${REST_API_URL}/${id}`);  

export const createPost = (post) => axios.post(`${REST_API_URL}/write`, post);

export const updatePost = (id, post) => axios.put(`${REST_API_URL}/update/${id}`, post, {
    headers: {
        'Content-Type': 'application/json' // JSON 형식으로 데이터를 전송할 때 필요한 헤더
    }
});

        
export const deletePost = (id) => axios.delete(`${REST_API_URL}/${id}`);
    
    