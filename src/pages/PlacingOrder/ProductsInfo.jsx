import { useEffect } from "react";

import {useDispatch, useSelector} from "react-redux";

import { Link } from "react-router-dom";
import { loadAllProductsData } from "../../redux/products/productsReducer";
import {selectBasketProduct} from "../../redux/basketProducts/basketProduct";

import s from "./PlacingOrder.module.scss";

import edit from "../../assets/img/editing.png";

const ProductsInfo = ({basketProducts, totalPrice}) => {
  const dispatch = useDispatch();
  const basketData = useSelector(selectBasketProduct);

  useEffect(() => {
    dispatch(loadAllProductsData());
  }, [dispatch]);

  const renderProducts = (product) => {
    const { price, id, discountPercentage, thumbnail, title, category } =
      product;
    const totalPriceProduct = price * basketData[id];
    const discountPrice = Math.round(
      Number(price + (price * discountPercentage) / 100)
    ).toLocaleString("ua");

    return (
      <div key={id} className={s.productWrapper}>
        <Link className={s.productLink} to={"/products/" + category + "/" + id}>
          <img className={s.productImg} src={thumbnail} alt={title} />
          <p className={s.productTitle}>{title}</p>
        </Link>
        <div className={s.productDescription}>
          <div className={s.optionWrapper}>
            <p className={s.productOptionTitle}>Ціна</p>
            <p className={s.productPrice}>
              {Number(price).toLocaleString("ua") + "₴"}
            </p>
            <p className={s.productDiscountPrice}>{discountPrice + "₴"}</p>
          </div>
          <div className={s.optionWrapper}>
            <p className={s.productOptionTitle}>Кількість</p>
            <p className={s.productCount}>{basketData[id]}</p>
          </div>
          <div className={s.optionWrapper}>
            <p className={s.productOptionTitle}>Сума</p>
            <p className={s.productCount}>
              {totalPriceProduct.toLocaleString("ua") + "₴"}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={s.titleWrapper}>
        <h2 className={s.orderTitle}>Замовлення №1</h2>
        <p className={s.priceTotal}>
          на суму: {Number(totalPrice).toLocaleString("ua") + "₴"}
        </p>
      </div>
      <div className={s.detailsWrapper}>
        <div>
          <div className={s.productTitleWrapper}>
            <h5 className={s.loginTitle}>
              <span className={s.numEl}>1</span>Товари продавця Rozetka
            </h5>
            <Link className={s.edit} to="/user/basket">
              <img src={edit} alt="edit" />
              <p>Редагувати</p>
            </Link>
          </div>
          <div>
            {!!basketProducts &&
              basketProducts.map((product) => renderProducts(product))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsInfo;
