import { useCart } from "@/contexts/CartContexts";
import { BiTrash } from "react-icons/bi";
import Image from "next/image";

const CartItems = ({envio}) => {
    const { cart, removeFromCart, addToCart } = useCart();

    const handleIncrement = (item) => {
        addToCart(item, 1);
      };
    
      const handleDecrement = (item) => {
        if (item.quantity > 1) {
          addToCart(item, -1);
        }
      };

      const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.precio * item.quantity, 0).toFixed(2);
      };

    return (
        <div className='w-full px-[2%] flex flex-col gap-2'>
          {cart.length === 0 ? (
            <p className="mt-20 text-xl text-center text-gray-700">No tienes productos en tu carrito...</p>
          ) : (
            cart.map((item,i) => (
              <div key={i} className="w-full flex p-1 md:p-2 justify-between items-center rounded-md bg-gray-50 border border-gray-200">
                <div className='w-[50px] md:w-[70px] h-auto overflow-hidden'>
                 { item.imagen ?
                  <Image
                    src={item.imagen}
                    alt={item.titulo}
                    width={70}
                    height={70}
                    className="w-[50px] md:w-[70px] h-auto object-contain"
                  /> 
                  : null }
                </div>
                <div className='flex flex-col md:flex-row w-40 md:w-[60%] md:justify-between pr-2 md:pr-4 gap-2'>
                  <div className='flex flex-col text-gray-800'>
                    <span className='pl-1 md:pl-2 text-left font-semibold text-md text-gray-800 truncate'>{item.titulo}</span>
                    <span className='pl-1 md:pl-2 text-left font-light text-sm text-gray-800 truncate'>{item.terminacion}</span>
                  </div>
                  <div className='flex items-center'>
                    <button 
                      onClick={() => handleDecrement(item)} 
                      disabled={item.quantity === 1} 
                      className={`text-md ${item.quantity === 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'} text-gray-900 px-2 rounded border border-red-300 bg-red-300 md:hover:scale-110`}>
                      &ndash;
                    </button> 
                    <span className='mx-2 text-md text-gray-800'>{item.quantity}</span>
                    <button 
                      onClick={() => handleIncrement(item)} 
                      className='text-md text-gray-900 px-2 rounded border border-red-300 bg-red-300 md:hover:scale-110'>
                      +
                    </button> 
                  </div> 
                </div>
                <span className='md:text-md font-bold text-gray-800 mr-2 md:mr-0'>${(item.precio * item.quantity).toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.id)} className='text-red-500 text-2xl md:text-3xl md:mr-4 md:hover:scale-110'><BiTrash /></button>
              </div>
            ))
          )}
          {cart.length > 0 && !envio && (
            <div className='mt-6 flex justify-end'>
              <p className='font-normal text-[24px] text-gray-600'>Subtotal: ${calculateTotal()}</p>
            </div>
            )}
        </div>
    );
  };
  
  export default CartItems;