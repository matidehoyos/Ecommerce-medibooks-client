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
import SearchBar from '../searchBars/SearchBar';
import LoginPc from './LoginPc';
import Cabecera from './Cabecera';

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
        <Cabecera abierto={abierto} setAbierto={setAbierto} visible={visible} setVisible={setVisible} />
    </header>
  );
};

export default NavBar;
