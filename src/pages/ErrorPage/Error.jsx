import { Link } from "react-router-dom";

import s from "./Error.module.scss";

const Error = () => {
  return (
    <div className={s.wrapper}>
      <h3 className={s.title}>Oops...</h3>
      <p>Щось пішло не так</p>
      <Link to='products/all?limit=8&skip=0'>Повернутись до головного меню</Link>
    </div>
  );
};
export default Error;
