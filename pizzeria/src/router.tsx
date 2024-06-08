import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Order, { orderLoader } from "./pages/Order";
import RootLayout from "./components/RootLayout";
import OrderNotFound from "./pages/OrderNotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index={true} element={<Home />}/>
      <Route path="/menu" element={<Menu />}/>
      <Route path="/cart" element={<Cart />}/>
      <Route path="/checkout" element={<Checkout />}/>
      <Route errorElement={<OrderNotFound />} loader={orderLoader} path="/order/:orderId" element={<Order />}/>
    </Route>
  )
)

export default router;