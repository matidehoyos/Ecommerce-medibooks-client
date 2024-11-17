'use client'
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

const PaginateAdmin = ({currentPage, totalPages, setCurrentPage}) => {

    return (
        <div className='mx-3 py-2 px-4 flex justify-between items-center rounded-md bg-gray-300'>
            <p className='text-sm text-gray-950'>Mostrando {currentPage} de {totalPages} páginas</p>
            <div className='flex items-center'> 
                <p className='text-sm text-gray-950 mr-2'>Página {currentPage}</p>
                <div className='flex gap-1'> 
                    <button className={`p-1 text-white ${currentPage === 1 ? 'bg-gray-300' : 'bg-gray-800'}  rounded`} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}> <BiSolidLeftArrow size={12} /> </button> 
                    <button className={`p-1 text-white ${currentPage === totalPages ? 'bg-gray-300' : 'bg-gray-800'} rounded`} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}> <BiSolidRightArrow size={12}/> </button> 
                </div>
            </div> 
        </div>
    )
  };
  
export default PaginateAdmin;