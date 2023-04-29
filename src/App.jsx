import React from "react";

import { RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import { router } from "./router";

import ModalAuth from "./Components/Modal/ModalAuth";
import { selectModalAuth } from "./redux/authorization/auth";
import s from "./App.module.scss";



const App = () => {
  const statusModalAuth = useSelector(selectModalAuth);

  return (
    <div className={s.app}>
      <RouterProvider router={router} />
      {statusModalAuth && <ModalAuth />}
    </div>
  );
};

export default App;

