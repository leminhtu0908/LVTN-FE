import axios from "axios";
export const ORDER_URL = `${process.env.REACT_APP_API_URL}/api/order`;

export function getAllOrder(queryParams) {
  return axios.get(`${ORDER_URL}/all`, queryParams);
}
export function getAllOrderUserHistory(queryParams) {
  return axios.get(`${ORDER_URL}/by-user`, queryParams);
}

export function updateStatusOrder(queryParams) {
  return axios.put(`${ORDER_URL}/update-status`, queryParams);
}
export function updateOrderPay(queryParams) {
  return axios.put(`${ORDER_URL}/update-payment`, queryParams);
}

export function exportExcel() {
  return axios.get(`${ORDER_URL}/export-excel`, {
    responseType: "blob",
  });
}
export function deleteOrderUser(id) {
  return axios.post(`${ORDER_URL}/delete/`, { id: id });
}
