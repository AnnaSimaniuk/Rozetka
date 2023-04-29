import { useEffect, useState } from "react";

import { useGoogleLogin } from "@react-oauth/google";
import { getInfoGoogleAuth } from "../../api/useHTTPRequest";
import { Field } from "formik";
import cn from "classnames";

import TextInput from "../../Components/Form/TextInput";
import PhoneInput from "../../Components/Form/PhoneInput";
import Button from "../../Components/Button/Button";

import s from "./PlacingOrder.module.scss";

import facebook from "../../assets/img/facebook.png";
import google from "../../assets/img/google.png";

const UserLogin = ({ setFieldValue }) => {
  const [userLogin, setUserLogin] = useState(false);
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      getInfoGoogleAuth(user, setProfile);
      setFieldValue('user.email', profile.email, false)
      setFieldValue('user.lastName', profile.family_name, false)
      setFieldValue('user.firstName', profile.given_name, false)
    }
  }, [profile.email, profile.family_name, profile.given_name, setFieldValue, user]);

  return (
    <div className={s.loginWrapper}>
      <h5 className={s.loginTitle}>
        <span className={s.numEl}>1</span>Ваші контактні дані
      </h5>
      <div className={s.btnLoginWrapper}>
        <label
          className={cn(s.btnLogin, userLogin ? "" : s.activeBtn)}
          onClick={() => setUserLogin(false)}
        >
          <Field
            type="radio"
            name="user.type"
            value="new"
            className={s.inputHidden}
          />
          Я новий покупець
        </label>
        <label
          className={cn(s.btnLogin, userLogin ? s.activeBtn : "")}
          onClick={() => setUserLogin(true)}
        >
          <Field
            type="radio"
            name="user.type"
            value="registered"
            className={s.inputHidden}
          />
          Я постійний клієнт
        </label>
      </div>
      {userLogin ? (
        <div>
          <div className={s.userWrapper}>
            {Object.keys(profile).length === 0 ? (
              <div className={s.loginUserWrapper}>
                <p className={s.loginUserText}>Увійти як користувач</p>
                <div className={s.loginBtnWrapper}>
                  <Button classBtn={s.userBtn} type='button'>
                    <img src={facebook} alt="facebook" />
                    Facebook
                  </Button>
                  <Button classBtn={s.userBtn} onClick={() => login()} type='button'>
                    <img src={google} alt="google" />
                    Google
                  </Button>
                </div>
              </div>
            ) : (
              <div className={s.userContent}>
                <h3 className={s.loginUserText}>Вітаємо {profile.name}</h3>
                <p className={s.loginUserText}>Перевірте правильність даних:</p>
                <TextInput
                  label="Електронна пошта"
                  name="user.email"
                  type="text"
                />
                <TextInput
                  label="Прізвище"
                  name="user.lastName"
                  type="text"
                />
                <TextInput
                  label="Ім'я"
                  name="user.firstName"
                  type="text"
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={s.inputWrapper}>
          <TextInput label="Прізвище" name="user.lastName" type="text" />
          <TextInput label="Ім'я" name="user.firstName" type="text" />
          <PhoneInput
            label="Мобільний телефон"
            name="user.mobilePhone"
            type="text"
          />
          <TextInput label="Електронна пошта" name="user.email" type="text" />
        </div>
      )}
    </div>
  );
};

export default UserLogin;

//TODO реєстрацію через фейсбук
