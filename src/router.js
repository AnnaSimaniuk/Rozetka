import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from "react-router-dom";
import Navbar, { loader as navbarLoader } from "./pages/Navbar/Navbar";
import Error from "./pages/ErrorPage/Error";
import Layout from "./pages/Layout/Layout";
import Sidebar from "./pages/Sidebar/Sidebar";
import ProductsPanel from "./pages/Sidebar/ProductsPanel/ProductsPanel";
import Products from "./pages/Products/Products";
import ProductFullInfo from "./pages/Product/ProductFullInfo/ProductFullInfo";
import UserPanel from "./pages/Sidebar/UserPanel/UserPanel";
import FavouriteProducts from "./pages/FavouriteProducts/FavouriteProducts";
import BasketProducts from "./pages/BasketProducts/BasketProducts";
import PlacingOrder from "./pages/PlacingOrder/PlacingOrder";
import ProductsDisplayProvider from "./pages/Products/ProductsDisplayContext";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      loader={navbarLoader}
      errorElement={<Error />}
      element={<Navbar />}
    >
      <Route
        path="products/*"
        element={
          <Layout>
            <Sidebar>
              <ProductsPanel />
            </Sidebar>
            <Outlet />
          </Layout>
        }
      >
        <Route
          path=":category"
          element={
            <ProductsDisplayProvider>
              <Products />
            </ProductsDisplayProvider>
          }
        />
        <Route path=":category/:id" element={<ProductFullInfo />} />
      </Route>
      <Route
        path="user/*"
        element={
          <Layout>
            <Sidebar>
              <UserPanel />
            </Sidebar>
            <Outlet />
          </Layout>
        }
      >
        <Route path="favourite" element={<FavouriteProducts />} />
        <Route path="basket" element={<BasketProducts />} />
      </Route>
      <Route path="order" element={<PlacingOrder />} />
    </Route>
  )
);
