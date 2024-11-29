import { useMemo } from 'react';

const useFilteredProducts = (productos, { category, priceFilter, dateFilter }) => {
  return useMemo(() => {
    let filtered = category === 'all' ? productos : productos.filter(product => product.categoria?.trim() === category.trim());
    
    if (priceFilter) {
      filtered.sort((a, b) => (priceFilter === 'asc' ? a.precio - b.precio : b.precio - a.precio));
    }
    if (dateFilter) {
      filtered.sort((a, b) => (dateFilter === 'newest' ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt)));
    }
    return filtered;
  }, [productos, category, priceFilter, dateFilter]);
};


export default useFilteredProducts;