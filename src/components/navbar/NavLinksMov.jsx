import Link from 'next/link';

const NavLinksMov = ({setAbierto}) => {

return (
    <nav className='mt-6 flex flex-col gap-y-3' aria-label="Navegación principal.">
            <Link href='/' className='text-2xl font-semibold tracking-wider text-[#eee] hover:text-[#57c0c4] transition-all duration-300' onClick={() => setAbierto(false)} aria-label="Ir al home">Inicio</Link>
            <Link href='/productos' className='text-2xl font-semibold tracking-wider text-[#eee] hover:text-[#57c0c4] transition-all duration-300' onClick={() => setAbierto(false)} aria-label="Ir a la página de productos.">Productos</Link>
            <Link href='/contacto' className='text-2xl font-semibold tracking-wider text-[#eee] hover:text-[#57c0c4] transition-all duration-300' onClick={() => setAbierto(false)} aria-label="Ir a la página de contacto.">Contacto</Link>
    </nav>
  );
};

export default NavLinksMov;