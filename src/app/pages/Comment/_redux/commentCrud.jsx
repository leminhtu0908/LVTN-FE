import axios from "axios";
export const COMMENT_URL = `${process.env.REACT_APP_API_URL}/api/comment`;

export function getCommentByProduct(queryParams) {
  return axios.get(`${COMMENT_URL}/all`, queryParams);
}
export function createComment(values) {
  return axios.post(`${COMMENT_URL}/create`, values);
}
export function updateComment(values) {
  return axios.put(`${COMMENT_URL}/update`, values);
}
export function deleteComment(id) {
  return axios.delete(`${COMMENT_URL}/delete/${id}`);
}
