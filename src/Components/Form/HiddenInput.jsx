import { useField } from "formik";

import s from "./Form.module.scss";

const HiddenInput = ({ ...props }) => {
  const [field, meta] = useField({ ...props, type: "hidden" });

  return (
    <div>
      <input
        className={meta.touched && meta.error ? s.inputError : ""}
        type="hidden"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={s.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default HiddenInput;
