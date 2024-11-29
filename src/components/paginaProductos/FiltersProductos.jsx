import { useCategorias } from "@/contexts/categoryContexts";
import SearchBar from "../searchBars/SearchBar";


const FiltersProductos = ({handleCategoryChange, queryCategory, handlePriceChange, priceFilter, handleDateChange, dateFilter}) => {
    const categorias = useCategorias();

    return (
        <div className="w-full pt-[85px] md:pt-[120px] px-[3%] lg:px-[6%] flex flex-col md:flex-row justify-center md:justify-start items-center md:items-stretch mb-4 md:mb-10 gap-2 md:gap-3 lg:gap-4">
        <div className='w-full md:hidden'>
          <SearchBar />
        </div>
        <div className='w-full md:w-[200px]'>
          <select
            id="category"
            className="w-full lg:w-[200px] px-1 lg:px-4 py-2 lg:py-2 text-gray-700 font-bold border rounded-md border-gray-400 bg-gray-100 focus:outline-none "
            onChange={handleCategoryChange}
            value={queryCategory}
          >
            <option value="all">Categorias: todas</option>
            {categorias.map(category => (
              <option key={category.id} value={category.nombre.trim()}>
                {category.nombre.trim()}
              </option>
            ))}
          </select>
        </div>

        <div className='w-full md:w-auto flex gap-2 lg:gap-4'>
          <div className='w-full md:w-[200px]'>
            <select
              id="price"
              className="w-full md:w-[200px] px-1 lg:px-4 py-2 text-gray-700 font-bold border rounded-md border-gray-400 bg-gray-100 focus:outline-none"
              onChange={handlePriceChange}
              value={priceFilter}
            >
              <option value="asc">Más barato</option>
              <option value="desc">Más caro</option>
            </select>
          </div>

          <div className='w-full md:w-[200px]'>
            <select
              id="date"
              className="w-full md:w-[200px] px-1 lg:px-4 py-2 text-gray-700 font-bold border rounded-md border-gray-400 bg-gray-100 focus:outline-none"
              onChange={handleDateChange}
              value={dateFilter}
            >
              <option value="newest">Más reciente</option>
              <option value="oldest">Más antiguo</option>
            </select>
          </div>
        </div>
      </div>
    )
}


export default FiltersProductos;