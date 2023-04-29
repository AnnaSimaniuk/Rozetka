import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Form,
  Link,
  Outlet,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import cn from "classnames";

import { getProductsSearch } from "../../api/useHTTPRequest";
import { selectFavouriteProductsId } from "../../redux/favioriteProducts/favouriteProduct";
import { selectBasketProductId } from "../../redux/basketProducts/basketProduct";
import { openModalAuth, selectAuth } from "../../redux/authorization/auth";
import { getProducts } from "../../redux/products/products";

import Button from "../../Components/Button/Button";

import s from "./Navbar.module.scss";

import logo from "../../assets/img/logo.svg";
import heart from "../../assets/img/heartWhite.png";
import basket from "../../assets/img/basketWhite.png";
import menu from "../../assets/img/menu.png";
import user from "../../assets/img/user.png";

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const products = await getProductsSearch(q);
  return { products, q };
}

const Navbar = () => {
  const favoriteProductsId = useSelector(selectFavouriteProductsId);
  const basketProductsId = useSelector(selectBasketProductId);
  const authorization = useSelector(selectAuth);

  const dispatch = useDispatch();
  const { products, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();
  const navigate = useNavigate();

  const checkAuth = () => {
    if (!authorization) {
      dispatch(openModalAuth());
    }
  };

  useEffect(() => {
    document.getElementById("q").value = q;

    if (!!q && q !== "") {
      dispatch(getProducts(products));
    }
    if (q === "") {
      navigate("products/all?limit=8&skip=0");
    }
  }, [dispatch, navigate, products, q]);

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  return (
    <div>
      <nav className={s.navbar}>
        <div>
          <img src={logo} alt="logo" />
        </div>
        <Link to="products/all?limit=8&skip=0" preventScrollReset={true}>
          <Button classBtn={s.btnMenu}>
            <img src={menu} alt="menu" />
            <span>Каталог</span>
          </Button>
        </Link>
        <div>
          <Form
            id="search-form"
            role="search"
            className={s.searchForm}
            action={"products/all?=" + q}
          >
            <input
              type="search"
              id="q"
              className={cn(s.searchInput)}
              aria-label="Search products"
              placeholder="Я шукаю..."
              name="q"
              defaultValue={q}
              onChange={(event) => {
                submit(event.currentTarget.form);
              }}
            />
            <div className={s.srOnly} aria-live="polite" />
            <div className={s.searchSpinner} aria-hidden hidden={!searching} />
          </Form>
        </div>
        <div className={s.navBtnWrapper}>
          <Link to={authorization && "user/userInfo"} onClick={checkAuth}>
            <Button>
              <img src={user} alt="user" />
            </Button>
          </Link>
          <Link to={authorization && "user/favourite"} onClick={checkAuth}>
            <Button counter={authorization && favoriteProductsId.length}>
              <img src={heart} alt="heart" />
            </Button>
          </Link>
          <Link to={authorization && "user/basket"} onClick={checkAuth}>
            <Button
              counter={authorization && basketProductsId.length}
              backgroundColorCounter={"#00a046"}
            >
              <img src={basket} alt="basket" />
            </Button>
          </Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
