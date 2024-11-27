import Image from "next/image";
import Link from "next/link";

const HeaderPc = () => {

    return (
            <div className="hidden md:block w-[520px] lg:w-[600px] xl:w-[740px] pt-0">
                <Image 
                    src='/marcaDark.png'
                    alt='Logo Medibooks.'
                    width={2400}
                    height={600}
                    className="md:w-[500px] lg:w-[580px] xl:w-[700px] h-auto object-contain"
                    priority={true}
                />
                <h4 className="w-auto relative -top-[20px] lg:-top-[24px] xl:-top-[34px] left-[5px] text-[23px] lg:text-[26px] xl:text-[34px] font-[500] lg:font-[500] md:text-[#333] bg-[rgba(256,256,256,.6)] lg:bg-[rgba(256,256,256,.5)] xl:bg-[rgba(256,256,256,.3)]">TE ACOMPAÑA EN TODA TU CARRERA</h4>
                <Link href='/productos' className="w-auto relative left-[8px] -top-[8px] lg:-top-[11px] xl:-top-[16px] px-[26px] lg:px-[32px] xl:px-[40px] py-1 text-[20px] lg:text-[24px] text-[#fff] bg-[#1b7b7e] rounded-md lg:hover:bg-[#1b7b7ea2] transition-all duration-500" aria-label="Ir a la página de productos.">Ver tienda</Link>
            </div>
    )
}

export default HeaderPc;