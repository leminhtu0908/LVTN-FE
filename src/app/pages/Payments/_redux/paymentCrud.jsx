import axios from "axios";
export const ORDER_URL = `${process.env.REACT_APP_API_URL}/api/payment`;

export function createOrderZalopay(data) {
  return axios.post(`${ORDER_URL}/zalopay`, data);
}

export function getStatusOrderZalopay(data) {
  return axios.post(`${ORDER_URL}/status`, data);
}
