import {useContext, useEffect, useState} from "react";

import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";

import {ProductsContextStore} from "../Products/ProductsDisplayContext";
import { openModalAuth, selectAuth } from "../../redux/authorization/auth";
import {
  addToFavourites,
  selectFavouriteProductsId,
  removeFromFavourites,
} from "../../redux/favioriteProducts/favouriteProduct";
import {
  addToBasket,
  selectBasketProductId,
  removeFromBasket,
} from "../../redux/basketProducts/basketProduct";

import Button from "../../Components/Button/Button";
import Modal from "../../Components/Modal/Modal";
import { Link } from "react-router-dom";
import CounterProducts from "../../Components/CounterProducts/CounterProducts";
import Rating from "../../Components/Raiting/Rating";


import s from "./Product.module.scss";

import heardOrange from "../../assets/img/heartOrange.png";
import heardFill from "../../assets/img/heartFill.png";
import trashIcon from "../../assets/img/trash.png";
import basketGreen from "../../assets/img/basketGreen.png";
import basketFill from "../../assets/img/basketFill.png";

const Product = (props) => {
  const {
    thumbnail,
    title,
    price,
    discountPercentage,
    id,
    category,
    rating,
    stock,
    trash = false,
    deleteProduct = false,
    countProducts = false,
  } = props;

  const [statusBasket, setStatusBasket] = useState(false);
  const [statusHeart, setStatusHeart] = useState(false);
  const [addProductModal, setAddProductModal] = useState(false);
  const [deleteProductModal, setDeleteProductModal] = useState(false);

  const discountPrice = Math.round(
    Number(price + (price * discountPercentage) / 100)
  ).toLocaleString("ua");

  const favoriteProductsId = useSelector(selectFavouriteProductsId);
  const basketProductsId = useSelector(selectBasketProductId);
  const authorization = useSelector(selectAuth);
  const dispatch = useDispatch();

  const { displayProducts } = useContext(ProductsContextStore);

  const handleClickHeard = () => {
    if (authorization) {
      if (statusHeart) {
        dispatch(removeFromFavourites(id));
        setStatusHeart(false);
      } else {
        dispatch(addToFavourites(id));
        setStatusHeart(true);
      }
    } else {
      dispatch(openModalAuth());
    }
  };

  const handleClickBasket = () => {
    if (authorization) {
      if (statusBasket) {
        dispatch(removeFromBasket(id));
        setStatusBasket(false);
      } else {
        dispatch(addToBasket(id));
        document.body.style.overflowY = "hidden";
        setStatusBasket(true);
        setAddProductModal(true);
      }
    } else {
      dispatch(openModalAuth());
    }
  };

  const handleClickDeleteProduct = () => {
    dispatch(removeFromBasket(id));
    setStatusBasket(false);
    document.body.style.overflowY = "auto";
    setDeleteProductModal(false);
  };

  const openSecondModal = () => {
    document.body.style.overflowY = "hidden";
    setDeleteProductModal(true);
  };

  const closeModal = () => {
    document.body.style.overflowY = "auto";
    setAddProductModal(false);
    setDeleteProductModal(false);
  };

  useEffect(() => {
    if (authorization) {
      if (favoriteProductsId.includes(String(id))) {
        setStatusHeart(true);
      }
      if (basketProductsId.includes(String(id))) {
        setStatusBasket(true);
      }
    }
  }, [authorization, basketProductsId, favoriteProductsId, id]);

  return (
    <>
      <div className={cn(s.product, displayProducts?.list? s.productList : '')}>
        <Button onClick={handleClickHeard} classBtn={s.buttonHeard}>
          <img src={statusHeart ? heardFill : heardOrange} alt="heard" />
        </Button>
        <Link to={"/products/" + category + "/" + id}>
          <img className={s.img} src={thumbnail} alt="product" />
        </Link>
        <Link className={s.productName} to={"/products/" + category + "/" + id}>
          {title}
        </Link>
        <Rating rating={rating} />
        {countProducts && <CounterProducts {...props} />}
        <p className={s.stock}>Товарів в наявності: {stock} шт.</p>
        <p className={s.discount}>{discountPrice + "₴"}</p>
        <div className={s.priceWrapper}>
          <p className={s.price}>{Number(price).toLocaleString("ua") + "₴"}</p>
          <Button onClick={deleteProduct ? openSecondModal : handleClickBasket}>
            <img
              src={
                statusBasket ? (trash ? trashIcon : basketFill) : basketGreen
              }
              alt="heard"
            />
          </Button>
        </div>
      </div>

      {addProductModal && (
        <Modal
          closeModal={closeModal}
          onclick={closeModal}
          addProduct={true}
          data={props}
        ></Modal>
      )}

      {deleteProductModal && (
        <Modal
          deleteProduct={true}
          closeModal={closeModal}
          onclick={closeModal}
          onclickSecondBtn={handleClickDeleteProduct}
          data={props}
        ></Modal>
      )}
    </>
  );
};

export default Product;
