import "react-credit-cards-2/dist/es/styles-compiled.css";
import BackBtn from "../components/BackBtn";
import {
  resetCart,
  selectCartItems,
  selectCartTotal,
} from "../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { formatPrice } from "../utils/price-utils";
import CreditCard from "../components/CreditCard";
import { createOrder } from "../store/ordersSlice";
import { createOrderId } from "../utils/order-utils";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div className="text-center my-6">
      <BackBtn to={"/cart"}>Back to cart</BackBtn>
      <div className="grid grid-cols-1 my-4 p-4 md:grid-cols-2 gap-8 card bg-base-300 shadow-xl">
        <section className="">
          <h2 className="text-2xl mb-4 card-title">Order Summary</h2>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>{item.quantity}</td>
                      <td>€{formatPrice(item.quantity * item.price)}</td>
                    </tr>
                  );
                })}
                <tr className="font-semibold">
                  <td>Subtotal: </td>
                  <td></td>
                  <td>€{formatPrice(cartTotal)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2 className="text-2xl mb-4 card-title text-center w-full block">
            Payment Details
          </h2>
          <CreditCard
            onSubmit={(state) => {
              const orderId = createOrderId();
              dispatch(
                createOrder({
                  id: orderId,
                  items: cartItems,
                  total: cartTotal,
                  creditCardNum: state.number,
                  state: "pending",
                }),
              );
              dispatch(resetCart());
              navigate(`/order/${orderId}`);
            }}
          />
        </section>
      </div>
    </div>
  );
};

export default Checkout;
