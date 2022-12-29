import axios from "axios";
export const ORDER_URL = `${process.env.REACT_APP_API_URL}/api/payment`;
export const REFUND_URL = `${process.env.REACT_APP_API_URL}/api/order`;

export function createOrderZalopay(data) {
  return axios.post(`${ORDER_URL}/zalopay`, data);
}

export function getStatusOrderZalopay(data) {
  return axios.post(`${ORDER_URL}/status`, data);
}
export function refundOrderZalopay(data) {
  return axios.post(`${REFUND_URL}/refund-money`, data);
}
export function getAllApptransidOrderZalopay(user_id) {
  const cloneValue = { user_id: user_id };
  return axios.post(`${REFUND_URL}/all-apptransid`, cloneValue);
}
