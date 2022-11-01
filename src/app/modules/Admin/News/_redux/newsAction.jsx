import * as requestFromServer from "./newsCrud";

import { callTypes, newsSlice } from "./newsSlice";

const { actions } = newsSlice;

export const fetchNews = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllNews(queryParams)
    .then((response) => {
      const { data } = response;
      dispatch(actions.newsList({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const createNews = (formData) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .createNews(formData)
    .then((response) => {
      const { data } = response;
      dispatch(actions.newsCreate(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const deleteNews = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteNews(id)
    .then((response) => {
      dispatch(actions.newsDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete point";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateNews = (formData) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateNews(formData)
    .then((response) => {
      const { news } = response.data;
      dispatch(actions.newsUpdate(news));
    })
    .catch((error) => {
      error.clientMessage = "Can't update user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
