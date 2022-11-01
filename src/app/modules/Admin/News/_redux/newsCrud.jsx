import axios from "axios";
export const NEW_URL = `${process.env.REACT_APP_API_URL}/api/new`;
// READ
// export function getAllCatetory() {
//   return axios.get(`${CATE_URL}/all`);
// }

export function getAllNews(queryParams) {
  return axios.get(`${NEW_URL}/all`, queryParams);
}
export function createNews(formData) {
  return axios.post(`${NEW_URL}/create`, formData);
}
export function updateNews(formData) {
  return axios.put(`${NEW_URL}/update`, formData);
}
export function deleteNews(id) {
  return axios.post(`${NEW_URL}/delete`, id);
}
