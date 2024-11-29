import Link from "next/link";


const CartAuthentication = () => {

    return (
        <div className='w-full pr-4 mt-4 flex flex-col items-end'>
                <p className='text-sm font-semibold text-gray-600 text-right'>Debes iniciar session para procesar la compra</p>
                <div className='mt-2 flex gap-3'>
                  <Link href="/api/auth/login" className="text-lg font-semibold underline text-[#0f4c4e]"  aria-label="Iniciar sesion con Auth0">Iniciar sesión</Link>
                  <Link href="/api/auth/login" className="text-lg font-semibold underline text-[#0f4c4e]"  aria-label="Registrarse con Auth0">Registrarte</Link>
                </div>
        </div>
    );
  };
  
  export default CartAuthentication;