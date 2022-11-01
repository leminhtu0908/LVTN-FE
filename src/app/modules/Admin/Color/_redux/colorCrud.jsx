import axios from "axios";
export const COLOR_URL = `${process.env.REACT_APP_API_URL}/api/color`;
// READ
// export function getAllCatetory() {
//   return axios.get(`${CATE_URL}/all`);
// }

export function getAllColor(queryParams) {
  return axios.get(`${COLOR_URL}/all`, queryParams);
}
export function createColor(values) {
  return axios.post(`${COLOR_URL}/create`, values);
}
export function updateColor(values) {
  return axios.put(`${COLOR_URL}/update`, values);
}
export function deleteColor(id) {
  return axios.delete(`${COLOR_URL}/delete/${id}`);
}
