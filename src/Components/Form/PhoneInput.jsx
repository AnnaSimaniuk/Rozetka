import { useField } from "formik";
import {PatternFormat} from "react-number-format";

import s from "./Form.module.scss";

const PhoneInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <PatternFormat format="+38 (###) ###-##-##" allowEmptyFormatting mask="#" className={meta.touched && meta.error ? s.inputError : ''}  {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className={s.error}>{meta.error}</div>
            ) : null}
        </div>
    );
};

export default PhoneInput;