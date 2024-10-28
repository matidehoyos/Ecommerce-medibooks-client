'use client';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { getLibros } from '../services/serviceLibros';
import Link from 'next/link';

const Destacados = () => {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    const loadLibros = async () => {
      try {
        const data = await getLibros();
        setLibros(data);
      } catch (error) {
        setError('Error loading books: ' + error.message);
      }
    };

    loadLibros();
  }, []);


  return (
    <div className="w-full py-12 md:py-20 flex bg-gray-50">
      <div className="w-full px-[3%] md:px-[3%]">
        <h2 className="pb-6 md:pb-12 text-left text-xl md:text-2xl text-gray-700 md:text-gray-600 font-semibold">Productos destacados</h2>
        <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-5">
                {libros.map((libro, index) => (
                   <ProductCard key={index} libro={libro} />
                  ))}
        </div>
        <div className='w-full pt-12 md:pt-20 flex'>
            <Link href='/productos' className='w-auto mx-auto px-3 py-2 text-lg md:text-xl font-bold rounded-md md:hover:bg-[#1b7b7e] text-[#1b7b7e] md:hover:text-white border border-[#1b7b7e] transition-colors duration-300'>Ver todos los productos</Link>
        </div>
      </div>
    </div>
  );
};

export default Destacados;
