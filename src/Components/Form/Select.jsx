import {useField} from "formik";

import s from "./Form.module.scss";

const Select = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={s.selectWrapper}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} className={s.select}/>
      {meta.touched && meta.error ? (
        <div className={s.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Select;