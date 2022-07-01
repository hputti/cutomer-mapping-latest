import React from "react";
import ReactDOM from "react-dom";
import store from "./store/store";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  </Provider>,
  document.getElementById("root")
);
