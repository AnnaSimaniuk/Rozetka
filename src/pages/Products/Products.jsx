import React, { useContext, useEffect, useState } from "react";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  loadAllProducts,
  loadProductsOfCategory,
} from "../../redux/products/productsReducer";
import { selectProducts } from "../../redux/products/products";
import { ProductsContextStore } from "./ProductsDisplayContext";

import Product from "../Product/Product";
import Button from "../../Components/Button/Button";
import { generateArr } from "../../tools/generateArr";
import { useQuery } from "../../tools/useQuery";

import Loader from "../../Components/Loader/Loader";
import s from "./Products.module.scss";
import { ViewHeadline, Apps } from "@mui/icons-material";
import cn from "classnames";
import SelectSort from "../../Components/Sort/SelectSort/SelectSort";

const Products = () => {
  const query = useQuery();
  const [filter, setFilter] = useState({ skip: query.get("skip") });
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let params = useParams();
  const [selectSort, setSelectSort] = useState("byRating");

  const productsData = useSelector(selectProducts);
  const dispatch = useDispatch();

  const [activePage, setActivePage] = useState(query.get("skip") / 8 + 1);

  const { displayProducts, handleTableDisplay, handleListDisplay } =
    useContext(ProductsContextStore);

  useEffect(() => {
    setActivePage(query.get("skip") / 8 + 1);
    setFilter((prevState) => ({
      ...prevState,
      skip: query.get("skip"),
    }));
  }, [query]);

  useEffect(() => {
    if (params.category === "all") {
      dispatch(loadAllProducts(filter, navigate, pathname, selectSort));
    } else {
      dispatch(loadProductsOfCategory(params.category, selectSort));
    }
  }, [dispatch, filter, navigate, params.category, pathname, selectSort]);

  return (
    <div className={s.productsWrapper}>
      {!!productsData.products ? (
        <>
          <div className={s.sortWrapper}>
            <SelectSort setSelectSort={setSelectSort} />
            <div className={s.iconsWrapper}>
              <ViewHeadline
                onClick={handleListDisplay}
                className={cn(
                  s.iconList,
                  displayProducts.list ? s.iconActive : ""
                )}
              />
              <Apps
                onClick={handleTableDisplay}
                className={cn(
                  s.iconTable,
                  displayProducts.table ? s.iconActive : ""
                )}
              />
            </div>
          </div>
          <div className={displayProducts.table ? s.products : s.productsList}>
            {productsData.products.map((product) => (
              <Product key={product.id} {...product} />
            ))}
          </div>
          <div className={s.productsBtn}>
            {productsData.products.length > 7 &&
              generateArr(
                Math.floor(productsData.total / productsData.limit)
              ).map((num) => (
                <Button
                  key={num}
                  classBtn={num === +activePage ? s.btnActive : s.btn}
                  onClick={(e) => {
                    setActivePage(e.target.textContent);
                    setFilter((prevState) => ({
                      ...prevState,
                      skip: (num - 1) * 8,
                    }));
                  }}
                >
                  {num}
                </Button>
              ))}
          </div>
          {!productsData.products.length && (
            <div className={s.hint}>
              По вашому запиту нічого не знайдено.&nbsp;
              <Link to="all?limit=8&skip=0">Повернутись до всіх товарів</Link>
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Products;
