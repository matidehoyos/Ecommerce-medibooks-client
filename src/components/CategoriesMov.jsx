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
    <div className="w-full px-[2%] py-6 flex justify-start items-stretch lg:hidden bg-gray-800 overflow-hidden">
      <Link
        href="/productos"
        className="block text-white text-xl font-bold text-center bg-[#1b7b7e] py-2 px-4 rounded-md border border-gray-800"
      >
        Todas
      </Link>
      <select
        onChange={handleCategoryChange}
        className="w-[180px] px-1 ml-2 flex-1 text-gray-800 text-xl font-bold bg-gray-100 rounded-md border border-gray-800"
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