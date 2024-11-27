import LoginMov from "./LoginMov";
import NavLinksMov from "./NavLinksMov";
import SearchBarMov from "../SearchBarMov";

const MenuMovil = ({abierto, setAbierto}) => {

return (
    <div className={`lg:hidden py-8 px-4 absolute w-full h-screen ${abierto ? 'right-0' : '-right-[200%]' } top-[68px] md:top-[75px] bg-gray-700 transition-all duration-700 ease-out`}>
        <div className='w-[90%]'>
            <SearchBarMov setAbierto={setAbierto} />
        </div>
        <NavLinksMov setAbierto={setAbierto} />
        <LoginMov setAbierto={setAbierto} />
    </div>
  );
};

export default MenuMovil;