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
  const [isExpanded, setIsExpanded] = useState(false);



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


  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const filtrados = similares.filter(libro => libro.categoria === producto?.categoria);
  const relacionados = filtrados.filter(libro => libro.id !== producto?.id);

  if (error) return <div>{error}</div>;
  if (!producto) return <div>Cargando...</div>;

  return (
    <div className='min-h-screen bg-gray-200'>
      {loading && <Loader />}
      <div className='w-full h-auto md:h-auto pt-[60px] md:pt-[80px] flex flex-col justify-start md:flex-row md:items-center md:justify-center'>
          <div className='md:w-[80%] h-auto overflow-hidden'>
            <div className='w-auto h-auto px-5 md:p-5 md:px-0 flex items-center md:justify-end'>
              <Image
                src={producto.imagen || '/default.png'}
                alt={producto.titulo}
                width={500}
                height={500}
                className="w-[160px] md:w-[360px] h-auto py-10 md:py-10 md:px-10 object-scale-down md:hover:scale-[1.1] transition-all duration-700"
                style={{ filter: 'drop-shadow(10px 10px 10px rgba(0,0,0,.7))' }}
              />
            </div>
          </div>
          <div className='md:w-full px-[4%] pb-8 md:pb-0 md:px-0 md:pt-[0px] flex flex-col md:justify-start'>
            <p className='text-lg md:text-[22px] md:pt-[12px] font-[800] text-gray-500 md:text-gray-600 font-sans'><span className='font-[400] text-[18px]'>Autor/es: </span>{producto.autor}</p>
            <h1 className='text-2xl leading-[102%] md:leading-normal md:text-[40px] font-bold text-gray-800 font-sans'>{producto.titulo}</h1>
            <div className='w-auto mt-2 flex justify-start items-center gap-2'>
              <p className='mt-3 md:mt-0text-xl md:text-3xl font-extrabold text-[#1b7b7e]'>${producto.precio}</p>
              {producto.precioAnterior !== producto.precio && (
                <p className='md:text-xl text-gray-400 font-bold line-through'>${producto.precioAnterior}</p>
              )}
            </div>
            <label className='mt-5 md:mt-6 text-md font-medium text-gray-800'>
                Terminación:
                <select
                  className='ml-2 p-1 border text-sm border-gray-700 rounded-md bg-transparent'
                  value={terminacion}
                  onChange={(e) => setTerminacion(e.target.value)}
                >
                  <option value="Encuadernado">Encuadernado</option>
                  <option value="Anillado">Anillado</option>
                </select>
              </label>
            <div className='flex items-center justify-start mt-8 gap-4'>
            <div className="h-full">
                <input
                  type="number"
                  min="1"
                  max={producto.stock}
                  value={cantidad}
                  onChange={(e) => setCantidad(parseInt(e.target.value))}
                  className="w-12 h-full border border-gray-600 text-center text-lg text-extrabold rounded-md bg-transparent"
                />
              </div>
              <button
                onClick={agregarAlCarrito}
                className='px-6 py-2 bg-red-500 text-white font-bold border border-gray-500 rounded-md md:rounded-md md:hover:bg-red-400 transition-colors duration-300'
              >
                Agregar al Carrito
              </button>
            </div>     
          </div>
      </div>
      <div className='md:w-full px-[3%] py-8 md:py-8 md:px-[10%] mt-2 md:mt-0 md:text-[20px] md:tracking-[.6px] md:leading-[23px] font-medium text-gray-800 text-left bg-gray-300'>
              <p>
                <span className='font-bold text-gray-700'>Descripción: </span>
                  {isExpanded ? producto.detalle : `${producto.detalle.slice(0, 460)}...`}
              </p>
              <button 
              onClick={toggleExpand}
              className="text-gray-500 mt-2 font-semibold underline"
              >
              {isExpanded ? 'Leer menos' : 'Leer más'}
              </button>
            </div> 
      { relacionados.length > 0 ? (
      <div className='w-full flex flex-col md:items-center py-12 md:py-20 bg-[#1b7b7e] md:bg-gray-400  gap-6 md:gap-10'>
        <h3 className='pl-[3%] md:pl-0 text-xl md:text-2xl font-bold text-gray-100 md:text-gray-800'>Productos similares</h3>
        <div className='w-full px-[3%] flex md:flex-wrap justify-start md:justify-center gap-3 md:gap-5 overflow-scroll' style={{ scrollbarWidth: 'none'}}>
          {relacionados.map((libro) => (
            <Link href={`/product/${libro.id}`} key={libro.id} className="w-[240px] md:w-[280px] relative p-2 border border-gray-400 rounded-md shadow-lg  bg-white group md:hover:border-gray-500 md:hover:shadow-gray-600 transition-all duration-500">
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




