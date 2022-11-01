import axios from "axios";
export const TYPEPRODUCT_URL = `${process.env.REACT_APP_API_URL}/api/type-product`;
// READ
// export function getAllCatetory() {
//   return axios.get(`${CATE_URL}/all`);
// }

export function getAllTypeProduct(queryParams) {
  return axios.get(`${TYPEPRODUCT_URL}/all`, queryParams);
}
export function createTypeProduct(values) {
  return axios.post(`${TYPEPRODUCT_URL}/create`, values);
}
export function updateTypeProduct(values) {
  return axios.put(`${TYPEPRODUCT_URL}/update`, values);
}
export function deleteTypeProduct(id) {
  return axios.delete(`${TYPEPRODUCT_URL}/delete/${id}`);
}
