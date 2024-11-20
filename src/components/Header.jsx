'use client'
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SeachBar";

const Header = () => {

    return (
        <div className="w-full md:border-b border-gray-300 bg-gradient-to-b md:bg-gradient-to-l from-[#006a6c] to-gray-300 ">
            <div className="w-full md:pt-[450px] lg:pt-[270px] pb-[10px] lg:pb-[30px] md:pl-[15px] lg:pl-[60px] overflow-hidden bg-right-bottom bg-no-repeat bg-[980px,0] md:bg-[1500px,0] lg:bg-[1300px,0] xl:bg-[1430px,0]" style={{ backgroundImage: `url('/bgHead1.png')`} }>
                <div className="hidden md:block w-[520px] lg:w-[600px] xl:w-[740px] pt-0">
                    <Image 
                        src='/marcaDark.png'
                        alt='Logo Medibooks.'
                        width={2400}
                        height={600}
                        className="md:w-[500px] lg:w-[580px] xl:w-[700px] h-auto object-contain"
                    />
                    <h4 className="w-auto relative -top-[20px] lg:-top-[24px] xl:-top-[34px] left-[5px] text-[23px] lg:text-[26px] xl:text-[34px] font-[500] lg:font-[500] md:text-[#333] bg-[rgba(256,256,256,.6)] lg:bg-[rgba(256,256,256,.5)] xl:bg-[rgba(256,256,256,.3)]">TE ACOMPAÑA EN TODA TU CARRERA</h4>
                    <Link href='/productos' className="w-auto relative left-[8px] -top-[8px] lg:-top-[11px] xl:-top-[16px] px-[26px] lg:px-[32px] xl:px-[40px] py-1 text-[20px] lg:text-[24px] text-[#fff] bg-[#1b7b7e] rounded-md lg:hover:bg-[#1b7b7ea2] transition-all duration-500" >Ver tienda</Link>
                </div>
                <div className="md:hidden w-full pb-[320px] pl-[2%]">
                    <div className="w-[96%] pt-[110px] pb-[20px]">
                        <SearchBar />
                    </div>
                    <h4 className="w-auto relative text-[28px] font-extrabold text-gray-800 leading-[102%]">TE ACOMPAÑAMOS EN<br/> TODA TU CARRERA</h4>
                    <Link href='/productos' className="relative top-[18px] px-[14px] py-[6px] text-[20px] text-white font-semibold bg-[#1b7b7e] border border-gray-300 rounded-md" >Ver tienda</Link>
                </div>
            </div>
        </div>
    )
}

export default Header;