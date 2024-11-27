import Image from "next/image";

const ToggleMenu = ({abierto, setAbierto}) => {

    return (
        <div className='w-[40px] h-auto flex lg:hidden ml-8'>
            {
                !abierto ? (
                <button onClick={() => setAbierto(!abierto)} aria-label="Colapsar el menú movil.">
                    <Image src='/menuLight.png' alt='Imagen menu colapse.' width={110} height={90} className='w-[36px] h-auto object-contain' />
                </button>
                ) : (
                <button onClick={() => setAbierto(!abierto)} aria-label="Cerrar el menú movil.">
                    <p className='text-gray-100 text-2xl pr-3'>X</p>
                </button>
                )}
        </div> 
    );
  };
  
  export default ToggleMenu;