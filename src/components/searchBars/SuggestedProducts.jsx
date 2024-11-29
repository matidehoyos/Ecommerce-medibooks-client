
const SuggestedProducts = ({suggestedProducts, handleSuggestionClick}) => {

    return (
        <div className="absolute top-full left-0 w-full bg-gray-100 border border-gray-300 rounded-md mt-1 z-40 max-h-60 overflow-y-auto">
          <ul>
            {suggestedProducts.map((product) => (
              <li key={product.id} className="px-2 py-2 text-gray-900 font-bold hover:bg-gray-200">
                <span
                  onClick={() => handleSuggestionClick(product.id)}
                  className="text-gray-600 cursor-pointer"
                >
                  {product.titulo}
                </span>
              </li>
            ))}
          </ul>
        </div>
    )
}

export default SuggestedProducts;