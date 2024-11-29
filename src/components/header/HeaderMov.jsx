import Link from "next/link";
import SearchBar from "../searchBars/SearchBar";

const HeaderMov = () => {

    return (
        <div className="md:hidden w-full pb-[320px] pl-[2%]">
            <div className="w-[96%] pt-[110px] pb-[20px]">
                <SearchBar />
            </div>
            <h4 className="w-auto relative text-[28px] font-extrabold text-gray-800 leading-[102%]">TE ACOMPAÑAMOS EN<br/> TODA TU CARRERA</h4>
            <Link href='/productos' className="relative top-[18px] px-[14px] py-[6px] text-[20px] text-white font-semibold bg-[#1b7b7e] border border-gray-300 rounded-md" aria-label="Ir a la página de productos.">Ver tienda</Link>
        </div>
    )
}

export default HeaderMov;