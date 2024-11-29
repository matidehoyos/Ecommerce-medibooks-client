import SearchBar from "../searchBars/SearchBar";
import CartButton from "./CartButton";
import LoginPc from "./LoginPc";
import Logo from "./Logo";
import MenuMovil from "./MenuMovil";
import NavLinks from "./NavLinks";
import ToggleMenu from "./ToggleMenu";


const Cabecera = ({abierto, setAbierto, visible, setVisible}) => {
    return (
            <div className="w-full h-[68px] md:h-[75px] px-[2%] pt-[8px] lg:pt-0 flex justify-between items-center">
                <Logo />
                <div className='hidden lg:block'>
                  <SearchBar />
                </div>
                <NavLinks />
                <div className='flex justify-end w-auto h-auto'>
                   <CartButton />
                   <ToggleMenu abierto={abierto} setAbierto={setAbierto} />
                </div>
                <MenuMovil abierto={abierto} setAbierto={setAbierto} />
                <LoginPc visible={visible} setVisible={setVisible} />
            </div>
    )
}

export default Cabecera;