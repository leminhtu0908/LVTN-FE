import axios from "axios";
export const USER_URL = `${process.env.REACT_APP_API_URL}/api/user`;

export function getAllUser(queryParams) {
  return axios.get(`${USER_URL}/all`, queryParams);
}
export function getUserByEmail(queryParams) {
  return axios.get(`${USER_URL}/`, queryParams);
}
// export function createUser(values) {
//   return axios.post(`${USER_URL}/create`, values);
// }
export function updateUser(values) {
  return axios.put(`${USER_URL}/update`, values);
}
export function uploadImageUser(formData) {
  return axios.post(`${USER_URL}/upload-photo`, formData);
}
// export function deleteTypeProduct(id) {
//   return axios.delete(`${TYPEPRODUCT_URL}/delete/${id}`);
// }
