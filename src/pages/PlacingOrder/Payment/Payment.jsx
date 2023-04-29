import s from "./Payment.module.scss";
import React, { useState } from "react";
import Radio from "../../../Components/Form/Radio";
import TextInput from "../../../Components/Form/TextInput";

const Payment = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <div className={s.detailsWrapper}>
      <h5 className={s.loginTitle} id="payment">
        <span className={s.numEl}>3</span>Оплата
      </h5>
      <div role="group" aria-labelledby="payment" className={s.paymentWrapper}>
        <Radio
          children="Оплата під час отримання товару"
          name="payment.type"
          value="Оплата під час отримання товару"
          setOption={setSelectedOption}
        />
        <Radio
          children="Оплатити зараз"
          name="payment.type"
          value="Оплатити зараз"
          setOption={setSelectedOption}
        />
        {selectedOption === "Оплатити зараз" && (
          <div
            role="group"
            aria-labelledby="paymentDetail"
            className={s.paymentDetailWrapper}
          >
            <Radio
              children="Картою онлайн"
              name="payment.paymentDetails"
              value="Картою онлайн"
            />
            <Radio
              children="Google Pay"
              name="payment.paymentDetails"
              value="Google Pay"
            />
            <Radio
              children="Оплатити онлайн картою 'єПідтримка'"
              name="payment.paymentDetails"
              value="Оплатити онлайн картою 'єПідтримка'"
            />
          </div>
        )}
        <Radio
          children="Безготівковими для юридичних осіб"
          name="payment.type"
          value="Безготівковими для юридичних осіб"
          hint="Оплата для юридичних осіб через розрахунковий рахунок"
          setOption={setSelectedOption}
        />
        {selectedOption === "Безготівковими для юридичних осіб" && (
          <div className={s.paymentDetailWrapper}>
            <div className={s.hint}>
              Увага! Для оплати обраним способом потрібно ввести код ЄДРПОУ
              юридичної особи, з розрахункового рахунку якої буде здійснена
              оплата
            </div>
            <TextInput label="Код ЄДРПОУ" type="text" name="payment.EDRPOU" />
            <TextInput
              label="Повна назва юридичної особи"
              type="text"
              name="payment.legalEntity"
            />
          </div>
        )}
        <Radio
          children="Безготівковий для фізичних осіб"
          name="payment.type"
          value="Безготівковий для фізичних осіб"
          hint="Оплата для фізичних осіб через розрахунковий рахунок"
          setOption={setSelectedOption}
        />
        <Radio
          children="Кредит та оплата частинами"
          name="payment.type"
          value="Кредит та оплата частинами"
          hint="Оформлення кредитів у банках партнерів"
          setOption={setSelectedOption}
        />
      </div>
    </div>
  );
};

export default Payment;
