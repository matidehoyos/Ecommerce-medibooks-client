'use client'
import Image from "next/image";
import Link from "next/link";

const Header = () => {

    return (
        <div className="w-full md:border-b border-gray-300 flex bg-gradient-to-t md:bg-gradient-to-r from-[#1b7b7e] to-gray-300" >
            <div className="hidden md:block w-full pt-[200px] pb-[140px] md:pl-[100px] bg-bottom bg-no-repeat overflow-hidden" style={{ backgroundImage: `url('/bgHead1.png')`, backgroundSize: '1300px'} }>
                <Image 
                    src='/marca.png'
                    alt='Logo Medibooks.'
                    width={2400}
                    height={600}
                    className="w-[700px] h-auto object-contain"
                />
                <h4 className="w-auto relative -top-[30px] left-[5px] text-[33px] font-medium text-gray-300">TE ACOMPAÑA EN TODA TU CARRERA</h4>
                <Link href='/productos' className="relative left-[8px] px-[16px] py-[8px] text-[22px] text-gray-300 border border-gray-300 rounded-md hover:bg-gray-300 hover:text-[#1b7b7e] hover:border-gray-100 transition-all duration-500" >Ver tienda</Link>
            </div>
            <div className="md:hidden w-full pt-[110px] pb-[270px] pl-[2%] bg-right-bottom bg-no-repeat" style={{ backgroundImage: `url('/headMov.png')`, backgroundSize: '380px'} }>
                <h4 className="w-auto relative text-[28px] font-extrabold text-gray-700 leading-[102%]">TE ACOMPAÑAMOS EN TODA TU CARRERA</h4>
                <Link href='/productos' className="relative top-[18px] px-[14px] py-[6px] text-[20px] bg-gray-300 text-gray-700 font-semibold border border-gray-700 rounded-md" >Ver tienda</Link>
            </div>
        </div>
    )
}

export default Header;