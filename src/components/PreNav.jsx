import Flag from 'react-world-flags';

const PreNav = () => {

  return (
    <div className="w-full h-[28px] py-1 bg-gray-900 lg:bg-gray-300 flex justify-center items-center">
        <span className='pr-1 md:pr-2 flex gap-2 text-gray-400 lg:text-gray-700 text-xs md:text-sm font-[100] md:tracking-widest border-r border-gray-400 lg:border-gray-700'>Envios a todo Argentina <Flag code="ar" style={{ width: '24px', height: 'auto' }} /></span>
        <span className='hidden px-2 text-gray-700 text-sm font-[100] tracking-widest border-r border-gray-700'>Tienda de libros de medicina</span>
        <span className='pl-1 md:pl-2 text-gray-400 lg:text-gray-700 text-xs md:text-sm font-[100] md:tracking-widest'>Local en Mar Del Plata</span>
    </div>
  );
};

export default PreNav;