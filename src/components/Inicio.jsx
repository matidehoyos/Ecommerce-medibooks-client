'use client'
import { useEffect, useState } from "react";
import Categories from "./Categories";
import CategoriesMovil from "./CategoriesMov";
import Destacados from "./Destacados";
import Loader from "./Loader";
import Oferts from "./Oferts";
import Recientes from "./Recientes";
import Ubicacion from "./ubicacion";
import Header from "./header/Header";

const Inicio = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timeout = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timeout);
    }, []);

    return (
      <>
        {loading && <Loader />}
        <Header />
        <Categories />
        <CategoriesMovil />
        <Recientes />
        <Destacados />
        <Oferts />
        <Ubicacion />
      </>
    );
  };
  
  export default Inicio;