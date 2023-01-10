import axios from "axios";
export const IMAGE_URL = `${process.env.REACT_APP_API_URL}/api/image`;
// READ
// export function getAllCatetory() {
//   return axios.get(`${CATE_URL}/all`);
// }

export function getAllImage(queryParams) {
  return axios.get(`${IMAGE_URL}/all`, queryParams);
}
export function createImage(values) {
  return axios.post(`${IMAGE_URL}/upload-photo`, values);
}
export function deleteImage(values) {
  return axios.post(`${IMAGE_URL}/delete`, values);
}
