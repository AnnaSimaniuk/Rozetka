import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import {GoogleOAuthProvider} from "@react-oauth/google";
import "./index.scss";


const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
      <GoogleOAuthProvider clientId='676193661584-kqfv1b4jmkq008mcplqc3bvtb5ap9c7n.apps.googleusercontent.com'>
          <App />
      </GoogleOAuthProvider>
  </Provider>
);
