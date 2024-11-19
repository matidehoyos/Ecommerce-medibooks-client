import ProductCard from './ProductCard';
import { useProductos } from '@/contexts/productsContexts';

const Recientes = () => {
  const libros = useProductos();

  const recientes = libros
    .slice() 
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
    .slice(0, 5); 

  return (
    <div className="w-full py-12 md:py-14 lg:py-20 flex bg-gray-200">
      <div className="w-full px-[3%]">
        <h2 className="pb-6 md:pb-12 text-left text-xl md:text-2xl text-gray-700 md:text-gray-600 font-semibold">
          Recien llegados
        </h2>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3">
          {recientes.map((libro) => (
            <ProductCard key={libro.id} libro={libro} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recientes;
