import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const SearchInput = ({isMobile = false, handleSearchChange, handleSearchSubmit, searchQuery }) => {


    return(
        <form onSubmit={handleSearchSubmit}
              className={`flex border rounded-md overflow-hidden py-1 ${
              isMobile ? 'border-gray-400 bg-opacity-10' : 'border-gray-800 lg:border-gray-300 bg-opacity-40' }`}>
            
            <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Buscar libro..."
            className={`w-full px-2 focus:outline-none focus:ring-0 bg-transparent ${
                isMobile 
                ? 'py-1 text-lg  text-gray-200 placeholder:text-gray-50 placeholder:text-xl'
                : 'text-base text-gray-700 lg:text-gray-200 placeholder:text-gray-800 lg:placeholder:text-gray-300'
            }`}
            autoComplete="off"
            />
            <button type="submit" className="px-2">
            <FontAwesomeIcon
                icon={faSearch}
                className={`${isMobile ? 'text-gray-50 text-lg' : 'text-gray-800 lg:text-gray-50'}`}
            />
            </button>
      </form>
    )
}

export default SearchInput;