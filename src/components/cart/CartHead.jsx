import { useCart } from "@/contexts/CartContexts";
import { BiSolidRightArrow } from "react-icons/bi";

const CartHead = () => {
    const { toggleCart } = useCart();

    return (
        <div className='w-full sticky top-0 p-4 mb-4 flex justify-between items-center bg-gray-800'>
            <h2 className="text-[20px] font-medium text-gray-100">Tus productos seleccionados</h2>
            <button onClick={toggleCart} className="font-bold text-xl text-gray-50 hover:text-[#1b7b7e]">
                <BiSolidRightArrow />
            </button>
      </div>
    );
  };
  
  export default CartHead;