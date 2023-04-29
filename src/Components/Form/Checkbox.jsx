import { useField } from "formik";

import s from "./Form.module.scss";

const Checkbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className={s.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Checkbox;