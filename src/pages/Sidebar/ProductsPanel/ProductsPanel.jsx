import { useEffect, useState } from "react";

import cn from "classnames";

import { getAllProductsCategories } from "../../../api/useHTTPRequest";
import { capitalize } from "../../../tools/capitalize";
import { NavLink } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";

import s from "./ProductPanel.module.scss";

const ProductsPanel = () => {
  const [productsCategories, setProductsCategories] = useState([]);

  useEffect(() => {
    getAllProductsCategories(setProductsCategories);
  }, []);

  return (
    <ul className={s.listProduct}>
      <li>
        <NavLink
          to="all?limit=8&skip=0"
          className={cn(s.link, ({ isActive }) => (isActive ? "active" : ""))}
        >
          All products
        </NavLink>
      </li>
      {!!productsCategories.length ? (
        productsCategories.map((category) => (
          <li key={category}>
            <NavLink
              to={category}
              className={cn(s.link, ({ isActive }) =>
                isActive ? "active" : ""
              )}
            >
              {capitalize(category)}
            </NavLink>
          </li>
        ))
      ) : (
        <Loader />
      )}
    </ul>
  );
};

export default ProductsPanel;
