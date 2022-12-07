import axios from "axios";
export const DASHBOARD_URL = `${process.env.REACT_APP_API_URL}/api/dashboard`;
export function getDashboard(queryParams) {
  return axios.get(`${DASHBOARD_URL}`, queryParams);
}
