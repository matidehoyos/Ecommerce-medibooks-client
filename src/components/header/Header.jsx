import HeaderMov from "./HeaderMov";
import HeaderPc from "./HeaderPc";

const Header = () => {

    return (
        <div className="w-full md:border-b border-gray-300 bg-gradient-to-b md:bg-gradient-to-l from-[#006a6c] to-gray-300 ">
            <div className="w-full md:pt-[450px] lg:pt-[300px] pb-[10px] lg:pb-[30px] md:pl-[15px] lg:pl-[60px] overflow-hidden bg-right-bottom bg-no-repeat bg-[980px,0] md:bg-[1500px,0] lg:bg-[1300px,0] xl:bg-[1430px,0]" style={{ backgroundImage: `url('/bgHead1.png')`} }>
                <HeaderMov />
                <HeaderPc />
            </div>
        </div>
    )
}

export default Header;