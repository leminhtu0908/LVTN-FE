import React from "react";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import AuthInit from "../modules/Auth/_redux/AuthInit";
import Loading from "./Root/Loading";
import Router from "./Router";
import "react-toastify/dist/ReactToastify.css";

const App = ({ store, persistor, basename }) => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Loading />}>
          <IntlProvider locale="en">
            <React.Suspense fallback={<Loading />}>
              {/* <Loading /> */}
              <ToastContainer
                autoClose={2000}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
              ></ToastContainer>
              <BrowserRouter basename={basename}>
                <AuthInit>
                  <Router />
                </AuthInit>
              </BrowserRouter>
            </React.Suspense>
          </IntlProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
