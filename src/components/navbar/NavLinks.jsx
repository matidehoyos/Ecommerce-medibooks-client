import Link from 'next/link';

const NavLinks = () => {

return (
    <nav className='hidden lg:block lg:space-x-3 xl:space-x-4' aria-label="Navegación principal">
        <Link href='/' className='lg:text-md xl:text-lg font-bold text-[#eee] hover:text-[#57c0c4] transition-all duration-300' aria-label="Ir al home.">Inicio</Link>
        <Link href='/productos' className='lg:text-md xl:text-lg font-bold text-[#eee] hover:text-[#57c0c4] transition-all duration-300' aria-label="Ir a la página de productos.">Productos</Link>
        <Link href='/contacto' className='lg:text-md xl:text-lg font-bold text-[#eee] hover:text-[#57c0c4] transition-all duration-300' aria-label="Ir a la página de contacto.">Contacto</Link>
    </nav>
  );
};

export default NavLinks;
