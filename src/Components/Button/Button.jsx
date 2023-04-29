import s from "./Button.module.scss";
import cn from "classnames";

const Button = (props) => {
  const {
    children,
    classBtn = "",
    counter = 0,
    onClick,
    backgroundColorCounter,
    disabled = false,
    type = "button",
  } = props;

  return (
    <div className={s.buttonWrapper}>
      <button
        type={type}
        disabled={disabled}
        className={cn(s.button, classBtn)}
        onClick={onClick}
      >
        {children}
      </button>
      {counter > 0 && (
        <span
          style={{ backgroundColor: backgroundColorCounter }}
          className={s.counterBtn}
        >
          {counter}
        </span>
      )}
    </div>
  );
};

export default Button;
