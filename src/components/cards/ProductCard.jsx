import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ libro }) => {
  const defaultImage = "/default.png"; 

  return (
    <Link href={`/product/${libro.id}`} className="w-full max-w-[320px] relative p-1 lg:p-2 rounded-md overflow-hidden bg-transparent border border-gray-300 shadow-md shadow-gray-300 lg:hover:border-gray-800 transition-all duration-500" aria-label="Ir a la página de detalle del producto.">
      {
        libro.descuento > 0 ? (
          <p className="absolute w-auto top-0 left-0 px-3 text-white font-semibold bg-red-500 z-10 lg:group-hover:hidden">% {libro.descuento} off!</p>
        ) : null
      }
      <div className="w-full lg:w-auto h-[160px] md:h-[180px] lg:h-[220px] flex justify-center items-center bg-gray-300 overflow-hidden rounded-md rounded-b-none transition-all duration-500">
      <Image
          src={libro.imagen || defaultImage}
          alt={`Portada del libro ${libro.titulo}`}
          width={500}
          height={500}
          className="w-auto h-[92%] md:h-[90%] lg:h-[200px] object-contain lg:rounded-md"
          loading="lazy"
          placeholder="blur"
          blurDataURL='/blur.jpg'
        />
      </div>
      <div className="pt-1">
        <h2 className="w-full truncate text-md text-gray-950 font-semibold">{libro.titulo}</h2>
        <p className="w-full truncate text-sm text-gray-600 font-semibold">{libro.autor}</p>
        <div className="w-full flex justify-start items-center gap-2">
          {
            libro.precioAnterior !== libro.precio ? (
              <p className="text-gray-400 text-xs line-through">${libro.precioAnterior}</p>
             ) : null
          }
          <p className="text-sm lg:text-lg font-bold text-green-700">${libro.precio.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

