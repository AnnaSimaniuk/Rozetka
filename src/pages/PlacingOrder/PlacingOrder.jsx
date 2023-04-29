import { useEffect, useMemo, useState } from "react";

import { useSelector } from "react-redux";

import { Form, Formik } from "formik";
import * as Yup from "yup";

import {
  selectBasketProduct,
  selectBasketProductId,
} from "../../redux/basketProducts/basketProduct";
import { selectAllProducts } from "../../redux/products/products";

import { mobilePhoneRules } from "../../tools/validationRules";

import UserLogin from "./UserLogin";
import ProductsInfo from "./ProductsInfo";
import Delivery from "./Delivery/Delivery";
import Payment from "./Payment/Payment";
import OrderConfirmation from "./OrderConfirmation";
import ModalOrder from "./Modal/ModalOrder";

import s from "./PlacingOrder.module.scss";

const PlacingOrder = () => {
  const initialValues = {
    user: {
      type: "new",
      firstName: "",
      lastName: "",
      mobilePhone: "",
      email: "",
    },
    products: [],
    postOffice: {},
    payment: {
      type: "",
      paymentDetails: "",
      EDRPOU: "",
      legalEntity: "",
    },
  };
  const basketProductsId = useSelector(selectBasketProductId);
  const productsData = useSelector(selectAllProducts);
  const basketData = useSelector(selectBasketProduct);
  const [totalPrice, setTotalPrise] = useState(0);
  const [modal, setModal] = useState(false);

  const basketProducts = useMemo(
    () =>
      !!productsData &&
      productsData.filter((product) =>
        basketProductsId.includes(String(product.id))
      ),
    [basketProductsId, productsData]
  );

  useEffect(() => {
    if (!!basketProducts) {
      let value = 0;
      basketProducts.forEach(
        (product) => (value += product.price * basketData[product.id])
      );
      setTotalPrise(value);
    }
  }, [basketData, basketProducts]);

  const validation = Yup.object().shape({
    user: Yup.object().shape({
      type: Yup.string().required("Required"),
      firstName: Yup.string()
        .when("type", {
          is: "new",
          then: (validation) =>
            validation
              .max(15, "Must be 15 characters or less")
              .required("Required"),
        })
        .when("type", {
          is: "registered",
          then: (validation) =>
            validation.max(15, "Must be 15 characters or less"),
        }),
      lastName: Yup.string()
        .when("type", {
          is: "new",
          then: (validation) =>
            validation
              .max(20, "Must be 20 characters or less")
              .required("Required"),
        })
        .when("type", {
          is: "registered",
          then: (validation) =>
            validation.max(15, "Must be 15 characters or less"),
        }),
      email: Yup.string()
        .when("type", {
          is: "new",
          then: (validation) =>
            validation.email("Invalid email address").required("Required"),
        })
        .when("type", {
          is: "registered",
          then: (validation) => validation.email("Invalid email address"),
        }),
      mobilePhone: Yup.string().when("type", {
        is: "new",
        then: (validation) =>
          validation
            .matches(mobilePhoneRules, {
              message: "Enter a valid phone number",
            })
            .required("Required"),
      }),
    }),
    postOffice: Yup.object()
      .required("Please choose post office")
      .test(
        "object-length",
        "Please choose post office",
        (obj) => Object.keys(obj).length > 1
      ),
    payment: Yup.object().shape({
      type: Yup.string()
        .min(1, "You need to choose one of the payment types")
        .required("Required"),
      paymentDetails: Yup.string().when("type", {
        is: "Оплатити зараз",
        then: (validation) =>
          validation
            .required("Required")
            .min(1, "You need to choose one of the payment types"),
      }),
      EDRPOU: Yup.number().when("type", {
        is: "Безготівковими для юридичних осіб",
        then: (validation) =>
          validation
            .required("Required")
            .test(
              "is-eight-digits",
              "The EDRPOU code must contain 8 characters",
              (value) => value && value.toString().length === 8
            ),
      }),
      legalEntity: Yup.string().when("type", {
        is: "Безготівковими для юридичних осіб",
        then: (validation) =>
          validation
            .required("Required")
            .min(3, "Enter the exact name of the company"),
      }),
    }),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setModal(true);
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Оформлення замовлення</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validation}
      >
        {({ setSubmitting, setFieldValue }) => (
          <Form>
            <div className={s.wrapperForm}>
              <div className={s.wrapperContent}>
                <UserLogin setFieldValue={setFieldValue} />
                <ProductsInfo
                  basketProducts={basketProducts}
                  totalPrice={totalPrice}
                />
                <Delivery setFieldValue={setFieldValue} />
                <Payment />
              </div>
              <OrderConfirmation
                setSubmitting={setSubmitting}
                totalPrice={totalPrice}
                setFieldValue={setFieldValue}
                basketProducts={basketProducts}
              />
            </div>
            {modal && <ModalOrder />}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PlacingOrder;

//TODO валідація по відділенню проходить добре, але потрібно вивести помилку

