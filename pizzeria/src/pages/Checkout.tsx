import "react-credit-cards-2/dist/es/styles-compiled.css";
import BackBtn from "../components/BackBtn";
import CreditCard from "../components/CreditCard";

const Checkout = () => {
  return (
    <div className="my-6">
      <BackBtn to={"/cart"}>Back to cart</BackBtn>
      <div className="grid grid-cols-1 my-4 p-4 md:grid-cols-2 gap-8 card bg-base-300 shadow-xl">
        <section>
          <h2 className="text-2xl w-full text-center mb-4 card-title block">
            Order Summary
          </h2>
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
                <tr>
                  <td>Item title</td>
                  <td>Item quantity</td>
                  <td>Item price</td>
                </tr>
                <tr className="font-semibold">
                  <td>Subtotal: </td>
                  <td></td>
                  <td>€{0}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2 className="text-2xl mb-4 card-title w-full block text-center">
            Payment Details
          </h2>
          <CreditCard />
        </section>
      </div>
    </div>
  );
};

export default Checkout;
