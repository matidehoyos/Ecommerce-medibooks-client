import Image from 'next/image';
import Link from 'next/link';
import { BiCategoryAlt, BiHome, BiPurchaseTagAlt, BiScreenshot, BiShoppingBag, BiSolidShoppingBags, BiUserPin } from 'react-icons/bi';

const NavBarAdmin = () => {
  return (
    <aside className="w-[15%] h-[100vh] fixed bg-gray-700 border-r border-gray-400">
        <Link href='/' className='w-auto h-[60px] p-6 flex justify-center items-center border-b border-gray-400 bg-gray-900 hover:bg-gray-950 transition-all duration-500 overflow-hidden'>
            <Image src='/navLog.png' width={2400} height={600} alt='Logo Medibooks' className='w-full h-auto object-center object-contain'/>
        </Link>
      <nav>
        <ul className="pl-6 py-6 space-y-2 text-gray-300 text-[18px] font-sans font-semibold">
          <li>
            <Link href="/admin" className='hover:text-white flex items-center gap-1'>
              <BiHome size={16}/> Inicio 
            </Link>
          </li>
          <li>
            <Link href="/admin/libros" className='hover:text-white flex items-center gap-1'>
              <BiPurchaseTagAlt size={16}/> Productos 
            </Link>
          </li>
          <li>
            <Link href="/admin/categorias" className='hover:text-white flex items-center gap-1'>
              <BiCategoryAlt size={16}/> Categorías
            </Link>
          </li>
          <li>
            <Link href="/admin/usuarios" className='hover:text-white flex items-center gap-1'>
              <BiUserPin size={16}/> Usuarios
            </Link>
          </li>
          <li>
            <Link href="/admin/ventas" className='hover:text-white flex items-center gap-1'>
              <BiShoppingBag size={16}/> Ventas
            </Link>
          </li>
          <li>
            <Link href="/admin/pedidos" className='hover:text-white flex items-center gap-1'>
              <BiSolidShoppingBags size={16}/> Pedidos
            </Link>
          </li>
          <li>
            <Link href="/" className='mt-20 hover:text-white flex items-center gap-1'>
              <BiScreenshot size={14}/> Ver página
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default NavBarAdmin;
