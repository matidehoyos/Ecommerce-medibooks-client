'use client'

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductCard from '../../components/ProductCard';
import { getLibros } from '@/services/serviceLibros';
import { getCategorias } from '@/services/serviceCategoria';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import Image from 'next/image';
import Link from 'next/link';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [libros, categorias] = await Promise.all([getLibros(), getCategorias()]);
      setProductos(libros);
      setCategorias(categorias);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleCategoryChange = (e) => {
    router.push(`/productos?category=${e.target.value}`);
  };

  return (
    <div className="w-full min-h-screen bg-gray-200">
      {loading && <Loader />}
      <div className="w-full pt-[120px] px-[2%] flex justify-between items-center">
        <div className="mb-10">
          <label htmlFor="category" className="mr-2 text-2xl font-light text-gray-700">
            Categoria:
          </label>
          <select
            id="category"
            className="w-[200px] px-4 py-2 text-gray-700 font-bold border rounded-md border-gray-400 bg-gray-100"
            onChange={handleCategoryChange}
          >
            <option value="all">Todos los libros</option>
            {categorias.map(category => (
              <option key={category.id} value={category.nombre.trim()}>
                {category.nombre.trim()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="w-[94%] md:grid mt-0 px-[2%] pb-40 mx-auto grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-4">
          {filteredProducts.map(libro => (
            <ProductCard key={libro.id} libro={libro} />
          ))}
        </div>
      ) : (
        <div className='w-full py-[100px] px-[3%]'>
          <p className='text-left text-3xl font-light text-gray-800'>En este momento no contamos con libros de esta categoría.</p>
          <Link href='/productos' className='text-left text-xl font-semibold text-[#1b7b7e] underline'>Explore aquí libros disponibles en la tienda.</Link>
          <Image src='/logoDark.png' width={2400} height={600} alt='Logo Medibooks.' className='w-[30%] mt-20' />
        </div>
      )}
      <Footer />
    </div>
  );
};

const ProductosPage = dynamic(() => Promise.resolve(Productos), { ssr: false });

export default function ProductosWrapper() {
  return (
    <Suspense fallback={<Loader />}>
      <ProductosPage />
    </Suspense>
  );
}





