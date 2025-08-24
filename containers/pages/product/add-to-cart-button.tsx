import { useProducts } from "@/providers/products-provider";
import { useCart } from "@/providers/products-in-cart-provider";

export default function AddToCartButton ({amount}: {
  amount: number
}) {
  const { curr } = useProducts();
  const { setCartItems, signalAdd } = useCart();

  const addToCart = () => {
    setCartItems((prevState) => {
      const isInCart = prevState.find((cartItem) =>
        cartItem.product.id === curr.id);

      if(isInCart) {
        return [...prevState.map(cartItem => {
          if(cartItem.product.id === curr.id) {
            return {
              ...cartItem,
              amount: cartItem.amount + amount
            }
          }

          return cartItem;
        })];
      }

      return [...prevState, {
        product: curr,
        amount: amount
      }];
    });

    signalAdd();
  };
  return (
    <button className={"bg-dark-blue text-white cursor-pointer rounded-md py-1 px-5 mb-2"}
            onClick={addToCart}
    >
      Add to cart
    </button>
  );
}