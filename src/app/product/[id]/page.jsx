'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Footer from '@/components/Footer';
import { getLibro, getLibros } from '@/services/serviceLibros';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContexts';
import Loader from '@/components/Loader';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [producto, setProducto] = useState(null);
  const [similares, setSimilares] = useState([]);
  const [cantidad, setCantidad] = useState(1);
  const [terminacion, setTerminacion] = useState('Encuadernado');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducto = async () => {
      try {
        const data = await getLibro(id);
        setProducto(data);
        const similaresData = await getLibros();
        setSimilares(similaresData);
        const timeout = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timeout);
      } catch (error) {
        setError(error.message);
      }
    };
    getProducto();
  }, [id]);

  const incrementarCantidad = () => {
    setCantidad(cantidad + 1);
  };

  const decrementarCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const agregarAlCarrito = () => {
    const productoConTerminacion = {
      ...producto,
      terminacion,
    };
    addToCart(productoConTerminacion, cantidad);
  };

  const filtrados = similares.filter(libro => libro.categoria === producto?.categoria);
  const relacionados = filtrados.filter(libro => libro.id !== producto?.id);

  if (error) return <div>{error}</div>;
  if (!producto) return <div>Cargando...</div>;

  return (
    <div className='min-h-screen  bg-gray-200'>
      {loading && <Loader />}
      <div className='w-full h-auto pt-[170px] flex flex-col items-center justify-center pb-20'>
        <div className='w-full flex justify-center items-stretch gap-8 pb-20'>
          <div className='w-[50%] flex justify-end overflow-hidden p-0'>
            <div className='w-auto py-8 px-10 flex items-center bg-gray-300 overflow-hidden'>
              <Image
                src={producto.imagen || '/default.png'}
                alt={producto.titulo}
                width={500}
                height={500}
                className="w-[260px] h-auto object-contain hover:scale-[1.6] transition-all duration-500"
              />
            </div>
          </div>
          <div className='w-[50%] flex flex-col justify-around'>
            <p className='text-xl font-bold text-[#1b7b7e]'>de {producto.autor}</p>
            <h1 className='text-3xl font-bold text-gray-900'>{producto.titulo}</h1>
            <p className='text-lg font-bold text-gray-600'>{producto.categoria}</p>
            <div className='w-auto mt-2 flex justify-start items-center gap-2'>
              {producto.precioAnterior !== producto.precio && (
                <p className='text-xl text-gray-400 font-bold line-through'>${producto.precioAnterior}</p>
              )}
              <p className='text-3xl font-bold text-[#1b7b7e]'>${producto.precio}</p>
              {producto.descuento > 0 && (
                <p className='text-xl font-extrabold text-red-500'>{producto.descuento}% off!</p>
              )}
            </div>
            <p className='mt-2 text-lg font-light text-gray-700'>Stock disponible {producto.stock} unidades.</p>
            
            <label className='mt-2 text-md font-normal text-gray-900'>
              Terminación:
              <select
                className='ml-2 p-1 border border-gray-700 rounded-md bg-transparent'
                value={terminacion}
                onChange={(e) => setTerminacion(e.target.value)}
              >
                <option value="Encuadernado">Encuadernado</option>
                <option value="Anillado">Anillado</option>
              </select>
            </label>
            
            <div className='flex flex-col items-start mt-4 gap-4'>
              <div className='flex items-center border border-gray-400 rounded-md'>
                <button
                  onClick={decrementarCantidad}
                  className='px-4 py-0 text-4xl bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-l'
                >
                  -
                </button>
                <span className='px-4 py-2 bg-gray-100 text-gray-800 font-bold'>
                  {cantidad}
                </span>
                <button
                  onClick={incrementarCantidad}
                  className='h-full px-4 text-2xl bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-r'
                >
                  +
                </button>
              </div>
              <button
                onClick={agregarAlCarrito}
                className='px-6 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition-colors duration-300'
              >
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
        <p className='w-[90%] mt-2 text-[18px] tracking-[.6px] leading-[23px] font-medium text-gray-700 text-center'><span className='font-bold text-gray-900'>Descripción: </span>{producto.detalle}</p>
      </div>
      { relacionados.length > 0 ? (
      <div className='w-full flex flex-col items-center py-20 bg-gray-400 gap-10'>
        <h3 className='text-2xl font-bold text-gray-800'>Productos similares</h3>
        <div className='w-full flex flex-wrap justify-center gap-5'>
          {relacionados.map((libro) => (
            <Link href={`/product/${libro.id}`} key={libro.id} className="w-[250px] relative p-2 border border-gray-400 rounded-md shadow-lg overflow-hidden bg-white group hover:border-gray-500 hover:shadow-gray-600 transition-all duration-500">
              {libro.descuento > 0 && (
                <p className="absolute w-auto top-0 left-0 px-3 text-white font-semibold bg-red-400">% {libro.descuento} off!</p>
              )}
              <div className="w-full h-[200px] flex justify-center items-center bg-gray-200 overflow-hidden rounded-md group-hover:bg-gray-400 transition-colors duration-500">
                <Image
                  src={libro.imagen || '/default.png'}
                  alt={libro.titulo}
                  width={500}
                  height={500}
                  className="w-[100%] h-[80%] object-contain"
                />
              </div>
              <div className="pt-1">
                <h2 className="w-full truncate text-md text-gray-950 font-semibold">{libro.titulo}</h2>
                <p className="w-full truncate text-sm text-gray-600 font-semibold">{libro.autor}</p>
                <div className="w-full flex justify-start items-center gap-2">
                  {libro.precioAnterior !== libro.precio && (
                    <p className="text-gray-400 text-xs line-through">${libro.precioAnterior}</p>
                  )}
                  <p className="text-sm font-bold text-red-600">${libro.precio.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div> 
      ) : null }
      <Footer />
    </div>
  );
};

export default ProductDetailPage;




