import { useState } from "react";

import { useDispatch } from "react-redux";

import { closeModalAuth, successfulAuth } from "../../redux/authorization/auth";

import Modal from "./Modal";
import Button from "../Button/Button";

import s from "./Modal.module.scss";

import facebook from "../../assets/img/facebook.png";
import google from "../../assets/img/google.png";

const ModalAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closeModalAuth());
    document.body.style.overflowY = "auto";
  };

  const authorization = () => {
    dispatch(successfulAuth());
    document.body.style.overflowY = "auto";
  };

  return (
    <Modal closeModal={closeModal}>
      <h3 className={s.modalTitle}>Вхід</h3>
      <div className={s.modalInner}>
        <div className={s.modalContent}>
          <label className={s.modalLabel}>
            {" "}
            Ел. пошта або телефон
            <input
              className={s.modalInput}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className={s.modalLabel}>
            {" "}
            Пароль
            <input
              className={s.modalInput}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <Button classBtn={s.modalBtnAuth} onClick={authorization}>
            Увійти
          </Button>
        </div>
        <div className={s.loginUserWrapper}>
          <p className={s.loginUserText}>Увійти як користувач</p>
          <Button classBtn={s.userBtn}>
            <img src={facebook} alt="facebook" />
            Facebook
          </Button>
          <Button classBtn={s.userBtn}>
            <img src={google} alt="google" />
            Google
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default ModalAuth