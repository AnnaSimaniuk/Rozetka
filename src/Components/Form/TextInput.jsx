import { useField } from "formik";

import s from './Form.module.scss'

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className={meta.touched && meta.error ? s.inputError : ''} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={s.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TextInput;