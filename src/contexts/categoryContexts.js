'use client'
import React, { createContext, useState, useEffect, useContext } from 'react';
import BASE_URL from '../config';


const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch(`${BASE_URL}/categories`);
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Error al obtener categorias:', error);
      }
    };

    fetchCategorias();
  }, []);

  return (
    <CategoryContext.Provider value={categorias}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategorias = () => {
  return useContext(CategoryContext);
};
