import MenuItem from "../components/MenuItem";

const Order = () => {
  const order = {
    items: [],
    total: 0,
    creditCardNum: "**** **** **** 1234",
  };
  return (
    <div className="my-6">
      <h2 className="text-3xl text-center my-4">Order #12tyq</h2>
      <div className="card bg-base-100 p-4">
        <div className="card-body gap-8">
          <div className="mx-5 card-title">Items</div>
          {order.items.map((item) => {
            return <MenuItem readonly={true} item={item} />;
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
