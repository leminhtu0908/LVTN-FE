import axios from "axios";
export const BRAND_URL = `${process.env.REACT_APP_API_URL}/api/brand`;

export function getAllBrand(queryParams) {
  return axios.get(`${BRAND_URL}/all`, queryParams);
}
export function createBrand(values) {
  return axios.post(`${BRAND_URL}/create`, values);
}
export function updateBrand(values) {
  return axios.put(`${BRAND_URL}/update`, values);
}
export function deleteBrand(id) {
  return axios.delete(`${BRAND_URL}/delete/${id}`);
}
