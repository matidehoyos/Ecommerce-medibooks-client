'use client'
import Categories from "./Categories";
import CategoriesMovil from "./CategoriesMov";
import Destacados from "./Destacados";
import Loader from "./Loader";
import Oferts from "./Oferts";
import Recientes from "./Recientes";
import Ubicacion from "./ubicacion";
import Header from "./header/Header";

const Inicio = () => {
    
    return (
      <>
        <Loader />
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