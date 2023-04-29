import { useMemo } from "react";

import cn from "classnames";

import { useSelector } from "react-redux";
import { selectBasketProduct } from "../../redux/basketProducts/basketProduct";

import Button from "../../Components/Button/Button";

import s from "./PlacingOrder.module.scss";

const OrderConfirmation = ({
  totalPrice,
  setFieldValue,
  basketProducts,
  setSubmitting,
}) => {
  const basketData = useSelector(selectBasketProduct);
  const countAllProducts = useMemo(
    () =>
      Object.keys(basketData).length > 0 &&
      Object.values(basketData).reduce((prev, cur) => prev + cur),
    [basketData]
  );

  const handleClickSubmit = () => {
    setFieldValue("products", basketProducts, false);
    setSubmitting(true);
  };

  return (
    <div className={s.sidebar}>
      <h4 className={s.confirmationTitle}>Разом</h4>
      <div>
        <p className={s.confirmationInfo}>
          <span>
            {countAllProducts} товар{countAllProducts > 1 && "ів"} на суму:
          </span>
          <span className={s.confirmationPrice}>
            {Number(totalPrice).toLocaleString("ua") + "₴"}
          </span>
        </p>
        <p className={s.confirmationInfo}>
          <span>Вартість доставки: </span>
          <span className={s.confirmationPrice}>119₴</span>
        </p>
      </div>
      <div className={cn(s.confirmationInfo, s.confirmationTotal)}>
        <span>До сплати: </span>
        <span className={s.confirmationPriceTotal}>
          {(Number(totalPrice) + 119).toLocaleString("ua") + "₴"}
        </span>
      </div>
      <div className={s.confirmationBtnWrapper}>
        <Button
          type="submit"
          classBtn={s.confirmationBtn}
          onClick={handleClickSubmit}
        >
          Замовлення підтверджую
        </Button>
      </div>
      <div>
        <p className={s.checkout}>
          Отримання замовлення від 5 000 ₴ тільки за паспортом (Закон від
          06.12.2019 № 361-IX)
        </p>
        <p className={s.checkout}>Підтверджуючи замовлення, я приймаю умови:</p>
        <ul className={s.checkout}>
          <li>положення про обробку і захист персональних даних</li>
          <li>угоди користувача</li>
        </ul>
      </div>
    </div>
  );
};

export default OrderConfirmation;

//TODO вартість доставки
