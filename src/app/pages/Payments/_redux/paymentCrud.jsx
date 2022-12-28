import axios from "axios";
export const ORDER_URL = `${process.env.REACT_APP_API_URL}/api/payment`;

export function createOrderZalopay(formData) {
  console.log(formData);
  return axios.post(`${ORDER_URL}/zalopay`, formData);
}
