import { Params, useLoaderData } from "react-router-dom";
import BackBtn from "../components/BackBtn";
import MenuItem from "../components/MenuItem";
import { store } from "../store/store";
import {
  Order as IOrder
} from '../store/ordersSlice';
import { onStoreReady } from "../utils/on-store-ready";

export const orderLoader = async ({
  params
}: {
  params: Params
}) => {
  const { orderId } = params;
  await onStoreReady();
  const {items} = store.getState().orders;
  const matchingOrder = items.find(item => item.id === orderId);
  if (!matchingOrder) {
    throw new Error(`Order #${orderId} not found`);
  }
  return matchingOrder;
}

const Order = () => {
  const order = useLoaderData() as IOrder;
  return (
    <div className="my-6">
      <BackBtn to={"/menu"}>Back to menu</BackBtn>
      <h2 className="text-3xl text-center my-4">Order #{order.id}</h2>
      <div className="card bg-base-100 p-4">
        <div className="card-body gap-8">
          <div className="mx-5 card-title">Items</div>
          {order.items.map((item) => {
            return <MenuItem key={item.id} readonly={true} item={item} />;
          })}
          <div className="card-title mx-5 flex justify-between">
            <span>Total:</span> <span>€{order.total}</span>
          </div>
          <div className="card-title mx-5 flex justify-between">
            <span>Paid with:</span> <span>{order.creditCardNum}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
