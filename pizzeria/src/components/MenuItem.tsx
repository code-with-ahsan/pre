import { FC, useState } from "react";
import { Pizza } from "../data/menu-items";

type MenuItemProps = {
  item: Pizza;
};
const MenuItem: FC<MenuItemProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(0);
  return (
    <div className="card px-4 card-side bg-base-300 shadow-xl">
      <figure>
        <img
          className="w-32 mask mask-squircle"
          src={`/images/pizzas/${item.image}`}
          alt="Movie"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.title}</h2>
        <div>{item.ingredients.join(", ")}</div>
        <div className="card-actions justify-between items-end">
          <b className="font-semibold">€{item.price}</b>
          {quantity === 0 ? (
            <button
              onClick={() => {
                setQuantity(1);
              }}
              className="btn btn-primary"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex gap-4 items-center">
              <button
                onClick={() => {
                  setQuantity((q) => q - 1);
                }}
                className="btn btn-primary btn-circle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => {
                  setQuantity((q) => q + 1);
                }}
                className="btn btn-primary btn-circle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  setQuantity(0);
                }}
                className="btn btn-primary ml-4"
              >
                Delete
              </button>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
