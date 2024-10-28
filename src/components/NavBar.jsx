'use client';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './SeachBar';
import { useCart } from '@/contexts/CartContexts';
import { useUser } from '@auth0/nextjs-auth0/client';
import Profile from './Profile';
import { useState } from 'react';

const NavBar = () => {
  const { cart, toggleCart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const { user } = useUser();
  const [visible, setVisible] = useState(false);
  const [abierto, setAbierto] = useState(false);

  const handleSearchCloseMenu = () => {
    setAbierto(false); 
  };

  return (
    <nav className="w-full h-[60px] md:h-[75px] fixed flex bg-gray-800 border-b border-[#1b7b7e] z-[1000]">
      <div className="w-full flex">
        <div className="w-full px-[2%] flex justify-between items-center">
            <div className="h-[40px] md:h-[60px] lg:h-[80px] flex items-center overflow-hidden">
              <Link href="/" aria-label="Go to homepage">
                <Image
                  src="/navLog.png"
                  alt="Logo Medibooks"
                  width={200}
                  height={90}
                  className="w-[180px] md:w-[200px] lg:w-[200px] h-auto max-w-full object-contain object-center"
                />
              </Link>
           </div>
          <div className='hidden md:block'>
            <SearchBar />
          </div>
          <div className="relative md:mr-6">
            {cartCount > 0 && (
              <>
                <button onClick={toggleCart} aria-label="View cart">
                  <Image 
                    src="/cart.png" 
                    alt="Carrito de compras." 
                    width={170} 
                    height={150} 
                    className="w-[28px] h-auto object-contain md:hover:scale-125 transition-all duration-500 relative top-[3px]"
                  />
                </button>
                <span className="inline-flex items-center justify-center px-1 md:px-0 py-[1px] text-s lg:text-lg font-bold leading-none text-red-500">
                  {cartCount}
                </span>
              </>
            )}
          </div>            
          <div className='hidden md:block space-x-4'>
            <Link href='/' className='text-lg font-bold text-[#eee] hover:text-[#57c0c4] transition-all duration-300'>Inicio</Link>
            <Link href='/productos' className='text-lg font-bold text-[#eee] hover:text-[#57c0c4] transition-all duration-300'>Productos</Link>
            <Link href='/contacto' className='text-lg font-bold text-[#eee] hover:text-[#57c0c4] transition-all duration-300'>Contacto</Link>
          </div>

          <div className={`md:hidden py-8 px-4 absolute w-full h-screen ${abierto ? 'right-0' : '-right-[200%]' } top-[60px] bg-gray-700 transition-all duration-700 ease-out`}>
          <div className='w-[90%]'>
            <SearchBar onSearch={handleSearchCloseMenu}/>
          </div>
          <div className='mt-6 flex flex-col gap-y-3'>
            <Link href='/' className='text-2xl font-semibold tracking-wider text-[#eee] hover:text-[#57c0c4] transition-all duration-300' onClick={() => setAbierto(false)}>Inicio</Link>
            <Link href='/productos' className='text-2xl font-semibold tracking-wider text-[#eee] hover:text-[#57c0c4] transition-all duration-300' onClick={() => setAbierto(false)}>Productos</Link>
            <Link href='/contacto' className='text-2xl font-semibold tracking-wider text-[#eee] hover:text-[#57c0c4] transition-all duration-300' onClick={() => setAbierto(false)}>Contacto</Link>
          </div>
          <ul className={`mt-6 flex flex-col gap-y-3`}>
            {!user ? (
              <>
                <Link href="/api/auth/login" className="text-2xl font-semibold text-[#26a5aa]" onClick={() => setAbierto(false)}>Iniciar sesión</Link>
                <Link href="/api/auth/login" className="text-2xl font-semibold text-[#26a5aa]" onClick={() => setAbierto(false)}>Registrarte</Link>
              </>
            ) : ( 
              <Link href="/api/auth/logout" className="text-xl font-medium text-gray-50 hover:scale-110" onClick={() => setAbierto(false)}>Cerrar sesión</Link>
            )}
          </ul>
        </div>

          <div className='flex justify-end md:hidden w-[40px] h-auto'>
            {
              !abierto ? (
                <button onClick={() => setAbierto(!abierto)}>
                  <Image src='/menuLight.png' alt='Imagen menu colapse.' width={110} height={90} className='w-[36px] h-auto object-contain' />
                </button>
              ) : (
                <button onClick={() => setAbierto(!abierto)}>
                  <p className='text-gray-100 text-2xl pr-3'>X</p>
                </button>
              )}
          </div>

          <div className='hidden md:flex'>
            <button onClick={() => {setVisible(!visible)}} className='rounded-full overflow-hidden'>
              { !user ? (
                <Image src='/user.png' width={90} height={90} alt='Imagen user icon.' className='w-[26px] h-auto object-contain'/>
              ) : (
                <Image src={user.picture} width={90} height={90} alt='Imagen user.' className='w-[26px] h-auto object-contain'/>
              )}
            </button>
            <ul className={`w-[auto] p-4 absolute top-[75px] flex flex-col ${visible ? 'right-0' : '-right-[200%]'} bg-[#1b7b7e] transition-all duration-700`}>
            {!user ? (
                <>
                  <Link href="/api/auth/login" className="mb-1 text-xl font-medium text-gray-50 hover:scale-110">
                    Iniciar sesion
                  </Link>
                  <Link href="/api/auth/login" className="text-xl font-medium text-gray-50 hover:scale-110">
                    Registrarte
                  </Link>
                </>
              ) : ( 
                <>
                  <Profile user={user}/>
                </>
              )}
            </ul>
        </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
