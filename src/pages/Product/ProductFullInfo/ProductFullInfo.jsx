import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { openModalAuth, selectAuth } from "../../../redux/authorization/auth";
import {
  addToFavourites,
  selectFavouriteProductsId,
  removeFromFavourites,
} from "../../../redux/favioriteProducts/favouriteProduct";
import {
  addToBasket,
  selectBasketProductId,
} from "../../../redux/basketProducts/basketProduct";
import { getFullInfo } from "../../../api/useHTTPRequest";
import { capitalize } from "../../../tools/capitalize";

import Button from "../../../Components/Button/Button";
import Rating from "../../../Components/Raiting/Rating";
import Loader from "../../../Components/Loader/Loader";
import CarouselImg from "../../../Components/Carusel/Carousel";

import s from "./ProductFullInfo.module.scss";

import heardOrange from "../../../assets/img/heartOrange.png";
import heardFill from "../../../assets/img/heartFill.png";
import basketWhite from "../../../assets/img/basketWhite.png";
import home from "../../../assets/img/home.png";


const ProductFullInfo = () => {
  const [product, setProduct] = useState({});
  const [statusBasket, setStatusBasket] = useState(false);
  const [statusHeart, setStatusHeart] = useState(false);
  const [btnHint, setBtnHint] = useState("");
  const authorization = useSelector(selectAuth);
  const favoriteProductsId = useSelector(selectFavouriteProductsId);
  const basketProductsId = useSelector(selectBasketProductId);
  const dispatch = useDispatch();

  let params = useParams();

  const {
    id,
    category,
    brand,
    images,
    price,
    discountPercentage,
    title,
    description,
    stock,
    rating,
  } = product;

  const discountPrice = Math.round(
    Number(price - (price * discountPercentage) / 100)
  ).toLocaleString("ua");

  useEffect(() => {
    getFullInfo(setProduct, params.id);
  }, [params.id]);

  useEffect(() => {
    if (favoriteProductsId.includes(String(id))) {
      setStatusHeart(true);
    }
  }, [favoriteProductsId, id]);

  const handleClickHeard = () => {
    if (authorization) {
      if (statusHeart) {
        setStatusHeart(false);
        dispatch(removeFromFavourites(id));
      } else {
        setStatusHeart(true);
        dispatch(addToFavourites(id));
      }
    } else {
      dispatch(openModalAuth());
    }
  };

  const handleClickBasket = () => {
    if (authorization) {
      if (basketProductsId.includes(String(id))) {
        setStatusBasket(true);
        setBtnHint("Товар вже є в кошику");
      } else {
        setStatusBasket(true);
        setBtnHint("Товар додано до кошика");
        dispatch(addToBasket(id));
      }
    } else {
      dispatch(openModalAuth());
    }
  };

  return !!Object.keys(product).length ? (
    <div className={s.wrapper}>
      <ul className={s.navList}>
        <li className={s.navItem}>
          <Link to="/products/all?limit=8&skip=0" className={s.navLink}>
            <img src={home} alt="home" />
            <span className={s.navDecor}>></span>
          </Link>
        </li>
        <li className={s.navItem}>
          <Link to={"/products/" + category} className={s.navLink}>
            <span>{capitalize(category)}</span>
            <span className={s.navDecor}>></span>
          </Link>
        </li>
        <li className={s.navItem}>{brand}</li>
      </ul>
      <h3 className={s.title}>{title}</h3>
      <Rating rating={rating} />
      <div className={s.productInfoPanel}>
        <div className={s.tabsProductInfo}>Усе про товар</div>
      </div>
      <div className={s.productInfoWrapper}>
        <CarouselImg images={images}/>
        <div className={s.productInfo}>
          <p className={s.discountPrice}>{discountPrice + "₴"}</p>
          <div className={s.priceWrapper}>
            <p className={s.price}>
              {Number(price).toLocaleString("ua") + "₴"}
            </p>
            <Button onClick={handleClickHeard}>
              <img src={statusHeart ? heardFill : heardOrange} alt="heard" />
            </Button>
          </div>
          <Button classBtn={s.buttonBasket} onClick={handleClickBasket}>
            <img src={basketWhite} alt="basket" />
            <span>Купити</span>
          </Button>
          <span className={s.btnHint}>{statusBasket && btnHint}</span>
          <p className={s.stock}>Товарів в наявності: {stock} шт.</p>
          <p className={s.description}>{description}</p>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default ProductFullInfo;
