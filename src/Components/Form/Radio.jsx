import { useField } from "formik";

import s from "./Form.module.scss";

const Radio = ({ children, hint='', setOption = () => {}, ...props }) => {
  const [field, meta] = useField({ ...props, type: "radio" });
  return (
    <div onClick={() => setOption(children)} className={s.radioWrapper}>
      <input
        className={s.radioInput}
        id={props.value}
        type="radio"
        {...field}
        {...props}
      />
      <label className={s.radioLabel} htmlFor={props.value}>
        {children}
          <span className={s.hint}>{hint}</span>
      </label>
      {meta.touched && meta.error ? (
        <div className={s.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Radio;
