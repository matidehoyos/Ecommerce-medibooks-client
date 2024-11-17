'use client';
import { usePathname } from 'next/navigation';
import NavBar from './NavBar';

const NavBarClient = () => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return !isAdmin ? <NavBar /> : null;
};

export default NavBarClient;
