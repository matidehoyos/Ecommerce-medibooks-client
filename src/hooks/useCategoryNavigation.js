import { useRouter } from 'next/navigation';
import { useCategorias } from '@/contexts/categoryContexts';

const useCategoryNavigation = () => {
  const router = useRouter(); 
  const cate = useCategorias(); 
  const categorias = cate.sort((a, b) => a.nombre.localeCompare(b.nombre));
  

  const handleCategoryChange = (category) => {
    router.push(`/productos?category=${category}`); 
  };

  return { categorias, handleCategoryChange }; 
};

export default useCategoryNavigation;
