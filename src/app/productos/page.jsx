'use client'
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductCard from '../../components/ProductCard';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import { useProductos } from '@/contexts/productsContexts';
import { useCategorias } from '@/contexts/categoryContexts';

const Productos = () => {
  const productos = useProductos();
  const categorias = useCategorias();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceFilter, setPriceFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryCategory = searchParams.get('category') || 'all';

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setLoading(true);
    
    let filtered = queryCategory === 'all'
      ? productos
      : productos.filter(product => product.categoria?.trim() === queryCategory.trim());

    if (priceFilter === 'asc') {
      filtered.sort((a, b) => a.precio - b.precio);
    } else if (priceFilter === 'desc') {
      filtered.sort((a, b) => b.precio - a.precio);
    }

    if (dateFilter === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (dateFilter === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setFilteredProducts(filtered);
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, [productos, queryCategory, priceFilter, dateFilter]);

  const handleCategoryChange = (e) => {
    router.push(`/productos?category=${e.target.value}`);
  };

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 lg:bg-gray-200">
      {loading && <Loader />}
      
      <div className="w-full pt-[80px] md:pt-[120px] px-[2%] lg:px-[6%] flex flex-row justify-start items-stretch md:items-center mb-3 md:mb-10 gap-1 sm:gap-2 md:gap-3 lg:gap-4 flex-wrap">
        <div className='w-[49.2%] md:hidden'>
          <SearchBar />
        </div>
        <div className='w-[49.2%] md:w-[200px]'>
          <select
            id="category"
            className="w-full lg:w-[200px] px-1 lg:px-4 py-[8px] lg:py-2 text-gray-700 font-bold border rounded-md border-gray-400 bg-gray-100 focus:outline-none "
            onChange={handleCategoryChange}
            value={queryCategory}
          >
            <option value="all">Categorias: todas</option>
            {categorias.map(category => (
              <option key={category.id} value={category.nombre.trim()}>
                {category.nombre.trim()}
              </option>
            ))}
          </select>
        </div>

        <div className='w-[49.2%] md:w-[200px]'>
          <select
            id="price"
            className="w-full md:w-[200px] px-1 lg:px-4 py-2 text-gray-700 font-bold border rounded-md border-gray-400 bg-gray-100 focus:outline-none"
            onChange={handlePriceChange}
            value={priceFilter}
          >
            <option value="asc">Más barato</option>
            <option value="desc">Más caro</option>
          </select>
        </div>

        <div className='w-[49.2%] md:w-[200px]'>
          <select
            id="date"
            className="w-full md:w-[200px] px-1 lg:px-4 py-2 text-gray-700 font-bold border rounded-md border-gray-400 bg-gray-100 focus:outline-none"
            onChange={handleDateChange}
            value={dateFilter}
          >
            <option value="newest">Más reciente</option>
            <option value="oldest">Más antiguo</option>
          </select>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="w-full grid mt-0 px-[2%] lg:px-[6%] pb-12 md:pb-40 mx-auto grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-10">
          {filteredProducts.map(libro => (
            <ProductCard key={libro.id} libro={libro} />
          ))}
        </div>
      ) : (
        <div className='w-full pt-[70px] pb-[170px] md:py-[100px] px-[3%]'>
          <p className='mb-3 md:mb-0 text-left text-[24px] leading-[103%] md:leading-normal md:text-3xl font-light text-gray-800'>
            En este momento no contamos con libros de esta categoría.
          </p>
          <Link href='/productos' className='text-left text-lg md:text-xl font-semibold text-[#1b7b7e] underline'>
            Explore aquí libros disponibles.
          </Link>
          <Image src='/logoDark.png' width={2400} height={600} alt='Logo de Medibooks.' className='w-[30%] mt-20 hidden md:block' />
        </div>
      )}
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




