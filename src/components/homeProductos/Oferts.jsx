import ProductCard from '../cards/ProductCard';

const Oferts = ({productos}) => {

  const ofertas = productos
  .filter(libro => libro.descuento > 2) 
  .sort((a, b) => b.descuento - a.descuento) 
  .slice(0, 10); 
  
  return (
    <div className="w-full py-12 md:py-20 px-[3%] flex flex-col bg-red-50">
        <h2 className="pb-4 text-left text-2xl md:text-3xl text-red-600 font-semibold">Productos en oferta</h2>
        <div className="w-full lg:px-[3%] grid gap-3 lg:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {ofertas.map((libro, index) => (
            <ProductCard key={index} libro={libro} />
          ))}
        </div>
     </div>
  );
};

export default Oferts;
