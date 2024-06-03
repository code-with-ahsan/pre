import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index={true} element={<Home />} />
      <Route path="menu" element={<Menu />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
    </Route>,
  ),
);

export default router;
