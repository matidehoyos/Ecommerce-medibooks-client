'use client'
import Image from "next/image";
import Link from "next/link";

const Header = () => {

    return (
        <div className="w-full border-b border-gray-300 flex bg-gradient-to-r from-[#1b7b7e] to-gray-300" >
            <div className="hidden md:block w-full pt-[200px] pb-[140px] md:pl-[100px] bg-bottom bg-no-repeat overflow-hidden" style={{ backgroundImage: `url('/bgHead1.png')`, backgroundSize: '1300px'} }>
                <Image 
                    src='/marca.png'
                    alt='Logo Medibooks.'
                    width={2400}
                    height={600}
                    className="w-[700px] h-auto object-contain"
                />
                <h4 className="w-auto relative -top-[30px] left-[5px] text-[33px] font-medium text-gray-300">TE ACOMPAÑA EN TODA TU CARRERA</h4>
                <Link href='/productos' className="relative left-[8px] px-[16px] py-[8px] text-[22px] border border-gray-300 rounded-md hover:bg-gray-300 hover:text-[#1b7b7e] hover:border-gray-100 transition-all duration-500" >Ver tienda</Link>
            </div>
            <div className="md:hidden w-full pt-[150px] pb-[200px] pl-[2%] bg-right-bottom bg-no-repeat overflow-hidden" style={{ backgroundImage: `url('/headMov.png')`, backgroundSize: '300px'} }>
                <h4 className="w-auto pr-[25px] relative text-[28px] font-bold text-gray-800 leading-[102%]">TE ACOMPAÑAMOS EN TODA TU CARRERA</h4>
                <Link href='/productos' className="relative top-[20px] px-[16px] py-[8px] text-[16px] text-gray-800 font-semibold border border-gray-800 rounded-md" >Ver tienda</Link>
            </div>
        </div>
    )
}

export default Header;