import { useCart } from '@/contexts/CartContexts';
import Image from 'next/image';

const CartButton = () => {
    const { cart, toggleCart } = useCart();
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);


return (
    <div className="flex relative">
        {cartCount > 0 && (
        <>
            <button onClick={toggleCart} aria-label="Mostrar carrito de compras.">
            <Image 
                src="/cart.png" 
                alt="Carrito de compras." 
                width={170} 
                height={150} 
                className="w-[28px] h-auto object-contain md:hover:scale-125 transition-all duration-500"
            />
            </button>
            <span className="inline-flex items-center justify-center px-1 md:px-0 py-[1px] text-s lg:text-lg font-bold leading-none text-red-500 relative top-[5px]">
             {cartCount}
            </span>
        </>
        )}
    </div> 
);
}

export default CartButton;
