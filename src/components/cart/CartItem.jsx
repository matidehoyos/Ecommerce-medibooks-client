import { useCart } from "@/contexts/CartContexts";
import Image from "next/image";
import { BiTrash } from "react-icons/bi";


const CartItem = ({item}) => {
    const { removeFromCart, addToCart } = useCart();

    const handleIncrement = (item) => {
        addToCart(item, 1);
      };
    
      const handleDecrement = (item) => {
        if (item.quantity > 1) {
          addToCart(item, -1);
        }
      };

    return (
            <div className="w-full flex p-1 md:p-2 justify-between items-center rounded-md bg-gray-50 border border-gray-200">
                <div className='w-[50px] md:w-[70px] h-auto overflow-hidden'>
                    { item.imagen ?
                    <Image
                        src={item.imagen}
                        alt={item.titulo}
                        width={70}
                        height={70}
                        className="w-[50px] md:w-[70px] h-auto object-contain"
                        loading="lazy"
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
    )
}


export default CartItem;