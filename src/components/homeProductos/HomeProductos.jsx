import { useProductos } from "@/contexts/productsContexts";
import Destacados from "./Destacados";
import Oferts from "./Oferts";
import Recientes from "./Recientes";


const HomeProductos = () => {
    const productos = useProductos();
    
    return (
      <>
        <Recientes productos={productos} />
        <Destacados productos={productos}/>
        <Oferts productos={productos}/>
      </>
    );
  };
  
  export default HomeProductos;