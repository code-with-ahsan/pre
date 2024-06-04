import "react-credit-cards-2/dist/es/styles-compiled.css";
import BackBtn from "../components/BackBtn";
import { selectCartItems, selectCartTotal } from "../store/cartSlice";
import { useAppSelector } from "../store/hooks";
import { formatPrice } from "../utils/price-utils";
import CreditCard from "../components/CreditCard";

const Checkout = () => {
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
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
              console.log(state);
            }}
          />
        </section>
      </div>
    </div>
  );
};

export default Checkout;
