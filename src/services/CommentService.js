import axios from "axios";

const REST_API_BASE_URL =  'http://localhost:8080/api'

const COMMENT_REST_API_URL = `${REST_API_BASE_URL}/main/comments`

export const getCommentById = (id) => axios.get(`${COMMENT_REST_API_URL}`, id);

export const createComment = (id, comment) => axios.post(`${COMMENT_REST_API_URL}/${id}`, comment);

export const updateComment = (id, comment) => axios.put(`${COMMENT_REST_API_URL}/${id}`, id, comment);
        
export const deleteComment = (id) => axios.delete(`${COMMENT_REST_API_URL}/${id}`, id);
    