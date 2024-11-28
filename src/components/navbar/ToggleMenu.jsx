import Image from "next/image";

const ToggleMenu = ({abierto, setAbierto}) => {

    return (
        <div className='w-[40px] h-auto flex lg:hidden ml-8'>
            <button onClick={() => setAbierto(!abierto)}  aria-label="Toggle menu">
                {!abierto ? (
                <Image src='/menuLight.png' alt='Imagen menu colapse.' width={110} height={90} className='w-[36px] h-auto object-contain' />
                ) : (
                <p className='text-gray-100 text-2xl pr-3'>X</p>
                )}
            </button>
        </div> 
    );
  };
  
  export default ToggleMenu;