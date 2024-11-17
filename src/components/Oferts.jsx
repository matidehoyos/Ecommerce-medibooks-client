import ProductCard from './ProductCard';
import { useProductos } from '@/contexts/productsContexts';

const Oferts = () => {
  const libros = useProductos();
  const ofertados = libros.filter(libro => libro.descuento > 6);

  return (
    <div className="w-full py-12 md:py-20 px-[3%] flex flex-col bg-gray-200">
        <h2 className="pb-6 md:pb-8 text-left text-2xl md:text-4xl text-red-500 font-semibold">En oferta</h2>
        <div className="w-full grid grid-cols-2 gap-2 md:gap-5 md:grid-cols-4">
          {ofertados.map((libro, index) => (
            <ProductCard key={index} libro={libro} />
          ))}
        </div>
     </div>
  );
};

export default Oferts;
