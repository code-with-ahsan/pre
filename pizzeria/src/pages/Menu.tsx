import MenuItem from "../components/MenuItem";
import { MENU_ITEMS } from "../data/menu-items";

const Menu = () => {
  return (
    <div className="hero py-4 min-h-[calc(100vh-66px)] bg-base-100">
      <h2>Pick what you crave for today</h2>
      <ul className="flex flex-col gap-4">
        {MENU_ITEMS.map((item) => {
          return <MenuItem item={item} />;
        })}
      </ul>
    </div>
  );
};

export default Menu;
