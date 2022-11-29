import axios from "axios";
export const PRODUCT_URL = `${process.env.REACT_APP_API_URL}/api/product`;
// READ
// export function getAllCatetory() {
//   return axios.get(`${CATE_URL}/all`);
// }

export function getProducts(queryParams) {
  return axios.get(`${PRODUCT_URL}`, queryParams);
}
export function getProductByName(queryParams) {
  return axios.get(`${PRODUCT_URL}/byname`, queryParams);
}
export function getProductByNameAndPanigate(queryParams) {
  return axios.get(`${PRODUCT_URL}/byname-and-panigate`, queryParams);
}
export function getDetailProduct(queryParams) {
  return axios.get(`${PRODUCT_URL}/detail`, queryParams);
}
export function createProduct(formData) {
  return axios.post(`${PRODUCT_URL}/create`, formData);
}
export function updateProduct(formData) {
  return axios.put(`${PRODUCT_URL}/update`, formData);
}
export function deleteProduct(id) {
  return axios.post(`${PRODUCT_URL}/delete`, id);
}
