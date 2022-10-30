import { toast } from "react-toastify";
import * as rootAction from "./../app/pages/Root/_redux/rootAction";
// const dispatch = useDispatch();
export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    (config) => {
      const {
        auth: { authToken },
      } = store.getState();
      store.dispatch(rootAction.setLoading({ isLoading: true }));
      if (authToken?.token) {
        config.headers.Authorization = `Bearer ${authToken?.token}`;
      }
      return config;
    },
    (err) => {
      Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      setTimeout(() => {
        store.dispatch(rootAction.setLoading({ isLoading: false }));
        toast.success(response?.data?.message);
      }, 500);

      return response;
    },
    (error) => {
      store.dispatch(rootAction.setLoading({ isLoading: false }));
      toast.error(error.response.data);
      return error;
    }
  );
}
