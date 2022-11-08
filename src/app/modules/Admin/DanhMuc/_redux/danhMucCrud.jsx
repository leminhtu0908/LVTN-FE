import axios from "axios";
export const CATE_URL = `${process.env.REACT_APP_API_URL}/api/category`;
// READ
// export function getAllCatetory() {
//   return axios.get(`${CATE_URL}/all`);
// }

export function getAllCatetories(queryParams) {
  return axios.get(`${CATE_URL}/all`, queryParams);
}
export function getAllCatetory(queryParams) {
  return axios.get(`${CATE_URL}/search`, queryParams);
}
export function getOneCatetory(queryParams) {
  return axios.get(`${CATE_URL}/findOne`, queryParams);
}
export function createCatetory(values) {
  return axios.post(`${CATE_URL}/create`, values);
}
export function updateCatetory(values) {
  return axios.put(`${CATE_URL}/update`, values);
}
export function deleteCatetory(id) {
  return axios.delete(`${CATE_URL}/delete/${id}`);
}
