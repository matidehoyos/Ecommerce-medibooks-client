
import Image from 'next/image';
import Link from 'next/link';

const NavBarAdmin = () => {
  return (
    <aside className="w-[18%] h-[100vh] fixed bg-gray-800 text-gray-100">
        <Link href='/' className='w-auto py-2 flex justify-center items-center bg-gray-900 hover:bg-black transition-all duration-300'>
            <Image src='/navLog.png' width={200} height={90} alt='Logo Medibooks' className='w-[76%] h-auto object-contain'/>
        </Link>
      <nav>
        <ul className="px-4 py-6 space-y-2">
          <li>
            <Link href="/admin/libros" className="block px-2 py-1 font-bold text-xl hover:bg-gray-900">
              Libros 
            </Link>
          </li>
          <li>
            <Link href="/admin/categorias" className="block px-2 py-1 font-bold text-xl hover:bg-gray-900">
              Categorías
            </Link>
          </li>
          <li>
            <Link href="/admin/usuarios" className="block px-2 py-1 font-bold text-xl hover:bg-gray-900">
              Usuarios
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default NavBarAdmin;
