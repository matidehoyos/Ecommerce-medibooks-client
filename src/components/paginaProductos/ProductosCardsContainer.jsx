import ProductCard from "../cards/ProductCard";


const ProductosCardsContainer = ({filteredProducts}) => {

    return(
        <div className="w-full grid mt-0 px-[3%] lg:px-[6%] pb-12 md:pb-40 mx-auto grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
          {filteredProducts.map(libro => (
            <ProductCard key={libro.id} libro={libro} />
          ))}
        </div>
    )
}



export default ProductosCardsContainer;