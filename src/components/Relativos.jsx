import RelatedCard from "./cards/RelatedCard";


const Relativos = ({contenido}) => {

    return(
        <div className='w-full flex flex-col md:items-center py-12 md:py-20 bg-[#1b7b7e] md:bg-gray-400  gap-6 md:gap-10'>
            <h3 className='pl-[3%] md:pl-0 text-2xl font-normal md:font-bold text-gray-50 md:text-gray-800'>También te puede interesar</h3>
            <div className='w-full px-[3%] md:px-[6%] flex justify-start gap-3 md:gap-5 overflow-scroll' style={{ scrollbarWidth: 'none'}}>                
                { contenido.map(libro => (
                 <RelatedCard key={libro.id} libro={libro} />
                 ))}
            </div>
        </div>
    )
}


export default Relativos;