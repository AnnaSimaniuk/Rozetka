import { useDispatch, useSelector } from "react-redux";
import {
  counterDecrement,
  counterIncrement,
  selectBasketProduct,
} from "../../redux/basketProducts/basketProduct";

import Button from "../Button/Button";

import s from "./CounterProducts.module.scss";

const CounterProducts = ({ id, stock }) => {
  const dispatch = useDispatch();
  const counter = useSelector(selectBasketProduct);

  const handleClickIncrementCounter = () => {
    dispatch(counterIncrement(id));
  };

  const handleClickDecrementCounter = () => {
    dispatch(counterDecrement(id));
  };

  return (
    <div className={s.wrapper}>
      <Button
        classBtn={s.btn}
        onClick={handleClickDecrementCounter}
        disabled={counter[id] === 1}
      >
        ╺
      </Button>
      <div className={s.counter}>{counter[id]}</div>
      <Button classBtn={s.btn} onClick={handleClickIncrementCounter} disabled={counter[id] === stock}>
        +
      </Button>
    </div>
  );
};

export default CounterProducts;