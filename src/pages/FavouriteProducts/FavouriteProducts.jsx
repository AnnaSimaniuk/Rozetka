import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { selectFavouriteProductsId } from "../../redux/favioriteProducts/favouriteProduct";
import { selectAllProducts } from "../../redux/products/products";
import { loadAllProductsData } from "../../redux/products/productsReducer";

import Loader from "../../Components/Loader/Loader";
import Product from "../Product/Product";

import s from "./FavouriteProducts.module.scss";

const FavouriteProducts = () => {
  const favoriteProductsId = useSelector(selectFavouriteProductsId);
  const productsData = useSelector(selectAllProducts);
  const dispatch = useDispatch();

  const favouriteProducts =
    !!productsData &&
    productsData.filter((product) =>
      favoriteProductsId.includes(String(product.id))
    );

  useEffect(() => {
    dispatch(loadAllProductsData());
  }, [dispatch]);

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Список бажань</h2>
      <div className={s.wrapperProduct}>
        {!!favouriteProducts ? (
          favouriteProducts.map((product) => (
            <Product key={product.id} {...product} />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default FavouriteProducts;
