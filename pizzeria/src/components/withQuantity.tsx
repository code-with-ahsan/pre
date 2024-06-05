import { ComponentType, FC } from "react";
import { useAppSelector } from "../store/hooks";
import { selectItemQuantity } from "../store/cartSlice";
import { Pizza } from "../data/menu-items";

type WithQuantityProps = {
  item: Pizza;
};

const withQuantity = <P extends WithQuantityProps>(
  Component: ComponentType<P>,
) => {
  const WithQuantityComponent: FC<P> = (props) => {
    const { item } = props;
    const quantity = useAppSelector(selectItemQuantity(item));

    const newItem = {
      ...item,
      quantity: quantity,
    };

    return <Component {...({ ...props, item: newItem } as P)} />;
  };
  return WithQuantityComponent;
};

export default withQuantity;
