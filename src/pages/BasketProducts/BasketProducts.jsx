import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  selectBasketProductId,
  selectBasketProduct,
} from "../../redux/basketProducts/basketProduct";
import { selectAllProducts } from "../../redux/products/products";
import { loadAllProductsData } from "../../redux/products/productsReducer";

import Product from "../Product/Product";
import Button from "../../Components/Button/Button";
import Loader from "../../Components/Loader/Loader";

import s from "./BasketProducts.module.scss";

const BasketProducts = () => {
  const basketProductsId = useSelector(selectBasketProductId);
  const basketData = useSelector(selectBasketProduct);
  const productsData = useSelector(selectAllProducts);
  const dispatch = useDispatch();

  const basketProducts =
    !!productsData &&
    productsData.filter((product) =>
      basketProductsId.includes(String(product.id))
    );

  let totalPrice = 0;

  useEffect(() => {
    dispatch(loadAllProductsData());
  }, [dispatch]);

  const createCard = (product) => {
    const { price, id, discountPercentage } = product;
    totalPrice += Number(price * basketData[id]);

    return (
        <Product
            key={id}
            {...product}
            price={price * basketData[id]}
            discountPercentage={discountPercentage * basketData[id]}
            trash={true}
            deleteProduct={true}
            countProducts={true}
        />
    );
  };

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Кошик</h2>
      <div className={s.wrapperProduct}>
        {!!basketProducts ? (
          basketProducts.map((product) => createCard(product))
        ) : (
          <Loader />
        )}
      </div>
      <div className={s.footer}>
        <Link to="/products/all?limit=8&skip=0">
          <Button classBtn={s.btnContinueShopping}>Продовжити покупки</Button>
        </Link>
        <div className={s.finishWrapper}>
          <span className={s.totalPrice}>
            {totalPrice.toLocaleString("ua") + "₴"}
          </span>
          <Link to={'/order'}>
            <Button classBtn={s.btnFinish} disabled={basketProducts?.length===0}>
              Оформити замовлення
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BasketProducts;
