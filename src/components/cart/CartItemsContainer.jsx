import { useCart } from "@/contexts/CartContexts";
import CartItem from "./CartItem";


const CartItemsContainer = ({envio}) => {
    const { cart } = useCart();

      const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.precio * item.quantity, 0).toFixed(2);
      };

    return (
        <div className='w-full px-[2%] flex flex-col gap-2'>
          {cart.length === 0 ? (
            <p className="mt-20 text-xl text-center text-gray-700">No tienes productos en tu carrito...</p>
          ) : (
            cart.map((item,i) => (
              <CartItem item={item} key={i} />
            ))
          )}
          {cart.length > 0 && !envio && (
            <div className='mt-6 flex justify-end'>
              <p className='font-normal text-[24px] text-gray-600 pr-3 lg:pr-0'>Subtotal: ${calculateTotal()}</p>
            </div>
            )}
        </div>
    );
  };
  
  export default CartItemsContainer;