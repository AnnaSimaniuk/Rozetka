import cn from "classnames";

import { useSelector } from "react-redux";
import { selectFavouriteProductsId } from "../../../redux/favioriteProducts/favouriteProduct";
import { selectBasketProductId } from "../../../redux/basketProducts/basketProduct";

import { NavLink } from "react-router-dom";

import s from "./UserPanel.module.scss";

import user from "../../../assets/img/user-profile.png";
import basket from "../../../assets/img/basketBlack.png";
import heart from "../../../assets/img/heartBlack.png";

const UserPanel = () => {
  const favoriteProductsId = useSelector(selectFavouriteProductsId);
  const basketProductsId = useSelector(selectBasketProductId);

  return (
    <ul className={s.listUserInfo}>
      <li className={s.item}>
        <NavLink
          to="userInfo"
          className={cn(s.link, ({ isActive }) => (isActive ? "active" : ""))}
        >
          <img src={user} alt="user" />
          Анна Сіманюк
        </NavLink>
      </li>
      <li className={s.item}>
        <NavLink
          to="favourite"
          className={cn(s.link, ({ isActive }) => (isActive ? "active" : ""))}
        >
          <img src={heart} alt="heart" />
          Список бажань{" "}
          <span className={s.counter}>{favoriteProductsId.length}</span>
        </NavLink>
      </li>
      <li className={s.item}>
        <NavLink
          to="basket"
          className={cn(s.link, ({ isActive }) => (isActive ? "active" : ""))}
        >
          <img src={basket} alt="basket" />
          Кошик <span className={s.counter}>{basketProductsId.length}</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default UserPanel