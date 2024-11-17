import { useCart } from "@/contexts/CartContexts";
import { User } from "@auth0/auth0-react";
import Link from "next/link";

const BotonProcesar = ({envio, setIsFormVisible}) => {
    const { cart } = useCart();

    return (
        <>
        { cart.length ? 
                !User ? (
                    <div className='mt-10 flex flex-col items-end px-[2%] md:px-4'>
                        <p className='text-md md:text-lg text-red-500'>Debes iniciar sesion para procesar la compra.</p>
                        <ul className='mt-6 flex gap-2'>
                            <li>
                            <Link href="/api/auth/login" className="px-3 py-2 text-md font-medium text-gray-50 bg-[#1b7b7e] rounded-md">
                                Iniciar sesion
                            </Link>
                            </li>
                            <li>
                            <Link href="/api/auth/login" className="px-3 py-2 text-md font-medium text-gray-50 bg-[#1b7b7e] rounded-md">
                                Registrarte
                            </Link>
                            </li>
                        </ul>
                    </div>
                        ) : ( 
                        !envio && <div className='mt-6 flex justify-end px-4'>
                                     <button onClick={() => setIsFormVisible(true)} className="px-3 py-2 text-md font-medium text-gray-50 bg-[#1b7b7e] rounded-md">Procesar compra</button>
                                 </div>
                             ) 
                            : null }
              
                </>
            ); 
        };
  
  export default BotonProcesar;