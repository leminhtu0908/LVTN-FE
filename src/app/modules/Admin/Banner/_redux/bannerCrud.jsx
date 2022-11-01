import axios from "axios";
export const BANNER_URL = `${process.env.REACT_APP_API_URL}/api/banner`;
// READ
// export function getAllCatetory() {
//   return axios.get(`${CATE_URL}/all`);
// }

export function getAllBanner(queryParams) {
  return axios.get(`${BANNER_URL}/all`, queryParams);
}
export function createBanner(values) {
  return axios.post(`${BANNER_URL}/upload`, values);
}
export function updateBanner(values) {
  return axios.put(`${BANNER_URL}/update`, values);
}
export function deleteBanner(values) {
  return axios.post(`${BANNER_URL}/delete`, values);
}
