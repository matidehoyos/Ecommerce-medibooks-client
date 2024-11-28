import Image from "next/image";
import Link from "next/link";


const RelatedCard = ({ libro }) => {

  return (
    <Link href={`/product/${libro.id}`} key={libro.id} className="w-[240px] md:w-[280px] relative p-2 border border-gray-400 rounded-md shadow-lg bg-white group lg:hover:border-gray-500 lg:hover:shadow-gray-600 transition-all duration-500" aria-label="Ir a la página de detalle del producto.">
            {libro.descuento > 0 && (
            <p className="absolute w-auto top-0 left-0 px-3 text-white font-semibold bg-red-400">% {libro.descuento} off!</p>
            )}
            <div className="w-full h-[200px] flex justify-center items-center bg-gray-200 overflow-hidden rounded-md lg:group-hover:bg-gray-400 transition-colors duration-500">
            <Image
                src={libro.imagen || '/default.png'}
                alt={`Portada del libro ${libro.titulo}`}
                width={500}
                height={500}
                className="w-[100%] h-[80%] object-contain"
                loading="lazy"
                placeholder="blur"
                blurDataURL='/blur.jpg'
            />
            </div>
            <div className="pt-1">
            <h2 className="w-[230px] md:w-full truncate text-md text-gray-950 font-semibold">{libro.titulo}</h2>
            <p className="w-full truncate text-sm text-gray-600 font-semibold">{libro.autor}</p>
            <div className="w-full flex justify-start items-center gap-2">
                {libro.precioAnterior !== libro.precio && (
                <p className="text-gray-400 text-xs line-through">${libro.precioAnterior}</p>
                )}
                <p className="text-sm font-bold text-red-600">${libro.precio.toFixed(2)}</p>
            </div>
            </div>
    </Link>
  );
};

export default RelatedCard;