import ProductCard from './ProductCard';
import { useProductos } from '@/contexts/productsContexts';

const Recientes = () => {
  const libros = useProductos();

  const recientes = libros
    .slice() 
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
    .slice(0, 5); 

  return (
    <div className="w-full py-12 md:py-14 lg:py-24 flex bg-white lg:bg-gray-200">
      <div className="w-full px-[3%]">
        <h2 className="pb-6 md:pb-4 text-left text-xl md:text-3xl text-gray-700 font-semibold">
          Últimos ingresos
        </h2>
        <div className="w-full lg:px-[3%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-3 lg:gap-10">
          {recientes.map((libro) => (
            <ProductCard key={libro.id} libro={libro} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recientes;
