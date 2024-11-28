import CategoriasMovil from "./CategoriasMov";
import CategoriasPc from "./CategoriasPc";


const Categorias = () => {

  return (
    <>
      <div className="hidden lg:block">
        <CategoriasPc />
      </div>
      <div className="block lg:hidden">
        <CategoriasMovil />
      </div>
    </>
  );
};

export default Categorias;
