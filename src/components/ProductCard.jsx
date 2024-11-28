import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ libro }) => {
  const defaultImage = "/default.png"; 

  return (
    <Link href={`/product/${libro.id}`} className="w-full max-w-[260px] relative p-0 lg:p-[5px] rounded-md overflow-hidden bg-transparent lg:border lg:border-gray-400 group transition-all duration-700 lg:hover:bg-white " aria-label="Ir a la página de detalle del producto.">
      {
        libro.descuento > 0 ? (
          <p className="absolute w-auto top-0 left-0 px-3 text-white font-semibold bg-red-400 z-10">% {libro.descuento} off!</p>
        ) : null
      }
      <div className="w-full h-[160px] md:h-[180px] flex justify-center items-center bg-gray-400 overflow-hidden rounded-md lg:absolute lg:group-hover:bg-gray-300  lg:group-hover:h-full transition-all duration-500">
      <Image
          src={libro.imagen || defaultImage}
          alt={`Portada del libro ${libro.titulo}`}
          width={500}
          height={500}
          className="w-auto h-[92%] md:h-[90%] object-contain"
          loading="lazy"
          placeholder="blur"
          blurDataURL='/blur.jpg'
        />
      </div>
      <div className="pt-1 lg:pt-[190px]">
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

