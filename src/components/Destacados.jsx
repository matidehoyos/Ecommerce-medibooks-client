import ProductCard from './ProductCard';
import Link from 'next/link';
import { useProductos } from '@/contexts/productsContexts';

const Destacados = () => {
  const libros = useProductos();
  const destacados = libros
    .slice() 
    .slice(0, 10); 

  return (
    <div className="w-full py-12 md:py-14 lg:py-20 flex bg-gray-50">
      <div className="w-full px-[3%]">
        <h2 className="pb-6 md:pb-12 text-left text-xl md:text-2xl text-gray-700 md:text-gray-600 font-semibold">Productos destacados</h2>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3">
            {destacados.map((libro, index) => (
                <ProductCard key={index} libro={libro} />
              ))}
        </div>
        <div className='w-full pt-12 md:pt-20 flex'>
            <Link href='/productos' className='w-auto mx-auto px-3 py-2 text-lg md:text-xl font-bold rounded-md md:hover:bg-[#1b7b7e] text-[#1b7b7e] md:hover:text-white border border-[#1b7b7e] transition-colors duration-300'>Ver todos los productos</Link>
        </div>
      </div>
    </div>
  );
};

export default Destacados;
