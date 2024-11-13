
import Image from 'next/image';
import Link from 'next/link';

const NavBarAdmin = () => {
  return (
    <aside className="w-[15%] h-[100vh] fixed bg-gray-50 border-r border-gray-200">
        <Link href='/' className='w-auto h-[60px] p-6 flex justify-center items-center border-b border-gray-200 hover:bg-gray-200 transition-all duration-500 overflow-hidden'>
            <Image src='/logoDark.png' width={2400} height={600} alt='Logo Medibooks' className='w-full h-auto object-center object-contain'/>
        </Link>
      <nav>
        <ul className="pl-6 py-6 space-y-2 text-gray-500 text-[18px] font-sans font-semibold">
          <li>
            <Link href="/admin" className='hover:text-gray-700'>
              Dashboard 
            </Link>
          </li>
          <li>
            <Link href="/admin/libros" className='hover:text-gray-700'>
              Libros 
            </Link>
          </li>
          <li>
            <Link href="/admin/categorias" className='hover:text-gray-700'>
              Categorías
            </Link>
          </li>
          <li>
            <Link href="/admin/usuarios" className='hover:text-gray-700'>
              Usuarios
            </Link>
          </li>
          <li>
            <Link href="/admin/ventas" className='hover:text-gray-700'>
              Ventas
            </Link>
          </li>
          <li>
            <Link href="/admin/pedidos" className='hover:text-gray-700'>
              Pedidos
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default NavBarAdmin;
