'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProductos } from '@/contexts/productsContexts';
import SuggestedProducts from './SuggestedProducts';
import SearchInput from './SearchInput';

const SearchBar = ({ isMobile = false, setAbierto = null }) => {
  const productos = useProductos();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const router = useRouter();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const filteredProducts = productos.filter((product) =>
        product.titulo.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestedProducts(filteredProducts);
    } else {
      setSuggestedProducts([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (setAbierto) setAbierto(false); 
    setSearchQuery('');
    setSuggestedProducts([]);
  };

  const handleSuggestionClick = (productId) => {
    if (setAbierto) setAbierto(false); 
    router.push(`/product/${productId}`);
    setSearchQuery('');
    setSuggestedProducts([]);
  };

  return (
    <div className={`relative ${isMobile ? 'w-auto' : 'w-full md:w-[220px] lg:w-[240px] xl:w-[320px]'}`}>
      
      <SearchInput isMobile={isMobile} handleSearchSubmit={handleSearchSubmit} handleSearchChange={handleSearchChange} searchQuery={searchQuery}/>

      {searchQuery && suggestedProducts.length > 0 && (
        <SuggestedProducts
          suggestedProducts={suggestedProducts}
          handleSuggestionClick={handleSuggestionClick}
        />
      )}
    </div>
  );
};

export default SearchBar;
