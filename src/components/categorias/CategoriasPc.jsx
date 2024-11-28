import useCategoryNavigation from '@/hooks/useCategoryNavigation';

const CategoriasPc = () => {
  const { categorias, handleCategoryChange } = useCategoryNavigation();

  return (
    <div className="hidden lg:flex w-full h-auto py-6 px-4 xl:px-10 items-start justify-center flex-wrap bg-gray-300">
      {categorias?.map((categoria, index) => (
        <div key={index} className="relative group">
          <button
            onClick={() => handleCategoryChange(categoria.nombre)}
            className="text-[#1b7b7e] text-lg px-2 font-bold cursor-pointer hover:bg-[#1b7b7e] hover:text-white rounded-md transition-all duration-500 whitespace-nowrap"
          >
            {categoria.nombre}
          </button>
        </div>
      ))}
    </div>
  );
};

export default CategoriasPc;

