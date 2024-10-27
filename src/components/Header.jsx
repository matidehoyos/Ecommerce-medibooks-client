'use client'
import Image from "next/image";
import Link from "next/link";

const Header = () => {

    return (
        <div className="w-full border-b border-gray-300 flex justify-center items-center bg-gradient-to-r from-[#1b7b7e] to-gray-300" >
            <div className="w-full pt-[200px] pb-[140px] pl-[100px] bg-bottom bg- bg-no-repeat overflow-hidden" style={{ backgroundImage: `url('/bgHead1.png')`, backgroundSize: '1300px'} }>
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
        </div>
    )
}

export default Header;