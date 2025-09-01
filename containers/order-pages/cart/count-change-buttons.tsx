import { ChangeEvent } from "react";
import MinusIcon from "@/public/img/minus-button.svg";
import PlusIcon from "@/public/img/plus-button.svg";
import { useCart } from "@/providers/cart-provider";

export default function CountChangeButtons({ index, count }: {
  index: number,
  count: number
}) {
  const { setCartItems } = useCart();

  const increaseAmount = () => {
    setCartItems(prevState =>
      [...prevState.map((cartItem, i) => {
        if (index === i) {
          return {
            ...cartItem,
            amount: cartItem.amount + 1
          };
        }
        return cartItem;
      })]
    );
  };

  const decreaseAmount = () => {
    if (count === 1) return;

    setCartItems(prevState =>
      [...prevState.map((cartItem, i) => {
        if (index === i) {
          return {
            ...cartItem,
            amount: cartItem.amount - 1
          };
        }
        return cartItem;
      })]
    );
  };

  const setAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(e.target.value);
    if (newAmount > 0) {
      setCartItems(prevState =>
        [...prevState.map((cartItem, i) => {
          if (index === i) {
            return {
              ...cartItem,
              amount: newAmount
            };
          }
          return cartItem;
        })]
      );
    }
  };

  return (
    <div className={"flex gap-1 justify-between"}>
      <button className={"cursor-pointer"}
              onClick={decreaseAmount}>
        <MinusIcon />
      </button>
      <input className={"input-no-spinner w-6 text-center"}
             type={"number"}
             value={count}
             onChange={(e) =>
               setAmount(e)}
      />
      <button className={"cursor-pointer"}
              onClick={increaseAmount}>
        <PlusIcon />
      </button>
    </div>
  );
}