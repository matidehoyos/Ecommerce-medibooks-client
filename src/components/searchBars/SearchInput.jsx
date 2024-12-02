import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const SearchInput = ({isMobile = false, handleSearchChange, handleSearchSubmit, searchQuery }) => {


    return(
        <form onSubmit={handleSearchSubmit}
              className={`flex border rounded-md overflow-hidden ${
              isMobile ? 'border-gray-400 bg-opacity-10' : 'lg:py-1 border-gray-800 lg:border-white bg-[rgba(256,256,256,.8)]' }`}>
            
            <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Buscar libro..."
            className={`w-full px-2 focus:outline-none focus:ring-0 bg-transparent ${
                isMobile 
                ? 'py-2 text-md font-bold  text-gray-700 placeholder:text-gray-700 placeholder:text-md bg-[rgba(256,256,256,.8)]'
                : 'text-base text-gray-700 lg:text-gray-700 placeholder:text-gray-800 lg:placeholder:text-gray-700'
            }`}
            autoComplete="off"
            />
            <button type="submit" className={`px-2 ${isMobile ? 'bg-[rgba(256,256,256,.8)]' : ''}`}>
            <FontAwesomeIcon
                icon={faSearch}
                className={`${isMobile ? 'text-gray-700 text-md' : 'text-gray-800 lg:text-gray-700'}`}
            />
            </button>
      </form>
    )
}

export default SearchInput;