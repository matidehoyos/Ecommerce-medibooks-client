'use client'
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SeachBar";

const Header = () => {

    return (
        <div className="w-full md:border-b border-gray-300 bg-gradient-to-t md:bg-gradient-to-r from-[#006a6c] to-gray-300 ">
            <div className="w-full md:pt-[450px] lg:pt-[270px] pb-[10px] lg:pb-[30px] md:pl-[15px] lg:pl-[60px] overflow-hidden bg-right-bottom bg-no-repeat bg-[980px,0] md:bg-[1500px,0] lg:bg-[1300px,0] xl:bg-[1430px,0]" style={{ backgroundImage: `url('/bgHead1.png')`} }>
                <div className="hidden md:block w-[520px] lg:w-[600px] xl:w-[740px] pt-0 pb-2 px-2 lg:pb-5 lg:px-4 bg-gray-950 bg-opacity-60 lg:bg-opacity-30 xl:bg-opacity-10 rounded-lg border border-gray-600 xl:border-[rgba(0,0,0,.1)]">
                    <Image 
                        src='/marca.png'
                        alt='Logo Medibooks.'
                        width={2400}
                        height={600}
                        className="md:w-[500px] lg:w-[580px] xl:w-[700px] h-auto object-contain"
                    />
                    <h4 className="w-auto relative -top-[20px] lg:-top-[24px] xl:-top-[34px] left-[5px] text-[23px] lg:text-[26px] xl:text-[34px] font-[500] lg:font-[500] md:text-gray-200 lg:text-gray-100">TE ACOMPAÑA EN TODA TU CARRERA</h4>
                    <Link href='/productos' className="w-auto relative left-[8px] -top-[8px] lg:-top-[11px] xl:-top-[16px] px-[26px] lg:px-[32px] xl:px-[40px] py-1 text-[20px] lg:text-[24px] text-gray-50 border border-gray-400 rounded-md lg:hover:bg-gray-300 lg:hover:text-[#1b7b7e] lg:hover:border-gray-100 transition-all duration-500" >Ver tienda</Link>
                </div>
                <div className="md:hidden w-full pb-[295px] pl-[2%]">
                    <div className="w-[96%] pt-[86px] pb-[34px]">
                        <SearchBar />
                    </div>
                    <h4 className="w-auto relative text-[28px] font-extrabold text-gray-800 leading-[102%]">TE ACOMPAÑAMOS EN<br/> TODA TU CARRERA</h4>
                    <Link href='/productos' className="relative top-[18px] px-[14px] py-[6px] text-[20px] text-gray-800 font-semibold border border-gray-800 rounded-md" >Ver tienda</Link>
                </div>
            </div>
        </div>
    )
}

export default Header;