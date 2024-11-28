'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import debounce from 'lodash.debounce';
import PreNav from './PreNav';
import Logo from './Logo';
import NavLinks from './NavLinks';
import MenuMovil from './MenuMovil';
import CartButton from './CartButton';
import ToggleMenu from './ToggleMenu';
import SearchBar from '../SearchBar';
import LoginPc from './LoginPc';

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const shouldShowPreNav = isHome && !scrolling && !abierto && !visible;


  const debouncedScroll = debounce(() => {
    setScrolling(window.scrollY > 28);
  }, 1000);
  
  useEffect(() => {
    window.addEventListener('scroll', debouncedScroll);
    return () => window.removeEventListener('scroll', debouncedScroll);
  }, []);
  

  return (
    <header className={`w-full h-auto fixed flex flex-col bg-gray-800 border-b border-[#1b7b7e] z-[1000]`}>
        <div className={`w-full ${shouldShowPreNav ? 'block' : 'hidden'} transition-all duration-500`}>
            <PreNav />
        </div>
        <div className="w-full flex">
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
        </div>
    </header>
  );
};

export default NavBar;
