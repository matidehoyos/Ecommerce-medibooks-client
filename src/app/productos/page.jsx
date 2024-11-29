'use client'
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Loader from '@/components/Loader';
import { useProductos } from '@/contexts/productsContexts';
import NotFoundProductos from '@/components/paginaProductos/NotFoundProductos';
import FiltersProductos from '@/components/paginaProductos/FiltersProductos';
import ProductosCardsContainer from '@/components/paginaProductos/ProductosCardsContainer';
import useFilteredProducts from '@/hooks/useFilteredProducts'; 
import Head from 'next/head';

const Productos = () => {
  const productos = useProductos();
  const [priceFilter, setPriceFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(true)
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryCategory = searchParams.get('category') || 'all';

  const filteredProducts = useFilteredProducts(productos, { 
    category: queryCategory, 
    priceFilter, 
    dateFilter 
  });

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, [filteredProducts]);

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
    <>
      <Head>
        <title>{queryCategory === "all" ? "Todos los Productos" : `${queryCategory} - Productos`}</title>
        <meta name="description" content={`Explora los mejores productos en la categoría ${queryCategory}`} />
      </Head>

      <div className="w-full min-h-screen bg-gray-50 lg:bg-gray-200">
        { loading && <Loader /> } 
        <FiltersProductos 
          handleDateChange={handleDateChange} 
          handleCategoryChange={handleCategoryChange} 
          handlePriceChange={handlePriceChange} 
          priceFilter={priceFilter} 
          dateFilter={dateFilter} 
          queryCategory={queryCategory}
        />

        {filteredProducts.length > 0 ? (
          <ProductosCardsContainer filteredProducts={filteredProducts} />
        ) : (
          <NotFoundProductos />
        )}
      </div>
    </>
  );
};

const ProductosPage = dynamic(() => Promise.resolve(Productos), { ssr: false });

export default function ProductosWrapper() {
  return (
    <ProductosPage />
  );
}





