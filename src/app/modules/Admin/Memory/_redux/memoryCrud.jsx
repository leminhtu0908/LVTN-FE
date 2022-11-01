import axios from "axios";
export const MEMORY_URL = `${process.env.REACT_APP_API_URL}/api/memory`;
// READ
// export function getAllCatetory() {
//   return axios.get(`${CATE_URL}/all`);
// }

export function getAllMemory(queryParams) {
  return axios.get(`${MEMORY_URL}/all`, queryParams);
}
export function createMemory(values) {
  return axios.post(`${MEMORY_URL}/create`, values);
}
export function updateMemory(values) {
  return axios.put(`${MEMORY_URL}/update`, values);
}
export function deleteMemory(id) {
  return axios.delete(`${MEMORY_URL}/delete/${id}`);
}
