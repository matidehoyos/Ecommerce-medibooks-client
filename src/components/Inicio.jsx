'use client'
import Loader from "./Loader";
import Ubicacion from "./ubicacion";
import Header from "./header/Header";
import HomeProductos from "./HomeProductos";
import Categorias from "./categorias/Categorias";

const Inicio = () => {
    
    return (
      <>
        <Loader />
        <Header />
        <Categorias />
        <HomeProductos />
        <Ubicacion />
      </>
    );
  };
  
  export default Inicio;