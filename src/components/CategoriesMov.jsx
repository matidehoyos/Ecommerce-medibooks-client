'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCategorias } from '@/services/serviceCategoria';

const CategoriesMovil = () => {
  const router = useRouter();
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const loadCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategorias(data);
      } catch (error) {
        console.log('Error loading categories from categories: ' + error.message);
      }
    };
    loadCategorias();
  },[]);  

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    router.push(`/productos?category=${category}`);
  };



  return (
    <div className="w-full px-[2%] py-3 flex justify-start items-stretch lg:hidden bg-gray-700 overflow-hidden">
      <Link
        href="/productos"
        className="block text-[#1b7b7e] text-xl font-bold text-center bg-gray-50 py-1 px-4 rounded-md border border-gray-400"
      >
        Todas
      </Link>
      <select
        onChange={handleCategoryChange}
        className="w-[180px] px-1 ml-2 flex-1 text-[#1b7b7e] text-xl font-bold bg-gray-50 rounded-md border border-gray-400"
      >
        <option value="">Seleccione categoria</option>
        {categorias.map((category) => (
          <option key={category.id} value={category.nombre}>
            {category.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoriesMovil;