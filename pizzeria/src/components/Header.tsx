import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="navbar bg-primary text-base-100 sticky top-0 z-40 gap-4">
      <Link to={"/"} className="btn btn-ghost text-xl">
        Pizzeria
      </Link>
      <form className="flex-1 flex justify-end">
        <input
          name="orderId"
          required
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type="text"
          placeholder={isFocused ? "Enter order#" : "Find your order"}
          className="input text-neutral-100 input-bordered w-full md:w-auto"
        />
      </form>
      <div className="flex-none">
        <div className="font-semibold gap-1 flex">
          <span className="hidden md:flex">Cart total: </span>
          <span>€{0}</span>{" "}
        </div>
        <Link
          to="/cart"
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle"
        >
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="badge badge-sm indicator-item">{0}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
