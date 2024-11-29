import Image from "next/image";
import Link from "next/link";

const NotFoundProductos = () => {

    return (
        <div className='w-full pt-[70px] pb-[170px] md:py-[100px] px-[3%] lg:px-[6%]'>
          <p className='mb-3 md:mb-0 text-left text-[24px] leading-[103%] md:leading-normal md:text-3xl font-light text-gray-800'>
            En este momento no contamos con libros de esta categoría.
          </p>
          <Link href='/productos' className='text-left text-lg md:text-xl font-semibold text-[#1b7b7e] underline'>
            Explore aquí libros disponibles.
          </Link>
          <Image src='/logoDark.png' width={2400} height={600} alt='Logo de Medibooks.' className='w-[30%] mt-20 hidden md:block' />
        </div>
    )
}


export default NotFoundProductos;