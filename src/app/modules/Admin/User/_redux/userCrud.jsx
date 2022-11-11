import axios from "axios";
export const USER_URL = `${process.env.REACT_APP_API_URL}/api/user`;

export function getAllUser(queryParams) {
  return axios.get(`${USER_URL}/all`, queryParams);
}
// export function createUser(values) {
//   return axios.post(`${USER_URL}/create`, values);
// }
// export function updateTypeProduct(values) {
//   return axios.put(`${TYPEPRODUCT_URL}/update`, values);
// }
export function uploadImageUser(formData) {
  return axios.post(`${USER_URL}/upload-photo`, formData);
}
// export function deleteTypeProduct(id) {
//   return axios.delete(`${TYPEPRODUCT_URL}/delete/${id}`);
// }
