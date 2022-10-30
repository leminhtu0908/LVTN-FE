import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./app/pages/App";
import reportWebVitals from "./reportWebVitals";
import store, { persistor } from "./redux/store";
import * as _redux from "./redux";
import axios from "axios";
_redux.setupAxios(axios, store);
const { PUBLIC_URL } = process.env;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Fragment>
    <App store={store} persistor={persistor} basename={PUBLIC_URL} />
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
