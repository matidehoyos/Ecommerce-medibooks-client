import LoginMov from "./LoginMov";
import NavLinksMov from "./NavLinksMov";
import SearchBar from "../searchBars/SearchBar";

const MenuMovil = ({abierto, setAbierto}) => {

return (
    <div className={`lg:hidden px-4 absolute w-full h-screen right-0 top-[69px] md:top-[75px] bg-gray-800 transition-all duration-1000 ease-in-out ${abierto ? 'max-h-[calc(100vh-69px)] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className='w-[96%] pt-4'>
            <SearchBar isMobile={true} setAbierto={setAbierto} />
        </div>
        <NavLinksMov setAbierto={setAbierto} />
        <LoginMov setAbierto={setAbierto} />
    </div>
  );
};

export default MenuMovil;