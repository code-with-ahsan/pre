import MenuItem from "../components/MenuItem";
import withQuantity from "../components/withQuantity";
import { MENU_ITEMS } from "../data/menu-items";

const QuantifiedMenuItem = withQuantity(MenuItem);

const Menu = () => {
  return (
    <>
      <h2 className="text-3xl text-center my-4">
        Pick what you crave for today
      </h2>
      <ul className="flex w-full flex-col gap-4">
        {MENU_ITEMS.map((item) => {
          return <QuantifiedMenuItem key={item.id} item={item} />;
        })}
      </ul>
    </>
  );
};

export default Menu;
