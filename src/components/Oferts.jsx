import ProductCard from './ProductCard';
import { useProductos } from '@/contexts/productsContexts';

const Oferts = () => {
  const libros = useProductos();
  const ofertas = libros
  .filter(libro => libro.descuento > 2) 
  .sort((a, b) => b.descuento - a.descuento) 
  .slice(0, 10); 
  return (
    <div className="w-full py-12 md:py-20 px-[3%] flex flex-col bg-red-100 lg:bg-red-100">
        <h2 className="pb-6 md:pb-4 text-left text-xl md:text-3xl text-red-600 font-semibold">Productos en oferta</h2>
        <div className="w-full lg:px-[3%] grid gap-4 md:gap-3 lg:gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {ofertas.map((libro, index) => (
            <ProductCard key={index} libro={libro} />
          ))}
        </div>
     </div>
  );
};

export default Oferts;
