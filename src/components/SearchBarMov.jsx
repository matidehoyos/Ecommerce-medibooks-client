'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useProductos } from '@/contexts/productsContexts';

const SearchBarMov = ({ onSearch }) => {
  const products = useProductos();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const router = useRouter();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const filteredProducts = products.filter((product) =>
        product.titulo.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestedProducts(filteredProducts);
    } else {
      setSuggestedProducts([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(); 
    setSearchQuery('');
    setSuggestedProducts([]);
  };

  const handleSuggestionClick = (productId) => {
    onSearch();  
    router.push(`/product/${productId}`);
    setSearchQuery('');
    setSuggestedProducts([]);
  };

  return (
    <div className="w-auto md:w-[380px] relative">
      <form onSubmit={handleSearchSubmit} className="flex border border-gray-400 md:border-gray-300 rounded-md overflow-hidden bg-white bg-opacity-10 md:bg-opacity-40 py-2 md:py-1">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Buscar libro..."
          className="w-full py-1 md:py-0 px-2 text-lg md:text-base text-gray-200 focus:outline-none focus:ring-0 bg-transparent placeholder:text-gray-50 placeholder:text-xl placeholder:font-medium"
          style={{ touchAction: 'manipulation', fontSize: '16px' }}
          autoComplete="off"
        />
        <button type="submit" className="text-gray-50 px-2">
          <FontAwesomeIcon icon={faSearch} className='text-gray-50 text-lg' />
        </button>
      </form>

      {searchQuery && suggestedProducts.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-gray-100 border border-gray-300 rounded-md mt-1 z-10 max-h-60 overflow-y-auto">
          <ul>
            {suggestedProducts.map((product) => (
              <li key={product.id} className="px-2 py-2 text-gray-900 font-bold hover:bg-gray-200">
                <span
                  onClick={() => handleSuggestionClick(product.id)}
                  className="text-gray-600 cursor-pointer"
                >
                  {product.titulo}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBarMov;
