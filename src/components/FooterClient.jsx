'use client';
import { usePathname } from 'next/navigation';
import Footer from './Footer';

const FooterClient = () => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return !isAdmin ? <Footer /> : null;
};

export default FooterClient;