import { useState } from "react";


const ProductoDetalle = ({detalle}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
      };    


    return (
        <div className='md:w-full px-[3%] py-5 md:py-8 md:px-[6%] md:text-[20px] md:tracking-[.6px] md:leading-[23px] font-medium text-gray-800 text-left bg-gray-300'>
            <p className='text-md font-normal leading-5 lg:leading-7'>
                <span className='text-md font-bold text-gray-800'>Descripción: </span>
                {isExpanded && detalle.length > 300 ? detalle : `${detalle.slice(0, 300)}...`}
            </p>
            <button 
            onClick={toggleExpand}
            className="text-gray-500 mt-2 font-semibold underline"
            >
            {isExpanded ? 'Leer menos' : 'Leer más'}
            </button>
      </div> 
    )
}


export default ProductoDetalle;